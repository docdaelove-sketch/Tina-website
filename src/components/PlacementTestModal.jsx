import React, { useState } from 'react';
import { X, CheckCircle, CreditCard, QrCode, ShieldCheck, ArrowRight, Sparkles, Download, MessageCircle, Calendar } from 'lucide-react';
import { academyContact } from '../data/mockData';

export default function PlacementTestModal({ isOpen, onClose, t, preselectedSlot }) {
  if (!isOpen) return null;

  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    studentName: '',
    grade: 'Year 9',
    school: '',
    parentPhone: '',
    subject: 'both',
    preferredDate: preselectedSlot ? `${preselectedSlot.day} ${preselectedSlot.date} (${preselectedSlot.time})` : '2026-10-24 10:00 AM',
    paymentMethod: 'tng' // 'card' or 'tng'
  });

  const [isProcessing, setIsProcessing] = useState(false);
  const [bookingConfirmed, setBookingConfirmed] = useState(false);
  const [bookingRef, setBookingRef] = useState('');

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleCompletePayment = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setBookingRef(`MY-TEST-${Math.floor(100000 + Math.random() * 900000)}`);
      setBookingConfirmed(true);
    }, 1500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs overflow-y-auto">
      <div className="relative w-full max-w-xl bg-white rounded-3xl shadow-2xl border border-slate-100 overflow-hidden my-8 animate-in fade-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="bg-linear-to-r from-blue-700 to-indigo-800 text-white p-6 relative">
          <button
            onClick={onClose}
            className="absolute top-5 right-5 p-1.5 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
          
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-bold bg-amber-400 text-slate-950 mb-2">
            <Sparkles className="w-3.5 h-3.5" />
            <span>{t.placement.feeBadge}</span>
          </div>
          <h3 className="text-xl sm:text-2xl font-black">
            {t.placement.title}
          </h3>
          <p className="text-xs sm:text-sm text-blue-100 mt-1">
            {t.placement.subtitle}
          </p>
        </div>

        {/* Content Body */}
        <div className="p-6 sm:p-8">
          
          {!bookingConfirmed ? (
            <div>
              {/* Step indicator */}
              <div className="flex items-center justify-between mb-8 pb-4 border-b border-slate-100 text-xs font-bold text-slate-500">
                <span className={step >= 1 ? 'text-blue-600 flex items-center gap-1' : ''}>
                  {t.placement.step1}
                </span>
                <span className="text-slate-300">→</span>
                <span className={step >= 2 ? 'text-blue-600 flex items-center gap-1' : ''}>
                  {t.placement.step2}
                </span>
                <span className="text-slate-300">→</span>
                <span className={step >= 3 ? 'text-blue-600 flex items-center gap-1' : ''}>
                  {t.placement.step3}
                </span>
              </div>

              {/* STEP 1: Student Details */}
              {step === 1 && (
                <div className="space-y-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                      {t.placement.nameLabel} *
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Jason Kim / Sarah Lee"
                      value={formData.studentName}
                      onChange={(e) => handleInputChange('studentName', e.target.value)}
                      className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:outline-hidden focus:ring-2 focus:ring-blue-500 text-sm font-medium"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                        {t.placement.gradeLabel} *
                      </label>
                      <select
                        value={formData.grade}
                        onChange={(e) => handleInputChange('grade', e.target.value)}
                        className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:outline-hidden focus:ring-2 focus:ring-blue-500 text-sm font-medium bg-white"
                      >
                        <option value="Year 5 - 6 (Primary)">Year 5 - 6 (Primary)</option>
                        <option value="Year 7 (KS3)">Year 7 (KS3)</option>
                        <option value="Year 8 (KS3)">Year 8 (KS3)</option>
                        <option value="Year 9 (Checkpoint)">Year 9 (Checkpoint)</option>
                        <option value="Year 10 (IGCSE)">Year 10 (IGCSE)</option>
                        <option value="Year 11 (IGCSE)">Year 11 (IGCSE)</option>
                        <option value="Year 12 (A-Level / IB)">Year 12 (A-Level / IB)</option>
                        <option value="Year 13 (A-Level / IB)">Year 13 (A-Level / IB)</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                        {t.placement.schoolLabel}
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. GIS, MKIS, ISKL, Sunway"
                        value={formData.school}
                        onChange={(e) => handleInputChange('school', e.target.value)}
                        className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:outline-hidden focus:ring-2 focus:ring-blue-500 text-sm font-medium"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                      {t.placement.parentPhone} (WhatsApp) *
                    </label>
                    <div className="flex">
                      <span className="inline-flex items-center px-3 rounded-l-xl border border-r-0 border-slate-300 bg-slate-100 text-slate-600 font-bold text-sm">
                        +60
                      </span>
                      <input
                        type="tel"
                        placeholder="12 345 6789"
                        value={formData.parentPhone}
                        onChange={(e) => handleInputChange('parentPhone', e.target.value)}
                        className="w-full px-4 py-3 rounded-r-xl border border-slate-300 focus:outline-hidden focus:ring-2 focus:ring-blue-500 text-sm font-medium"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                      {t.placement.subjectLabel}
                    </label>
                    <div className="grid grid-cols-3 gap-2">
                      {[
                        { id: 'both', label: t.placement.bothSubjects },
                        { id: 'math', label: t.placement.mathOnly },
                        { id: 'eng', label: t.placement.engOnly }
                      ].map((item) => (
                        <button
                          key={item.id}
                          type="button"
                          onClick={() => handleInputChange('subject', item.id)}
                          className={`p-3 rounded-xl border text-xs font-bold transition-all text-center ${
                            formData.subject === item.id
                              ? 'border-blue-600 bg-blue-50 text-blue-700'
                              : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                          }`}
                        >
                          {item.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  <button
                    onClick={() => {
                      if (!formData.studentName.trim()) {
                        alert('학생 이름을 입력해주세요.');
                        return;
                      }
                      setStep(2);
                    }}
                    className="w-full mt-6 py-3.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm flex items-center justify-center gap-2 shadow-md"
                  >
                    <span>다음 단계 (일시 선택)</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              )}

              {/* STEP 2: Choose Test Slot */}
              {step === 2 && (
                <div className="space-y-4">
                  <div className="p-4 rounded-2xl bg-blue-50 border border-blue-200 text-xs text-blue-900">
                    <p className="font-bold mb-1">📅 진단 테스트 안내 (60분 소요)</p>
                    <p>학생의 현재 개념 이해도와 응용력 측정을 위해 1:1 맞춤 대면 또는 온라인(Zoom) 시험으로 진행됩니다.</p>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                      희망 테스트 일시
                    </label>
                    <div className="space-y-2">
                      {[
                        '토요일 (Oct 24) 10:00 - 11:00 AM',
                        '토요일 (Oct 24) 14:00 - 15:00 PM',
                        '일요일 (Oct 25) 11:00 - 12:00 PM',
                        '주중 조율 희망 (학원과 협의)'
                      ].map((slot, idx) => (
                        <label
                          key={idx}
                          className={`flex items-center justify-between p-3.5 rounded-xl border cursor-pointer transition-all ${
                            formData.preferredDate === slot
                              ? 'border-blue-600 bg-blue-50 text-blue-900 font-bold'
                              : 'border-slate-200 hover:bg-slate-50 text-slate-700'
                          }`}
                        >
                          <div className="flex items-center gap-2.5">
                            <input
                              type="radio"
                              name="testSlot"
                              checked={formData.preferredDate === slot}
                              onChange={() => handleInputChange('preferredDate', slot)}
                              className="text-blue-600 focus:ring-blue-500"
                            />
                            <span className="text-sm">{slot}</span>
                          </div>
                          <span className="text-xs text-emerald-600 font-semibold">예약 가능</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  <div className="flex gap-3 mt-6">
                    <button
                      onClick={() => setStep(1)}
                      className="w-1/3 py-3.5 rounded-xl border border-slate-300 text-slate-700 font-bold text-sm hover:bg-slate-100"
                    >
                      이전
                    </button>
                    <button
                      onClick={() => setStep(3)}
                      className="w-2/3 py-3.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm flex items-center justify-center gap-2 shadow-md"
                    >
                      <span>결제 단계로 이동 (RM 60)</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              )}

              {/* STEP 3: Payment (Touch 'n Go & Card) */}
              {step === 3 && (
                <div className="space-y-5">
                  <div className="flex items-center justify-between p-4 rounded-2xl bg-slate-50 border border-slate-200">
                    <div>
                      <div className="text-xs text-slate-500 font-medium">테스트 항목</div>
                      <div className="text-sm font-bold text-slate-900">
                        {formData.studentName} ({formData.grade}) - 1:1 Diagnostic Test
                      </div>
                      <div className="text-xs text-blue-600 font-medium mt-0.5">
                        {formData.preferredDate}
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-xs text-slate-500 font-medium">결제 금액</div>
                      <div className="text-xl font-extrabold text-blue-700">RM 60</div>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                      {t.placement.paymentMethod}
                    </label>
                    <div className="grid grid-cols-2 gap-3 mb-4">
                      {/* Touch 'n Go Option */}
                      <button
                        type="button"
                        onClick={() => handleInputChange('paymentMethod', 'tng')}
                        className={`p-3.5 rounded-2xl border-2 flex flex-col items-center justify-center gap-1.5 transition-all ${
                          formData.paymentMethod === 'tng'
                            ? 'border-blue-600 bg-blue-50/70 text-blue-900 font-bold shadow-xs'
                            : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                        }`}
                      >
                        <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center text-white font-black text-[10px]">
                          TnG
                        </div>
                        <span className="text-xs font-bold">Touch 'n Go eWallet</span>
                        <span className="text-[10px] text-slate-500">DuitNow QR Instant</span>
                      </button>

                      {/* Card Option */}
                      <button
                        type="button"
                        onClick={() => handleInputChange('paymentMethod', 'card')}
                        className={`p-3.5 rounded-2xl border-2 flex flex-col items-center justify-center gap-1.5 transition-all ${
                          formData.paymentMethod === 'card'
                            ? 'border-blue-600 bg-blue-50/70 text-blue-900 font-bold shadow-xs'
                            : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                        }`}
                      >
                        <CreditCard className="w-7 h-7 text-indigo-600" />
                        <span className="text-xs font-bold">Credit / Debit Card</span>
                        <span className="text-[10px] text-slate-500">Visa / Mastercard</span>
                      </button>
                    </div>
                  </div>

                  {/* Payment Details Container */}
                  {formData.paymentMethod === 'tng' ? (
                    <div className="p-5 rounded-2xl bg-amber-50/60 border border-amber-200/90 text-center">
                      <div className="text-xs font-bold text-amber-900 mb-2">
                        🇲🇾 Touch 'n Go / DuitNow QR Code Scan
                      </div>
                      <div className="inline-block p-3 bg-white rounded-2xl border border-slate-300 shadow-inner my-2">
                        {/* Mock DuitNow QR */}
                        <div className="w-36 h-36 bg-slate-900 rounded-lg flex flex-col items-center justify-center text-white p-2 relative">
                          <QrCode className="w-24 h-24 text-white" />
                          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                            <span className="bg-red-600 text-white text-[9px] font-black px-1.5 py-0.5 rounded shadow-xs">
                              DuitNow
                            </span>
                          </div>
                        </div>
                      </div>
                      <p className="text-xs text-slate-600 max-w-sm mx-auto mt-2">
                        {t.placement.scanTng}
                      </p>
                      <div className="mt-2 text-[11px] text-slate-500 font-mono">
                        Merchant: TINA ACADEMY (DuitNow / Touch 'n Go: 017-243-4167)
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-3 p-4 rounded-2xl bg-slate-50 border border-slate-200">
                      <div>
                        <label className="block text-[11px] font-bold text-slate-600 uppercase mb-1">카드 번호</label>
                        <input
                          type="text"
                          placeholder="4111 •••• •••• 1234"
                          className="w-full px-3 py-2 rounded-lg border border-slate-300 text-sm font-mono"
                          defaultValue="4532 8900 1234 5678"
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-2">
                        <div>
                          <label className="block text-[11px] font-bold text-slate-600 uppercase mb-1">유효기간</label>
                          <input
                            type="text"
                            placeholder="MM / YY"
                            className="w-full px-3 py-2 rounded-lg border border-slate-300 text-sm font-mono"
                            defaultValue="12/28"
                          />
                        </div>
                        <div>
                          <label className="block text-[11px] font-bold text-slate-600 uppercase mb-1">CVC</label>
                          <input
                            type="text"
                            placeholder="CVC"
                            className="w-full px-3 py-2 rounded-lg border border-slate-300 text-sm font-mono"
                            defaultValue="789"
                          />
                        </div>
                      </div>
                      <div className="flex items-center gap-1.5 text-[11px] text-slate-500 pt-1">
                        <ShieldCheck className="w-4 h-4 text-emerald-600" />
                        <span>말레이시아 금융 보안 표준 및 256-bit SSL 암호화 결제</span>
                      </div>
                    </div>
                  )}

                  <div className="flex gap-3 pt-2">
                    <button
                      onClick={() => setStep(2)}
                      className="w-1/3 py-3.5 rounded-xl border border-slate-300 text-slate-700 font-bold text-sm hover:bg-slate-100"
                    >
                      이전
                    </button>
                    <button
                      onClick={handleCompletePayment}
                      disabled={isProcessing}
                      className="w-2/3 py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800 text-white font-bold text-sm flex items-center justify-center gap-2 shadow-lg shadow-emerald-600/20 disabled:opacity-50"
                    >
                      {isProcessing ? (
                        <>
                          <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                          <span>{t.placement.processing}</span>
                        </>
                      ) : (
                        <>
                          <CheckCircle className="w-4 h-4" />
                          <span>{t.placement.payNowBtn}</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            /* Booking & Payment Success Screen */
            <div className="text-center py-6">
              <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="w-8 h-8" />
              </div>

              <h4 className="text-2xl font-black text-slate-900 mb-2">
                {t.placement.successTitle}
              </h4>
              <p className="text-sm text-slate-600 max-w-md mx-auto mb-6">
                {t.placement.successDesc}
              </p>

              {/* Receipt Summary Card */}
              <div className="bg-slate-50 rounded-2xl p-5 border border-slate-200 text-left text-xs space-y-2 mb-6 max-w-md mx-auto">
                <div className="flex justify-between border-b border-slate-200 pb-2">
                  <span className="text-slate-500 font-semibold">{t.placement.receiptNumber}</span>
                  <span className="font-mono font-bold text-blue-700">{bookingRef}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">학생 이름:</span>
                  <span className="font-bold text-slate-800">{formData.studentName} ({formData.grade})</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">신청 일시:</span>
                  <span className="font-bold text-slate-800">{formData.preferredDate}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">결제 수단:</span>
                  <span className="font-bold text-slate-800">
                    {formData.paymentMethod === 'tng' ? "Touch 'n Go eWallet" : "Credit Card"} (RM 60 Paid)
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">안내 연락처:</span>
                  <span className="font-bold text-slate-800">+60 {formData.parentPhone}</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <a
                  href={`https://wa.me/${academyContact.whatsappNumber}?text=${encodeURIComponent(`안녕하세요! 방금 웹사이트에서 입원 테스트를 신청 및 결제(RM 60) 완료했습니다.\n• 예약번호: ${bookingRef}\n• 학생: ${formData.studentName} (${formData.grade})\n• 희망일시: ${formData.preferredDate}`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm shadow-md"
                >
                  <MessageCircle className="w-4 h-4 fill-white" />
                  <span>왓츠앱으로 즉시 확인 메시지 보내기</span>
                </a>

                <button
                  onClick={onClose}
                  className="px-6 py-3 rounded-xl border border-slate-300 text-slate-700 hover:bg-slate-100 font-bold text-sm"
                >
                  닫기
                </button>
              </div>

            </div>
          )}

        </div>

      </div>
    </div>
  );
}
