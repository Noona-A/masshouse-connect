import { useState } from "react";
import Layout from "@/components/layout/Layout";
import PageHero from "@/components/ui/PageHero";
import { Search, Download, FileText, Filter } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const documents = [
  { id: 1, title: "Board Meeting Minutes - January 2025", category: "Governance", type: "Minutes", date: "2025-01-20" },
  { id: 2, title: "Annual Budget 2025", category: "Financial", type: "Budget", date: "2024-12-15" },
  { id: 3, title: "Service Charge Demand 2025", category: "Financial", type: "Demand", date: "2025-01-01" },
  { id: 4, title: "Building Insurance Certificate 2024-25", category: "Legal", type: "Certificate", date: "2024-04-01" },
  { id: 5, title: "Fire Risk Assessment 2024", category: "Health & Safety", type: "Assessment", date: "2024-06-15" },
  { id: 6, title: "Annual Accounts 2024", category: "Financial", type: "Accounts", date: "2024-12-01" },
  { id: 7, title: "Board Meeting Minutes - December 2024", category: "Governance", type: "Minutes", date: "2024-12-18" },
  { id: 8, title: "Resident Handbook 2025", category: "Operational", type: "Handbook", date: "2025-01-01" },
  { id: 9, title: "Articles of Association", category: "Governance", type: "Legal", date: "2024-01-01" },
  { id: 10, title: "Board Meeting Minutes - November 2024", category: "Governance", type: "Minutes", date: "2024-11-20" },
  { id: 11, title: "Health & Safety Policy", category: "Health & Safety", type: "Policy", date: "2024-03-01" },
  { id: 12, title: "Complaints Procedure", category: "Governance", type: "Policy", date: "2024-01-01" },
];

const categories = ["All Categories", "Governance", "Financial", "Legal", "Health & Safety", "Operational"];
const years = ["All Years", "2025", "2024", "2023"];
const types = ["All Types", "Minutes", "Accounts", "Budget", "Policy", "Certificate", "Assessment", "Demand", "Handbook", "Legal"];

const Documents = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All Categories");
  const [selectedYear, setSelectedYear] = useState("All Years");
  const [selectedType, setSelectedType] = useState("All Types");

  const filteredDocuments = documents.filter(doc => {
    const matchesSearch = searchQuery === "" || 
      doc.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === "All Categories" || 
      doc.category === selectedCategory;
    const matchesYear = selectedYear === "All Years" || 
      doc.date.startsWith(selectedYear);
    const matchesType = selectedType === "All Types" || 
      doc.type === selectedType;

    return matchesSearch && matchesCategory && matchesYear && matchesType;
  });

  const clearFilters = () => {
    setSearchQuery("");
    setSelectedCategory("All Categories");
    setSelectedYear("All Years");
    setSelectedType("All Types");
  };

  const hasFilters = searchQuery || selectedCategory !== "All Categories" || 
    selectedYear !== "All Years" || selectedType !== "All Types";

  return (
    <Layout>
      <PageHero
        title="Document Library"
        subtitle="Access meeting minutes, accounts, policies, and other important documents"
        breadcrumbs={[
          { label: "Home", path: "/" },
          { label: "Documents" },
        ]}
      />

      <section className="section-padding">
        <div className="section-container">
          {/* Search and Filters */}
          <div className="bg-card rounded-lg border border-border p-4 md:p-6 mb-8">
            <div className="flex flex-col lg:flex-row gap-4">
              {/* Search */}
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  type="text"
                  placeholder="Search documents..."
                  className="pl-9"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>

              {/* Filters */}
              <div className="flex flex-col sm:flex-row gap-3">
                <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                  <SelectTrigger className="w-full sm:w-[160px]">
                    <SelectValue placeholder="Category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map(cat => (
                      <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <Select value={selectedYear} onValueChange={setSelectedYear}>
                  <SelectTrigger className="w-full sm:w-[120px]">
                    <SelectValue placeholder="Year" />
                  </SelectTrigger>
                  <SelectContent>
                    {years.map(year => (
                      <SelectItem key={year} value={year}>{year}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <Select value={selectedType} onValueChange={setSelectedType}>
                  <SelectTrigger className="w-full sm:w-[140px]">
                    <SelectValue placeholder="Type" />
                  </SelectTrigger>
                  <SelectContent>
                    {types.map(type => (
                      <SelectItem key={type} value={type}>{type}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                {hasFilters && (
                  <Button variant="outline" onClick={clearFilters} className="shrink-0">
                    Clear
                  </Button>
                )}
              </div>
            </div>
          </div>

          {/* Results */}
          <div className="mb-4 flex items-center justify-between">
            <p className="text-sm text-muted-foreground">
              {filteredDocuments.length} document{filteredDocuments.length !== 1 ? 's' : ''} found
            </p>
          </div>

          {/* Documents Table */}
          {filteredDocuments.length > 0 ? (
            <div className="bg-card rounded-lg border border-border overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-muted border-b border-border">
                    <tr>
                      <th className="px-4 py-3 text-left text-sm font-semibold">Document</th>
                      <th className="px-4 py-3 text-left text-sm font-semibold hidden md:table-cell">Category</th>
                      <th className="px-4 py-3 text-left text-sm font-semibold hidden sm:table-cell">Date</th>
                      <th className="px-4 py-3 text-right text-sm font-semibold">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredDocuments.map((doc, index) => (
                      <tr 
                        key={doc.id}
                        className={`border-b border-border last:border-b-0 hover:bg-muted/50 transition-colors ${
                          index % 2 === 0 ? '' : 'bg-muted/20'
                        }`}
                      >
                        <td className="px-4 py-4">
                          <div className="flex items-start gap-3">
                            <FileText className="h-5 w-5 text-muted-foreground shrink-0 mt-0.5" />
                            <div>
                              <p className="font-medium">{doc.title}</p>
                              <div className="md:hidden text-sm text-muted-foreground mt-1">
                                {doc.category} • {new Date(doc.date).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="px-4 py-4 hidden md:table-cell">
                          <span className="inline-block px-2 py-0.5 bg-secondary rounded text-sm">
                            {doc.category}
                          </span>
                        </td>
                        <td className="px-4 py-4 text-muted-foreground hidden sm:table-cell">
                          {new Date(doc.date).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}
                        </td>
                        <td className="px-4 py-4 text-right">
                          <Button variant="outline" size="sm" className="gap-2">
                            <Download className="h-4 w-4" />
                            <span className="hidden sm:inline">Download</span>
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          ) : (
            <div className="text-center py-16 bg-muted rounded-lg">
              <FileText className="h-12 w-12 text-muted-foreground mx-auto mb-3" />
              <p className="font-medium mb-1">No documents found</p>
              <p className="text-sm text-muted-foreground mb-4">
                Try adjusting your search or filters
              </p>
              <Button variant="outline" onClick={clearFilters}>
                Clear Filters
              </Button>
            </div>
          )}

          {/* Note */}
          <div className="mt-8 p-4 bg-secondary/50 rounded-lg text-sm text-muted-foreground">
            <p>
              <strong>Need a specific document?</strong> If you can't find what you're looking for, 
              please <a href="/contact" className="text-primary hover:underline">contact us</a> and we'll help you locate it.
            </p>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Documents;
