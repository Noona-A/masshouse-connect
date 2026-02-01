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
    title: "Welcome to the New Masshouse RTM Website",
    date: "2025-01-15",
    category: "General",
    excerpt: "We're excited to launch our new website, providing residents with easy access to important information, documents, and services. The site has been designed with you in mind.",
    content: "Full article content would go here..."
  },
  {
    id: 2,
    title: "Board Meeting Summary - January 2025",
    date: "2025-01-20",
    category: "Meeting",
    excerpt: "Key decisions from our latest board meeting including security improvements, budget approval for 2025, and updates on ongoing works.",
    content: "Full article content would go here..."
  },
  {
    id: 3,
    title: "Planned Security Enhancement Coming March 2025",
    date: "2025-01-18",
    category: "Works",
    excerpt: "We're working on improving security coverage across both buildings with additional CCTV cameras and improved access control systems.",
    content: "Full article content would go here..."
  },
  {
    id: 4,
    title: "Reminder: Service Charge Due February 1st",
    date: "2025-01-10",
    category: "Notice",
    excerpt: "This is a reminder that service charges for the upcoming period are due on February 1st. Please ensure payment is made on time.",
    content: "Full article content would go here..."
  },
  {
    id: 5,
    title: "Annual General Meeting - Date Announced",
    date: "2025-01-05",
    category: "Meeting",
    excerpt: "The AGM has been scheduled for April 2025. All RTM members are encouraged to attend. Formal notice will follow.",
    content: "Full article content would go here..."
  },
  {
    id: 6,
    title: "Car Park Lighting Upgrade Complete",
    date: "2024-12-20",
    category: "Works",
    excerpt: "The underground car park lighting has been upgraded to energy-efficient LED lighting, improving visibility and reducing energy costs.",
    content: "Full article content would go here..."
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
