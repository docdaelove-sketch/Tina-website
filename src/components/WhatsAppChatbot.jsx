import React, { useState } from 'react';
import { MessageCircle, X, Send, MapPin, Car, DollarSign, BookOpen, ExternalLink, Bot, CheckCheck, Sparkles } from 'lucide-react';
import { chatbotPresets, academyContact } from '../data/mockData';

export default function WhatsAppChatbot({ lang, t }) {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      sender: 'bot',
      text: lang === 'ko'
        ? "안녕하세요! 말레이시아 수방자야 선웨이 사우스키 Tina Lee 선생님의 1:1 맞춤형 수학 & 영어 과외 안내 챗봇입니다. 🇲🇾\n궁금하신 점을 아래 버튼에서 선택하시거나 직접 입력해 주시면 빠르게 답변해 드립니다."
        : lang === 'zh'
        ? "您好！欢迎使用雪兰莪梳邦再也双威南湖 Tina 老师 1对1 数学与英语专属辅导智能问答助手。🇲🇾\n请选择下方的常见问题或直接留言咨询。"
        : "Hello! Welcome to Tina Lee's 1:1 Mathematics & English personalized tuition concierge at Sunway South Quay, Subang Jaya. 🇲🇾\nPlease choose from the quick topics below or chat with Tina directly."
    }
  ]);
  const [inputValue, setInputValue] = useState('');

  const handleSelectPreset = (preset) => {
    // Add user message
    const userMsg = { sender: 'user', text: preset.label[lang] || preset.label.en };
    const botResponse = {
      sender: 'bot',
      text: preset.response[lang] || preset.response.en,
      isPreset: true,
      id: preset.id
    };

    setMessages(prev => [...prev, userMsg, botResponse]);
  };

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!inputValue.trim()) return;

    const query = inputValue.trim();
    const userMsg = { sender: 'user', text: query };

    // Basic keyword response matching
    let replyText = '';
    const qLower = query.toLowerCase();

    if (qLower.includes('주차') || qLower.includes('parking') || qLower.includes('车') || qLower.includes('泊车')) {
      replyText = chatbotPresets.find(p => p.id === 'parking').response[lang] || chatbotPresets.find(p => p.id === 'parking').response.en;
    } else if (qLower.includes('위치') || qLower.includes('어디') || qLower.includes('location') || qLower.includes('address') || qLower.includes('地址') || qLower.includes('waze') || qLower.includes('콘도') || qLower.includes('condo')) {
      replyText = chatbotPresets.find(p => p.id === 'location').response[lang] || chatbotPresets.find(p => p.id === 'location').response.en;
    } else if (qLower.includes('가격') || qLower.includes('수업료') || qLower.includes('fee') || qLower.includes('price') || qLower.includes('多少钱') || qLower.includes('学费') || qLower.includes('과외비')) {
      replyText = chatbotPresets.find(p => p.id === 'tuition').response[lang] || chatbotPresets.find(p => p.id === 'tuition').response.en;
    } else if (qLower.includes('테스트') || qLower.includes('test') || qLower.includes('입원') || qLower.includes('入学') || qLower.includes('测试') || qLower.includes('진단')) {
      replyText = chatbotPresets.find(p => p.id === 'testinfo').response[lang] || chatbotPresets.find(p => p.id === 'testinfo').response.en;
    } else {
      replyText = lang === 'ko'
        ? `"${query}" 문의에 대해 Tina 선생님께서 직접 상담을 도와드릴 수 있도록 왓츠앱(017-243-4167)으로 바로 연결해 드릴까요?`
        : lang === 'zh'
        ? `关于“${query}”，Tina 老师可在 WhatsApp (017-243-4167) 上为您一对一详细解答。`
        : `Regarding "${query}", Ms. Tina Lee can assist you directly on WhatsApp (017-243-4167).`;
    }

    setMessages(prev => [...prev, userMsg, { sender: 'bot', text: replyText }]);
    setInputValue('');
  };

  return (
    <>
      {/* Floating Action WhatsApp Bubble */}
      <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end">
        {!isOpen && (
          <div className="mb-3 hidden sm:flex items-center gap-2 bg-white px-3.5 py-2 rounded-2xl shadow-xl border border-slate-200 text-xs font-bold text-slate-800 animate-bounce duration-1000">
            <span className="w-2 h-2 rounded-full bg-emerald-500" />
            <span>선웨이 사우스키 • 주차 • 1:1 수업료 챗봇</span>
          </div>
        )}

        <button
          onClick={() => setIsOpen(!isOpen)}
          className="relative group p-4 rounded-full bg-emerald-500 hover:bg-emerald-600 active:bg-emerald-700 text-white shadow-xl shadow-emerald-500/40 transition-transform duration-200 hover:scale-105 flex items-center justify-center"
          aria-label="WhatsApp and FAQ Chat"
        >
          {isOpen ? (
            <X className="w-7 h-7" />
          ) : (
            <>
              <MessageCircle className="w-7 h-7 fill-white text-emerald-500" />
              <span className="absolute -top-1 -right-1 flex h-4 w-4">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-4 w-4 bg-amber-500 text-[10px] text-white font-bold items-center justify-center">1</span>
              </span>
            </>
          )}
        </button>
      </div>

      {/* Interactive Chat Window Modal */}
      {isOpen && (
        <div className="fixed bottom-24 right-4 sm:right-6 z-50 w-[92vw] sm:w-[420px] bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col h-[580px] animate-in slide-in-from-bottom-5 duration-200">
          
          {/* Chat Window Header */}
          <div className="bg-emerald-600 text-white p-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center font-bold">
                  <Bot className="w-6 h-6 text-white" />
                </div>
                <span className="absolute bottom-0 right-0 w-3 h-3 rounded-full bg-emerald-300 border-2 border-emerald-600" />
              </div>
              <div>
                <h4 className="font-bold text-sm sm:text-base leading-tight">
                  Tina 1:1 과외 상담 챗봇
                </h4>
                <div className="flex items-center gap-1.5 text-[11px] text-emerald-100">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-200 animate-pulse" />
                  <span>Sunway South Quay • 017-243-4167</span>
                </div>
              </div>
            </div>

            <button
              onClick={() => setIsOpen(false)}
              className="p-1 rounded-full text-white/80 hover:text-white hover:bg-white/10"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Messages Flow Area */}
          <div className="flex-1 p-4 overflow-y-auto space-y-3 bg-slate-50 text-xs">
            {messages.map((msg, idx) => (
              <div
                key={idx}
                className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[85%] rounded-2xl p-3.5 whitespace-pre-line shadow-2xs leading-relaxed ${
                    msg.sender === 'user'
                      ? 'bg-blue-600 text-white rounded-tr-xs'
                      : 'bg-white text-slate-800 border border-slate-200 rounded-tl-xs'
                  }`}
                >
                  <p>{msg.text}</p>

                  {/* Context Links for Location */}
                  {msg.id === 'location' && (
                    <div className="mt-3 pt-2 border-t border-slate-100 flex flex-wrap gap-2">
                      <a
                        href={academyContact.wazeUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-blue-50 text-blue-700 font-bold text-[11px] hover:bg-blue-100 border border-blue-200"
                      >
                        <MapPin className="w-3.5 h-3.5 text-blue-600" />
                        <span>Waze 바로 열기 (A'marine)</span>
                      </a>
                      <a
                        href={academyContact.googleMapsUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-slate-100 text-slate-700 font-bold text-[11px] hover:bg-slate-200"
                      >
                        <ExternalLink className="w-3.5 h-3.5" />
                        <span>Google 지도</span>
                      </a>
                    </div>
                  )}

                  {/* Context Transfer to WhatsApp */}
                  {msg.sender === 'bot' && (
                    <div className="mt-2 text-right">
                      <span className="text-[10px] text-slate-400 inline-flex items-center gap-0.5">
                        <CheckCheck className="w-3 h-3 text-emerald-500" />
                        <span>자동 안내</span>
                      </span>
                    </div>
                  )}
                </div>
              </div>
            ))}

            {/* Quick Answer Action Buttons */}
            <div className="pt-2">
              <div className="text-[11px] font-bold text-slate-500 mb-2 uppercase tracking-wider">
                자주 묻는 질문 바로가기
              </div>
              <div className="flex flex-wrap gap-1.5">
                {chatbotPresets.map((preset) => (
                  <button
                    key={preset.id}
                    onClick={() => handleSelectPreset(preset)}
                    className="text-left px-3 py-1.5 rounded-xl bg-white hover:bg-emerald-50 text-slate-700 hover:text-emerald-800 border border-slate-200 text-xs font-semibold shadow-2xs transition-colors"
                  >
                    {preset.label[lang] || preset.label.en}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* WhatsApp Direct Connect Bar */}
          <div className="p-2.5 bg-emerald-50 border-t border-emerald-100 flex items-center justify-between text-xs">
            <span className="text-emerald-900 font-medium truncate">
              💬 Tina 선생님과 1:1 직통 상담
            </span>
            <a
              href={`https://wa.me/${academyContact.whatsappNumber}?text=${encodeURIComponent('안녕하세요 Tina 선생님! 1:1 수학 & 영어 과외 상담 희망합니다.')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shrink-0 shadow-xs"
            >
              <span>1:1 왓츠앱 연결</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>

          {/* Chat Input Field */}
          <form onSubmit={handleSendMessage} className="p-3 bg-white border-t border-slate-200 flex gap-2">
            <input
              type="text"
              placeholder={t.faq.botPlaceholder}
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              className="flex-1 px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs focus:outline-hidden focus:ring-2 focus:ring-emerald-500"
            />
            <button
              type="submit"
              className="p-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white flex items-center justify-center shrink-0 shadow-xs"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>

        </div>
      )}
    </>
  );
}
