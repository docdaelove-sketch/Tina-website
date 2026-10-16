import React, { useState, useEffect } from 'react';
import { Lock, Unlock, Folder, FileText, Download, ExternalLink, ShieldCheck, Key, AlertCircle, Sparkles, Settings, Check, HelpCircle, Plus, Trash2 } from 'lucide-react';

const INITIAL_FOLDERS = [
  {
    id: "primary",
    name: "Year 1 - 2 (영어 파닉스 & 기초 리딩)",
    grade: "Year 1 - 2",
    subject: "English",
    passcode: "PHONICS",
    driveUrl: "https://drive.google.com/drive/folders/example_primary_phonics",
    files: [
      { name: "Phonics Step-by-Step Level 1-3 Worksheets & Flashcards", type: "PDF / Audio", size: "35 MB", subject: "English" },
      { name: "Early Readers 100 Sight Words Workbook", type: "Worksheet", size: "12 MB", subject: "English" }
    ]
  },
  {
    id: "ks3",
    name: "Year 7 - 9 (중등 기초 / Cambridge Checkpoint)",
    grade: "Year 7 - 9",
    subject: "Math & Eng",
    passcode: "KS3MATH",
    driveUrl: "https://drive.google.com/drive/folders/demo_ks3_math",
    files: [
      { name: "Year 7-9 Cambridge Math Checkpoint Past Papers (2018-2025)", type: "PDF Archive", size: "48 MB", subject: "Math" },
      { name: "KS3 English Essential Vocabulary & Grammar Drill Book", type: "PDF / Worksheet", size: "18 MB", subject: "English" }
    ]
  },
  {
    id: "igcse",
    name: "Year 10 - 11 (IGCSE 수학 & 영어 기출/교재)",
    grade: "Year 10 - 11",
    subject: "Math & Eng",
    passcode: "IGCSE2026",
    driveUrl: "https://drive.google.com/drive/folders/demo_igcse_0580",
    files: [
      { name: "IGCSE Math 0580 Classified Past Papers by Topic (2019-2025)", type: "Folder", size: "120 MB", subject: "Math" },
      { name: "IGCSE Add-Math 0606 Formula Sheet & Step-by-Step Solutions", type: "PDF Guide", size: "34 MB", subject: "Math" },
      { name: "IGCSE English 0500 Model Essays (Grade 9 / A* Exemplars)", type: "Curated PDF", size: "25 MB", subject: "English" }
    ]
  },
  {
    id: "alevel",
    name: "Year 12 - 13 (A-Level / IBDP 고등 전문)",
    grade: "Year 12 - 13",
    subject: "Math & Eng",
    passcode: "ALEVEL",
    driveUrl: "https://drive.google.com/drive/folders/demo_alevel_pure",
    files: [
      { name: "A-Level Pure Mathematics P1 & P3 Complete Revision Pack", type: "Archive", size: "85 MB", subject: "Math" },
      { name: "A-Level English Literature Analytical Essay Structure Guide", type: "PDF Document", size: "14 MB", subject: "English" }
    ]
  }
];

