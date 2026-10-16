import React, { useState, useEffect } from 'react';
import { Calendar, Users, Clock, Settings, RefreshCw, ExternalLink, CheckCircle, Flame, Plus, Sparkles, Copy, Check, FileSpreadsheet, HelpCircle, AlertCircle } from 'lucide-react';
import { initialWorkshops, academyContact } from '../data/mockData';

// User's verified Google Sheets CSV URL
const DEFAULT_SHEET_URL = "https://docs.google.com/spreadsheets/d/e/2PACX-1vQcraV5W4NYR_69f8mLtg52n30akvHYQEMf-dvp--QTMw6yxthTCeqjY07dEbv7WcA5slFR-MdNf8d9/pub?output=csv";

// Simple CSV parser supporting standard commas and quoted strings
function parseCSV(text) {
  const lines = text.trim().split(/\r?\n/).filter(line => line.trim().length > 0);
  if (lines.length < 2) return [];

  const headers = lines[0].split(',').map(h => h.trim().replace(/^["']|["']$/g, ''));
  
  const results = [];
  for (let i = 1; i < lines.length; i++) {
    // Regex to split by comma unless inside quotes
    const values = lines[i].split(/,(?=(?:(?:[^"]*"){2})*[^"]*$)/).map(v => v.trim().replace(/^["']|["']$/g, ''));
    
    const row = {};
    headers.forEach((header, idx) => {
      row[header] = values[idx] !== undefined ? values[idx] : '';
    });

    if (row.Title || row.title) {
      results.push(row);
    }
  }

  return results;
}

export default function SpecialWorkshops({ lang, t }) {
  const [sheetUrl, setSheetUrl] = useState(() => {
    return localStorage.getItem('tina_workshop_sheet_url') || DEFAULT_SHEET_URL;
  });
  
  const [workshops, setWorkshops] = useState(initialWorkshops);
  const [isConfigOpen, setIsConfigOpen] = useState(false);
  const [isSyncing, setIsSyncing] = useState(false);
  const [syncStatus, setSyncStatus] = useState('');
  const [lastSyncedTime, setLastSyncedTime] = useState('');
  const [isCopied, setIsCopied] = useState(false);
  const [fetchError, setFetchError] = useState('');

  // Function to fetch real CSV from Google Sheets and parse
  const fetchAndApplySheetData = async (targetUrl = sheetUrl) => {
    if (!targetUrl || !targetUrl.trim()) {
      setFetchError('구글 시트 URL을 입력해주세요.');
      return;
    }

    setIsSyncing(true);
    setFetchError('');
    setSyncStatus('구글 시트에서 최신 특강 목록을 가져오는 중...');

    try {
      // Direct fetch from Google published CSV
      const res = await fetch(targetUrl.trim(), { cache: 'no-store' });
      if (!res.ok) {
        throw new Error(`HTTP 에러 발생 (${res.status})`);
      }

      const csvText = await res.text();
      const rawRows = parseCSV(csvText);

      if (!rawRows || rawRows.length === 0) {
        throw new Error('시트에서 데이터를 찾을 수 없습니다. 1행 헤더와 2행 데이터 입력을 확인해주세요.');
      }

      // Convert parsed CSV rows into workshop card format
      const formatted = rawRows.map((row, idx) => {
        const titleVal = row.Title || row.title || '특강';
        const tutorVal = row.Tutor || row.tutor || 'Tina Lee';
        const subjectVal = row.Subject || row.subject || 'English';
        const gradeVal = row.Grade || row.grade || 'Year 1-2';
        const datesVal = row.Dates || row.dates || '일정 협의';
        const timeVal = row.Time || row.time || '시간 협의';
        const feeVal = row.Fee || row.fee || 'RM 250';
        const seatsTotalVal = parseInt(row.SeatsTotal || row.seatsTotal, 10) || 2;
        const seatsLeftVal = parseInt(row.SeatsLeft || row.seatsLeft, 10) || 0;
        const statusVal = (row.Status || row.status || 'open').toLowerCase().trim();

        return {
          id: `sheet-${idx}-${Date.now()}`,
          title: {
            ko: titleVal,
            en: titleVal,
            zh: titleVal
          },
          tutor: tutorVal,
          subject: subjectVal,
          grade: gradeVal,
          dates: datesVal,
          time: timeVal,
          fee: feeVal,
          seatsTotal: seatsTotalVal,
          seatsLeft: seatsLeftVal,
          status: statusVal,
          tags: [subjectVal, gradeVal, tutorVal].filter(Boolean)
        };
      });

      setWorkshops(formatted);
      localStorage.setItem('tina_workshop_sheet_url', targetUrl.trim());
      
      const now = new Date();
      const timeStr = now.toLocaleTimeString();
      setLastSyncedTime(timeStr);
      setSyncStatus(`✅ 구글 스프레드시트의 특강 ${formatted.length}개가 실시간 반영되었습니다! (${timeStr})`);
    } catch (err) {
      console.error('Failed to load Google Sheet:', err);
      setFetchError(`연동 실패: ${err.message}. 링크가 '웹에 게시(.csv)' 형식인지 확인해주세요.`);
      setSyncStatus('');
    } finally {
      setIsSyncing(false);
    }
  };

  // Automatically fetch on initial load
  useEffect(() => {
    fetchAndApplySheetData(sheetUrl);
  }, []);

  const handleCopyHeader = () => {
    navigator.clipboard.writeText("Title,Tutor,Subject,Grade,Dates,Time,Fee,SeatsTotal,SeatsLeft,Status");
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  return (
    <section id="workshops" className="py-20 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header with Sheet Config Button */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-amber-50 text-amber-800 border border-amber-200 mb-3">
              <Flame className="w-3.5 h-3.5 text-amber-600" />
              <span>Google Sheets 실시간 연동 특강</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              {t.workshops.title}
            </h2>
            <p className="text-base text-slate-600 mt-2">
              {t.workshops.subtitle}
            </p>
          </div>

          <div className="flex items-center gap-2">
            {/* Quick Live Refresh Button */}
            <button
              onClick={() => fetchAndApplySheetData(sheetUrl)}
              disabled={isSyncing}
              className="inline-flex items-center gap-1.5 px-3.5 py-2.5 rounded-xl border border-slate-300 hover:bg-slate-50 text-slate-700 text-xs font-bold transition-all"
              title="구글 시트 최신 내용 다시 불러오기"
            >
              <RefreshCw className={`w-3.5 h-3.5 text-blue-600 ${isSyncing ? 'animate-spin' : ''}`} />
              <span>새로고침</span>
            </button>

            {/* Sheet Settings Modal Button */}
            <button
              onClick={() => setIsConfigOpen(true)}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border-2 border-emerald-500 bg-emerald-50 hover:bg-emerald-100 text-emerald-800 text-xs font-extrabold transition-all shadow-xs"
            >
              <FileSpreadsheet className="w-4 h-4 text-emerald-600" />
              <span>{t.workshops.syncSheetBtn}</span>
            </button>
          </div>
        </div>

        {/* Live Sync Status Banner */}
        <div className="bg-emerald-50/80 border border-emerald-200 rounded-2xl p-4 mb-8 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs text-emerald-950">
          <div className="flex items-center gap-2.5">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse shrink-0" />
            <span className="font-bold">
              구글 스프레드시트 실시간 동기화 완료
            </span>
            {lastSyncedTime && (
              <span className="text-[11px] text-emerald-700 bg-white/70 px-2 py-0.5 rounded-md border border-emerald-200">
                마지막 반영: {lastSyncedTime}
              </span>
            )}
          </div>
          <div className="text-[11px] text-emerald-800">
            💡 구글 시트에서 행을 추가/수정 후 <b>[새로고침]</b> 버튼을 누르면 즉시 반영됩니다.
          </div>
        </div>

        {/* Workshop Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {workshops.map((ws, idx) => {
            const isFull = ws.status === 'full';
            const isFew = ws.status === 'few';

            return (
              <div
                key={ws.id || idx}
                className="flex flex-col justify-between rounded-3xl border border-slate-200 p-6 bg-white hover:border-blue-400 hover:shadow-lg transition-all"
              >
                <div>
                  {/* Status & Subject Header */}
                  <div className="flex items-center justify-between mb-4">
                    <span className={`px-2.5 py-0.5 rounded-md text-xs font-extrabold ${
                      ws.subject === 'Math' ? 'bg-blue-100 text-blue-800' : 'bg-emerald-100 text-emerald-800'
                    }`}>
                      {ws.subject} • {ws.grade}
                    </span>

                    <span className={`px-2.5 py-1 rounded-full text-xs font-bold flex items-center gap-1 ${
                      isFull
                        ? 'bg-slate-100 text-slate-600'
                        : isFew
                        ? 'bg-rose-100 text-rose-700 animate-pulse'
                        : 'bg-emerald-100 text-emerald-800'
                    }`}>
                      {isFull ? t.workshops.statusFull : isFew ? t.workshops.statusFew : t.workshops.statusOpen}
                      {!isFull && ` (${ws.seatsLeft}/${ws.seatsTotal}석)`}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="text-lg font-bold text-slate-900 mb-2 leading-snug">
                    {ws.title[lang] || ws.title.ko || ws.title.en || ws.title}
                  </h3>

                  {/* Tutor */}
                  <div className="text-xs font-semibold text-blue-700 mb-4">
                    강사: {ws.tutor}
                  </div>

                  {/* Meta details */}
                  <div className="space-y-2 text-xs text-slate-600 bg-slate-50 p-3.5 rounded-2xl mb-4">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-3.5 h-3.5 text-slate-400" />
                      <span>{ws.dates}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="w-3.5 h-3.5 text-slate-400" />
                      <span>{ws.time}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Users className="w-3.5 h-3.5 text-slate-400" />
                      <span>정원 {ws.seatsTotal}명 (잔여 {ws.seatsLeft}석)</span>
                    </div>
                  </div>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-1.5 mb-6">
                    {ws.tags && ws.tags.map((tag, tIdx) => (
                      <span key={tIdx} className="text-[11px] font-medium px-2 py-0.5 rounded bg-slate-100 text-slate-600">
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Footer with Price and Register Button */}
                <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                  <div>
                    <div className="text-[11px] text-slate-400 font-semibold uppercase">특강 수강료</div>
                    <div className="text-lg font-black text-slate-900">{ws.fee}</div>
                  </div>

                  {isFull ? (
                    <button
                      disabled
                      className="px-4 py-2.5 rounded-xl bg-slate-100 text-slate-400 text-xs font-bold cursor-not-allowed"
                    >
                      마감되었습니다
                    </button>
                  ) : (
                    <a
                      href={`https://wa.me/${academyContact.whatsappNumber}?text=${encodeURIComponent(`안녕하세요 Tina 선생님! [${ws.title[lang] || ws.title.ko || ws.title}] 특강(${ws.dates}) 신청 문의드립니다.`)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold shadow-md shadow-blue-500/20 transition-all hover:scale-[1.02]"
                    >
                      {t.workshops.registerBtn}
                    </a>
                  )}
                </div>

              </div>
            );
          })}
        </div>

        {/* Google Sheets Configuration Modal */}
        {isConfigOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs overflow-y-auto">
            <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-xl w-full border border-slate-200 shadow-2xl animate-in zoom-in-95 my-8">
              
              <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-5">
                <div className="flex items-center gap-2.5">
                  <div className="w-10 h-10 rounded-2xl bg-emerald-100 text-emerald-700 flex items-center justify-center">
                    <FileSpreadsheet className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-extrabold text-lg text-slate-900">
                      구글 스프레드시트 실시간 연동 관리
                    </h3>
                    <p className="text-[11px] text-slate-500">
                      구글 시트에 행만 추가/수정하면 코드 변경 없이 웹페이지에 특강이 즉시 등록됩니다.
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => setIsConfigOpen(false)}
                  className="p-1.5 rounded-full hover:bg-slate-100 text-slate-400 hover:text-slate-600 font-bold"
                >
                  ✕
                </button>
              </div>

              <div className="space-y-4 text-xs text-slate-600">
                
                {/* Visual Step by Step Guide */}
                <div className="bg-slate-50 rounded-2xl p-4 border border-slate-200 space-y-3">
                  <div className="font-bold text-slate-900 text-xs flex items-center gap-1.5">
                    <HelpCircle className="w-4 h-4 text-blue-600" />
                    <span>연동 순서 안내:</span>
                  </div>

                  <div className="space-y-2 text-slate-700 text-[11px]">
                    <div className="flex items-start gap-2">
                      <span className="w-5 h-5 rounded-full bg-blue-600 text-white font-bold flex items-center justify-center shrink-0 text-[10px]">1</span>
                      <div>
                        구글 스프레드시트 1행에 헤더 컬럼명을 입력합니다.
                      </div>
                    </div>

                    <div className="flex items-start gap-2">
                      <span className="w-5 h-5 rounded-full bg-blue-600 text-white font-bold flex items-center justify-center shrink-0 text-[10px]">2</span>
                      <div>
                        메뉴 <b>[파일] → [공유] → [웹에 게시]</b>에서 <b>'쉼표로 구분된 값(.csv)'</b> 선택 후 [게시]를 클릭합니다.
                      </div>
                    </div>

                    <div className="flex items-start gap-2">
                      <span className="w-5 h-5 rounded-full bg-blue-600 text-white font-bold flex items-center justify-center shrink-0 text-[10px]">3</span>
                      <div>
                        생성된 링크를 아래 입력창에 넣고 [실시간 동기화 저장]을 누르면 즉시 연동됩니다.
                      </div>
                    </div>
                  </div>
                </div>

                {/* Column Headers with 1-click copy */}
                <div className="p-3 bg-indigo-50/70 rounded-2xl border border-indigo-200">
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="font-bold text-indigo-950 text-[11px]">
                      📋 시트 1행(헤더) 컬럼명:
                    </span>
                    <button
                      onClick={handleCopyHeader}
                      className="inline-flex items-center gap-1 text-[11px] font-bold text-indigo-700 hover:text-indigo-900 bg-white px-2 py-0.5 rounded border border-indigo-200"
                    >
                      {isCopied ? <Check className="w-3 h-3 text-emerald-600" /> : <Copy className="w-3 h-3" />}
                      <span>{isCopied ? '복사됨!' : '컬럼명 복사'}</span>
                    </button>
                  </div>
                  <code className="text-[10px] text-indigo-800 font-mono block break-all bg-white p-2 rounded-lg border border-indigo-100">
                    Title,Tutor,Subject,Grade,Dates,Time,Fee,SeatsTotal,SeatsLeft,Status
                  </code>
                </div>

                {/* URL Input Box */}
                <div>
                  <label className="block text-[11px] font-bold text-slate-700 uppercase mb-1">
                    연결된 구글 시트 CSV 링크
                  </label>
                  <input
                    type="url"
                    placeholder="https://docs.google.com/spreadsheets/d/e/.../pub?output=csv"
                    value={sheetUrl}
                    onChange={(e) => setSheetUrl(e.target.value)}
                    className="w-full px-3.5 py-3 rounded-xl border border-slate-300 focus:outline-hidden focus:ring-2 focus:ring-emerald-500 text-xs font-mono bg-white"
                  />
                </div>

                {/* Error message */}
                {fetchError && (
                  <div className="p-3 rounded-xl bg-red-50 border border-red-200 text-red-700 font-semibold text-xs flex items-start gap-2">
                    <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                    <span>{fetchError}</span>
                  </div>
                )}

                {/* Status Message */}
                {syncStatus && (
                  <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 font-semibold text-xs">
                    {syncStatus}
                  </div>
                )}

                {/* Action Button */}
                <div className="pt-2">
                  <button
                    onClick={() => fetchAndApplySheetData(sheetUrl)}
                    disabled={isSyncing}
                    className="w-full py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-md shadow-emerald-600/20"
                  >
                    <RefreshCw className={`w-4 h-4 ${isSyncing ? 'animate-spin' : ''}`} />
                    <span>실시간 동기화 저장 및 적용하기</span>
                  </button>
                </div>
              </div>

            </div>
          </div>
        )}

      </div>
    </section>
  );
}
