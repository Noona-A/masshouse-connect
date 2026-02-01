import { useState } from "react";
import Layout from "@/components/layout/Layout";
import PageHero from "@/components/ui/PageHero";
import { Link } from "react-router-dom";
import { Search, Calendar, ArrowRight, Tag } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const newsItems = [
  {
    id: 1,
    title: "Handover Discussion Meeting Scheduled",
    date: "2026-01-13",
    category: "Meeting",
    excerpt: "A crucial meeting has been scheduled between the freeholder, management agent, RTM directors, and solicitors to discuss the granting of Right to Manage and the timeline for handover.",
    content: "Following the service of our claim notice in September, we have arranged a meeting on January 13th, 2026, to discuss the next steps in our Right to Manage application. The meeting will bring together all key parties including the freeholder, current managing agents, RTM directors, and legal representatives. The primary focus will be to confirm whether the Right to Manage has been granted and to establish a clear timeline for the handover of management responsibilities. This represents a significant milestone in our journey towards resident-led management of Masshouse and The Hive buildings. We will update all residents following the meeting with confirmed details of the handover process and timeline."
  },
  {
    id: 2,
    title: "Right to Manage Claim Notice Served",
    date: "2025-09-18",
    category: "Notice",
    excerpt: "The RTM Company has formally served the claim notice for Right to Manage on all relevant parties, marking a significant step forward in our campaign.",
    content: "On September 18th, 2025, the Masshouse RTM Company formally served the claim notice for Right to Manage on all leaseholders, the freeholder, landlords, and managing agents. This is a major milestone in our campaign to take control of the management of Masshouse and The Hive buildings. The claim notice sets out our legal right under the Commonhold and Leasehold Reform Act 2002 to assume responsibility for the management of the buildings. All parties have now been formally notified and the statutory process is underway. This notice represents the culmination of extensive preparation and consultation with residents, and marks the beginning of the formal Right to Manage acquisition process. We will keep all residents informed as the process progresses and look forward to delivering improved management services for our community."
  },
];

const categories = ["All", "General", "Meeting", "Works", "Notice"];

const News = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  const filteredNews = newsItems.filter(item => {
    const matchesSearch = searchQuery === "" || 
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === "All" || 
      item.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <Layout>
      <PageHero
        title="News & Updates"
        subtitle="Stay informed with the latest news from Masshouse RTM"
        breadcrumbs={[
          { label: "Home", path: "/" },
          { label: "News" },
        ]}
      />

      <section className="section-padding">
        <div className="section-container">
          <div className="lg:grid lg:grid-cols-3 lg:gap-12">
            {/* Main Content */}
            <div className="lg:col-span-2">
              {/* Mobile Search */}
              <div className="lg:hidden mb-6">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    type="text"
                    placeholder="Search news..."
                    className="pl-9"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
              </div>

              {/* Category Filter - Mobile */}
              <div className="lg:hidden flex flex-wrap gap-2 mb-6">
                {categories.map(cat => (
                  <Button
                    key={cat}
                    variant={selectedCategory === cat ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSelectedCategory(cat)}
                  >
                    {cat}
                  </Button>
                ))}
              </div>

              {/* News Grid */}
              <div className="space-y-6">
                {filteredNews.length > 0 ? (
                  filteredNews.map((item) => (
                    <article 
                      key={item.id}
                      className="bg-card rounded-lg border border-border overflow-hidden card-hover"
                    >
                      <div className="h-2 bg-accent" />
                      <div className="p-6">
                        <div className="flex flex-wrap items-center gap-3 text-sm text-muted-foreground mb-3">
                          <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-secondary rounded text-xs font-medium text-secondary-foreground">
                            <Tag className="h-3 w-3" />
                            {item.category}
                          </span>
                          <span className="flex items-center gap-1">
                            <Calendar className="h-3 w-3" />
                            {new Date(item.date).toLocaleDateString('en-GB', { 
                              day: 'numeric', 
                              month: 'long', 
                              year: 'numeric' 
                            })}
                          </span>
                        </div>
                        
                        <h2 className="font-semibold text-xl text-foreground mb-3">
                          {item.title}
                        </h2>
                        
                        <p className="text-muted-foreground mb-4">
                          {item.excerpt}
                        </p>
                        
                        <Link 
                          to={`/news/${item.id}`}
                          className="inline-flex items-center gap-1 text-sm font-medium text-primary hover:text-primary/80"
                        >
                          Read Full Article
                          <ArrowRight className="h-4 w-4" />
                        </Link>
                      </div>
                    </article>
                  ))
                ) : (
                  <div className="text-center py-16 bg-muted rounded-lg">
                    <p className="font-medium mb-1">No articles found</p>
                    <p className="text-sm text-muted-foreground">
                      Try adjusting your search or filter
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* Sidebar */}
            <aside className="hidden lg:block">
              <div className="sticky top-24 space-y-6">
                {/* Search */}
                <div className="bg-card rounded-lg border border-border p-4">
                  <h3 className="font-semibold mb-3">Search</h3>
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      type="text"
                      placeholder="Search news..."
                      className="pl-9"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </div>
                </div>

                {/* Categories */}
                <div className="bg-card rounded-lg border border-border p-4">
                  <h3 className="font-semibold mb-3">Categories</h3>
                  <div className="space-y-1">
                    {categories.map(cat => (
                      <button
                        key={cat}
                        onClick={() => setSelectedCategory(cat)}
                        className={`w-full text-left px-3 py-2 rounded text-sm transition-colors ${
                          selectedCategory === cat 
                            ? "bg-primary text-primary-foreground" 
                            : "hover:bg-muted"
                        }`}
                      >
                        {cat}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Recent Posts */}
                <div className="bg-card rounded-lg border border-border p-4">
                  <h3 className="font-semibold mb-3">Recent Posts</h3>
                  <div className="space-y-3">
                    {newsItems.slice(0, 5).map(item => (
                      <Link 
                        key={item.id}
                        to={`/news/${item.id}`}
                        className="block text-sm hover:text-primary transition-colors"
                      >
                        <p className="font-medium line-clamp-2">{item.title}</p>
                        <p className="text-xs text-muted-foreground mt-0.5">
                          {new Date(item.date).toLocaleDateString('en-GB', { 
                            day: 'numeric', 
                            month: 'short' 
                          })}
                        </p>
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default News;