export default function DriveMaterials({ lang, t }) {
  // Load folders state from localStorage or use initial
  const [folders, setFolders] = useState(() => {
    const saved = localStorage.getItem('tina_multi_drive_folders');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        return INITIAL_FOLDERS;
      }
    }
    return INITIAL_FOLDERS;
  });

  const [activeFolderId, setActiveFolderId] = useState("primary");
  
  // Track which folders have been unlocked by student in this session (array of unlocked folder IDs)
  const [unlockedFolderIds, setUnlockedFolderIds] = useState([]);
  const [passcodeInput, setPasscodeInput] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  // Admin Config Modal state
  const [isConfigOpen, setIsConfigOpen] = useState(false);
  const [editingFolders, setEditingFolders] = useState(folders);
  const [selectedAdminFolderIdx, setSelectedAdminFolderIdx] = useState(0);
  const [saveSuccess, setSaveSuccess] = useState('');

  const currentFolder = folders.find(f => f.id === activeFolderId) || folders[0];
  const isCurrentFolderUnlocked = unlockedFolderIds.includes(currentFolder.id);

  // Switch folder tab
  const handleSelectFolder = (folderId) => {
    setActiveFolderId(folderId);
    setPasscodeInput('');
    setErrorMsg('');
  };

  // Unlock current folder with its specific password
  const handleUnlockCurrentFolder = (e) => {
    e.preventDefault();
    const entered = passcodeInput.trim().toUpperCase();
    const required = (currentFolder.passcode || '').trim().toUpperCase();

    if (entered === required) {
      setUnlockedFolderIds(prev => [...new Set([...prev, currentFolder.id])]);
      setErrorMsg('');
      setPasscodeInput('');
    } else {
      setErrorMsg(`비밀번호가 올바르지 않습니다. (이 폴더 비밀번호: ${currentFolder.passcode})`);
    }
  };

  // Relock current folder
  const handleLockCurrentFolder = () => {
    setUnlockedFolderIds(prev => prev.filter(id => id !== currentFolder.id));
  };

  // Open Admin Config
  const handleOpenConfig = () => {
    setEditingFolders(JSON.parse(JSON.stringify(folders)));
    setSelectedAdminFolderIdx(0);
    setIsConfigOpen(true);
    setSaveSuccess('');
  };

  // Save changes to localStorage
  const handleSaveAllFolders = (e) => {
    e.preventDefault();
    setFolders(editingFolders);
    localStorage.setItem('tina_multi_drive_folders', JSON.stringify(editingFolders));
    setSaveSuccess('✅ 모든 폴더별 비밀번호와 구글 드라이브 링크가 저장되었습니다!');
    setTimeout(() => {
      setSaveSuccess('');
      setIsConfigOpen(false);
    }, 1200);
  };

  // Update specific field in admin edit
  const handleAdminFieldChange = (idx, field, value) => {
    setEditingFolders(prev => {
      const copy = [...prev];
      copy[idx] = { ...copy[idx], [field]: value };
      return copy;
    });
  };

  return (
    <section id="materials" className="py-20 bg-slate-50 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-indigo-50 text-indigo-700 border border-indigo-200 mb-3">
              <Lock className="w-3.5 h-3.5" />
              <span>Grade-Specific Passwords • Google Drive Portal</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              {t.materials.title}
            </h2>
            <p className="text-base text-slate-600 mt-2">
              학년 및 수강 과목에 따라 <b>폴더별로 각기 다른 비밀번호</b>가 지정되어 있어, 학생은 배정된 전용 자료만 안전하게 열람할 수 있습니다.
            </p>
          </div>

          {/* Admin Drive Settings Button */}
          <div>
            <button
              onClick={handleOpenConfig}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border border-slate-300 bg-white hover:bg-slate-100 text-slate-700 text-xs font-bold transition-all shadow-xs"
            >
              <Settings className="w-4 h-4 text-slate-500" />
              <span>폴더별 비밀번호 & 링크 관리</span>
            </button>
          </div>
        </div>

        {/* Grade Folder Tabs Bar */}
        <div className="max-w-4xl mx-auto mb-8">
          <div className="text-xs font-bold text-slate-500 mb-3 uppercase tracking-wider flex items-center justify-between">
            <span>열람할 학년 / 과정 폴더를 선택하세요:</span>
            <span className="text-[11px] font-normal text-slate-400">
              (폴더마다 개별 비밀번호 적용)
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
            {folders.map((folder) => {
              const isSelected = folder.id === activeFolderId;
              const isUnlocked = unlockedFolderIds.includes(folder.id);

              return (
                <button
                  key={folder.id}
                  onClick={() => handleSelectFolder(folder.id)}
                  className={`p-3.5 rounded-2xl text-left border-2 transition-all relative overflow-hidden ${
                    isSelected
                      ? 'border-indigo-600 bg-white shadow-md scale-[1.02]'
                      : 'border-slate-200 bg-white/70 hover:bg-white text-slate-600'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-xs font-black text-indigo-700">
                      {folder.grade}
                    </span>
                    {isUnlocked ? (
                      <span className="flex items-center gap-0.5 text-[10px] font-bold text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded">
                        <Unlock className="w-3 h-3" />
                        <span>열림</span>
                      </span>
                    ) : (
                      <span className="flex items-center gap-0.5 text-[10px] font-bold text-slate-400 bg-slate-100 px-1.5 py-0.5 rounded">
                        <Lock className="w-3 h-3" />
                        <span>잠김</span>
                      </span>
                    )}
                  </div>
                  <div className="text-xs font-bold text-slate-800 line-clamp-1">
                    {folder.name.split('(')[0]}
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Active Folder Container */}
        <div className="max-w-4xl mx-auto">
          {!isCurrentFolderUnlocked ? (
            /* LOCKED STATE for this specific folder */
            <div className="bg-white rounded-3xl p-8 sm:p-12 border-2 border-dashed border-slate-300 shadow-sm text-center max-w-lg mx-auto">
              <div className="w-16 h-16 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center mx-auto mb-5 shadow-inner">
                <Lock className="w-8 h-8" />
              </div>

              <div className="inline-block px-3 py-1 rounded-full text-xs font-bold bg-indigo-100 text-indigo-800 mb-2">
                {currentFolder.grade} 전용 자료실
              </div>

              <h3 className="text-xl font-black text-slate-900 mb-1">
                {currentFolder.name}
              </h3>
              <p className="text-xs text-slate-500 mb-6">
                이 폴더의 전용 보안 비밀번호를 입력해주세요.
              </p>

              <form onSubmit={handleUnlockCurrentFolder} className="space-y-4">
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                    <Key className="w-4 h-4" />
                  </div>
                  <input
                    type="text"
                    placeholder={`예: ${currentFolder.passcode}`}
                    value={passcodeInput}
                    onChange={(e) => {
                      setPasscodeInput(e.target.value);
                      setErrorMsg('');
                    }}
                    className="w-full pl-10 pr-4 py-3.5 rounded-xl border border-slate-300 focus:outline-hidden focus:ring-2 focus:ring-indigo-500 text-sm font-mono uppercase tracking-wider text-center"
                  />
                </div>

                {errorMsg && (
                  <div className="flex items-center gap-2 p-3 rounded-xl bg-red-50 text-red-700 text-xs text-left">
                    <AlertCircle className="w-4 h-4 shrink-0" />
                    <span>{errorMsg}</span>
                  </div>
                )}

                <button
                  type="submit"
                  className="w-full py-3.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-sm flex items-center justify-center gap-2 shadow-md transition-transform active:scale-[0.99]"
                >
                  <Unlock className="w-4 h-4" />
                  <span>이 폴더 잠금 해제</span>
                </button>
              </form>

              {/* Demo Hint */}
              <div className="mt-6 pt-5 border-t border-slate-100 flex flex-col items-center gap-2">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-amber-50 text-amber-800 border border-amber-200">
                  <Sparkles className="w-3.5 h-3.5 text-amber-600" />
                  <span>이 폴더 비밀번호: <b>{currentFolder.passcode}</b></span>
                </span>
                <span className="text-[11px] text-slate-400">
                  (상단 '폴더별 비밀번호 관리'에서 언제든 폴더마다 다른 비밀번호로 변경 가능)
                </span>
              </div>
            </div>
          ) : (
            /* UNLOCKED STATE for this specific folder */
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-lg animate-in fade-in zoom-in-95 duration-200">
              
              {/* Folder Header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-200">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-700 flex items-center justify-center">
                    <Folder className="w-6 h-6" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="text-lg font-bold text-slate-900">
                        {currentFolder.name}
                      </h3>
                      <span className="px-2 py-0.5 rounded-full text-[11px] font-bold bg-emerald-100 text-emerald-800">
                        인증 완료 (암호: {currentFolder.passcode})
                      </span>
                    </div>
                    <p className="text-xs text-slate-500 mt-0.5">
                      이 폴더에 등록된 구글 드라이브 자료를 열람하거나 다운로드하세요.
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3 self-start sm:self-center">
                  <a
                    href={currentFolder.driveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold shadow-md shadow-indigo-600/20"
                  >
                    <span>이 폴더 구글 드라이브 열기</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>

                  <button
                    onClick={handleLockCurrentFolder}
                    className="text-xs text-slate-500 hover:text-slate-700 font-semibold underline"
                  >
                    다시 잠금
                  </button>
                </div>
              </div>

              {/* Files in this folder */}
              <div className="space-y-3 my-6">
                {currentFolder.files && currentFolder.files.map((file, fIdx) => (
                  <div
                    key={fIdx}
                    className="flex flex-col sm:flex-row sm:items-center justify-between p-4 rounded-2xl border border-slate-200 hover:border-indigo-300 hover:bg-indigo-50/20 transition-all gap-3"
                  >
                    <div className="flex items-start gap-3.5">
                      <div className="w-10 h-10 rounded-xl bg-slate-100 text-slate-600 flex items-center justify-center shrink-0 mt-0.5">
                        <FileText className="w-5 h-5 text-indigo-600" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className={`px-2 py-0.5 rounded text-[10px] font-extrabold ${
                            file.subject === 'Math' ? 'bg-blue-100 text-blue-800' : 'bg-emerald-100 text-emerald-800'
                          }`}>
                            {file.subject}
                          </span>
                          <span className="text-xs text-slate-400 font-medium">{file.size}</span>
                        </div>
                        <h4 className="text-sm font-bold text-slate-800 mt-1">
                          {file.name}
                        </h4>
                        <p className="text-xs text-slate-500">
                          형식: {file.type} • Google Drive 동기화
                        </p>
                      </div>
                    </div>

                    <a
                      href={currentFolder.driveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-xl bg-slate-900 hover:bg-indigo-600 text-white text-xs font-bold transition-colors self-end sm:self-center shrink-0 shadow-xs"
                    >
                      <span>다운로드</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  </div>
                ))}
              </div>

              {/* Information Footnote */}
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex items-start gap-3 text-xs text-slate-600">
                <ShieldCheck className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold text-slate-800">폴더별 독립 보안 시스템:</span>
                  <p className="mt-0.5 text-slate-500 leading-relaxed">
                    다른 학년 폴더로 이동하시면 해당 학년의 비밀번호를 다시 입력해야 열립니다. 따라서 저학년 학생이 고학년 IGCSE 기출문제에 접근하거나 자료가 혼동되는 것을 원천 차단합니다.
                  </p>
                </div>
              </div>

            </div>
          )}
        </div>

        {/* Admin Multi-Folder Settings Modal */}
        {isConfigOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs overflow-y-auto">
            <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-2xl w-full border border-slate-200 shadow-2xl animate-in zoom-in-95 my-8">
              
              <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-5">
                <div className="flex items-center gap-2.5">
                  <div className="w-10 h-10 rounded-2xl bg-indigo-100 text-indigo-700 flex items-center justify-center">
                    <Settings className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-extrabold text-lg text-slate-900">
                      폴더별 개별 비밀번호 & 구글 드라이브 링크 설정
                    </h3>
                    <p className="text-[11px] text-slate-500">
                      각 학년/과목 폴더마다 서로 다른 비밀번호와 구글 드라이브 링크를 자유롭게 설정할 수 있습니다.
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

              <form onSubmit={handleSaveAllFolders} className="space-y-5 text-xs text-slate-600">
                
                {/* Visual Step Guide */}
                <div className="bg-indigo-50/70 rounded-2xl p-4 border border-indigo-200 space-y-1 text-[11px] text-indigo-950">
                  <div className="font-bold text-xs flex items-center gap-1.5 text-indigo-900">
                    <HelpCircle className="w-4 h-4 text-indigo-600" />
                    <span>폴더별 개별 운영 원리:</span>
                  </div>
                  <p className="text-slate-700 leading-relaxed">
                    선생님의 구글 드라이브에서 <b>학년별로 각각 폴더를 생성</b>하신 후, 각 폴더의 [공유 링크]와 [비밀번호]를 아래에서 따로 입력해 주시면 됩니다. 학생들에게는 본인 학년의 비밀번호만 알려주시면 됩니다!
                  </p>
                </div>

                {/* Folder Selector Tabs in Admin */}
                <div>
                  <label className="block text-[11px] font-bold text-slate-700 uppercase mb-2">
                    수정할 폴더 선택
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                    {editingFolders.map((ef, idx) => (
                      <button
                        type="button"
                        key={ef.id}
                        onClick={() => setSelectedAdminFolderIdx(idx)}
                        className={`p-2.5 rounded-xl text-center border font-bold text-xs transition-all ${
                          selectedAdminFolderIdx === idx
                            ? 'bg-indigo-600 text-white border-indigo-600 shadow-sm'
                            : 'bg-slate-50 hover:bg-slate-100 text-slate-700 border-slate-200'
                        }`}
                      >
                        {ef.grade}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Edit Form for Selected Admin Folder */}
                {editingFolders[selectedAdminFolderIdx] && (
                  <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
                    <div>
                      <label className="block text-[11px] font-bold text-slate-700 uppercase mb-1">
                        폴더 이름 (화면 표시용)
                      </label>
                      <input
                        type="text"
                        value={editingFolders[selectedAdminFolderIdx].name}
                        onChange={(e) => handleAdminFieldChange(selectedAdminFolderIdx, 'name', e.target.value)}
                        className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs font-semibold bg-white"
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="block text-[11px] font-bold text-slate-700 uppercase mb-1">
                          🔑 이 폴더 전용 비밀번호
                        </label>
                        <input
                          type="text"
                          value={editingFolders[selectedAdminFolderIdx].passcode}
                          onChange={(e) => handleAdminFieldChange(selectedAdminFolderIdx, 'passcode', e.target.value.toUpperCase())}
                          placeholder="예: PHONICS, IGCSE2026"
                          className="w-full px-3 py-2 rounded-xl border border-slate-300 font-mono text-xs font-bold text-indigo-700 uppercase bg-white"
                        />
                      </div>

                      <div>
                        <label className="block text-[11px] font-bold text-slate-700 uppercase mb-1">
                          과목 / 학년 표기
                        </label>
                        <input
                          type="text"
                          value={editingFolders[selectedAdminFolderIdx].grade}
                          onChange={(e) => handleAdminFieldChange(selectedAdminFolderIdx, 'grade', e.target.value)}
                          className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs bg-white"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-[11px] font-bold text-slate-700 uppercase mb-1">
                        📁 이 폴더 구글 드라이브 공유 링크
                      </label>
                      <input
                        type="url"
                        value={editingFolders[selectedAdminFolderIdx].driveUrl}
                        onChange={(e) => handleAdminFieldChange(selectedAdminFolderIdx, 'driveUrl', e.target.value)}
                        placeholder="https://drive.google.com/drive/folders/..."
                        className="w-full px-3 py-2 rounded-xl border border-slate-300 font-mono text-xs bg-white"
                      />
                    </div>
                  </div>
                )}

                {saveSuccess && (
                  <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 font-semibold text-xs flex items-center gap-1.5">
                    <Check className="w-4 h-4 text-emerald-600" />
                    <span>{saveSuccess}</span>
                  </div>
                )}

                <div className="pt-2 flex gap-3">
                  <button
                    type="button"
                    onClick={() => setIsConfigOpen(false)}
                    className="w-1/3 py-3 rounded-xl border border-slate-300 text-slate-700 font-bold text-xs hover:bg-slate-50"
                  >
                    취소
                  </button>
                  <button
                    type="submit"
                    className="w-2/3 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-md shadow-indigo-600/20"
                  >
                    <span>모든 폴더 설정 저장하기</span>
                  </button>
                </div>

              </form>

            </div>
          </div>
        )}

      </div>
    </section>
  );
}
