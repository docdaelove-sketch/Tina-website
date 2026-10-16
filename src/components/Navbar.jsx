import React from 'react';
import { Globe, MessageCircle, Calendar, GraduationCap } from 'lucide-react';
import { academyContact } from '../data/mockData';

export default function Navbar({ lang, setLang, t, onOpenTestModal }) {
  const languages = [
    { code: 'ko', label: '한국어', flag: '🇰🇷' },
    { code: 'en', label: 'English', flag: '🇬🇧' },
    { code: 'zh', label: '中文', flag: '🇲🇾' },
  ];

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Logo & Academy Name */}
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-xl bg-linear-to-tr from-blue-700 via-indigo-600 to-amber-500 flex items-center justify-center text-white shadow-md shadow-blue-500/20">
              <GraduationCap className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-xl tracking-tight text-slate-900">
                  {t.academyName}
                </span>
                <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-semibold bg-amber-100 text-amber-800 border border-amber-200">
                  🇲🇾 Sunway South Quay
                </span>
              </div>
              <p className="text-xs text-slate-500 font-medium hidden sm:block">
                {t.tagline}
              </p>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-7 text-sm font-semibold text-slate-600">
            <a href="#tutors" className="hover:text-blue-600 transition-colors">
              {t.nav.tutors}
            </a>
            <a href="#workshops" className="hover:text-blue-600 transition-colors">
              {t.nav.workshops}
            </a>
            <a href="#materials" className="hover:text-blue-600 transition-colors">
              {t.nav.materials}
            </a>
            <a href="#faq" className="hover:text-blue-600 transition-colors">
              {t.nav.faq}
            </a>
          </nav>

          {/* Language Selector & CTA buttons */}
          <div className="flex items-center gap-3">
            
            {/* Language Selector Dropdown */}
            <div className="relative inline-flex items-center bg-slate-100 p-1 rounded-lg border border-slate-200">
              {languages.map((l) => (
                <button
                  key={l.code}
                  onClick={() => setLang(l.code)}
                  className={`flex items-center gap-1 px-2.5 py-1 rounded-md text-xs font-bold transition-all ${
                    lang === l.code
                      ? 'bg-white text-blue-700 shadow-xs'
                      : 'text-slate-500 hover:text-slate-900'
                  }`}
                  title={l.label}
                >
                  <span>{l.flag}</span>
                  <span className="hidden sm:inline">{l.code.toUpperCase()}</span>
                </button>
              ))}
            </div>

            {/* Test Booking CTA */}
            <button
              onClick={onOpenTestModal}
              className="hidden lg:flex items-center gap-2 bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white text-xs sm:text-sm font-bold px-4 py-2.5 rounded-xl shadow-md shadow-blue-500/25 transition-all hover:scale-[1.02]"
            >
              <Calendar className="w-4 h-4" />
              <span>{t.nav.placement}</span>
              <span className="bg-blue-500/80 px-1.5 py-0.5 rounded text-[11px] font-semibold">RM 60</span>
            </button>

            {/* WhatsApp Link with 017-243-4167 */}
            <a
              href={`https://wa.me/${academyContact.whatsappNumber}?text=${encodeURIComponent('안녕하세요 Tina 선생님! 1:1 수학 & 영어 과외 상담 문의드립니다.')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2.5 rounded-xl bg-emerald-50 text-emerald-600 hover:bg-emerald-100 border border-emerald-200 transition-colors"
              title="WhatsApp Direct Inquiry (017-243-4167)"
            >
              <MessageCircle className="w-5 h-5 fill-emerald-500 text-emerald-500" />
            </a>

          </div>
        </div>
      </div>
    </header>
  );
}
