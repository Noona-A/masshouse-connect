import { Link } from "react-router-dom";
import { ArrowRight, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";

const newsItems = [
  {
    id: 1,
    title: "Handover Discussion Meeting Scheduled",
    date: "January 2026",
    excerpt: "A crucial meeting has been scheduled between the freeholder, management agent, RTM directors, and solicitors to discuss the granting of Right to Manage and the timeline for handover.",
    category: "Meeting",
  },
  {
    id: 2,
    title: "Right to Manage Claim Notice Served",
    date: "September 2025",
    excerpt: "The RTM Company has formally served the claim notice for Right to Manage on all relevant parties, marking a significant step forward in our campaign.",
    category: "Notice",
  },
];

const NewsSection = () => {
  return (
    <section className="section-padding">
      <div className="section-container">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-10">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-foreground">What's New</h2>
            <p className="mt-2 text-muted-foreground">Latest news and updates</p>
          </div>
          <Link to="/news">
            <Button variant="outline" className="group">
              View All News
              <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
        </div>
        
        <div className="grid md:grid-cols-3 gap-6">
          {newsItems.map((item, index) => (
            <article 
              key={item.id}
              className="bg-card rounded-lg border border-border overflow-hidden card-hover animate-fade-in"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="h-2 bg-accent" />
              <div className="p-6">
                <div className="flex items-center gap-2 text-sm text-muted-foreground mb-3">
                  <span className="px-2 py-0.5 bg-secondary rounded text-xs font-medium text-secondary-foreground">
                    {item.category}
                  </span>
                  <span className="flex items-center gap-1">
                    <Calendar className="h-3 w-3" />
                    {item.date}
                  </span>
                </div>
                <h3 className="font-semibold text-lg text-foreground mb-2 line-clamp-2">
                  {item.title}
                </h3>
                <p className="text-muted-foreground text-sm line-clamp-2 mb-4">
                  {item.excerpt}
                </p>
                <Link 
                  to="/news"
                  className="text-sm font-medium text-primary hover:text-primary/80 inline-flex items-center gap-1"
                >
                  Read More
                  <ArrowRight className="h-3 w-3" />
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default NewsSection;
