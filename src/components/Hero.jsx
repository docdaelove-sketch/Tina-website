import React from 'react';
import { Calendar, MessageCircle, CheckCircle2, UserCheck, BookOpen, Award } from 'lucide-react';
import { academyContact } from '../data/mockData';

export default function Hero({ t, onOpenTestModal }) {
  return (
    <section className="relative overflow-hidden pt-12 pb-20 bg-linear-to-b from-blue-50/70 via-white to-slate-50 border-b border-slate-200">
      
      {/* Background Glows */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 bg-linear-to-r from-blue-400/10 via-indigo-400/10 to-teal-400/10 blur-3xl -z-10 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Headline */}
        <div className="text-center max-w-5xl mx-auto">
          <h1 className="text-2xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight leading-tight sm:whitespace-nowrap mb-6">
            {t.heroTitle}
          </h1>
          <p className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-2xl mx-auto mb-10 whitespace-pre-line">
            {t.heroSubtitle}
          </p>

          {/* Action CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-14">
            <button
              onClick={onOpenTestModal}
              className="w-full sm:w-auto flex items-center justify-center gap-3 px-8 py-4 rounded-2xl bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white font-bold text-base shadow-lg shadow-blue-500/30 transition-all hover:-translate-y-0.5"
            >
              <Calendar className="w-5 h-5" />
              <span>{t.bookTestBtn}</span>
              <span className="bg-blue-500/90 px-2 py-0.5 rounded-md text-xs font-semibold">RM 60</span>
            </button>

            <a
              href="#tutors"
              className="w-full sm:w-auto flex items-center justify-center gap-2 px-7 py-4 rounded-2xl bg-white hover:bg-slate-50 text-slate-800 font-bold text-base border border-slate-300 shadow-xs transition-all hover:border-slate-400"
            >
              <span>{t.viewScheduleBtn}</span>
            </a>

            <a
              href={`https://wa.me/${academyContact.whatsappNumber}?text=${encodeURIComponent('안녕하세요 Tina 선생님! 1:1 수학 & 영어 과외 상담 희망합니다.')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-4 rounded-2xl bg-emerald-500 hover:bg-emerald-600 text-white font-bold text-base shadow-md shadow-emerald-500/25 transition-all hover:-translate-y-0.5"
            >
              <MessageCircle className="w-5 h-5 fill-white text-emerald-500" />
              <span>{t.whatsappConsult} (017-243-4167)</span>
            </a>
          </div>
        </div>

        {/* 4 Feature Stats Pill Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-5xl mx-auto">
          <div className="bg-white/80 backdrop-blur-xs p-5 rounded-2xl border border-slate-200/90 shadow-xs hover:border-blue-300 transition-all text-center">
            <div className="w-10 h-10 mx-auto rounded-xl bg-blue-100 flex items-center justify-center text-blue-600 mb-3">
              <UserCheck className="w-5 h-5" />
            </div>
            <div className="font-extrabold text-slate-900 text-sm sm:text-base">{t.stats.ratio}</div>
            <div className="text-xs text-slate-500 mt-1">개별 맞춤 진도</div>
          </div>

          <div className="bg-white/80 backdrop-blur-xs p-5 rounded-2xl border border-slate-200/90 shadow-xs hover:border-blue-300 transition-all text-center">
            <div className="w-10 h-10 mx-auto rounded-xl bg-indigo-100 flex items-center justify-center text-indigo-600 mb-3">
              <BookOpen className="w-5 h-5" />
            </div>
            <div className="font-extrabold text-slate-900 text-sm sm:text-base">{t.stats.subjects}</div>
            <div className="text-xs text-slate-500 mt-1">수학 & 영어 올인원</div>
          </div>

          <div className="bg-white/80 backdrop-blur-xs p-5 rounded-2xl border border-slate-200/90 shadow-xs hover:border-blue-300 transition-all text-center">
            <div className="w-10 h-10 mx-auto rounded-xl bg-emerald-100 flex items-center justify-center text-emerald-600 mb-3">
              <Award className="w-5 h-5" />
            </div>
            <div className="font-extrabold text-slate-900 text-sm sm:text-base">{t.stats.success}</div>
            <div className="text-xs text-slate-500 mt-1">체계적 성적 향상</div>
          </div>

          <div className="bg-white/80 backdrop-blur-xs p-5 rounded-2xl border border-slate-200/90 shadow-xs hover:border-blue-300 transition-all text-center">
            <div className="w-10 h-10 mx-auto rounded-xl bg-amber-100 flex items-center justify-center text-amber-600 mb-3">
              <CheckCircle2 className="w-5 h-5" />
            </div>
            <div className="font-extrabold text-slate-900 text-sm sm:text-base">{t.stats.tutors}</div>
            <div className="text-xs text-slate-500 mt-1">SAIC & 홍익대 대학원</div>
          </div>
        </div>

      </div>
    </section>
  );
}
