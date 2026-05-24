import React, { useState, useRef, useEffect } from 'react';
import { MessageSquare, Send, PhoneCall, HelpCircle, AlertTriangle, RefreshCw, Star } from 'lucide-react';
import { GlassCard } from './GlassCard';
import { Message } from '../types';

export function OnlineSupport() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'msg-1',
      sender: 'support',
      text: "Hello! Welcome to the 24/7 MedFlow Triage Support Desk. How can our clinic coordinators support your appointment scheduling or pharmacy stock lookup today?",
      timestamp: '05:40 AM'
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Auto scroll logic
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim()) return;

    const userMsg: Message = {
      id: `msg-${Math.floor(Math.random() * 10000)}`,
      sender: 'user',
      text: inputText,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMsg]);
    const query = inputText.toLowerCase();
    setInputText('');
    setIsTyping(true);

    // Simulated medical dispatcher response matching key terms
    setTimeout(() => {
      let replyText = "Thank you for signaling the support desk. A verified medical registration officer has been flagged. Is this mapping to an outpatient checkup reservation?";

      if (query.includes('emergency') || query.includes('accident') || query.includes('pain') || query.includes('chest')) {
        replyText = "⚠️ RED SIGNAL DETECTED: If pain is active or severe, please dial our direct dispatch trauma coordinator hotline at 1-800-MED-FLOW immediately. Do not complete outpatient forms.";
      } else if (query.includes('doctor') || query.includes('appointment') || query.includes('book')) {
        replyText = "Our active specialist catalog includes Dr. Carter (Cardiology), Dr. Vance (Pediatrics), Dr. Surbhi (Neurology) amongst others. Go to the 'Book Appointment' portal on top to schedule an exact hour.";
      } else if (query.includes('pharmacy') || query.includes('medicine') || query.includes('stock') || query.includes('pill')) {
        replyText = "Our active pharmaceutical stock catalog is fully digital and cataloged live. Please browse the 'Pharmacy Stock' portal on top to check medication prices and availability.";
      } else if (query.includes('price') || query.includes('cost') || query.includes('fee')) {
        replyText = "All diagnostic procedures, specialized MRI scans, blood screens, and clinical consultation prices are fully cataloged under our 'Services & Pricing' panel.";
      }

      const supportMsg: Message = {
        id: `msg-${Math.floor(Math.random() * 10000)}`,
        sender: 'support',
        text: replyText,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };

      setMessages(prev => [...prev, supportMsg]);
      setIsTyping(false);
    }, 1200);
  };

  const faqItems = [
    { q: 'How do I request prescription refills?', a: 'Go to your patient dashboard under "Active Pharmacological Prescriptions" or coordinate directly with our outpatient doctors.' },
    { q: 'What should I do prior to a diagnostic lab test?', a: 'Please fast for 8 to 12 hours previous to your lab slot. Only drink plain water. Avoid sugar intake.' },
    { q: 'Is ambulance dispatch covered by insurance?', a: 'Yes, emergency trauma ambulance coordinate requests are integrated with gold plan insurances.' }
  ];

  return (
    <div className="space-y-8 pb-12 animate-fade-in text-left font-sans" id="online-support-desk">
      
      <div className="text-left space-y-2">
        <h1 className="font-serif text-3xl font-bold text-white">Online Digital Support Desk</h1>
        <p className="text-xs text-slate-400">
          Access automated clinical sorting rules, download FAQ sheets, or trigger 24/7 support chat sessions.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* Chat window column (8 columns) */}
        <div className="lg:col-span-8">
          <GlassCard className="h-[500px] flex flex-col justify-between overflow-hidden relative">
            
            {/* Triage header */}
            <div className="bg-slate-950 p-4 border-b border-slate-800 flex justify-between items-center shrink-0">
              <div className="flex items-center gap-2.5">
                <div className="w-2.5 h-2.5 rounded-full bg-[#89C540] animate-pulse" />
                <div className="text-left">
                  <h3 className="text-xs font-bold text-white uppercase tracking-wider">Clinical Support Session</h3>
                  <p className="text-[10px] text-[#89C540]">Active - Average Response Time &lt; 1 min</p>
                </div>
              </div>
              <button 
                onClick={() => setMessages([messages[0]])}
                className="p-1 text-slate-500 hover:text-white rounded transition-colors"
                title="Clear Chat Logs"
              >
                <RefreshCw className="w-4 h-4" />
              </button>
            </div>

            {/* Message bubble stream */}
            <div 
              ref={scrollRef}
              className="flex-1 p-5 overflow-y-auto space-y-4 bg-slate-900/10"
            >
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`max-w-[75%] rounded-2xl p-4 text-xs ${
                    msg.sender === 'user'
                      ? 'bg-yellow-400 text-slate-900 rounded-tr-none font-medium'
                      : 'bg-slate-950/80 text-slate-200 rounded-tl-none border border-slate-800/80'
                  }`}>
                    <p className="whitespace-pre-wrap leading-relaxed">{msg.text}</p>
                    <span className={`block text-[9px] mt-1 text-right ${msg.sender === 'user' ? 'text-slate-700' : 'text-slate-500'}`}>
                      {msg.timestamp}
                    </span>
                  </div>
                </div>
              ))}

              {isTyping && (
                <div className="flex justify-start">
                  <div className="bg-slate-950/80 text-slate-400 rounded-2xl p-3 text-xs rounded-tl-none border border-slate-800 flex gap-1 items-center">
                    <span className="w-1.5 h-1.5 rounded-full bg-slate-500 animate-bounce" style={{ animationDelay: '0ms' }} />
                    <span className="w-1.5 h-1.5 rounded-full bg-slate-500 animate-bounce" style={{ animationDelay: '150ms' }} />
                    <span className="w-1.5 h-1.5 rounded-full bg-slate-500 animate-bounce" style={{ animationDelay: '300ms' }} />
                  </div>
                </div>
              )}
            </div>

            {/* Input message form bottom */}
            <form onSubmit={handleSendMessage} className="bg-slate-950 p-3 border-t border-slate-850 flex gap-2 shrink-0">
              <input
                type="text"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                placeholder="Type your clinical help query here..."
                className="flex-1 bg-slate-900 text-slate-100 text-xs px-4 py-3 rounded-xl border border-slate-800 outline-none focus:border-[#89C540]"
              />
              <button
                type="submit"
                className="px-5 py-3 bg-[#FFEB3B] hover:bg-yellow-400 text-slate-900 font-bold rounded-xl transition-all flex items-center gap-1.5 font-sans cursor-pointer"
              >
                <Send className="w-4 h-4" />
                <span className="hidden sm:inline">Send</span>
              </button>
            </form>

          </GlassCard>
        </div>

        {/* Support helper side widget cards (4 columns) */}
        <div className="lg:col-span-4 space-y-6">
          {/* Urgent trauma alert */}
          <GlassCard className="p-5 border-l-4 border-l-rose-600 bg-red-950/10">
            <div className="flex items-start gap-3">
              <div className="bg-rose-600/10 p-2 rounded-lg text-rose-500 shrink-0">
                <AlertTriangle className="w-5 h-5 animate-pulse" />
              </div>
              <div className="space-y-1">
                <h4 className="text-xs font-bold text-rose-300 uppercase tracking-wider">Urgent Outpatient Hotline</h4>
                <p className="text-[11px] text-slate-400 leading-relaxed">
                  In case of severe coronary indicators, open lacerations, or stroke signals, proceed directly to emergency services dialing:
                </p>
                <a 
                  href="tel:1-800-555-5555"
                  className="inline-flex items-center gap-1.5 text-xs text-rose-400 hover:text-rose-300 font-bold font-mono tracking-wider pt-1 hover:underline cursor-pointer"
                >
                  <PhoneCall className="w-4 h-4 animate-bounce" />
                  1-800-MED-FLOW
                </a>
              </div>
            </div>
          </GlassCard>

          {/* Quick FAQ accordion */}
          <GlassCard className="p-5 space-y-4">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-1.5">
              <HelpCircle className="w-4 z-10 h-4 text-[#89C540]" />
              Support Help Desk FAQ
            </h4>

            <div className="space-y-3.5 max-h-[280px] overflow-y-auto pr-1">
              {faqItems.map((faq, idx) => (
                <div key={idx} className="space-y-1 p-2.5 bg-slate-950/40 rounded-xl border border-slate-850">
                  <h5 className="text-[11px] font-bold text-white text-left">{faq.q}</h5>
                  <p className="text-[10px] text-slate-400 leading-normal text-left">{faq.a}</p>
                </div>
              ))}
            </div>
          </GlassCard>

        </div>

      </div>

    </div>
  );
}
