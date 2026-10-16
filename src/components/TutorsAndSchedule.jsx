import React, { useState } from 'react';
import { Calendar, Clock, CheckCircle2, XCircle, ArrowRight, Star, GraduationCap, Sparkles, Award, BookOpen } from 'lucide-react';
import { tutorsData, academyContact } from '../data/mockData';

export default function TutorsAndSchedule({ lang, t, onSelectSlotBooking }) {
  const [selectedDayIndex, setSelectedDayIndex] = useState(0);

  const tina = tutorsData[0];
  const activeDaySchedule = tina.schedule[selectedDayIndex] || tina.schedule[0];

  return (
    <section id="tutors" className="py-20 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold bg-blue-50 text-blue-700 border border-blue-200 mb-3">
            <GraduationCap className="w-4 h-4" />
            <span>Dedicated 1:1 Master Tutor</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mb-4">
            {t.tutorsSection.title}
          </h2>
          <p className="text-base text-slate-600 leading-relaxed">
            {t.tutorsSection.subtitle}
          </p>
        </div>

        {/* Tina Lee Detailed Profile Card */}
        <div className="bg-linear-to-b from-blue-50/60 via-white to-slate-50 border-2 border-blue-200/90 rounded-3xl p-6 sm:p-10 shadow-lg shadow-blue-500/5 mb-14">
          <div className="flex flex-col lg:flex-row items-center lg:items-start gap-8">
            
            {/* Tutor Real Image from upload */}
            <div className="relative shrink-0 text-center">
              <div className="relative inline-block">
                <img
                  src={tina.avatar}
                  alt={tina.name[lang] || tina.name.en}
                  className="w-40 h-52 sm:w-48 sm:h-60 rounded-3xl object-cover object-top border-4 border-white shadow-xl"
                />
                <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 bg-blue-600 text-white text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1 shadow-md whitespace-nowrap">
                  <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                  <span>수학 & 영어 1:1 직강</span>
                </div>
              </div>
            </div>

            {/* Tutor Credentials and Academic Background */}
            <div className="flex-1 space-y-4 text-center lg:text-left">
              <div>
                <span className="inline-block px-3 py-1 rounded-lg text-xs font-black bg-blue-100 text-blue-800 mb-2">
                  {tina.subject[lang] || tina.subject.en}
                </span>
                <h3 className="text-2xl sm:text-3xl font-black text-slate-900">
                  {tina.name[lang] || tina.name.en}
                </h3>
              </div>

              {/* Verified Degrees Box */}
              <div className="p-4 rounded-2xl bg-white border border-slate-200/90 shadow-2xs space-y-2">
                <div className="text-xs font-bold text-slate-500 uppercase tracking-wider flex items-center gap-1.5 justify-center lg:justify-start">
                  <Award className="w-4 h-4 text-blue-600" />
                  <span>학력 및 전문 약력 (Verified Credentials)</span>
                </div>
                <div className="space-y-1 text-sm font-bold text-slate-800">
                  <p className="flex items-center gap-2 justify-center lg:justify-start">
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-600 shrink-0" />
                    <span>The School of the Art Institute of Chicago (SAIC) 대학교 인테리어 B.A 졸업</span>
                  </p>
                  <p className="flex items-center gap-2 justify-center lg:justify-start">
                    <span className="w-1.5 h-1.5 rounded-full bg-indigo-600 shrink-0" />
                    <span>홍익대학교 대학원 실내건축학과 졸업</span>
                  </p>
                </div>
              </div>

              {/* Specialties Grid */}
              <div className="space-y-2">
                <div className="text-xs font-bold text-slate-500 uppercase tracking-wider flex items-center gap-1.5 justify-center lg:justify-start">
                  <BookOpen className="w-4 h-4 text-blue-600" />
                  <span>1:1 맞춤 지도 전문 분야</span>
                </div>
                <div className="flex flex-wrap gap-2 justify-center lg:justify-start">
                  {tina.specialties.map((spec, i) => (
                    <span
                      key={i}
                      className="text-xs font-medium px-3 py-1.5 rounded-xl bg-slate-100/80 text-slate-700 border border-slate-200/70"
                    >
                      {spec}
                    </span>
                  ))}
                </div>
              </div>

            </div>

          </div>
        </div>

        {/* Live Interactive 1:1 Schedule Board */}
        <div className="bg-slate-50 border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-sm">
          
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 pb-6 border-b border-slate-200">
            <div>
              <div className="flex items-center gap-2">
                <Calendar className="w-5 h-5 text-blue-600" />
                <h3 className="text-xl font-bold text-slate-900">
                  {tina.name[lang] || tina.name.en} - {t.tutorsSection.tutorScheduleTitle}
                </h3>
              </div>
              <p className="text-xs sm:text-sm text-slate-500 mt-1">
                초록색으로 표시된 시간대를 클릭하시면 1:1 맞춤 수업 또는 진단 테스트를 즉시 예약하실 수 있습니다.
              </p>
            </div>

            {/* Status Legend */}
            <div className="flex items-center gap-4 text-xs font-semibold">
              <span className="flex items-center gap-1.5 text-emerald-700">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
                {t.tutorsSection.available} (1:1 가능)
              </span>
              <span className="flex items-center gap-1.5 text-slate-400">
                <span className="w-2.5 h-2.5 rounded-full bg-slate-300" />
                {t.tutorsSection.booked} (마감)
              </span>
            </div>
          </div>

          {/* Day of Week Selector */}
          <div className="grid grid-cols-7 gap-2 mb-6">
            {tina.schedule.map((item, idx) => {
              const isSelectedDay = idx === selectedDayIndex;
              const hasAvailable = item.slots.some(s => s.available);
              return (
                <button
                  key={idx}
                  onClick={() => setSelectedDayIndex(idx)}
                  className={`p-3 rounded-2xl text-center transition-all ${
                    isSelectedDay
                      ? 'bg-blue-600 text-white shadow-md font-bold scale-[1.02]'
                      : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200 font-medium'
                  }`}
                >
                  <div className="text-xs uppercase tracking-wider">{item.day}</div>
                  <div className="text-sm sm:text-base font-extrabold mt-0.5">{item.date}</div>
                  <div className="mt-1 flex justify-center">
                    <span className={`w-1.5 h-1.5 rounded-full ${hasAvailable ? (isSelectedDay ? 'bg-amber-300' : 'bg-emerald-500') : 'bg-slate-300'}`} />
                  </div>
                </button>
              );
            })}
          </div>

          {/* Time Slots for Selected Day */}
          <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-2xs">
            <h4 className="text-sm font-bold text-slate-700 mb-4 flex items-center gap-2">
              <Clock className="w-4 h-4 text-blue-600" />
              <span>{activeDaySchedule.day} ({activeDaySchedule.date}) {t.tutorsSection.availableSlots}</span>
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
              {activeDaySchedule.slots.map((slot, sIdx) => {
                if (slot.available) {
                  return (
                    <button
                      key={sIdx}
                      onClick={() => onSelectSlotBooking({
                        tutor: tina.name[lang] || tina.name.en,
                        subject: tina.subject[lang] || tina.subject.en,
                        day: activeDaySchedule.day,
                        date: activeDaySchedule.date,
                        time: slot.time
                      })}
                      className="group flex items-center justify-between p-4 rounded-xl border-2 border-emerald-500/30 bg-emerald-50/50 hover:bg-emerald-500 hover:text-white transition-all text-left shadow-2xs"
                    >
                      <div>
                        <div className="text-sm font-bold text-slate-900 group-hover:text-white flex items-center gap-1.5">
                          <CheckCircle2 className="w-4 h-4 text-emerald-600 group-hover:text-white" />
                          <span>{slot.time}</span>
                        </div>
                        <div className="text-xs text-emerald-700 group-hover:text-emerald-100 font-semibold mt-0.5">
                          {t.tutorsSection.selectSlot} (1:1 Private)
                        </div>
                      </div>
                      <ArrowRight className="w-4 h-4 text-emerald-600 group-hover:text-white transition-transform group-hover:translate-x-1" />
                    </button>
                  );
                } else {
                  return (
                    <div
                      key={sIdx}
                      className="flex items-center justify-between p-4 rounded-xl border border-slate-200 bg-slate-100/60 opacity-60 cursor-not-allowed text-left"
                    >
                      <div>
                        <div className="text-sm font-semibold text-slate-500 flex items-center gap-1.5 line-through">
                          <XCircle className="w-4 h-4 text-slate-400" />
                          <span>{slot.time}</span>
                        </div>
                        <div className="text-xs text-slate-400 font-medium mt-0.5">
                          {t.tutorsSection.booked} (1:1 수업 마감)
                        </div>
                      </div>
                      <span className="text-[11px] font-bold px-2 py-0.5 rounded bg-slate-200 text-slate-600">
                        BOOKED
                      </span>
                    </div>
                  );
                }
              })}
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
