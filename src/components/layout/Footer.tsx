import { Link } from "react-router-dom";
import { Phone, Mail, MapPin, ExternalLink } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-primary text-primary-foreground">
      {/* Emergency Bar */}
      <div className="bg-destructive py-3">
        <div className="section-container flex flex-col sm:flex-row items-center justify-center gap-2 text-center">
          <Phone className="h-5 w-5" />
          <span className="font-semibold">24/7 Emergency Hotline:</span>
          <a href="tel:+441onal" className="font-bold text-lg hover:underline">
            0121 XXX XXXX
          </a>
        </div>
      </div>

      <div className="section-container section-padding">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* About */}
          <div>
            <h3 className="text-lg font-bold mb-4">MASSHOUSE RTM</h3>
            <p className="text-primary-foreground/80 text-sm leading-relaxed mb-4">
              Resident-led property management for 336 apartments at Masshouse Plaza, Birmingham.
            </p>
            <div className="flex items-start gap-2 text-sm text-primary-foreground/80">
              <MapPin className="h-4 w-4 mt-0.5 shrink-0" />
              <span>Masshouse Plaza, Birmingham, B5 5JR</span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/about" className="text-primary-foreground/80 hover:text-primary-foreground transition-colors">
                  About RTM
                </Link>
              </li>
              <li>
                <Link to="/leaseholders" className="text-primary-foreground/80 hover:text-primary-foreground transition-colors">
                  Service Charges
                </Link>
              </li>
              <li>
                <Link to="/report-issue" className="text-primary-foreground/80 hover:text-primary-foreground transition-colors">
                  Report an Issue
                </Link>
              </li>
              <li>
                <Link to="/documents" className="text-primary-foreground/80 hover:text-primary-foreground transition-colors">
                  Documents
                </Link>
              </li>
              <li>
                <Link to="/faq" className="text-primary-foreground/80 hover:text-primary-foreground transition-colors">
                  FAQs
                </Link>
              </li>
            </ul>
          </div>

          {/* Management Contact */}
          <div>
            <h4 className="font-semibold mb-4">Day-to-Day Management</h4>
            <p className="text-sm font-medium mb-2">Moonstone Block Management</p>
            <ul className="space-y-2 text-sm text-primary-foreground/80">
              <li className="flex items-center gap-2">
                <Phone className="h-4 w-4" />
                <a href="tel:+441217988444" className="hover:text-primary-foreground">0121 798 8444</a>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="h-4 w-4" />
                <a href="mailto:info@moonstonebm.co.uk" className="hover:text-primary-foreground">
                  info@moonstonebm.co.uk
                </a>
              </li>
            </ul>
            <p className="text-xs text-primary-foreground/60 mt-2">Mon-Fri, 9am-5pm</p>
          </div>

          {/* Useful Links */}
          <div>
            <h4 className="font-semibold mb-4">Useful Links</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a 
                  href="https://www.birmingham.gov.uk" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-primary-foreground/80 hover:text-primary-foreground transition-colors flex items-center gap-1"
                >
                  Birmingham City Council
                  <ExternalLink className="h-3 w-3" />
                </a>
              </li>
              <li>
                <a 
                  href="https://www.gov.uk/leasehold-property" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-primary-foreground/80 hover:text-primary-foreground transition-colors flex items-center gap-1"
                >
                  Leasehold Information
                  <ExternalLink className="h-3 w-3" />
                </a>
              </li>
              <li>
                <Link to="/news" className="text-primary-foreground/80 hover:text-primary-foreground transition-colors">
                  News & Updates
                </Link>
              </li>
              <li>
                <Link to="/improvements" className="text-primary-foreground/80 hover:text-primary-foreground transition-colors">
                  Planned Works
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-primary-foreground/20 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-primary-foreground/60">
          <p>© 2025 Masshouse RTM Company Limited. All rights reserved.</p>
          <div className="flex gap-6">
            <Link to="/privacy" className="hover:text-primary-foreground">Privacy Policy</Link>
            <Link to="/accessibility" className="hover:text-primary-foreground">Accessibility</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
