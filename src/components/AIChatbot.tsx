import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  MessageSquare, 
  Send, 
  X, 
  Bot, 
  User, 
  Loader2, 
  Trash2, 
  Sparkles,
  ChevronDown,
  BookOpen,
  Code2,
  Database
} from 'lucide-react';
import { GoogleGenAI } from "@google/genai";
import ReactMarkdown from 'react-markdown';
import { cn } from '../lib/utils';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

const SUGGESTIONS = [
  "Giải thích về Khóa chính trong CSDL",
  "Cách dùng vòng lặp for trong Python",
  "Hệ điều hành là gì?",
  "Ví dụ về câu lệnh SELECT trong SQL",
  "Làm sao để học tốt môn Tin học THPT?",
  "Trí tuệ nhân tạo (AI) là gì?",
  "Kiến trúc Von Neumann là gì?"
];

export const AIChatbot: React.FC<{ onClose: () => void, currentGrade: 10 | 11 | 12 }> = ({ onClose, currentGrade }) => {
  const [messages, setMessages] = useState<Message[]>(() => {
    const saved = localStorage.getItem('eduquest_chat_history');
    if (saved) {
      return JSON.parse(saved).map((m: any) => ({
        ...m,
        timestamp: new Date(m.timestamp)
      }));
    }
    return [{
      id: 'welcome',
      role: 'assistant',
      content: `Chào bạn! Mình là trợ lý AI của EduQuest. Mình có thể giúp bạn giải đáp các thắc mắc về môn Tin học lớp 10, 11, 12 (phạm vi THPT). Bạn đang học lớp ${currentGrade}, bạn cần mình hỗ trợ gì không?`,
      timestamp: new Date()
    }];
  });
  
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    localStorage.setItem('eduquest_chat_history', JSON.stringify(messages));
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSend = async (text: string = input) => {
    if (!text.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: text,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
      const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: [
          ...messages.map(m => ({
            role: m.role === 'assistant' ? 'model' : 'user',
            parts: [{ text: m.content }]
          })),
          { role: 'user', parts: [{ text: text }] }
        ],
        config: {
          systemInstruction: `Bạn là một trợ lý ảo thông minh tên là "EduQuest AI", chuyên hỗ trợ học sinh cấp THPT (lớp 10, 11, 12) tại Việt Nam học môn Tin học.
          Người dùng hiện đang học lớp ${currentGrade}.
          
          Kiến thức trọng tâm của bạn bao gồm:
          - Lớp 10: Hệ thống máy tính, Mạng máy tính, Đạo đức số, Giải quyết bài toán với Python cơ bản.
          - Lớp 11: Cơ sở dữ liệu (SQL, DBMS), Mạng máy tính nâng cao, Lập trình Python nâng cao (hàm, list, tệp), Đồ họa rùa, An toàn thông tin.
          - Lớp 12: Trí tuệ nhân tạo (AI), Internet vạn vật (IoT), Khoa học dữ liệu, Giao tiếp và ứng xử trong không gian mạng, Giải quyết vấn đề với sự trợ giúp của máy tính, Nhóm nghề quản trị trong ngành CNTT, Máy tính và xã hội tri thức.
          
          Phong cách trả lời:
          - Thân thiện, dễ hiểu, chính xác, phù hợp với trình độ học sinh THPT.
          - Luôn cung cấp ví dụ minh họa, đoạn code mẫu (Python, SQL) hoặc sơ đồ khối khi cần thiết.
          - Hỗ trợ giải thích chi tiết các khái niệm khó, hướng dẫn phương pháp học tập hiệu quả.
          - Nếu câu hỏi không liên quan đến Tin học, hãy khéo léo nhắc nhở và hướng người dùng quay lại chủ đề học tập.
          - Sử dụng Markdown để định dạng câu trả lời (in đậm, danh sách, khối mã).`,
          temperature: 0.7,
          topP: 0.95,
          topK: 40,
        }
      });

      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: response.text || 'Xin lỗi, mình gặp chút trục trặc khi xử lý câu trả lời. Bạn thử lại nhé!',
        timestamp: new Date()
      };

      setMessages(prev => [...prev, assistantMessage]);
    } catch (error) {
      console.error('AI Chat Error:', error);
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: 'Rất tiếc, mình không thể kết nối với máy chủ AI lúc này. Vui lòng kiểm tra kết nối mạng và thử lại sau.',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const clearChat = () => {
    if (window.confirm('Bạn có chắc chắn muốn xóa toàn bộ lịch sử trò chuyện?')) {
      setMessages([{
        id: 'welcome',
        role: 'assistant',
        content: `Chào bạn! Mình là trợ lý AI của EduQuest. Mình có thể giúp bạn giải đáp các thắc mắc về môn Tin học lớp 10, 11, 12 (phạm vi THPT). Bạn đang học lớp ${currentGrade}, bạn cần mình hỗ trợ gì không?`,
        timestamp: new Date()
      }]);
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 20, scale: 0.95 }}
      className="fixed bottom-24 md:bottom-6 right-6 w-[400px] max-w-[calc(100vw-48px)] h-[600px] max-h-[calc(100vh-120px)] bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-[2.5rem] shadow-2xl flex flex-col overflow-hidden z-[100]"
    >
      {/* Header */}
      <div className="p-5 border-b border-slate-100 dark:border-slate-800 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md flex justify-between items-center">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-blue-500 rounded-2xl flex items-center justify-center shadow-lg shadow-blue-500/20">
            <Bot className="text-white w-6 h-6" />
          </div>
          <div>
            <h3 className="font-bold text-slate-800 dark:text-white">EduQuest AI</h3>
            <div className="flex items-center gap-1.5">
              <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse" />
              <span className="text-[10px] text-slate-400 dark:text-slate-500 font-bold uppercase tracking-wider">Trực tuyến</span>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-1">
          <button 
            onClick={clearChat}
            className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full text-slate-400 hover:text-rose-500 transition-colors"
            title="Xóa lịch sử"
          >
            <Trash2 className="w-4 h-4" />
          </button>
          <button 
            onClick={onClose}
            className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full text-slate-400 hover:text-slate-800 dark:hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-5 space-y-6 scrollbar-thin scrollbar-thumb-slate-200 dark:scrollbar-thumb-slate-700 scrollbar-track-transparent">
        {messages.map((msg) => (
          <div 
            key={msg.id}
            className={cn(
              "flex w-full",
              msg.role === 'user' ? "justify-end" : "justify-start"
            )}
          >
            <div className={cn(
              "flex gap-3 max-w-[85%]",
              msg.role === 'user' ? "flex-row-reverse" : "flex-row"
            )}>
              <div className={cn(
                "w-8 h-8 rounded-xl flex items-center justify-center shrink-0 mt-1",
                msg.role === 'user' ? "bg-indigo-500" : "bg-blue-500"
              )}>
                {msg.role === 'user' ? <User className="w-4 h-4 text-white" /> : <Bot className="w-4 h-4 text-white" />}
              </div>
              <div className="space-y-1">
                <div className={cn(
                  "p-4 rounded-2xl text-sm leading-relaxed",
                  msg.role === 'user' 
                    ? "bg-indigo-500 text-white rounded-tr-none" 
                    : "bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-200 rounded-tl-none border border-slate-100 dark:border-slate-700 shadow-sm"
                )}>
                  <div className="prose dark:prose-invert prose-sm max-w-none">
                    <div className="markdown-body">
                      <ReactMarkdown>{msg.content}</ReactMarkdown>
                    </div>
                  </div>
                </div>
                <p className={cn(
                  "text-[10px] text-slate-400 dark:text-slate-500 font-bold",
                  msg.role === 'user' ? "text-right" : "text-left"
                )}>
                  {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </p>
              </div>
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex justify-start">
            <div className="flex gap-3 max-w-[85%]">
              <div className="w-8 h-8 rounded-xl bg-blue-500 flex items-center justify-center shrink-0 mt-1">
                <Bot className="w-4 h-4 text-white" />
              </div>
              <div className="bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700 p-4 rounded-2xl rounded-tl-none flex items-center gap-2 shadow-sm">
                <Loader2 className="w-4 h-4 text-blue-500 animate-spin" />
                <span className="text-sm text-slate-500 dark:text-slate-400 font-medium italic">AI đang trả lời...</span>
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Suggestions */}
      {messages.length < 4 && !isLoading && (
        <div className="px-5 py-3 flex gap-2 overflow-x-auto no-scrollbar">
          {SUGGESTIONS.map((s, i) => (
            <button
              key={i}
              onClick={() => handleSend(s)}
              className="whitespace-nowrap px-4 py-2 bg-slate-50 dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 border border-slate-100 dark:border-slate-700 rounded-full text-xs font-bold text-blue-500 dark:text-blue-400 transition-all shadow-sm"
            >
              {s}
            </button>
          ))}
        </div>
      )}

      {/* Input Area */}
      <div className="p-5 bg-white dark:bg-slate-900 border-t border-slate-100 dark:border-slate-800">
        <form 
          onSubmit={(e) => {
            e.preventDefault();
            handleSend();
          }}
          className="relative"
        >
          <input 
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            disabled={isLoading}
            placeholder="Đặt câu hỏi cho AI..."
            className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700 rounded-2xl px-5 py-4 pr-14 text-sm text-slate-800 dark:text-white focus:border-blue-500 outline-none transition-all shadow-inner"
          />
          <button 
            type="submit"
            disabled={!input.trim() || isLoading}
            className="absolute right-2 top-2 bottom-2 w-10 bg-blue-500 hover:bg-blue-600 disabled:bg-slate-200 dark:disabled:bg-slate-700 text-white rounded-xl flex items-center justify-center transition-all shadow-lg shadow-blue-500/20"
          >
            <Send className="w-4 h-4" />
          </button>
        </form>
        <p className="text-[10px] text-slate-400 dark:text-slate-600 text-center mt-3 font-medium">
          EduQuest AI có thể mắc sai sót. Hãy kiểm tra lại thông tin quan trọng.
        </p>
      </div>
    </motion.div>
  );
};
