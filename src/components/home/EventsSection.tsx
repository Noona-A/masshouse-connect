import { Calendar, Clock, MapPin, Trash2, Users, HardHat } from "lucide-react";

const events = [
  {
    icon: Users,
    title: "Next Board Meeting",
    date: "February 2, 2026",
    time: "3:00 PM",
    location: "Online via Zoom",
  },
  {
    icon: Trash2,
    title: "Bin Collection",
    date: "Every Monday & Thursday",
    time: "Before 7:00 AM",
    location: "Designated areas",
  },
  {
    icon: HardHat,
    title: "Lift Repairs",
    date: "Coming Soon",
    time: "TBC",
    location: "Both buildings",
  },
  {
    icon: HardHat,
    title: "Gate Repairs",
    date: "Coming Soon",
    time: "TBC",
    location: "2 gates affected",
  },
];

const EventsSection = () => {
  return (
    <section className="section-padding bg-secondary/30">
      <div className="section-container">
        <div className="text-center mb-10">
          <h2 className="text-2xl md:text-3xl font-bold text-foreground">Upcoming Events</h2>
          <p className="mt-2 text-muted-foreground">Important dates to remember</p>
        </div>
        
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {events.map((event, index) => (
            <div 
              key={event.title}
              className="bg-card rounded-lg p-5 border border-border card-hover animate-fade-in"
              style={{ animationDelay: `${index * 75}ms` }}
            >
              <div className="flex items-start gap-3">
                <div className="shrink-0 w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                  <event.icon className="h-5 w-5 text-primary" />
                </div>
                <div className="min-w-0">
                  <h3 className="font-semibold text-foreground text-sm">{event.title}</h3>
                  <div className="mt-2 space-y-1 text-xs text-muted-foreground">
                    <div className="flex items-center gap-1.5">
                      <Calendar className="h-3 w-3 shrink-0" />
                      <span>{event.date}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Clock className="h-3 w-3 shrink-0" />
                      <span>{event.time}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <MapPin className="h-3 w-3 shrink-0" />
                      <span>{event.location}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default EventsSection;
