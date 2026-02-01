import Layout from "@/components/layout/Layout";
import HeroSection from "@/components/home/HeroSection";
import StatsSection from "@/components/home/StatsSection";
import NewsSection from "@/components/home/NewsSection";
import EventsSection from "@/components/home/EventsSection";
import QuickAccessSection from "@/components/home/QuickAccessSection";
import ContactsSection from "@/components/home/ContactsSection";

const Index = () => {
  return (
    <Layout>
      <HeroSection />
      <StatsSection />
      <NewsSection />
      <EventsSection />
      <QuickAccessSection />
      <ContactsSection />
    </Layout>
  );
};

export default Index;
