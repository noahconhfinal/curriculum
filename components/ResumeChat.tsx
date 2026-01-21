
import React, { useState, useRef, useEffect } from 'react';
import { GoogleGenAI } from "@google/genai";
import { Send, Bot, Loader2, Sparkles } from 'lucide-react';
import { resumeData } from '../data';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

const ResumeChat: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  const [messages, setMessages] = useState<Message[]>([
    { role: 'assistant', content: 'Hola, soy el asistente inteligente de Noah. He analizado su trayectoria en el 061 y Cruz Roja. ¿Qué te gustaría saber sobre sus capacidades o formación?' }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isLoading]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', content: userMessage }]);
    setIsLoading(true);

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: `User is asking about Noah Pieras's professional profile. 
        Context: ${JSON.stringify(resumeData)}
        
        Rules:
        1. Be professional, concise, and direct.
        2. Answer in Spanish.
        3. Maintain a tone of a professional recruiter/assistant.
        4. Focus on medical/emergency expertise.
        
        Question: ${userMessage}`,
      });

      const reply = response.text || "Lo siento, no he podido recuperar la información en este momento.";
      setMessages(prev => [...prev, { role: 'assistant', content: reply }]);
    } catch (error) {
      console.error("AI Error:", error);
      setMessages(prev => [...prev, { role: 'assistant', content: "Error de conexión. Por favor, intenta de nuevo." }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-full bg-white">
      {/* Chat Header */}
      <div className="bg-slate-900 text-white p-6 flex justify-between items-center shrink-0">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center">
            <Sparkles size={18} className="text-white" />
          </div>
          <div>
            <span className="block font-extrabold text-sm tracking-tight">AI Assistant</span>
            <span className="block text-[10px] text-blue-400 font-bold uppercase tracking-widest">En línea</span>
          </div>
        </div>
      </div>

      {/* Messages */}
      <div ref={scrollRef} className="flex-1 overflow-y-auto p-6 space-y-6 bg-[#fcfdfe]">
        {messages.map((m, i) => (
          <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'} animate-in fade-in duration-300`}>
            <div className={`max-w-[85%] p-4 rounded-[1.5rem] text-sm leading-relaxed shadow-sm ${
              m.role === 'user' 
                ? 'bg-slate-900 text-white rounded-br-none' 
                : 'bg-white text-slate-700 border border-slate-100 rounded-bl-none font-medium'
            }`}>
              {m.content}
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-white p-4 rounded-[1.5rem] border border-slate-100 flex items-center gap-3 text-xs text-slate-400 font-bold uppercase tracking-widest">
              <Loader2 size={16} className="animate-spin text-blue-600" />
              Generando respuesta
            </div>
          </div>
        )}
      </div>

      {/* Input Area */}
      <div className="p-6 bg-white border-t border-slate-100 shrink-0">
        <div className="flex gap-2 bg-slate-50 p-2 rounded-2xl border border-slate-100 focus-within:border-blue-300 focus-within:ring-4 focus-within:ring-blue-100 transition-all">
          <input 
            type="text" 
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Escribe tu consulta profesional..."
            className="flex-1 bg-transparent border-none rounded-xl px-4 py-2 text-sm focus:ring-0 outline-none font-medium text-slate-800"
          />
          <button 
            onClick={handleSend}
            disabled={isLoading || !input.trim()}
            className="w-10 h-10 bg-slate-900 text-white rounded-xl hover:bg-blue-600 disabled:opacity-20 disabled:grayscale transition-all flex items-center justify-center shrink-0"
          >
            <Send size={18} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ResumeChat;
