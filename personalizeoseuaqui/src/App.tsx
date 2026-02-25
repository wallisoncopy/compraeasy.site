/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useRef } from 'react';
import { 
  User, 
  CheckSquare, 
  Palette, 
  FileText, 
  ChevronRight, 
  ChevronLeft, 
  Download, 
  Check,
  Calendar,
  ClipboardList,
  Target,
  Edit3,
  Layout,
  Image as ImageIcon
} from 'lucide-react';
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';

// --- Types ---

type ThemeColor = 'green' | 'pink' | 'neutral';

interface PlannerData {
  name: string;
  location: string;
  year: string;
  logo: string | null;
  sections: {
    cover: boolean;
    weeklyAgenda: 'none' | 'mon-fri' | 'mon-sat';
    monthlyPlanning: boolean;
    attendanceControl: boolean;
    evolutionRecord: boolean;
    yearlyGoals: boolean;
    freeNotes: boolean;
    routineChecklist: boolean;
  };
  theme: ThemeColor;
}

// --- Constants ---

const THEMES = {
  green: {
    primary: 'bg-emerald-600',
    secondary: 'bg-emerald-50',
    text: 'text-emerald-700',
    border: 'border-emerald-200',
    accent: 'emerald'
  },
  pink: {
    primary: 'bg-rose-400',
    secondary: 'bg-rose-50',
    text: 'text-rose-700',
    border: 'border-rose-200',
    accent: 'rose'
  },
  neutral: {
    primary: 'bg-stone-600',
    secondary: 'bg-stone-50',
    text: 'text-stone-700',
    border: 'border-stone-200',
    accent: 'stone'
  }
};

