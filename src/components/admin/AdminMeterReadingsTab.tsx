import { useState, useEffect } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Loader2, Search, Eye, Calendar, CheckCircle } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { format } from "date-fns";

interface MeterReading {
  id: string;
  reference_number: string;
  resident_name: string;
  flat_number: string;
  email: string;
  phone: string | null;
  meter_type: string;
  preferred_date: string | null;
  additional_notes: string | null;
  status: string;
  admin_notes: string | null;
  scheduled_date: string | null;
  reading_value: string | null;
  created_at: string;
}

interface AdminMeterReadingsTabProps {
  onUpdate?: () => void;
}

const AdminMeterReadingsTab = ({ onUpdate }: AdminMeterReadingsTabProps) => {
  const [readings, setReadings] = useState<MeterReading[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [meterTypeFilter, setMeterTypeFilter] = useState<string>("all");
  const [selectedReading, setSelectedReading] = useState<MeterReading | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const [adminNotes, setAdminNotes] = useState("");
  const [scheduledDate, setScheduledDate] = useState("");
  const [readingValue, setReadingValue] = useState("");
  const [newStatus, setNewStatus] = useState("");

  useEffect(() => {
    loadReadings();
  }, [statusFilter, meterTypeFilter]);

  const loadReadings = async () => {
    setIsLoading(true);
    
    let query = supabase
      .from("meter_readings")
      .select("*")
      .order("created_at", { ascending: false });

    if (statusFilter !== "all") {
      query = query.eq("status", statusFilter);
    }

    if (meterTypeFilter !== "all") {
      query = query.eq("meter_type", meterTypeFilter);
    }

    const { data, error } = await query;

    if (error) {
      console.error("Error loading meter readings:", error);
      toast({
        title: "Error",
        description: "Failed to load meter readings",
        variant: "destructive",
      });
    } else {
      setReadings(data || []);
    }

    setIsLoading(false);
  };

  const filteredReadings = readings.filter((reading) => {
    const matchesSearch =
      reading.reference_number.toLowerCase().includes(searchQuery.toLowerCase()) ||
      reading.resident_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      reading.flat_number.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesSearch;
  });

  const openDialog = (reading: MeterReading) => {
    setSelectedReading(reading);
    setAdminNotes(reading.admin_notes || "");
    setScheduledDate(reading.scheduled_date || "");
    setReadingValue(reading.reading_value || "");
    setNewStatus(reading.status);
    setIsDialogOpen(true);
  };

  const handleUpdateReading = async () => {
    if (!selectedReading) return;
    
    setIsUpdating(true);

    const { error } = await supabase
      .from("meter_readings")
      .update({
        status: newStatus,
        admin_notes: adminNotes || null,
        scheduled_date: scheduledDate || null,
        reading_value: readingValue || null,
      })
      .eq("id", selectedReading.id);

    if (error) {
      console.error("Error updating meter reading:", error);
      toast({
        title: "Error",
        description: "Failed to update meter reading",
        variant: "destructive",
      });
    } else {
      toast({
        title: "Success",
        description: "Meter reading updated successfully",
      });
      setIsDialogOpen(false);
      loadReadings();
      onUpdate?.();
    }

    setIsUpdating(false);
  };

  const getStatusBadge = (status: string) => {
    const variants: Record<string, "default" | "secondary" | "destructive" | "outline"> = {
      pending: "secondary",
      scheduled: "default",
      completed: "outline",
      cancelled: "destructive",
    };
    const labels: Record<string, string> = {
      pending: "Pending",
      scheduled: "Scheduled",
      completed: "Completed",
      cancelled: "Cancelled",
    };
    return <Badge variant={variants[status] || "secondary"}>{labels[status] || status}</Badge>;
  };

  const getMeterTypeBadge = (type: string) => {
    const colors: Record<string, string> = {
      electricity: "bg-yellow-100 text-yellow-800 border-yellow-300",
      gas: "bg-blue-100 text-blue-800 border-blue-300",
      water: "bg-cyan-100 text-cyan-800 border-cyan-300",
    };
    return (
      <Badge variant="outline" className={colors[type] || ""}>
        {type.charAt(0).toUpperCase() + type.slice(1)}
      </Badge>
    );
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search by reference, name, or flat..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-full sm:w-[180px]">
            <SelectValue placeholder="Filter by status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Statuses</SelectItem>
            <SelectItem value="pending">Pending</SelectItem>
            <SelectItem value="scheduled">Scheduled</SelectItem>
            <SelectItem value="completed">Completed</SelectItem>
            <SelectItem value="cancelled">Cancelled</SelectItem>
          </SelectContent>
        </Select>
        <Select value={meterTypeFilter} onValueChange={setMeterTypeFilter}>
          <SelectTrigger className="w-full sm:w-[180px]">
            <SelectValue placeholder="Filter by type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Types</SelectItem>
            <SelectItem value="electricity">Electricity</SelectItem>
            <SelectItem value="gas">Gas</SelectItem>
            <SelectItem value="water">Water</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Table */}
      <div className="border rounded-lg overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Reference</TableHead>
              <TableHead>Resident</TableHead>
              <TableHead>Flat</TableHead>
              <TableHead>Meter Type</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Requested</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredReadings.length === 0 ? (
              <TableRow>
                <TableCell colSpan={7} className="text-center py-8 text-muted-foreground">
                  No meter reading requests found
                </TableCell>
              </TableRow>
            ) : (
              filteredReadings.map((reading) => (
                <TableRow key={reading.id}>
                  <TableCell className="font-mono text-sm">{reading.reference_number}</TableCell>
                  <TableCell>{reading.resident_name}</TableCell>
                  <TableCell>{reading.flat_number}</TableCell>
                  <TableCell>{getMeterTypeBadge(reading.meter_type)}</TableCell>
                  <TableCell>{getStatusBadge(reading.status)}</TableCell>
                  <TableCell>{format(new Date(reading.created_at), "dd MMM yyyy")}</TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" size="sm" onClick={() => openDialog(reading)}>
                      <Eye className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      {/* Detail Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              Meter Reading Request
              <span className="font-mono text-sm text-muted-foreground">
                {selectedReading?.reference_number}
              </span>
            </DialogTitle>
            <DialogDescription>
              View and manage this meter reading request
            </DialogDescription>
          </DialogHeader>

          {selectedReading && (
            <div className="space-y-6">
              {/* Request Details */}
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <Label className="text-muted-foreground">Resident Name</Label>
                  <p className="font-medium">{selectedReading.resident_name}</p>
                </div>
                <div>
                  <Label className="text-muted-foreground">Flat Number</Label>
                  <p className="font-medium">{selectedReading.flat_number}</p>
                </div>
                <div>
                  <Label className="text-muted-foreground">Email</Label>
                  <p className="font-medium">{selectedReading.email}</p>
                </div>
                <div>
                  <Label className="text-muted-foreground">Phone</Label>
                  <p className="font-medium">{selectedReading.phone || "Not provided"}</p>
                </div>
                <div>
                  <Label className="text-muted-foreground">Meter Type</Label>
                  <div className="mt-1">{getMeterTypeBadge(selectedReading.meter_type)}</div>
                </div>
                <div>
                  <Label className="text-muted-foreground">Preferred Date</Label>
                  <p className="font-medium">
                    {selectedReading.preferred_date
                      ? format(new Date(selectedReading.preferred_date), "dd MMM yyyy")
                      : "No preference"}
                  </p>
                </div>
              </div>

              {selectedReading.additional_notes && (
                <div>
                  <Label className="text-muted-foreground">Additional Notes from Resident</Label>
                  <p className="mt-1 p-3 bg-muted rounded-md text-sm">{selectedReading.additional_notes}</p>
                </div>
              )}

              <hr />

              {/* Admin Actions */}
              <div className="space-y-4">
                <div>
                  <Label>Status</Label>
                  <Select value={newStatus} onValueChange={setNewStatus}>
                    <SelectTrigger className="mt-1">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="pending">Pending</SelectItem>
                      <SelectItem value="scheduled">Scheduled</SelectItem>
                      <SelectItem value="completed">Completed</SelectItem>
                      <SelectItem value="cancelled">Cancelled</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label>Scheduled Date</Label>
                  <Input
                    type="date"
                    value={scheduledDate}
                    onChange={(e) => setScheduledDate(e.target.value)}
                    className="mt-1"
                  />
                </div>

                <div>
                  <Label>Meter Reading Value</Label>
                  <Input
                    placeholder="Enter the reading value..."
                    value={readingValue}
                    onChange={(e) => setReadingValue(e.target.value)}
                    className="mt-1"
                  />
                </div>

                <div>
                  <Label>Admin Notes</Label>
                  <Textarea
                    placeholder="Add any notes about this request..."
                    value={adminNotes}
                    onChange={(e) => setAdminNotes(e.target.value)}
                    className="mt-1"
                  />
                </div>
              </div>
            </div>
          )}

          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleUpdateReading} disabled={isUpdating}>
              {isUpdating ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Updating...
                </>
              ) : (
                <>
                  <CheckCircle className="h-4 w-4 mr-2" />
                  Update Request
                </>
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminMeterReadingsTab;
