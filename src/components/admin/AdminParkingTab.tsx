import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Loader2, Search, Eye, RefreshCw, Check, X } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { format } from "date-fns";

interface ParkingBooking {
  id: string;
  booking_reference: string;
  resident_name: string;
  flat_number: string;
  resident_email: string;
  resident_phone: string | null;
  guest_name: string;
  vehicle_registration: string;
  start_time: string;
  end_time: string;
  status: string;
  special_requirements: string | null;
  admin_notes: string | null;
  created_at: string;
}

interface AdminParkingTabProps {
  onUpdate: () => void;
}

const statusOptions = [
  { value: "pending", label: "Pending", color: "bg-yellow-100 text-yellow-800" },
  { value: "approved", label: "Approved", color: "bg-green-100 text-green-800" },
  { value: "rejected", label: "Rejected", color: "bg-red-100 text-red-800" },
];

const AdminParkingTab = ({ onUpdate }: AdminParkingTabProps) => {
  const [bookings, setBookings] = useState<ParkingBooking[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [selectedBooking, setSelectedBooking] = useState<ParkingBooking | null>(null);
  const [isUpdating, setIsUpdating] = useState(false);
  const [adminNotes, setAdminNotes] = useState("");

  useEffect(() => {
    loadBookings();
  }, [statusFilter]);

  const loadBookings = async () => {
    setIsLoading(true);
    try {
      let query = supabase
        .from("parking_bookings")
        .select("*")
        .order("created_at", { ascending: false });

      if (statusFilter && statusFilter !== "all") {
        query = query.eq("status", statusFilter);
      }

      const { data, error } = await query;

      if (error) throw error;
      setBookings(data || []);
    } catch (error: any) {
      console.error("Error loading bookings:", error);
      toast({
        title: "Error",
        description: "Failed to load bookings",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleUpdateStatus = async (newStatus: string) => {
    if (!selectedBooking) return;

    setIsUpdating(true);
    try {
      const { error } = await supabase
        .from("parking_bookings")
        .update({
          status: newStatus,
          admin_notes: adminNotes || null,
        })
        .eq("id", selectedBooking.id);

      if (error) throw error;

      toast({
        title: `Booking ${newStatus === "approved" ? "Approved" : "Rejected"}`,
        description: `Booking ${selectedBooking.booking_reference} has been ${newStatus}`,
      });

      setSelectedBooking(null);
      setAdminNotes("");
      loadBookings();
      onUpdate();
    } catch (error: any) {
      console.error("Error updating booking:", error);
      toast({
        title: "Error",
        description: "Failed to update booking status",
        variant: "destructive",
      });
    } finally {
      setIsUpdating(false);
    }
  };

  const filteredBookings = bookings.filter(
    (booking) =>
      booking.booking_reference.toLowerCase().includes(searchTerm.toLowerCase()) ||
      booking.resident_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      booking.guest_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      booking.vehicle_registration.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusBadge = (status: string) => {
    const statusOption = statusOptions.find((s) => s.value === status);
    return (
      <Badge className={statusOption?.color || "bg-gray-100 text-gray-800"}>
        {statusOption?.label || status}
      </Badge>
    );
  };

  return (
    <div className="space-y-4">
      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search by reference, name, or registration..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-full sm:w-48">
            <SelectValue placeholder="Filter by status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Statuses</SelectItem>
            {statusOptions.map((status) => (
              <SelectItem key={status.value} value={status.value}>
                {status.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Button variant="outline" onClick={loadBookings}>
          <RefreshCw className="h-4 w-4 mr-2" />
          Refresh
        </Button>
      </div>

      {/* Table */}
      {isLoading ? (
        <div className="flex items-center justify-center py-12">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      ) : filteredBookings.length === 0 ? (
        <div className="text-center py-12 text-muted-foreground">
          No bookings found
        </div>
      ) : (
        <div className="border rounded-lg overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Reference</TableHead>
                <TableHead>Resident</TableHead>
                <TableHead>Guest / Vehicle</TableHead>
                <TableHead>Duration</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredBookings.map((booking) => (
                <TableRow key={booking.id}>
                  <TableCell className="font-medium">
                    {booking.booking_reference}
                  </TableCell>
                  <TableCell>
                    <div>
                      <p className="font-medium">{booking.resident_name}</p>
                      <p className="text-sm text-muted-foreground">
                        Flat {booking.flat_number}
                      </p>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div>
                      <p className="font-medium">{booking.guest_name}</p>
                      <p className="text-sm text-muted-foreground font-mono">
                        {booking.vehicle_registration}
                      </p>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="text-sm">
                      <p>{format(new Date(booking.start_time), "dd/MM/yy HH:mm")}</p>
                      <p className="text-muted-foreground">
                        to {format(new Date(booking.end_time), "dd/MM/yy HH:mm")}
                      </p>
                    </div>
                  </TableCell>
                  <TableCell>{getStatusBadge(booking.status)}</TableCell>
                  <TableCell className="text-right">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => {
                        setSelectedBooking(booking);
                        setAdminNotes(booking.admin_notes || "");
                      }}
                    >
                      <Eye className="h-4 w-4 mr-1" />
                      View
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}

      {/* Booking Detail Dialog */}
      <Dialog open={!!selectedBooking} onOpenChange={() => setSelectedBooking(null)}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Booking Details</DialogTitle>
            <DialogDescription>
              {selectedBooking?.booking_reference}
            </DialogDescription>
          </DialogHeader>

          {selectedBooking && (
            <div className="space-y-6">
              {/* Resident Info */}
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground">Resident</p>
                  <p className="font-medium">{selectedBooking.resident_name}</p>
                  <p className="text-sm text-muted-foreground">
                    Flat {selectedBooking.flat_number}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Contact</p>
                  <p className="font-medium">{selectedBooking.resident_email}</p>
                  {selectedBooking.resident_phone && (
                    <p className="text-sm">{selectedBooking.resident_phone}</p>
                  )}
                </div>
              </div>

              {/* Guest Info */}
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground">Guest Name</p>
                  <p className="font-medium">{selectedBooking.guest_name}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Vehicle Registration</p>
                  <p className="font-medium font-mono text-lg">
                    {selectedBooking.vehicle_registration}
                  </p>
                </div>
              </div>

              {/* Booking Time */}
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground">Start Time</p>
                  <p className="font-medium">
                    {format(new Date(selectedBooking.start_time), "dd MMM yyyy, HH:mm")}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">End Time</p>
                  <p className="font-medium">
                    {format(new Date(selectedBooking.end_time), "dd MMM yyyy, HH:mm")}
                  </p>
                </div>
              </div>

              {/* Special Requirements */}
              {selectedBooking.special_requirements && (
                <div>
                  <p className="text-sm text-muted-foreground mb-2">Special Requirements</p>
                  <p className="bg-muted p-3 rounded-lg text-sm">
                    {selectedBooking.special_requirements}
                  </p>
                </div>
              )}

              {/* Current Status */}
              <div>
                <p className="text-sm text-muted-foreground mb-2">Current Status</p>
                {getStatusBadge(selectedBooking.status)}
              </div>

              {/* Admin Actions */}
              {selectedBooking.status === "pending" && (
                <div className="border-t pt-4 space-y-4">
                  <h4 className="font-medium">Admin Decision</h4>
                  <div className="space-y-2">
                    <Label>Notes (Optional)</Label>
                    <Textarea
                      placeholder="Add notes about this decision..."
                      value={adminNotes}
                      onChange={(e) => setAdminNotes(e.target.value)}
                      rows={3}
                    />
                  </div>
                  <div className="flex justify-end gap-2">
                    <Button
                      variant="outline"
                      onClick={() => setSelectedBooking(null)}
                    >
                      Cancel
                    </Button>
                    <Button
                      variant="destructive"
                      onClick={() => handleUpdateStatus("rejected")}
                      disabled={isUpdating}
                    >
                      {isUpdating ? (
                        <Loader2 className="h-4 w-4 animate-spin mr-2" />
                      ) : (
                        <X className="h-4 w-4 mr-2" />
                      )}
                      Reject
                    </Button>
                    <Button
                      onClick={() => handleUpdateStatus("approved")}
                      disabled={isUpdating}
                      className="bg-green-600 hover:bg-green-700"
                    >
                      {isUpdating ? (
                        <Loader2 className="h-4 w-4 animate-spin mr-2" />
                      ) : (
                        <Check className="h-4 w-4 mr-2" />
                      )}
                      Approve
                    </Button>
                  </div>
                </div>
              )}

              {/* Already processed */}
              {selectedBooking.status !== "pending" && selectedBooking.admin_notes && (
                <div>
                  <p className="text-sm text-muted-foreground mb-2">Admin Notes</p>
                  <p className="bg-muted p-3 rounded-lg text-sm">
                    {selectedBooking.admin_notes}
                  </p>
                </div>
              )}
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminParkingTab;
