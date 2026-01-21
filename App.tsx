
import React, { useState, useEffect, useRef } from 'react';
import { Linkedin, MapPin, Briefcase, GraduationCap, MessageSquare, X, ChevronRight, ExternalLink } from 'lucide-react';
import { resumeData } from './data';
import ResumeChat from './components/ResumeChat';

const RevealItem: React.FC<{ children: React.ReactNode; delay?: number }> = ({ children, delay = 0 }) => {
  const [isVisible, setIsVisible] = useState(false);
  const domRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      });
    }, { 
      threshold: 0.1,
      // Adding a slight rootMargin ensures items start animating just before they enter the viewport
      rootMargin: "0px 0px -50px 0px" 
    });

    const { current } = domRef;
    if (current) observer.observe(current);
    
    return () => {
      if (current) observer.unobserve(current);
    };
  }, []);

  return (
    <div
      ref={domRef}
      className={`reveal ${isVisible ? 'active' : ''}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
};

const App: React.FC = () => {
  const [isChatOpen, setIsChatOpen] = useState(false);

  return (
    <div className="min-h-screen flex flex-col md:flex-row relative">
      {/* Sidebar - Desktop / Header - Mobile */}
      <aside className="w-full md:w-[350px] lg:w-[400px] bg-[#0f172a] text-white flex-shrink-0 md:sticky md:top-0 md:h-screen overflow-y-auto z-30">
        <div className="flex flex-col h-full p-8 lg:p-12">
          {/* Profile Header */}
          <div className="mb-12 text-center md:text-left">
            <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl mb-6 mx-auto md:mx-0 flex items-center justify-center shadow-lg shadow-blue-500/20 animate-in zoom-in duration-1000">
              <span className="text-3xl font-extrabold tracking-tighter">NP</span>
            </div>
            <h1 className="text-4xl font-extrabold tracking-tight mb-2 text-white animate-in slide-in-from-left duration-700">{resumeData.personalInfo.name}</h1>
            <p className="text-blue-400 font-medium text-lg uppercase tracking-wider text-sm animate-in slide-in-from-left duration-1000 delay-150">{resumeData.personalInfo.title}</p>
          </div>

          <div className="space-y-10 flex-grow">
            {/* Quick Connect */}
            <section className="animate-in slide-in-from-left duration-1000 delay-300">
              <h2 className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-500 mb-6">Información</h2>
              <ul className="space-y-4">
                <li className="group">
                  <a href={`https://${resumeData.personalInfo.linkedin}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-slate-300 hover:text-white transition-all">
                    <div className="p-2.5 bg-slate-800 rounded-xl group-hover:bg-blue-600 transition-colors">
                      <Linkedin size={18} />
                    </div>
                    <span className="text-sm font-medium">LinkedIn Profile</span>
                    <ExternalLink size={12} className="opacity-0 group-hover:opacity-100 transition-opacity ml-auto" />
                  </a>
                </li>
                <li className="flex items-center gap-3 text-slate-300">
                  <div className="p-2.5 bg-slate-800 rounded-xl">
                    <MapPin size={18} />
                  </div>
                  <span className="text-sm font-medium">{resumeData.personalInfo.location}</span>
                </li>
              </ul>
            </section>

            {/* Skills / Aptitudes */}
            <section className="animate-in slide-in-from-left duration-1000 delay-500">
              <h2 className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-500 mb-6">Aptitudes Clave</h2>
              <div className="flex flex-wrap gap-2">
                {resumeData.skills.map((skill, idx) => (
                  <span key={idx} className="px-3.5 py-1.5 bg-slate-800/50 border border-slate-700/50 rounded-lg text-xs font-semibold text-slate-300 hover:border-blue-500/50 hover:text-white transition-all">
                    {skill}
                  </span>
                ))}
              </div>
            </section>

            {/* Languages */}
            <section className="animate-in slide-in-from-left duration-1000 delay-700">
              <h2 className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-500 mb-6">Idiomas</h2>
              <ul className="space-y-4">
                {resumeData.languages.map((lang, idx) => (
                  <li key={idx} className="group flex flex-col gap-1.5">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-semibold group-hover:text-blue-400 transition-colors">{lang.name}</span>
                      <span className="text-[10px] text-slate-500 font-bold uppercase">{lang.proficiency}</span>
                    </div>
                    <div className="h-1 w-full bg-slate-800 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-blue-500 transition-all duration-1000" 
                        style={{ width: lang.proficiency === 'Nativo' ? '100%' : '30%' }}
                      ></div>
                    </div>
                  </li>
                ))}
              </ul>
            </section>
          </div>

          <div className="mt-12 pt-8 border-t border-slate-800/50 text-[10px] font-bold text-slate-600 uppercase tracking-widest text-center md:text-left">
            &copy; {new Date().getFullYear()} {resumeData.personalInfo.name}
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 overflow-x-hidden">
        <div className="max-w-4xl mx-auto px-6 py-12 md:px-12 lg:px-20 lg:py-24 space-y-24">
          
          {/* Summary / About */}
          <RevealItem>
            <section>
              <div className="inline-block px-3 py-1 bg-blue-50 text-blue-600 text-[10px] font-extrabold uppercase tracking-widest rounded-md mb-6">
                Perfil Profesional
              </div>
              <h2 className="text-3xl font-extrabold text-slate-900 mb-8 tracking-tight">Sobre mí</h2>
              <p className="text-xl text-slate-500 leading-relaxed font-light italic">
                "{resumeData.personalInfo.summary}"
              </p>
            </section>
          </RevealItem>

          {/* Work Experience */}
          <section>
            <RevealItem>
              <div className="flex items-center gap-4 mb-12">
                <div className="w-12 h-12 bg-blue-600 text-white rounded-2xl flex items-center justify-center shadow-lg shadow-blue-600/20">
                  <Briefcase size={24} />
                </div>
                <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">Trayectoria Profesional</h2>
              </div>
            </RevealItem>
            
            <div className="space-y-10 relative before:absolute before:left-[1.35rem] before:top-2 before:bottom-2 before:w-[2px] before:bg-slate-100">
              {resumeData.experience.map((exp, idx) => (
                <RevealItem key={idx} delay={idx * 150}>
                  <div className="relative pl-12 group">
                    <div className="absolute left-0 top-1.5 w-11 h-11 bg-white border-2 border-slate-100 rounded-xl flex items-center justify-center group-hover:border-blue-500 transition-all z-10 shadow-sm group-hover:shadow-md">
                      <ChevronRight size={18} className="text-slate-400 group-hover:text-blue-600 group-hover:translate-x-0.5 transition-all" />
                    </div>
                    
                    <div className="bg-white p-6 rounded-2xl border border-slate-100 hover:border-slate-200 hover:shadow-xl hover:shadow-slate-200/40 transition-all duration-300 hover-lift">
                      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-2 mb-4">
                        <div>
                          <h3 className="text-xl font-extrabold text-slate-900 group-hover:text-blue-600 transition-colors">{exp.company}</h3>
                          <div className="text-blue-600 font-bold text-sm tracking-wide">{exp.role}</div>
                        </div>
                        <div className="px-3 py-1 bg-slate-50 text-slate-500 text-[10px] font-bold uppercase rounded-lg border border-slate-100 whitespace-nowrap">
                          {exp.period}
                        </div>
                      </div>
                      <div className="flex items-center gap-4 text-xs font-semibold text-slate-400 mb-4">
                        <span className="flex items-center gap-1.5"><MapPin size={14} /> {exp.location}</span>
                        <span className="w-1 h-1 bg-slate-300 rounded-full"></span>
                        <span>{exp.duration}</span>
                      </div>
                      <p className="text-slate-500 leading-relaxed text-sm font-medium">{exp.description}</p>
                    </div>
                  </div>
                </RevealItem>
              ))}
            </div>
          </section>

          {/* Education */}
          <section>
            <RevealItem>
              <div className="flex items-center gap-4 mb-12">
                <div className="w-12 h-12 bg-indigo-600 text-white rounded-2xl flex items-center justify-center shadow-lg shadow-indigo-600/20">
                  <GraduationCap size={24} />
                </div>
                <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">Formación Académica</h2>
              </div>
            </RevealItem>
            
            <div className="grid sm:grid-cols-1 gap-6">
              {resumeData.education.map((edu, idx) => (
                <RevealItem key={idx} delay={idx * 150}>
                  <div className="p-8 bg-gradient-to-br from-slate-50 to-white rounded-3xl border border-slate-100 hover:border-indigo-200 transition-all group hover-lift shadow-sm">
                    <h3 className="text-xl font-extrabold text-slate-900 mb-2 group-hover:text-indigo-600 transition-colors">{edu.degree}</h3>
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                      <div className="text-slate-500 font-bold tracking-wide flex items-center gap-2">
                        <span className="w-6 h-[2px] bg-indigo-500"></span>
                        {edu.institution}
                      </div>
                      <div className="text-sm font-bold text-slate-400 bg-white px-4 py-1.5 rounded-full border border-slate-100 shadow-sm">
                        {edu.period}
                      </div>
                    </div>
                  </div>
                </RevealItem>
              ))}
            </div>
          </section>

          {/* Contact CTA */}
          <RevealItem>
            <section className="relative overflow-hidden bg-slate-900 rounded-[2.5rem] p-12 lg:p-16 text-center shadow-2xl shadow-slate-900/40">
              {/* Background elements */}
              <div className="absolute -top-24 -right-24 w-64 h-64 bg-blue-500/10 blur-[80px] rounded-full"></div>
              <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-indigo-500/10 blur-[80px] rounded-full"></div>
              
              <div className="relative z-10">
                <h2 className="text-4xl font-extrabold text-white mb-6 tracking-tight">Impulsemos juntos la excelencia sanitaria</h2>
                <p className="text-slate-400 text-lg mb-10 max-w-xl mx-auto font-medium">
                  Disponible para integrarme en equipos de alto rendimiento en emergencias y coordinación de servicios de salud.
                </p>
                <div className="flex flex-col sm:flex-row justify-center gap-4">
                  <a 
                    href={`https://${resumeData.personalInfo.linkedin}`} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="px-10 py-4 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-2xl transition-all shadow-xl shadow-blue-600/20 active:scale-95 flex items-center justify-center gap-2 group"
                  >
                    <Linkedin size={20} className="group-hover:scale-110 transition-transform" /> Conectar en LinkedIn
                  </a>
                </div>
              </div>
            </section>
          </RevealItem>

        </div>
      </main>

      {/* Floating AI Chat Button */}
      <button 
        onClick={() => setIsChatOpen(!isChatOpen)}
        className="fixed bottom-8 right-8 w-16 h-16 bg-slate-900 hover:bg-slate-800 text-white rounded-2xl shadow-2xl flex items-center justify-center transition-all hover:scale-105 active:scale-95 z-50 group border border-slate-700/50"
      >
        {isChatOpen ? <X size={28} /> : <MessageSquare size={28} className="group-hover:rotate-12 transition-transform" />}
        {!isChatOpen && (
          <span className="absolute right-20 bg-white text-slate-900 px-3 py-1.5 rounded-xl text-xs font-bold border border-slate-200 shadow-xl pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
            Pregúntame algo
          </span>
        )}
      </button>

      {/* Chat Component */}
      {isChatOpen && (
        <div className="fixed bottom-28 right-8 w-[calc(100vw-4rem)] max-w-md bg-white rounded-[2rem] shadow-[0_20px_50px_rgba(0,0,0,0.15)] border border-slate-100 z-40 overflow-hidden flex flex-col h-[550px] animate-in slide-in-from-bottom-4 duration-500">
          <ResumeChat onClose={() => setIsChatOpen(false)} />
        </div>
      )}
    </div>
  );
};

export default App;
