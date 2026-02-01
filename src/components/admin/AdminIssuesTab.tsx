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
import { Loader2, Search, Eye, RefreshCw, Image } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { format } from "date-fns";

interface Issue {
  id: string;
  reference_number: string;
  resident_name: string;
  flat_number: string;
  resident_email: string;
  resident_phone: string | null;
  issue_type: string;
  location: string;
  category: string;
  description: string;
  status: string;
  photo_urls: string[] | null;
  created_at: string;
  updated_at: string;
}

interface AdminIssuesTabProps {
  onUpdate: () => void;
}

const statusOptions = [
  { value: "reported", label: "Reported", color: "bg-blue-100 text-blue-800" },
  { value: "acknowledged", label: "Acknowledged", color: "bg-purple-100 text-purple-800" },
  { value: "in_progress", label: "In Progress", color: "bg-yellow-100 text-yellow-800" },
  { value: "resolved", label: "Resolved", color: "bg-green-100 text-green-800" },
  { value: "closed", label: "Closed", color: "bg-gray-100 text-gray-800" },
];

const AdminIssuesTab = ({ onUpdate }: AdminIssuesTabProps) => {
  const [issues, setIssues] = useState<Issue[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [selectedIssue, setSelectedIssue] = useState<Issue | null>(null);
  const [isUpdating, setIsUpdating] = useState(false);
  const [newStatus, setNewStatus] = useState("");
  const [updateNotes, setUpdateNotes] = useState("");

  useEffect(() => {
    loadIssues();
  }, [statusFilter]);

  const loadIssues = async () => {
    setIsLoading(true);
    try {
      let query = supabase
        .from("issues")
        .select("*")
        .order("created_at", { ascending: false });

      if (statusFilter && statusFilter !== "all") {
        query = query.eq("status", statusFilter);
      }

      const { data, error } = await query;

      if (error) throw error;
      setIssues(data || []);
    } catch (error: any) {
      console.error("Error loading issues:", error);
      toast({
        title: "Error",
        description: "Failed to load issues",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleUpdateStatus = async () => {
    if (!selectedIssue || !newStatus) return;

    setIsUpdating(true);
    try {
      // Update issue status
      const { error: issueError } = await supabase
        .from("issues")
        .update({ status: newStatus })
        .eq("id", selectedIssue.id);

      if (issueError) throw issueError;

      // Create status update record
      const { error: updateError } = await supabase
        .from("issue_updates")
        .insert({
          issue_id: selectedIssue.id,
          status: newStatus,
          notes: updateNotes || null,
        });

      if (updateError) throw updateError;

      toast({
        title: "Status Updated",
        description: `Issue ${selectedIssue.reference_number} updated to ${newStatus}`,
      });

      setSelectedIssue(null);
      setNewStatus("");
      setUpdateNotes("");
      loadIssues();
      onUpdate();
    } catch (error: any) {
      console.error("Error updating issue:", error);
      toast({
        title: "Error",
        description: "Failed to update issue status",
        variant: "destructive",
      });
    } finally {
      setIsUpdating(false);
    }
  };

  const filteredIssues = issues.filter(
    (issue) =>
      issue.reference_number.toLowerCase().includes(searchTerm.toLowerCase()) ||
      issue.resident_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      issue.flat_number.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusBadge = (status: string) => {
    const statusOption = statusOptions.find((s) => s.value === status);
    return (
      <Badge className={statusOption?.color || "bg-gray-100 text-gray-800"}>
        {statusOption?.label || status}
      </Badge>
    );
  };

  const getPriorityBadge = (type: string) => {
    const colors: Record<string, string> = {
      emergency: "bg-red-100 text-red-800",
      urgent: "bg-orange-100 text-orange-800",
      routine: "bg-blue-100 text-blue-800",
    };
    return (
      <Badge className={colors[type] || "bg-gray-100 text-gray-800"}>
        {type}
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
            placeholder="Search by reference, name, or flat..."
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
        <Button variant="outline" onClick={loadIssues}>
          <RefreshCw className="h-4 w-4 mr-2" />
          Refresh
        </Button>
      </div>

      {/* Table */}
      {isLoading ? (
        <div className="flex items-center justify-center py-12">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      ) : filteredIssues.length === 0 ? (
        <div className="text-center py-12 text-muted-foreground">
          No issues found
        </div>
      ) : (
        <div className="border rounded-lg overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Reference</TableHead>
                <TableHead>Resident</TableHead>
                <TableHead>Priority</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Date</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredIssues.map((issue) => (
                <TableRow key={issue.id}>
                  <TableCell className="font-medium">
                    {issue.reference_number}
                  </TableCell>
                  <TableCell>
                    <div>
                      <p className="font-medium">{issue.resident_name}</p>
                      <p className="text-sm text-muted-foreground">
                        Flat {issue.flat_number}
                      </p>
                    </div>
                  </TableCell>
                  <TableCell>{getPriorityBadge(issue.issue_type)}</TableCell>
                  <TableCell className="capitalize">{issue.category}</TableCell>
                  <TableCell>{getStatusBadge(issue.status)}</TableCell>
                  <TableCell>
                    {format(new Date(issue.created_at), "dd/MM/yyyy")}
                  </TableCell>
                  <TableCell className="text-right">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => {
                        setSelectedIssue(issue);
                        setNewStatus(issue.status);
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

      {/* Issue Detail Dialog */}
      <Dialog open={!!selectedIssue} onOpenChange={() => setSelectedIssue(null)}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Issue Details</DialogTitle>
            <DialogDescription>
              {selectedIssue?.reference_number}
            </DialogDescription>
          </DialogHeader>

          {selectedIssue && (
            <div className="space-y-6">
              {/* Resident Info */}
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground">Resident</p>
                  <p className="font-medium">{selectedIssue.resident_name}</p>
                  <p className="text-sm text-muted-foreground">
                    Flat {selectedIssue.flat_number}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Contact</p>
                  <p className="font-medium">{selectedIssue.resident_email}</p>
                  {selectedIssue.resident_phone && (
                    <p className="text-sm">{selectedIssue.resident_phone}</p>
                  )}
                </div>
              </div>

              {/* Issue Info */}
              <div className="grid sm:grid-cols-3 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground">Priority</p>
                  {getPriorityBadge(selectedIssue.issue_type)}
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Location</p>
                  <p className="font-medium capitalize">
                    {selectedIssue.location}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Category</p>
                  <p className="font-medium capitalize">
                    {selectedIssue.category}
                  </p>
                </div>
              </div>

              {/* Description */}
              <div>
                <p className="text-sm text-muted-foreground mb-2">Description</p>
                <p className="bg-muted p-3 rounded-lg text-sm">
                  {selectedIssue.description}
                </p>
              </div>

              {/* Photos */}
              {selectedIssue.photo_urls && selectedIssue.photo_urls.length > 0 && (
                <div>
                  <p className="text-sm text-muted-foreground mb-2 flex items-center gap-2">
                    <Image className="h-4 w-4" />
                    Photos ({selectedIssue.photo_urls.length})
                  </p>
                  <div className="flex gap-2 flex-wrap">
                    {selectedIssue.photo_urls.map((url, index) => (
                      <a
                        key={index}
                        href={url}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <img
                          src={url}
                          alt={`Issue photo ${index + 1}`}
                          className="w-24 h-24 object-cover rounded-lg border hover:opacity-80 transition-opacity"
                        />
                      </a>
                    ))}
                  </div>
                </div>
              )}

              {/* Update Status */}
              <div className="border-t pt-4 space-y-4">
                <h4 className="font-medium">Update Status</h4>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>New Status</Label>
                    <Select value={newStatus} onValueChange={setNewStatus}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select status" />
                      </SelectTrigger>
                      <SelectContent>
                        {statusOptions.map((status) => (
                          <SelectItem key={status.value} value={status.value}>
                            {status.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>Notes (Optional)</Label>
                  <Textarea
                    placeholder="Add notes about this update..."
                    value={updateNotes}
                    onChange={(e) => setUpdateNotes(e.target.value)}
                    rows={3}
                  />
                </div>
                <div className="flex justify-end gap-2">
                  <Button
                    variant="outline"
                    onClick={() => setSelectedIssue(null)}
                  >
                    Cancel
                  </Button>
                  <Button
                    onClick={handleUpdateStatus}
                    disabled={isUpdating || newStatus === selectedIssue.status}
                  >
                    {isUpdating ? (
                      <>
                        <Loader2 className="h-4 w-4 animate-spin mr-2" />
                        Updating...
                      </>
                    ) : (
                      "Update Status"
                    )}
                  </Button>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminIssuesTab;
