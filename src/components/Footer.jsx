import React from 'react';
import { GraduationCap, MessageCircle, MapPin, Phone, Mail, Shield } from 'lucide-react';
import { academyContact } from '../data/mockData';

export default function Footer({ t, onOpenTestModal }) {
  return (
    <footer className="bg-slate-900 text-slate-400 text-xs py-14">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 pb-12 border-b border-slate-800">
          
          {/* Col 1: Brand */}
          <div className="space-y-4 md:col-span-1">
            <div className="flex items-center gap-2 text-white">
              <div className="w-9 h-9 rounded-xl bg-blue-600 flex items-center justify-center text-white">
                <GraduationCap className="w-5 h-5" />
              </div>
              <span className="font-black text-lg tracking-tight">
                {t.academyName}
              </span>
            </div>
            <p className="text-slate-400 leading-relaxed">
              말레이시아 수방자야 선웨이 사우스키 1:1 맞춤형 수학 & 영어 프리미엄 과외.
            </p>
            <div className="flex items-center gap-2 text-emerald-400 font-semibold">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>A'marine Condominium, Sunway South Quay</span>
            </div>
          </div>

          {/* Col 2: Tutor Profile & Degrees */}
          <div>
            <h4 className="text-white font-bold text-sm mb-4">선생님 소개 및 학력</h4>
            <ul className="space-y-2">
              <li className="font-bold text-slate-200">• 티나 리 (Tina Lee) 선생님</li>
              <li>• The School of the Art Institute of Chicago (SAIC) 대학교 인테리어 B.A 졸업</li>
              <li>• 홍익대학교 대학원 실내건축학과 졸업</li>
              <li>• 수학 & 영어 올인원 1:1 맞춤 지도</li>
              <li>• IGCSE / Checkpoint / A-Level 대비</li>
            </ul>
          </div>

          {/* Col 3: Systems & Features */}
          <div>
            <h4 className="text-white font-bold text-sm mb-4">학습 & 결제 시스템</h4>
            <ul className="space-y-2">
              <li>• Touch 'n Go eWallet & Card 결제 연동</li>
              <li>• Google Drive 월별 비밀번호 암호화 자료실</li>
              <li>• 구글 스프레드시트 노코드 특강 운영</li>
              <li>• 왓츠앱(017-243-4167) 1:1 상담 & FAQ 봇</li>
              <li>• 3개 국어(한국어, 영어, 中文) 지원</li>
            </ul>
          </div>

          {/* Col 4: Quick Contact */}
          <div>
            <h4 className="text-white font-bold text-sm mb-4">상담 및 위치</h4>
            <div className="space-y-2.5">
              <p className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-slate-500 shrink-0 mt-0.5" />
                <span className="leading-snug">{academyContact.address}</span>
              </p>
              <p className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-emerald-500 shrink-0" />
                <span className="text-white font-bold">{academyContact.phone} (WhatsApp)</span>
              </p>
              <div className="pt-2">
                <button
                  onClick={onOpenTestModal}
                  className="w-full py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs shadow-md"
                >
                  1:1 진단 테스트 예약 (RM 60)
                </button>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Credits */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-slate-500 text-[11px]">
          <div>
            © {new Date().getFullYear()} Tina Academy. All Rights Reserved. Subang Jaya, Selangor, Malaysia.
          </div>
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1">
              <Shield className="w-3.5 h-3.5 text-emerald-500" />
              <span>Touch 'n Go eWallet & DuitNow Ready</span>
            </span>
            <span>•</span>
            <span>Sunway South Quay</span>
          </div>
        </div>

      </div>
    </footer>
  );
}