export default function App() {
  const [step, setStep] = useState(1);
  const [isGenerating, setIsGenerating] = useState(false);
  const [data, setData] = useState<PlannerData>({
    name: '',
    location: '',
    year: new Date().getFullYear().toString(),
    logo: null,
    sections: {
      cover: true,
      weeklyAgenda: 'mon-fri',
      monthlyPlanning: true,
      attendanceControl: true,
      evolutionRecord: true,
      yearlyGoals: true,
      freeNotes: true,
      routineChecklist: true,
    },
    theme: 'green'
  });

  const previewRef = useRef<HTMLDivElement>(null);

  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setData(prev => ({ ...prev, logo: reader.result as string }));
      };
      reader.readAsDataURL(file);
    }
  };

  const nextStep = () => setStep(s => Math.min(s + 1, 4));
  const prevStep = () => setStep(s => Math.max(s - 1, 1));

  const generatePDF = async () => {
    setIsGenerating(true);
    const pdf = new jsPDF('p', 'mm', 'a4');
    const pageWidth = pdf.internal.pageSize.getWidth();
    const pageHeight = pdf.internal.pageSize.getHeight();
    const margin = 20;
    const theme = THEMES[data.theme];
    
    // Helper to add header
    const addHeader = (title: string) => {
      pdf.setFontSize(10);
      pdf.setTextColor(150, 150, 150);
      pdf.text(`${data.name} | ${data.year}`, margin, 10);
      pdf.text(title, pageWidth - margin, 10, { align: 'right' });
      pdf.setDrawColor(200, 200, 200);
      pdf.line(margin, 12, pageWidth - margin, 12);
    };

    // 1. Cover
    if (data.sections.cover) {
      // Background color
      const rgb = data.theme === 'green' ? [16, 185, 129] : data.theme === 'pink' ? [251, 113, 133] : [87, 83, 78];
      pdf.setFillColor(rgb[0], rgb[1], rgb[2]);
      pdf.rect(0, 0, pageWidth, pageHeight, 'F');

      // White box
      pdf.setFillColor(255, 255, 255);
      pdf.roundedRect(margin, margin, pageWidth - (margin * 2), pageHeight - (margin * 2), 5, 5, 'F');

      if (data.logo) {
        try {
          pdf.addImage(data.logo, 'PNG', pageWidth / 2 - 25, 50, 50, 50);
        } catch (e) { console.error(e); }
      }

      pdf.setTextColor(rgb[0], rgb[1], rgb[2]);
      pdf.setFontSize(32);
      pdf.text('PLANNER', pageWidth / 2, 120, { align: 'center' });
      pdf.setFontSize(24);
      pdf.text('PSICOPEDAGÓGICO', pageWidth / 2, 135, { align: 'center' });
      
      pdf.setFontSize(18);
      pdf.text(data.name, pageWidth / 2, 180, { align: 'center' });
      pdf.setFontSize(14);
      pdf.text(data.location, pageWidth / 2, 190, { align: 'center' });
      
      pdf.setFontSize(48);
      pdf.text(data.year, pageWidth / 2, 240, { align: 'center' });
    }

    // 2. Monthly Planning (12 pages)
    if (data.sections.monthlyPlanning) {
      const months = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'];
      months.forEach(month => {
        pdf.addPage();
        addHeader(`Planejamento Mensal - ${month}`);
        pdf.setFontSize(22);
        pdf.setTextColor(50, 50, 50);
        pdf.text(month, margin, 30);
        
        // Grid for month
        const cellW = (pageWidth - (margin * 2)) / 7;
        const cellH = 30;
        pdf.setDrawColor(200, 200, 200);
        for (let i = 0; i < 6; i++) {
          for (let j = 0; j < 7; j++) {
            pdf.rect(margin + (j * cellW), 40 + (i * cellH), cellW, cellH);
          }
        }
        
        pdf.setFontSize(12);
        pdf.text('Notas e Objetivos do Mês:', margin, 230);
        pdf.rect(margin, 235, pageWidth - (margin * 2), 40);
      });
    }

    // 3. Weekly Agenda
    if (data.sections.weeklyAgenda !== 'none') {
      pdf.addPage();
      addHeader('Agenda Semanal');
      pdf.setFontSize(22);
      pdf.text('Agenda Semanal', margin, 30);
      
      const days = data.sections.weeklyAgenda === 'mon-fri' 
        ? ['Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta']
        : ['Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado'];
      
      const colW = (pageWidth - (margin * 2)) / (days.length > 5 ? 3 : 2);
      days.forEach((day, i) => {
        const x = margin + (i % (days.length > 5 ? 3 : 2)) * colW;
        const y = 45 + Math.floor(i / (days.length > 5 ? 3 : 2)) * 110;
        pdf.setFontSize(14);
        pdf.text(day, x + 5, y - 5);
        pdf.rect(x, y, colW - 5, 100);
      });
    }

    // 4. Attendance Control
    if (data.sections.attendanceControl) {
      pdf.addPage();
      addHeader('Controle de Atendimentos');
      pdf.setFontSize(22);
      pdf.text('Controle de Atendimentos', margin, 30);
      
      const rows = 20;
      const rowH = 10;
      const cols = [
        { name: 'Data', w: 30 },
        { name: 'Paciente', w: 80 },
        { name: 'Horário', w: 30 },
        { name: 'Status', w: 30 }
      ];
      
      let currentX = margin;
      cols.forEach(col => {
        pdf.rect(currentX, 40, col.w, rowH);
        pdf.setFontSize(10);
        pdf.text(col.name, currentX + 2, 46);
        for (let i = 1; i <= rows; i++) {
          pdf.rect(currentX, 40 + (i * rowH), col.w, rowH);
        }
        currentX += col.w;
      });
    }

    // 5. Evolution Record
    if (data.sections.evolutionRecord) {
      pdf.addPage();
      addHeader('Registro de Evolução');
      pdf.setFontSize(22);
      pdf.text('Registro de Evolução', margin, 30);
      
      pdf.setFontSize(12);
      pdf.text('Paciente:', margin, 45);
      pdf.line(margin + 20, 45, pageWidth - margin, 45);
      
      pdf.text('Data:', margin, 55);
      pdf.line(margin + 12, 55, margin + 60, 55);
      
      pdf.text('Observações:', margin, 70);
      pdf.rect(margin, 75, pageWidth - (margin * 2), 180);
    }

    // 6. Yearly Goals
    if (data.sections.yearlyGoals) {
      pdf.addPage();
      addHeader('Metas do Ano');
      pdf.setFontSize(22);
      pdf.text('Metas do Ano', margin, 30);
      
      for (let i = 0; i < 10; i++) {
        pdf.circle(margin + 5, 50 + (i * 20), 3);
        pdf.line(margin + 15, 50 + (i * 20), pageWidth - margin, 50 + (i * 20));
      }
    }

    // 7. Routine Checklist
    if (data.sections.routineChecklist) {
      pdf.addPage();
      addHeader('Checklist de Rotina Clínica');
      pdf.setFontSize(22);
      pdf.text('Rotina Clínica', margin, 30);
      
      const items = [
        'Organizar sala de atendimento',
        'Revisar prontuários do dia',
        'Preparar materiais lúdicos',
        'Enviar lembretes aos pais',
        'Registrar evoluções pendentes',
        'Organizar agenda da próxima semana',
        'Limpeza e higienização de materiais',
        'Controle financeiro diário'
      ];
      
      items.forEach((item, i) => {
        pdf.rect(margin, 50 + (i * 15), 6, 6);
        pdf.setFontSize(12);
        pdf.text(item, margin + 12, 55 + (i * 15));
      });
    }

    // 8. Free Notes
    if (data.sections.freeNotes) {
      pdf.addPage();
      addHeader('Anotações Livres');
      pdf.setFontSize(22);
      pdf.text('Anotações', margin, 30);
      
      for (let i = 0; i < 25; i++) {
        pdf.line(margin, 50 + (i * 8), pageWidth - margin, 50 + (i * 8));
      }
    }

    pdf.save(`Planner_Psicopedagogico_${data.year}.pdf`);
    setIsGenerating(false);
  };

  const theme = THEMES[data.theme];

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900">
      {/* Header */}
      <header className={`${theme.primary} text-white py-8 px-4 shadow-lg transition-colors duration-500`}>
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Planner Psicopedagógico</h1>
            <p className="opacity-90 mt-1">Personalize seu ano profissional com elegância</p>
          </div>
          <Layout className="w-12 h-12 opacity-20" />
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-12">
        {/* Stepper */}
        <div className="flex justify-between mb-12 relative">
          <div className="absolute top-1/2 left-0 w-full h-0.5 bg-slate-200 -translate-y-1/2 z-0"></div>
          {[1, 2, 3, 4].map((s) => (
            <div 
              key={s}
              className={`relative z-10 flex flex-col items-center transition-all duration-300 ${step >= s ? theme.text : 'text-slate-400'}`}
            >
              <div className={`w-10 h-10 rounded-full flex items-center justify-center border-2 bg-white transition-all duration-300 ${step >= s ? `${theme.border} ring-4 ring-white` : 'border-slate-200'}`}>
                {step > s ? <Check className="w-6 h-6" /> : s}
              </div>
              <span className="text-xs font-semibold mt-2 uppercase tracking-wider">
                {s === 1 ? 'Dados' : s === 2 ? 'Seções' : s === 3 ? 'Visual' : 'Gerar'}
              </span>
            </div>
          ))}
        </div>

        {/* Content Card */}
        <div className="bg-white rounded-3xl shadow-xl border border-slate-100 overflow-hidden">
          <div className="p-8 md:p-12">
            
            {/* Step 1: Professional Data */}
            {step === 1 && (
              <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                <div className="flex items-center gap-3 mb-2">
                  <User className={theme.text} />
                  <h2 className="text-2xl font-bold">Dados Profissionais</h2>
                </div>
                
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-slate-600">Nome da Psicopedagoga</label>
                    <input 
                      type="text" 
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none transition-all"
                      placeholder="Ex: Maria Silva"
                      value={data.name}
                      onChange={e => setData(prev => ({ ...prev, name: e.target.value }))}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-slate-600">Cidade / Estado</label>
                    <input 
                      type="text" 
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none transition-all"
                      placeholder="Ex: São Paulo / SP"
                      value={data.location}
                      onChange={e => setData(prev => ({ ...prev, location: e.target.value }))}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-slate-600">Ano do Planner</label>
                    <input 
                      type="number" 
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none transition-all"
                      value={data.year}
                      onChange={e => setData(prev => ({ ...prev, year: e.target.value }))}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-slate-600">Logo (Opcional)</label>
                    <div className="relative">
                      <input 
                        type="file" 
                        accept="image/*"
                        className="hidden" 
                        id="logo-upload"
                        onChange={handleLogoUpload}
                      />
                      <label 
                        htmlFor="logo-upload"
                        className="flex items-center justify-center gap-2 w-full px-4 py-3 rounded-xl border-2 border-dashed border-slate-200 hover:border-emerald-400 cursor-pointer transition-all bg-slate-50"
                      >
                        {data.logo ? (
                          <div className="flex items-center gap-2">
                            <img src={data.logo} alt="Logo" className="w-8 h-8 object-contain" />
                            <span className="text-sm text-emerald-600 font-medium">Logo carregada</span>
                          </div>
                        ) : (
                          <>
                            <ImageIcon className="w-5 h-5 text-slate-400" />
                            <span className="text-sm text-slate-500">Clique para enviar</span>
                          </>
                        )}
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Step 2: Sections */}
            {step === 2 && (
              <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                <div className="flex items-center gap-3 mb-2">
                  <CheckSquare className={theme.text} />
                  <h2 className="text-2xl font-bold">Escolha das Seções</h2>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  {[
                    { id: 'cover', label: 'Capa Personalizada', icon: <FileText className="w-4 h-4" /> },
                    { id: 'monthlyPlanning', label: 'Planejamento Mensal', icon: <Calendar className="w-4 h-4" /> },
                    { id: 'attendanceControl', label: 'Controle de Atendimentos', icon: <ClipboardList className="w-4 h-4" /> },
                    { id: 'evolutionRecord', label: 'Registro de Evolução', icon: <Edit3 className="w-4 h-4" /> },
                    { id: 'yearlyGoals', label: 'Metas do Ano', icon: <Target className="w-4 h-4" /> },
                    { id: 'routineChecklist', label: 'Checklist de Rotina', icon: <CheckSquare className="w-4 h-4" /> },
                    { id: 'freeNotes', label: 'Anotações Livres', icon: <Edit3 className="w-4 h-4" /> },
                  ].map(section => (
                    <label 
                      key={section.id}
                      className={`flex items-center gap-4 p-4 rounded-2xl border-2 cursor-pointer transition-all ${
                        data.sections[section.id as keyof typeof data.sections] 
                          ? `${theme.border} ${theme.secondary}` 
                          : 'border-slate-100 hover:border-slate-200'
                      }`}
                    >
                      <input 
                        type="checkbox" 
                        className="hidden"
                        checked={!!data.sections[section.id as keyof typeof data.sections]}
                        onChange={() => setData(prev => ({
                          ...prev,
                          sections: {
                            ...prev.sections,
                            [section.id]: !prev.sections[section.id as keyof typeof data.sections]
                          }
                        }))}
                      />
                      <div className={`p-2 rounded-lg ${data.sections[section.id as keyof typeof data.sections] ? theme.primary + ' text-white' : 'bg-slate-100 text-slate-400'}`}>
                        {section.icon}
                      </div>
                      <span className="font-medium">{section.label}</span>
                    </label>
                  ))}
                </div>

                <div className="space-y-4 pt-4">
                  <h3 className="font-semibold text-slate-700">Configuração da Agenda Semanal</h3>
                  <div className="flex flex-wrap gap-4">
                    {[
                      { id: 'none', label: 'Sem Agenda' },
                      { id: 'mon-fri', label: 'Segunda a Sexta' },
                      { id: 'mon-sat', label: 'Segunda a Sábado' },
                    ].map(opt => (
                      <button
                        key={opt.id}
                        onClick={() => setData(prev => ({ ...prev, sections: { ...prev.sections, weeklyAgenda: opt.id as any } }))}
                        className={`px-6 py-2 rounded-full border-2 transition-all ${
                          data.sections.weeklyAgenda === opt.id 
                            ? `${theme.primary} text-white border-transparent` 
                            : 'border-slate-200 text-slate-600 hover:border-slate-300'
                        }`}
                      >
                        {opt.label}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Step 3: Visual Customization */}
            {step === 3 && (
              <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                <div className="flex items-center gap-3 mb-2">
                  <Palette className={theme.text} />
                  <h2 className="text-2xl font-bold">Personalização Visual</h2>
                </div>

                <div className="space-y-6">
                  <div className="space-y-4">
                    <h3 className="font-semibold text-slate-700">Cor do Tema</h3>
                    <div className="flex gap-6">
                      {(['green', 'pink', 'neutral'] as ThemeColor[]).map(c => (
                        <button
                          key={c}
                          onClick={() => setData(prev => ({ ...prev, theme: c }))}
                          className={`w-16 h-16 rounded-2xl border-4 transition-all flex items-center justify-center ${
                            data.theme === c ? 'border-slate-900 scale-110' : 'border-transparent'
                          } ${THEMES[c].primary}`}
                        >
                          {data.theme === c && <Check className="text-white w-8 h-8" />}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="p-6 rounded-3xl bg-slate-50 border border-slate-200">
                    <h3 className="font-semibold text-slate-700 mb-4">Preview da Capa</h3>
                    <div className="aspect-[3/4] max-w-[200px] mx-auto bg-white shadow-lg rounded-lg overflow-hidden border border-slate-200 relative">
                      <div className={`absolute inset-0 ${theme.primary} opacity-10`}></div>
                      <div className="p-4 flex flex-col items-center justify-center h-full text-center space-y-2">
                        {data.logo && <img src={data.logo} alt="Logo Preview" className="w-12 h-12 object-contain mb-2" />}
                        <div className={`text-[10px] font-bold ${theme.text} uppercase tracking-widest`}>Planner</div>
                        <div className={`text-[8px] font-medium ${theme.text} opacity-80 uppercase`}>Psicopedagógico</div>
                        <div className="h-px w-8 bg-slate-200 my-2"></div>
                        <div className="text-[8px] font-semibold text-slate-700">{data.name || 'Seu Nome'}</div>
                        <div className="text-[14px] font-black text-slate-900 mt-4">{data.year}</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Step 4: Generate */}
            {step === 4 && (
              <div className="space-y-8 text-center animate-in fade-in slide-in-from-bottom-4 duration-500">
                <div className="flex flex-col items-center gap-4">
                  <div className={`w-20 h-20 rounded-full ${theme.secondary} flex items-center justify-center`}>
                    <FileText className={`w-10 h-10 ${theme.text}`} />
                  </div>
                  <h2 className="text-3xl font-bold">Tudo Pronto!</h2>
                  <p className="text-slate-600 max-w-md mx-auto">
                    Seu planner personalizado foi configurado com sucesso. 
                    Clique no botão abaixo para gerar o arquivo PDF pronto para impressão em formato A4.
                  </p>
                </div>

                <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200 text-left space-y-3">
                  <h3 className="font-bold text-slate-800">Resumo do seu Planner:</h3>
                  <ul className="grid grid-cols-2 gap-2 text-sm text-slate-600">
                    <li className="flex items-center gap-2"><Check className="w-4 h-4 text-emerald-500" /> {data.name}</li>
                    <li className="flex items-center gap-2"><Check className="w-4 h-4 text-emerald-500" /> Ano {data.year}</li>
                    <li className="flex items-center gap-2"><Check className="w-4 h-4 text-emerald-500" /> Tema {data.theme}</li>
                    <li className="flex items-center gap-2"><Check className="w-4 h-4 text-emerald-500" /> {Object.values(data.sections).filter(v => v === true || v !== 'none').length} Seções</li>
                  </ul>
                </div>

                <button
                  onClick={generatePDF}
                  disabled={isGenerating}
                  className={`w-full py-4 rounded-2xl text-white font-bold text-lg shadow-xl hover:shadow-2xl transition-all flex items-center justify-center gap-3 ${theme.primary} ${isGenerating ? 'opacity-70 cursor-not-allowed' : 'hover:scale-[1.02] active:scale-95'}`}
                >
                  {isGenerating ? (
                    <>
                      <div className="w-6 h-6 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
                      Gerando PDF...
                    </>
                  ) : (
                    <>
                      <Download className="w-6 h-6" />
                      Baixar Planner em PDF
                    </>
                  )}
                </button>
              </div>
            )}

          </div>

          {/* Footer Navigation */}
          <div className="px-8 py-6 bg-slate-50 border-t border-slate-100 flex justify-between items-center">
            <button
              onClick={prevStep}
              disabled={step === 1}
              className={`flex items-center gap-2 font-semibold transition-all ${step === 1 ? 'text-slate-300 cursor-not-allowed' : 'text-slate-600 hover:text-slate-900'}`}
            >
              <ChevronLeft className="w-5 h-5" />
              Anterior
            </button>
            
            {step < 4 && (
              <button
                onClick={nextStep}
                className={`flex items-center gap-2 px-8 py-3 rounded-xl text-white font-bold shadow-lg transition-all hover:scale-105 active:scale-95 ${theme.primary}`}
              >
                Próximo
                <ChevronRight className="w-5 h-5" />
              </button>
            )}
          </div>
        </div>

        {/* Tips */}
        <div className="mt-12 text-center text-slate-400 text-sm">
          <p>Dica: Para melhores resultados, imprima em papel de gramatura 90g ou superior.</p>
        </div>
      </main>
    </div>
  );
}
