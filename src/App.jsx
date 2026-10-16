import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import TutorsAndSchedule from './components/TutorsAndSchedule';
import SpecialWorkshops from './components/SpecialWorkshops';
import DriveMaterials from './components/DriveMaterials';
import FAQSection from './components/FAQSection';
import Footer from './components/Footer';
import PlacementTestModal from './components/PlacementTestModal';
import WhatsAppChatbot from './components/WhatsAppChatbot';
import { translations } from './data/translations';

export default function App() {
  const [lang, setLang] = useState('ko');
  const [isTestModalOpen, setIsTestModalOpen] = useState(false);
  const [preselectedSlot, setPreselectedSlot] = useState(null);

  const t = translations[lang] || translations.ko;

  const handleOpenTestModal = () => {
    setPreselectedSlot(null);
    setIsTestModalOpen(true);
  };

  const handleSelectSlotBooking = (slotData) => {
    setPreselectedSlot(slotData);
    setIsTestModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans antialiased selection:bg-blue-600 selection:text-white">
      {/* Top Navbar */}
      <Navbar
        lang={lang}
        setLang={setLang}
        t={t}
        onOpenTestModal={handleOpenTestModal}
      />

      {/* Main Content */}
      <main>
        {/* Hero Section */}
        <Hero
          t={t}
          onOpenTestModal={handleOpenTestModal}
        />

        {/* 2 Tutors & Interactive Live Schedule */}
        <TutorsAndSchedule
          lang={lang}
          t={t}
          onSelectSlotBooking={handleSelectSlotBooking}
        />

        {/* Special Workshops (Google Sheets No-Code) */}
        <SpecialWorkshops
          lang={lang}
          t={t}
        />

        {/* Google Drive Student Materials (Monthly Password) */}
        <DriveMaterials
          lang={lang}
          t={t}
        />

        {/* Location & Instant FAQ Section */}
        <FAQSection
          lang={lang}
          t={t}
        />
      </main>

      {/* Footer */}
      <Footer
        t={t}
        onOpenTestModal={handleOpenTestModal}
      />

      {/* Placement Test Booking & Payment (Card / Touch 'n Go) Modal */}
      <PlacementTestModal
        isOpen={isTestModalOpen}
        onClose={() => setIsTestModalOpen(false)}
        t={t}
        preselectedSlot={preselectedSlot}
      />

      {/* Floating WhatsApp and Interactive FAQ Chatbot */}
      <WhatsAppChatbot
        lang={lang}
        t={t}
      />
    </div>
  );
}
