import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ScrollToTop from "./components/ScrollToTop";
import Index from "./pages/Index";
import About from "./pages/About";
import Buildings from "./pages/Buildings";
import Leaseholders from "./pages/Leaseholders";
import Tenants from "./pages/Tenants";
import Contact from "./pages/Contact";
import FAQ from "./pages/FAQ";
import ReportIssue from "./pages/ReportIssue";
import Documents from "./pages/Documents";
import News from "./pages/News";
import Improvements from "./pages/Improvements";
import NotFound from "./pages/NotFound";
import BookParking from "./pages/BookParking";
import CheckIssueStatus from "./pages/CheckIssueStatus";
import MeterReadings from "./pages/MeterReadings";
import AdminLogin from "./pages/AdminLogin";
import AdminDashboard from "./pages/AdminDashboard";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      {/* BASE_URL is "/" locally and "/<repo-name>/" on GitHub Pages */}
      <BrowserRouter basename={import.meta.env.BASE_URL}>
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/about" element={<About />} />
          <Route path="/buildings" element={<Buildings />} />
          <Route path="/leaseholders" element={<Leaseholders />} />
          <Route path="/tenants" element={<Tenants />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/faq" element={<FAQ />} />
          <Route path="/report-issue" element={<ReportIssue />} />
          <Route path="/book-parking" element={<BookParking />} />
          <Route path="/check-issue-status" element={<CheckIssueStatus />} />
          <Route path="/meter-readings" element={<MeterReadings />} />
          <Route path="/documents" element={<Documents />} />
          <Route path="/news" element={<News />} />
          <Route path="/improvements" element={<Improvements />} />
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
