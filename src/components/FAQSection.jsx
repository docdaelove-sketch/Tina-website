import React from 'react';
import { MapPin, Navigation, Car, DollarSign, HelpCircle, Phone, Clock, ExternalLink } from 'lucide-react';
import { academyContact } from '../data/mockData';

export default function FAQSection({ lang, t }) {
  return (
    <section id="faq" className="py-20 bg-slate-50 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-blue-50 text-blue-700 border border-blue-200 mb-3">
            <HelpCircle className="w-3.5 h-3.5" />
            <span>Location & 1:1 Tuition Guide</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mb-4">
            {t.faq.title}
          </h2>
          <p className="text-base text-slate-600 leading-relaxed">
            {t.faq.subtitle}
          </p>
        </div>

        {/* 2-Column Info Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
          
          {/* Location & Navigation Card */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-2xl bg-blue-100 text-blue-600 flex items-center justify-center shrink-0">
                <MapPin className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-slate-900">
                  {t.faq.locationTitle}
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 mt-1.5 leading-relaxed font-medium">
                  {academyContact.address}
                </p>
                <p className="text-xs text-blue-700 font-semibold mt-1">
                  ※ Sunway International School (SIS), Sunway University, Taylor's Lakeside 인근
                </p>
              </div>
            </div>

            {/* Direct Navigation Links */}
            <div className="flex flex-wrap gap-3 pt-2">
              <a
                href={academyContact.wazeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-5 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs sm:text-sm shadow-md shadow-blue-500/20 transition-all hover:scale-[1.02]"
              >
                <Navigation className="w-4 h-4" />
                <span>{t.faq.openWaze}</span>
              </a>

              <a
                href={academyContact.googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-5 py-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs sm:text-sm transition-colors"
              >
                <ExternalLink className="w-4 h-4" />
                <span>{t.faq.openGoogle}</span>
              </a>
            </div>

            {/* Parking Details Card */}
            <div className="p-4 rounded-2xl bg-amber-50/70 border border-amber-200 text-xs sm:text-sm text-amber-900 space-y-2">
              <div className="flex items-center gap-2 font-bold text-amber-950">
                <Car className="w-4 h-4 text-amber-600" />
                <span>A'marine Condominium 방문객 주차 안내</span>
              </div>
              <p className="leading-relaxed text-amber-800 text-xs">
                {t.faq.parkingInfo}
              </p>
            </div>

            {/* Operating Hours & WhatsApp Phone */}
            <div className="space-y-1.5 text-xs text-slate-500 pt-2 border-t border-slate-100">
              <div className="flex items-center gap-3">
                <Clock className="w-4 h-4 text-slate-400" />
                <span>수업 가능 시간: {academyContact.operatingHours}</span>
              </div>
              <div className="flex items-center gap-3 font-semibold text-slate-700">
                <Phone className="w-4 h-4 text-emerald-600" />
                <span>왓츠앱 직통 문의: {academyContact.phone} (Tina Lee)</span>
              </div>
            </div>
          </div>

          {/* Pricing & 1:1 Private Tuition Card */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-600 flex items-center justify-center shrink-0">
                <DollarSign className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-slate-900">
                  1:1 개인 맞춤 과외 수업료
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 mt-1.5 leading-relaxed">
                  {t.faq.tuitionInfo}
                </p>
              </div>
            </div>

            {/* Fee Breakdown Table */}
            <div className="border border-slate-200 rounded-2xl overflow-hidden text-xs">
              <div className="bg-slate-50 px-4 py-2.5 font-bold text-slate-700 border-b border-slate-200 flex justify-between">
                <span>학년 / 과정</span>
                <span>1회(90분) 1:1 수업료</span>
              </div>
              <div className="divide-y divide-slate-100">
                <div className="px-4 py-3 flex justify-between text-slate-700">
                  <span>Year 7 - 9 (Checkpoint / Lower Secondary)</span>
                  <span className="font-bold text-blue-700">RM 250</span>
                </div>
                <div className="px-4 py-3 flex justify-between text-slate-700">
                  <span>Year 10 - 11 (IGCSE Math / English)</span>
                  <span className="font-bold text-blue-700">RM 250</span>
                </div>
                <div className="px-4 py-3 flex justify-between text-slate-700">
                  <span>Year 12 - 13 (A-Level / IBDP)</span>
                  <span className="font-bold text-blue-700">RM 250</span>
                </div>
                <div className="px-4 py-3 flex justify-between text-slate-700 bg-amber-50/50">
                  <span className="font-semibold text-amber-900">신규 1:1 실력 진단 테스트 (60분)</span>
                  <span className="font-bold text-amber-800">RM 60</span>
                </div>
              </div>
            </div>

            {/* 1:1 Private Tuition Promise */}
            <div className="text-xs text-slate-500 bg-slate-50 p-3.5 rounded-xl border border-slate-100 space-y-1">
              <div className="font-bold text-slate-800">✨ 1:1 과외만의 차별화된 혜택:</div>
              <p>
                모든 수업은 다른 학생 없이 Tina 선생님과 학생의 1:1로만 집중 진행됩니다. 현재 학교 진도와 약점을 정확히 파악하여 수학과 영어의 개념 완성 및 시험 점수 극대화를 이끌어냅니다.
              </p>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
