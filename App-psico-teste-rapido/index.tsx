
/**
 * APP KIT PSICOPEDAGOGO PRO - Lógica Central
 */

export {};

// --- Types for global objects to fix window property errors ---
declare global {
    interface Window {
        router: {
            navigate: (tab: string) => void;
            updateUI: () => void;
            render: () => void;
        };
        openStudentModal: () => void;
        closeStudentModal: () => void;
        openStudentDetail: (id: string) => void;
        startNewSession: () => void;
        editSession: (id: string) => void;
        deleteStudent: (id: string) => void;
        generateSessionReport: (id: string) => void;
        downloadPdf: (id: string) => Promise<void>;
        deleteReport: (id: string) => void;
        saveTest: (type: string, data: any) => void;
        setFluencyLevel: (l: string) => void;
        fluErr: (t: string) => void;
        ansPho: (i: number) => void;
        hitAtt: () => void;
        saveWriting: () => void;
        jspdf: any;
        html2canvas: any;
    }
}

// Fix for html2canvas not being found by declaring it locally via window
const html2canvas = (window as any).html2canvas;

// --- Banco de Dados Local ---
const DB = {
    // Fix: Add explicit any to def to avoid incorrect inference as any[] when an object is passed
    get: (key: string, def: any = []) => JSON.parse(localStorage.getItem(key) || JSON.stringify(def)),
    set: (key: string, val: any) => localStorage.setItem(key, JSON.stringify(val)),
    init() {
        if (!localStorage.getItem('psy_profile')) this.set('psy_profile', { name: '', city: '', phone: '', email: '', signature: '' });
        if (!localStorage.getItem('psy_students')) this.set('psy_students', []);
        if (!localStorage.getItem('psy_sessions')) this.set('psy_sessions', []);
        if (!localStorage.getItem('psy_reports')) this.set('psy_reports', []);
    }
};

// --- Estado Global ---
const State = {
    currentTab: 'home',
    activeStudentId: null as string | null,
    activeSessionId: null as string | null,
    tempTestData: {} as any
};

// --- Utilitários ---
const Utils = {
    id: () => Math.random().toString(36).substr(2, 9),
    date: (d: string) => new Date(d).toLocaleDateString('pt-BR'),
    age: (dob: string) => {
        if (!dob) return '';
        const today = new Date();
        const birthDate = new Date(dob);
        let age = today.getFullYear() - birthDate.getFullYear();
        const m = today.getMonth() - birthDate.getMonth();
        if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) age--;
        return age;
    }
};

// --- Roteador ---
window.router = {
    navigate(tab: string) {
        State.currentTab = tab;
        this.render();
        this.updateUI();
    },
    updateUI() {
        document.querySelectorAll('.nav-btn').forEach(btn => {
            const t = btn.getAttribute('data-tab');
            btn.classList.toggle('active-tab', t === State.currentTab);
            btn.classList.toggle('text-slate-400', t !== State.currentTab);
        });
        window.scrollTo(0, 0);
    },
    render() {
        const view = document.getElementById('app-viewport');
        if (!view) return;

        switch (State.currentTab) {
            case 'home': renderHome(view); break;
            case 'testes': renderTests(view); break;
            case 'relatorios': renderReports(view); break;
            case 'alunos': renderStudents(view); break;
            case 'config': renderConfig(view); break;
            case 'student_detail': renderStudentDetail(view); break;
            case 'session_form': renderSessionForm(view); break;
            case 'test_fluency': renderTestFluency(view); break;
            case 'test_phonology': renderTestPhonology(view); break;
            case 'test_attention': renderTestAttention(view); break;
            case 'test_writing': renderTestWriting(view); break;
            default: renderHome(view);
        }
    }
};

// --- Telas ---

function renderHome(el: HTMLElement) {
    const students = DB.get('psy_students');
    const sessions = DB.get('psy_sessions');
    const reports = DB.get('psy_reports');
    const profile = DB.get('psy_profile');

    el.innerHTML = `
        <div class="space-y-6 animate-in fade-in duration-500">
            <div class="bg-gradient-to-br from-emerald-600 to-emerald-700 p-6 rounded-3xl text-white shadow-xl shadow-emerald-200/50">
                <p class="text-emerald-100 text-sm font-medium">Bem-vinda de volta,</p>
                <h2 class="text-2xl font-bold mb-4">${profile.name || 'Psicopedagoga'}</h2>
                <div class="flex gap-2">
                    <button onclick="window.router.navigate('alunos')" class="bg-white/20 hover:bg-white/30 px-4 py-2 rounded-xl text-sm font-bold backdrop-blur-sm transition-all">
                        <i class="fas fa-plus mr-1"></i> Atendimento
                    </button>
                    <button onclick="window.router.navigate('config')" class="bg-emerald-500/30 px-4 py-2 rounded-xl text-sm font-bold border border-white/20">
                        Configurar Perfil
                    </button>
                </div>
            </div>

            <div class="grid grid-cols-3 gap-3">
                <div class="bg-white p-4 rounded-2xl border border-slate-100 shadow-sm text-center">
                    <div class="text-2xl font-black text-emerald-600">${students.length}</div>
                    <div class="text-[9px] uppercase font-bold text-slate-400">Alunos</div>
                </div>
                <div class="bg-white p-4 rounded-2xl border border-slate-100 shadow-sm text-center">
                    <div class="text-2xl font-black text-emerald-600">${sessions.length}</div>
                    <div class="text-[9px] uppercase font-bold text-slate-400">Sessões</div>
                </div>
                <div class="bg-white p-4 rounded-2xl border border-slate-100 shadow-sm text-center">
                    <div class="text-2xl font-black text-emerald-600">${reports.length}</div>
                    <div class="text-[9px] uppercase font-bold text-slate-400">Relatórios</div>
                </div>
            </div>

            <div class="space-y-3">
                <h3 class="text-sm font-bold text-slate-500 uppercase tracking-widest px-1">Atalhos Rápidos</h3>
                <div class="grid grid-cols-1 gap-3">
                    <button onclick="window.router.navigate('testes')" class="flex items-center gap-4 bg-white p-4 rounded-2xl border border-slate-100 shadow-sm hover:border-emerald-200 transition-all text-left">
                        <div class="w-12 h-12 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center text-xl shadow-inner">
                            <i class="fas fa-puzzle-piece"></i>
                        </div>
                        <div>
                            <h4 class="font-bold text-slate-700">Bateria de Testes</h4>
                            <p class="text-xs text-slate-400">Acesse leitura, fonologia e atenção.</p>
                        </div>
                    </button>
                    <button onclick="window.router.navigate('relatorios')" class="flex items-center gap-4 bg-white p-4 rounded-2xl border border-slate-100 shadow-sm hover:border-emerald-200 transition-all text-left">
                        <div class="w-12 h-12 bg-amber-50 text-amber-600 rounded-xl flex items-center justify-center text-xl shadow-inner">
                            <i class="fas fa-file-pdf"></i>
                        </div>
                        <div>
                            <h4 class="font-bold text-slate-700">Meus Relatórios</h4>
                            <p class="text-xs text-slate-400">Visualize e baixe documentos gerados.</p>
                        </div>
                    </button>
                </div>
            </div>
        </div>
    `;
}

function renderConfig(el: HTMLElement) {
    const profile = DB.get('psy_profile', { name: '', city: '', phone: '', email: '', signature: '' });
    el.innerHTML = `
        <div class="space-y-6">
            <h2 class="text-2xl font-bold text-emerald-800">Perfil Profissional</h2>
            <form id="config-form" class="bg-white p-6 rounded-3xl border border-emerald-100 shadow-sm space-y-4">
                <div class="space-y-1">
                    <label class="text-xs font-bold text-slate-400 uppercase">Nome Completo</label>
                    <input type="text" name="name" value="${profile.name}" class="w-full bg-slate-50 p-3 rounded-xl border border-slate-100 outline-none focus:ring-2 focus:ring-emerald-500" required>
                </div>
                <div class="space-y-1">
                    <label class="text-xs font-bold text-slate-400 uppercase">Cidade / UF</label>
                    <input type="text" name="city" value="${profile.city}" placeholder="Ex: São Paulo / SP" class="w-full bg-slate-50 p-3 rounded-xl border border-slate-100 outline-none">
                </div>
                <div class="grid grid-cols-2 gap-3">
                    <div class="space-y-1">
                        <label class="text-xs font-bold text-slate-400 uppercase">Telefone</label>
                        <input type="text" name="phone" value="${profile.phone}" class="w-full bg-slate-50 p-3 rounded-xl border border-slate-100 outline-none">
                    </div>
                    <div class="space-y-1">
                        <label class="text-xs font-bold text-slate-400 uppercase">E-mail</label>
                        <input type="email" name="email" value="${profile.email}" class="w-full bg-slate-50 p-3 rounded-xl border border-slate-100 outline-none">
                    </div>
                </div>
                <div class="space-y-1">
                    <label class="text-xs font-bold text-slate-400 uppercase">Assinatura Digital (Texto)</label>
                    <textarea name="signature" class="w-full bg-slate-50 p-3 rounded-xl border border-slate-100 outline-none" rows="2">${profile.signature}</textarea>
                </div>
                <button type="submit" class="w-full bg-emerald-600 text-white font-bold py-4 rounded-2xl shadow-lg shadow-emerald-100 active:scale-95 transition-all">Salvar Configurações</button>
            </form>
        </div>
    `;

    document.getElementById('config-form')?.addEventListener('submit', (e) => {
        e.preventDefault();
        const data = Object.fromEntries(new FormData(e.target as HTMLFormElement).entries());
        DB.set('psy_profile', data);
        alert('Perfil atualizado com sucesso!');
        window.router.navigate('home');
    });
}

function renderStudents(el: HTMLElement) {
    const students = DB.get('psy_students');
    el.innerHTML = `
        <div class="space-y-6">
            <div class="flex justify-between items-center">
                <h2 class="text-2xl font-bold text-emerald-800">Alunos</h2>
                <button onclick="window.openStudentModal()" class="bg-emerald-600 text-white px-4 py-2 rounded-xl text-sm font-bold flex items-center gap-2">
                    <i class="fas fa-plus"></i> Novo
                </button>
            </div>

            <div class="relative">
                <i class="fas fa-search absolute left-4 top-4 text-slate-400"></i>
                <input type="text" id="student-search" placeholder="Buscar aluno..." class="w-full pl-11 p-3.5 bg-white rounded-2xl border border-slate-100 outline-none focus:ring-2 focus:ring-emerald-500 shadow-sm">
            </div>

            <div class="space-y-3" id="student-list">
                ${students.length === 0 ? '<div class="text-center py-12 text-slate-400 italic">Nenhum aluno cadastrado.</div>' : ''}
                ${students.map((s: any) => `
                    <div onclick="window.openStudentDetail('${s.id}')" class="bg-white p-4 rounded-2xl border border-slate-100 shadow-sm flex items-center justify-between cursor-pointer active:scale-[0.98] transition-all">
                        <div class="flex items-center gap-4">
                            <div class="w-12 h-12 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center font-black text-xl">${s.name.charAt(0)}</div>
                            <div>
                                <h4 class="font-bold text-slate-700">${s.name}</h4>
                                <p class="text-xs text-slate-400">${s.grade || 'Série não informada'} • ${Utils.age(s.birthDate)} anos</p>
                            </div>
                        </div>
                        <i class="fas fa-chevron-right text-slate-300"></i>
                    </div>
                `).join('')}
            </div>
        </div>

        <div id="modal-student" class="fixed inset-0 bg-black/60 z-[60] hidden backdrop-blur-sm flex items-end sm:items-center justify-center p-4">
            <div class="bg-white w-full max-w-md rounded-t-[32px] sm:rounded-[32px] p-8 shadow-2xl animate-in slide-in-from-bottom duration-300">
                <div class="flex justify-between items-center mb-6">
                    <h3 class="text-xl font-bold text-slate-800">Novo Aluno</h3>
                    <button onclick="window.closeStudentModal()" class="text-slate-400"><i class="fas fa-times text-xl"></i></button>
                </div>
                <form id="student-form" class="space-y-4">
                    <input type="text" name="name" placeholder="Nome Completo" class="w-full p-3.5 bg-slate-50 rounded-xl border border-slate-100" required>
                    <div class="grid grid-cols-2 gap-3">
                        <input type="date" name="birthDate" class="w-full p-3.5 bg-slate-50 rounded-xl border border-slate-100">
                        <input type="text" name="grade" placeholder="Série/Ano" class="w-full p-3.5 bg-slate-50 rounded-xl border border-slate-100">
                    </div>
                    <input type="text" name="school" placeholder="Escola" class="w-full p-3.5 bg-slate-50 rounded-xl border border-slate-100">
                    <input type="text" name="parent" placeholder="Responsável" class="w-full p-3.5 bg-slate-50 rounded-xl border border-slate-100">
                    <textarea name="notes" placeholder="Observações..." class="w-full p-3.5 bg-slate-50 rounded-xl border border-slate-100" rows="3"></textarea>
                    <button type="submit" class="w-full bg-emerald-600 text-white font-bold py-4 rounded-2xl">Salvar Aluno</button>
                </form>
            </div>
        </div>
    `;

    document.getElementById('student-search')?.addEventListener('input', (e: any) => {
        const q = e.target.value.toLowerCase();
        document.querySelectorAll('#student-list > div').forEach((div: any) => {
            div.style.display = div.innerText.toLowerCase().includes(q) ? 'flex' : 'none';
        });
    });

    document.getElementById('student-form')?.addEventListener('submit', (e: any) => {
        e.preventDefault();
        const data = Object.fromEntries(new FormData(e.target).entries());
        const list = DB.get('psy_students');
        list.push({ id: Utils.id(), ...data, createdAt: new Date().toISOString() });
        DB.set('psy_students', list);
        window.closeStudentModal();
        renderStudents(el);
    });
}

// Global functions for student modal
window.openStudentModal = () => document.getElementById('modal-student')?.classList.remove('hidden');
window.closeStudentModal = () => document.getElementById('modal-student')?.classList.add('hidden');
window.openStudentDetail = (id: string) => { State.activeStudentId = id; window.router.navigate('student_detail'); };

function renderStudentDetail(el: HTMLElement) {
    const student = DB.get('psy_students').find((s: any) => s.id === State.activeStudentId);
    if (!student) return window.router.navigate('alunos');

    const sessions = DB.get('psy_sessions').filter((s: any) => s.studentId === student.id);

    el.innerHTML = `
        <div class="space-y-6">
            <div class="flex items-center gap-4">
                <button onclick="window.router.navigate('alunos')" class="w-10 h-10 flex items-center justify-center bg-white rounded-full border border-slate-100 text-slate-400"><i class="fas fa-arrow-left"></i></button>
                <h2 class="text-xl font-bold text-slate-800">Prontuário</h2>
            </div>

            <div class="bg-white p-6 rounded-[32px] border border-emerald-100 shadow-sm space-y-4">
                <div class="flex items-center gap-4 border-b border-slate-50 pb-4">
                    <div class="w-16 h-16 bg-emerald-600 text-white rounded-2xl flex items-center justify-center font-black text-2xl shadow-lg">${student.name.charAt(0)}</div>
                    <div>
                        <h3 class="text-xl font-bold text-slate-800">${student.name}</h3>
                        <p class="text-sm text-slate-400">${student.grade || 'Série N/I'} • ${Utils.age(student.birthDate)} anos</p>
                    </div>
                </div>
                <div class="grid grid-cols-2 gap-y-3 text-xs">
                    <div><span class="text-slate-400 block uppercase font-bold">Responsável</span> <b>${student.parent || '---'}</b></div>
                    <div><span class="text-slate-400 block uppercase font-bold">Escola</span> <b>${student.school || '---'}</b></div>
                </div>
            </div>

            <div class="flex gap-2">
                <button onclick="window.startNewSession()" class="flex-grow bg-emerald-600 text-white font-bold py-4 rounded-2xl shadow-lg flex items-center justify-center gap-2">
                    <i class="fas fa-plus-circle"></i> Novo Atendimento
                </button>
                <button onclick="window.deleteStudent('${student.id}')" class="bg-red-50 text-red-400 px-5 rounded-2xl border border-red-100"><i class="fas fa-trash-alt"></i></button>
            </div>

            <div class="space-y-3">
                <h3 class="text-sm font-bold text-slate-500 uppercase tracking-widest px-1">Histórico</h3>
                ${sessions.length === 0 ? '<p class="text-center py-8 text-slate-400 italic text-sm">Sem sessões registradas.</p>' : ''}
                ${sessions.map((s: any) => `
                    <div onclick="window.editSession('${s.id}')" class="bg-white p-4 rounded-2xl border border-slate-100 shadow-sm flex items-center justify-between cursor-pointer active:scale-95 transition-all">
                        <div class="flex items-center gap-3">
                            <div class="w-10 h-10 bg-slate-50 text-slate-400 rounded-lg flex items-center justify-center"><i class="fas fa-calendar-day"></i></div>
                            <div>
                                <p class="font-bold text-slate-700">${Utils.date(s.date)}</p>
                                <p class="text-[10px] text-slate-400 truncate w-40">${s.objective || 'Atendimento de rotina'}</p>
                            </div>
                        </div>
                        <i class="fas fa-edit text-emerald-600 text-sm"></i>
                    </div>
                `).reverse().join('')}
            </div>
        </div>
    `;
}

window.startNewSession = () => { State.activeSessionId = null; window.router.navigate('session_form'); };
window.editSession = (id: string) => { State.activeSessionId = id; window.router.navigate('session_form'); };
window.deleteStudent = (id: string) => {
    if (confirm('Tem certeza? Isso apagará todo o histórico do aluno.')) {
        DB.set('psy_students', DB.get('psy_students').filter((s: any) => s.id !== id));
        DB.set('psy_sessions', DB.get('psy_sessions').filter((s: any) => s.studentId !== id));
        window.router.navigate('alunos');
    }
};

function renderSessionForm(el: HTMLElement) {
    const student = DB.get('psy_students').find((s: any) => s.id === State.activeStudentId);
    const session = State.activeSessionId ? DB.get('psy_sessions').find((s: any) => s.id === State.activeSessionId) : null;

    el.innerHTML = `
        <div class="space-y-6">
            <div class="flex items-center gap-4">
                <button onclick="window.router.navigate('student_detail')" class="w-10 h-10 flex items-center justify-center bg-white rounded-full border border-slate-100 text-slate-400"><i class="fas fa-arrow-left"></i></button>
                <h2 class="text-xl font-bold text-slate-800">${session ? 'Editar Sessão' : 'Novo Registro'}</h2>
            </div>

            <form id="session-main-form" class="space-y-4">
                <div class="bg-white p-6 rounded-[32px] border border-emerald-100 shadow-sm space-y-4">
                    <div class="space-y-1">
                        <label class="text-[10px] font-bold text-slate-400 uppercase">Data do Atendimento</label>
                        <input type="date" name="date" value="${session ? session.date : new Date().toISOString().split('T')[0]}" class="w-full bg-slate-50 p-3 rounded-xl border border-slate-100" required>
                    </div>
                    <div class="space-y-1">
                        <label class="text-[10px] font-bold text-slate-400 uppercase">Objetivo da Sessão</label>
                        <input type="text" name="objective" value="${session ? session.objective : ''}" placeholder="Ex: Avaliação de Consciência Fonológica" class="w-full bg-slate-50 p-3 rounded-xl border border-slate-100">
                    </div>
                    <div class="space-y-1">
                        <label class="text-[10px] font-bold text-slate-400 uppercase">Observações Gerais</label>
                        <textarea name="observations" class="w-full bg-slate-50 p-3 rounded-xl border border-slate-100" rows="3">${session ? session.observations : ''}</textarea>
                    </div>
                    <div class="space-y-1">
                        <label class="text-[10px] font-bold text-slate-400 uppercase">Hipótese / Impressões</label>
                        <textarea name="hypothesis" class="w-full bg-slate-50 p-3 rounded-xl border border-slate-100" rows="2">${session ? session.hypothesis : ''}</textarea>
                    </div>
                    <div class="space-y-1">
                        <label class="text-[10px] font-bold text-slate-400 uppercase">Recomendações</label>
                        <textarea name="recommendations" class="w-full bg-slate-50 p-3 rounded-xl border border-slate-100" rows="2">${session ? session.recommendations : ''}</textarea>
                    </div>
                    <button type="submit" class="w-full bg-emerald-600 text-white font-bold py-4 rounded-2xl shadow-lg">Salvar Informações</button>
                </div>
            </form>

            ${session ? `
                <div class="grid grid-cols-2 gap-3">
                    <button onclick="window.router.navigate('testes')" class="bg-blue-600 text-white p-4 rounded-2xl shadow-lg flex flex-col items-center gap-2">
                        <i class="fas fa-flask text-2xl"></i>
                        <span class="text-xs font-bold uppercase">Aplicar Testes</span>
                    </button>
                    <button onclick="window.generateSessionReport('${session.id}')" class="bg-emerald-700 text-white p-4 rounded-2xl shadow-lg flex flex-col items-center gap-2">
                        <i class="fas fa-file-export text-2xl"></i>
                        <span class="text-xs font-bold uppercase">Exportar PDF</span>
                    </button>
                </div>

                <div class="bg-white p-6 rounded-[32px] border border-slate-100 space-y-3">
                    <h4 class="text-[10px] font-black text-slate-400 uppercase tracking-widest">Testes Aplicados</h4>
                    <ul class="text-sm space-y-2">
                        ${session.tests?.fluency ? '<li class="flex items-center gap-2 text-emerald-600 font-bold"><i class="fas fa-check-circle"></i> Leitura & Fluência</li>' : ''}
                        ${session.tests?.phonology ? '<li class="flex items-center gap-2 text-emerald-600 font-bold"><i class="fas fa-check-circle"></i> Consciência Fonológica</li>' : ''}
                        ${session.tests?.attention ? '<li class="flex items-center gap-2 text-emerald-600 font-bold"><i class="fas fa-check-circle"></i> Atenção (Go/No-Go)</li>' : ''}
                        ${session.tests?.writing ? '<li class="flex items-center gap-2 text-emerald-600 font-bold"><i class="fas fa-check-circle"></i> Escrita Funcional</li>' : ''}
                        ${!session.tests || Object.keys(session.tests).length === 0 ? '<li class="text-slate-300 italic">Nenhum teste aplicado nesta sessão.</li>' : ''}
                    </ul>
                </div>
            ` : ''}
        </div>
    `;

    document.getElementById('session-main-form')?.addEventListener('submit', (e: any) => {
        e.preventDefault();
        const data = Object.fromEntries(new FormData(e.target).entries());
        const sessions = DB.get('psy_sessions');
        
        if (State.activeSessionId) {
            const idx = sessions.findIndex((s: any) => s.id === State.activeSessionId);
            sessions[idx] = { ...sessions[idx], ...data };
            DB.set('psy_sessions', sessions);
            alert('Atendimento atualizado!');
        } else {
            const newS = { id: Utils.id(), studentId: State.activeStudentId, ...data, tests: {} };
            sessions.push(newS);
            DB.set('psy_sessions', sessions);
            State.activeSessionId = newS.id;
            alert('Atendimento criado!');
        }
        renderSessionForm(el);
    });
}

function renderTests(el: HTMLElement) {
    if (!State.activeSessionId) {
        el.innerHTML = `
            <div class="flex flex-col items-center justify-center min-h-[60vh] text-center space-y-6">
                <div class="w-24 h-24 bg-amber-50 text-amber-500 rounded-full flex items-center justify-center text-4xl shadow-inner">
                    <i class="fas fa-exclamation-circle"></i>
                </div>
                <div>
                    <h2 class="text-xl font-bold text-slate-800">Sessão não selecionada</h2>
                    <p class="text-sm text-slate-400 max-w-xs mx-auto mt-2">Você precisa estar dentro de um atendimento para registrar resultados de testes.</p>
                </div>
                <button onclick="window.router.navigate('alunos')" class="bg-emerald-600 text-white font-bold px-8 py-3 rounded-2xl">Selecionar Aluno</button>
            </div>
        `;
        return;
    }

    el.innerHTML = `
        <div class="space-y-6">
            <div class="flex items-center gap-4">
                <button onclick="window.router.navigate('session_form')" class="w-10 h-10 flex items-center justify-center bg-white rounded-full border border-slate-100 text-slate-400"><i class="fas fa-arrow-left"></i></button>
                <h2 class="text-xl font-bold text-slate-800">Kit de Avaliação</h2>
            </div>

            <div class="grid grid-cols-1 gap-4">
                <div onclick="window.router.navigate('test_fluency')" class="bg-white p-5 rounded-3xl border border-slate-100 shadow-sm flex items-center gap-5 active:scale-95 transition-all">
                    <div class="w-14 h-14 bg-emerald-100 text-emerald-600 rounded-2xl flex items-center justify-center text-2xl shadow-inner"><i class="fas fa-book-reader"></i></div>
                    <div class="flex-grow">
                        <h4 class="font-bold text-slate-700">Leitura & Fluência</h4>
                        <p class="text-[10px] text-slate-400 uppercase font-black">WPM • Tempo • Precisão</p>
                    </div>
                    <i class="fas fa-play-circle text-emerald-200 text-2xl"></i>
                </div>
                <div onclick="window.router.navigate('test_phonology')" class="bg-white p-5 rounded-3xl border border-slate-100 shadow-sm flex items-center gap-5 active:scale-95 transition-all">
                    <div class="w-14 h-14 bg-blue-100 text-blue-600 rounded-2xl flex items-center justify-center text-2xl shadow-inner"><i class="fas fa-music"></i></div>
                    <div class="flex-grow">
                        <h4 class="font-bold text-slate-700">Consciência Fonológica</h4>
                        <p class="text-[10px] text-slate-400 uppercase font-black">Rimas • Sílabas • Aliteração</p>
                    </div>
                    <i class="fas fa-play-circle text-blue-200 text-2xl"></i>
                </div>
                <div onclick="window.router.navigate('test_attention')" class="bg-white p-5 rounded-3xl border border-slate-100 shadow-sm flex items-center gap-5 active:scale-95 transition-all">
                    <div class="w-14 h-14 bg-purple-100 text-purple-600 rounded-2xl flex items-center justify-center text-2xl shadow-inner"><i class="fas fa-bolt"></i></div>
                    <div class="flex-grow">
                        <h4 class="font-bold text-slate-700">Atenção (Go / No-Go)</h4>
                        <p class="text-[10px] text-slate-400 uppercase font-black">Impulsividade • Reação</p>
                    </div>
                    <i class="fas fa-play-circle text-purple-200 text-2xl"></i>
                </div>
                <div onclick="window.router.navigate('test_writing')" class="bg-white p-5 rounded-3xl border border-slate-100 shadow-sm flex items-center gap-5 active:scale-95 transition-all">
                    <div class="w-14 h-14 bg-orange-100 text-orange-600 rounded-2xl flex items-center justify-center text-2xl shadow-inner"><i class="fas fa-pen-nib"></i></div>
                    <div class="flex-grow">
                        <h4 class="font-bold text-slate-700">Escrita Funcional</h4>
                        <p class="text-[10px] text-slate-400 uppercase font-black">Ortografia • Grafismo</p>
                    </div>
                    <i class="fas fa-play-circle text-orange-200 text-2xl"></i>
                </div>
            </div>
        </div>
    `;
}

// --- Test 1: Fluency ---
function renderTestFluency(el: HTMLElement) {
    const texts = {
        fácil: "O pato nada na lagoa. Ele é feliz. A água está fresca.",
        médio: "A escola é um lugar para aprender muitas coisas novas. Hoje o professor contou uma história sobre o espaço sideral e as estrelas.",
        difícil: "O desenvolvimento cognitivo durante a infância é impulsionado por interações sociais significativas e estímulos ambientais constantes que moldam as redes neurais."
    };
    let level = 'fácil';
    let timer = 0;
    let interval: any = null;
    let errors = { omi: 0, sub: 0, inv: 0, acr: 0 };

    const update = () => {
        el.innerHTML = `
            <div class="space-y-6">
                <div class="flex justify-between items-center">
                    <button onclick="window.router.navigate('testes')" class="text-slate-400"><i class="fas fa-arrow-left"></i></button>
                    <h2 class="text-xl font-bold">Leitura & Fluência</h2>
                    <div id="fluency-timer-val" class="font-mono font-bold bg-slate-900 text-white px-3 py-1 rounded-lg">00:00</div>
                </div>

                <div class="bg-white p-6 rounded-[32px] border border-emerald-100 shadow-sm space-y-6">
                    <div class="grid grid-cols-3 gap-2">
                        ${Object.keys(texts).map(l => `<button onclick="window.setFluencyLevel('${l}')" class="p-2 rounded-xl text-xs font-bold ${level === l ? 'bg-emerald-600 text-white' : 'bg-slate-50 text-slate-400'}">${l}</button>`).join('')}
                    </div>
                    <div class="bg-slate-50 p-6 rounded-2xl italic leading-loose text-lg text-slate-600 border border-slate-100 select-none">
                        ${(texts as any)[level]}
                    </div>
                    
                    <div class="grid grid-cols-2 gap-4">
                        <button id="fluency-start" class="bg-emerald-600 text-white py-4 rounded-2xl font-bold"><i class="fas fa-play mr-2"></i> Iniciar</button>
                        <button id="fluency-stop" class="bg-red-600 text-white py-4 rounded-2xl font-bold hidden"><i class="fas fa-stop mr-2"></i> Parar</button>
                    </div>

                    <div class="grid grid-cols-4 gap-2">
                        <button onclick="window.fluErr('omi')" class="bg-slate-50 p-2 rounded-xl flex flex-col items-center">
                            <span class="text-[8px] font-bold uppercase text-slate-400">Omi</span>
                            <span class="text-lg font-black text-red-500">${errors.omi}</span>
                        </button>
                        <button onclick="window.fluErr('sub')" class="bg-slate-50 p-2 rounded-xl flex flex-col items-center">
                            <span class="text-[8px] font-bold uppercase text-slate-400">Sub</span>
                            <span class="text-lg font-black text-red-500">${errors.sub}</span>
                        </button>
                        <button onclick="window.fluErr('inv')" class="bg-slate-50 p-2 rounded-xl flex flex-col items-center">
                            <span class="text-[8px] font-bold uppercase text-slate-400">Inv</span>
                            <span class="text-lg font-black text-red-500">${errors.inv}</span>
                        </button>
                        <button onclick="window.fluErr('acr')" class="bg-slate-50 p-2 rounded-xl flex flex-col items-center">
                            <span class="text-[8px] font-bold uppercase text-slate-400">Acr</span>
                            <span class="text-lg font-black text-red-500">${errors.acr}</span>
                        </button>
                    </div>
                </div>
            </div>
        `;

        document.getElementById('fluency-start')?.addEventListener('click', () => {
            document.getElementById('fluency-start')?.classList.add('hidden');
            document.getElementById('fluency-stop')?.classList.remove('hidden');
            interval = setInterval(() => {
                timer++;
                const m = Math.floor(timer/60).toString().padStart(2, '0');
                const s = (timer%60).toString().padStart(2, '0');
                const elTimer = document.getElementById('fluency-timer-val');
                if (elTimer) elTimer.innerText = `${m}:${s}`;
            }, 1000);
        });

        document.getElementById('fluency-stop')?.addEventListener('click', () => {
            clearInterval(interval);
            const wordCount = (texts as any)[level].split(' ').length;
            const wpm = Math.round(wordCount / (timer / 60));
            const totalErrs = errors.omi + errors.sub + errors.inv + errors.acr;
            const accuracy = Math.max(0, 100 - (totalErrs * 2));
            
            const result = { level, time: timer, wpm, accuracy, errors: {...errors} };
            window.saveTest('fluency', result);
            alert(`Teste Concluído!\nWPM: ${wpm}\nPrecisão: ${accuracy}%`);
            window.router.navigate('testes');
        });
    };

    window.setFluencyLevel = (l: string) => { level = l; update(); };
    window.fluErr = (t: string) => { (errors as any)[t]++; update(); };
    update();
}

// --- Test 2: Phonology ---
function renderTestPhonology(el: HTMLElement) {
    const questions = [
        { q: 'Qual rima com "CAFÉ"?', a: ['Pé', 'Mão', 'Bola'], c: 0, t: 'rima' },
        { q: 'Qual começa com "B"?', a: ['Casa', 'Bola', 'Dado'], c: 1, t: 'som' },
        { q: 'Quantas sílabas em "ESCOLA"?', a: ['2', '3', '4'], c: 1, t: 'sílaba' },
        { q: 'Qual rima com "BOLA"?', a: ['Sola', 'Cama', 'Dedo'], c: 0, t: 'rima' },
        { q: 'Qual começa com "M"?', a: ['Pato', 'Lata', 'Mala'], c: 2, t: 'som' },
        { q: 'Quantas sílabas em "SOL"?', a: ['1', '2', '3'], c: 0, t: 'sílaba' },
        { q: 'Qual rima com "DENTE"?', a: ['Bala', 'Pente', 'Doce'], c: 1, t: 'rima' },
        { q: 'Qual começa com "F"?', a: ['Gato', 'Foca', 'Vaca'], c: 1, t: 'som' }
    ];
    let idx = 0;
    let score = 0;
    let breakdown = { rima: 0, som: 0, sílaba: 0 };

    const show = () => {
        const item = questions[idx];
        el.innerHTML = `
            <div class="space-y-6">
                <div class="flex justify-between items-center">
                    <button onclick="window.router.navigate('testes')" class="text-slate-400"><i class="fas fa-arrow-left"></i></button>
                    <span class="text-xs font-bold text-slate-400">Questão ${idx + 1}/${questions.length}</span>
                </div>
                <div class="bg-white p-8 rounded-[32px] border border-blue-100 shadow-sm text-center">
                    <div class="inline-block px-3 py-1 bg-blue-50 text-blue-600 rounded-full text-[10px] font-black uppercase mb-4">${item.t}</div>
                    <h3 class="text-2xl font-bold text-slate-800 mb-8">${item.q}</h3>
                    <div class="space-y-3">
                        ${item.a.map((opt, i) => `<button onclick="window.ansPho(${i})" class="w-full p-5 bg-slate-50 border border-slate-100 rounded-2xl font-bold hover:bg-blue-600 hover:text-white transition-all">${opt}</button>`).join('')}
                    </div>
                </div>
            </div>
        `;
    };

    window.ansPho = (i: number) => {
        const item = questions[idx];
        if (i === item.c) {
            score++;
            (breakdown as any)[item.t]++;
        }
        idx++;
        if (idx < questions.length) show();
        else {
            window.saveTest('phonology', { score, total: questions.length, breakdown });
            alert(`Avaliação finalizada!\nAcertos: ${score}/${questions.length}`);
            window.router.navigate('testes');
        }
    };
    show();
}

// --- Test 3: Attention ---
function renderTestAttention(el: HTMLElement) {
    let running = false;
    let results: number[] = [];
    let errors = { commission: 0, omission: 0 };
    let timer = 30;
    let gameInt: any, stimInt: any;
    let lastStimType = false; // true = GO, false = NO-GO
    let active = false;

    el.innerHTML = `
        <div class="space-y-6">
            <div class="flex justify-between items-center">
                <button onclick="window.router.navigate('testes')" class="text-slate-400"><i class="fas fa-arrow-left"></i></button>
                <div id="game-timer" class="font-mono font-bold bg-purple-600 text-white px-3 py-1 rounded-lg">30s</div>
            </div>

            <div id="game-area" class="bg-white min-h-[400px] rounded-[32px] border border-purple-100 shadow-sm flex flex-col items-center justify-center p-8 space-y-8">
                <div id="instruction-txt">
                    <p class="text-slate-500 text-center text-sm">Toque no círculo quando ele ficar <b class="text-emerald-500">VERDE</b>.<br>Não toque se ficar <b class="text-red-500">VERMELHO</b>.</p>
                </div>
                
                <div id="stimulus" onclick="window.hitAtt()" class="w-48 h-48 rounded-full bg-slate-100 flex items-center justify-center text-5xl text-slate-200 cursor-pointer active:scale-90 transition-all border-8 border-white shadow-inner">
                    <i class="fas fa-hand-pointer"></i>
                </div>

                <button id="start-att" class="bg-purple-600 text-white px-12 py-4 rounded-2xl font-bold shadow-lg">Iniciar Teste</button>
            </div>
        </div>
    `;

    const start = () => {
        running = true;
        document.getElementById('start-att')?.classList.add('hidden');
        document.getElementById('instruction-txt')?.classList.add('hidden');
        
        gameInt = setInterval(() => {
            timer--;
            const gTimer = document.getElementById('game-timer');
            if (gTimer) gTimer.innerText = timer + 's';
            if (timer <= 0) end();
        }, 1000);

        next();
    };

    const next = () => {
        if (!running) return;
        const stim = document.getElementById('stimulus');
        if (stim) {
            stim.className = "w-48 h-48 rounded-full bg-slate-100 flex items-center justify-center text-5xl text-slate-200 transition-all border-8 border-white";
            stim.innerHTML = "";
        }
        active = false;

        const delay = 800 + Math.random() * 1500;
        stimInt = setTimeout(() => {
            lastStimType = Math.random() > 0.3; // 70% chance of GO
            active = true;
            const startT = Date.now();
            
            if (stim) {
                if (lastStimType) {
                    stim.className = "w-48 h-48 rounded-full bg-emerald-500 flex items-center justify-center text-5xl text-white transition-all border-8 border-white shadow-lg";
                    stim.innerHTML = '<i class="fas fa-check"></i>';
                } else {
                    stim.className = "w-48 h-48 rounded-full bg-red-500 flex items-center justify-center text-5xl text-white transition-all border-8 border-white shadow-lg";
                    stim.innerHTML = '<i class="fas fa-times"></i>';
                }
            }

            stimInt = setTimeout(() => {
                if (active && lastStimType) errors.omission++;
                next();
            }, 1000);
            
            State.tempTestData.startT = startT;
        }, delay);
    };

    window.hitAtt = () => {
        if (!active) return;
        if (lastStimType) {
            const reaction = Date.now() - State.tempTestData.startT;
            results.push(reaction);
        } else {
            errors.commission++;
        }
        active = false;
        clearTimeout(stimInt);
        next();
    };

    const end = () => {
        running = false;
        clearInterval(gameInt);
        clearTimeout(stimInt);
        const avg = results.length ? Math.round(results.reduce((a,b)=>a+b)/results.length) : 0;
        window.saveTest('attention', { avg, ...errors, totalHits: results.length });
        alert(`Fim de jogo!\nMédia de Reação: ${avg}ms\nErros por Impulsividade: ${errors.commission}`);
        window.router.navigate('testes');
    };

    document.getElementById('start-att')?.addEventListener('click', start);
}

// --- Test 4: Writing ---
function renderTestWriting(el: HTMLElement) {
    const session = DB.get('psy_sessions').find((s: any) => s.id === State.activeSessionId);
    const existing = session.tests?.writing || { notes: '', checklist: [] };

    el.innerHTML = `
        <div class="space-y-6">
            <div class="flex items-center gap-4">
                <button onclick="window.router.navigate('testes')" class="text-slate-400"><i class="fas fa-arrow-left"></i></button>
                <h2 class="text-xl font-bold">Escrita Funcional</h2>
            </div>

            <div class="bg-white p-6 rounded-[32px] border border-orange-100 shadow-sm space-y-6">
                <div class="space-y-1">
                    <label class="text-[10px] font-black text-slate-400 uppercase tracking-widest">Observações de Ditado / Cópia</label>
                    <textarea id="write-notes" class="w-full bg-slate-50 p-4 rounded-2xl border border-slate-100 outline-none" rows="6" placeholder="Descreva o desempenho do aluno...">${existing.notes}</textarea>
                </div>
                
                <div class="space-y-3">
                    <label class="text-[10px] font-black text-slate-400 uppercase tracking-widest">Checklist de Erros</label>
                    <div class="grid grid-cols-1 gap-2">
                        ${['Troca b/d', 'Troca p/q', 'Omissões', 'Hipossegmentação', 'Hipersegmentação', 'Espelhamento', 'Pressão inadequada'].map(item => `
                            <label class="flex items-center gap-3 p-3 bg-slate-50 rounded-xl cursor-pointer">
                                <input type="checkbox" name="chk-write" value="${item}" ${existing.checklist.includes(item) ? 'checked' : ''} class="w-5 h-5 accent-orange-500">
                                <span class="text-sm font-semibold text-slate-600">${item}</span>
                            </label>
                        `).join('')}
                    </div>
                </div>

                <button onclick="window.saveWriting()" class="w-full bg-orange-600 text-white font-bold py-4 rounded-2xl shadow-lg">Salvar Registro</button>
            </div>
        </div>
    `;

    window.saveWriting = () => {
        const notes = (document.getElementById('write-notes') as HTMLTextAreaElement).value;
        const checklist = Array.from(document.querySelectorAll('input[name="chk-write"]:checked')).map((i: any) => i.value);
        window.saveTest('writing', { notes, checklist });
        alert('Registro de escrita salvo!');
        window.router.navigate('testes');
    };
}

// --- Report Generation ---
function renderReports(el: HTMLElement) {
    const reports = DB.get('psy_reports');
    el.innerHTML = `
        <div class="space-y-6">
            <h2 class="text-2xl font-bold text-emerald-800">Relatórios</h2>
            <div class="space-y-3">
                ${reports.length === 0 ? '<p class="text-center py-12 text-slate-400 italic">Nenhum relatório emitido.</p>' : ''}
                ${reports.map((r: any) => `
                    <div class="bg-white p-4 rounded-2xl border border-slate-100 shadow-sm flex items-center justify-between">
                        <div>
                            <h4 class="font-bold text-slate-700">${r.studentName}</h4>
                            <p class="text-[10px] text-slate-400 font-bold uppercase">${Utils.date(r.createdAt)}</p>
                        </div>
                        <div class="flex gap-2">
                            <button onclick="window.downloadPdf('${r.id}')" class="text-emerald-600 p-2"><i class="fas fa-file-pdf text-xl"></i></button>
                            <button onclick="window.deleteReport('${r.id}')" class="text-red-200 p-2"><i class="fas fa-trash"></i></button>
                        </div>
                    </div>
                `).reverse().join('')}
            </div>
        </div>
    `;
}

window.generateSessionReport = (id: string) => {
    const session = DB.get('psy_sessions').find((s: any) => s.id === id);
    const student = DB.get('psy_students').find((s: any) => s.id === session.studentId);
    const profile = DB.get('psy_profile');
    
    const report = {
        id: Utils.id(),
        sessionId: session.id,
        studentName: student.name,
        createdAt: new Date().toISOString(),
        data: { session, student, profile }
    };
    
    const list = DB.get('psy_reports');
    list.push(report);
    DB.set('psy_reports', list);
    alert('Relatório gerado na aba de Relatórios!');
    window.router.navigate('relatorios');
};

window.downloadPdf = async (id: string) => {
    const report = DB.get('psy_reports').find((r: any) => r.id === id);
    const { session, student, profile } = report.data;
    const container = document.getElementById('pdf-template');
    if (!container) return;

    container.innerHTML = `
        <div style="padding: 50px; color: #334155; line-height: 1.6;">
            <div style="text-align: center; border-bottom: 2px solid #059669; padding-bottom: 20px; margin-bottom: 30px;">
                <h1 style="margin: 0; color: #059669; font-size: 28px;">RELATÓRIO PSICOPEDAGÓGICO</h1>
                <p style="margin: 5px 0; font-weight: bold;">${profile.name}</p>
                <p style="margin: 0; font-size: 12px; color: #64748b;">${profile.city} • ${profile.phone} • ${profile.email}</p>
            </div>

            <section style="margin-bottom: 25px;">
                <h3 style="background: #f1f5f9; padding: 5px 10px; border-radius: 4px; font-size: 14px; color: #1e293b;">DADOS DO ALUNO</h3>
                <p style="margin: 5px 0; font-size: 13px;"><b>Nome:</b> ${student.name}</p>
                <p style="margin: 5px 0; font-size: 13px;"><b>Idade:</b> ${Utils.age(student.birthDate)} anos | <b>Série:</b> ${student.grade}</p>
                <p style="margin: 5px 0; font-size: 13px;"><b>Data da Sessão:</b> ${Utils.date(session.date)}</p>
            </section>

            <section style="margin-bottom: 25px;">
                <h3 style="background: #f1f5f9; padding: 5px 10px; border-radius: 4px; font-size: 14px; color: #1e293b;">OBJETIVOS E OBSERVAÇÕES</h3>
                <p style="font-size: 13px;"><b>Objetivo:</b> ${session.objective}</p>
                <p style="font-size: 13px; text-align: justify;"><b>Notas Clínicas:</b> ${session.observations}</p>
            </section>

            <section style="margin-bottom: 25px;">
                <h3 style="background: #f1f5f9; padding: 5px 10px; border-radius: 4px; font-size: 14px; color: #1e293b;">RESULTADOS DOS TESTES</h3>
                
                ${session.tests?.fluency ? `
                    <div style="margin-bottom: 10px; padding-left: 10px; border-left: 3px solid #059669;">
                        <p style="margin: 0; font-weight: bold; font-size: 13px;">Fluência Leitora (${session.tests.fluency.level})</p>
                        <p style="margin: 0; font-size: 12px;">WPM: ${session.tests.fluency.wpm} | Precisão: ${session.tests.fluency.accuracy}%</p>
                    </div>
                ` : ''}

                ${session.tests?.phonology ? `
                    <div style="margin-bottom: 10px; padding-left: 10px; border-left: 3px solid #2563eb;">
                        <p style="margin: 0; font-weight: bold; font-size: 13px;">Consciência Fonológica</p>
                        <p style="margin: 0; font-size: 12px;">Acertos: ${session.tests.phonology.score}/${session.tests.phonology.total}</p>
                    </div>
                ` : ''}

                ${session.tests?.attention ? `
                    <div style="margin-bottom: 10px; padding-left: 10px; border-left: 3px solid #9333ea;">
                        <p style="margin: 0; font-weight: bold; font-size: 13px;">Atenção e Inibição</p>
                        <p style="margin: 0; font-size: 12px;">Tempo Médio: ${session.tests.attention.avg}ms | Impulsividade: ${session.tests.attention.commission} erros</p>
                    </div>
                ` : ''}

                ${session.tests?.writing ? `
                    <div style="margin-bottom: 10px; padding-left: 10px; border-left: 3px solid #ea580c;">
                        <p style="margin: 0; font-weight: bold; font-size: 13px;">Escrita Funcional</p>
                        <p style="margin: 0; font-size: 12px;">Checklist: ${session.tests.writing.checklist.join(', ')}</p>
                    </div>
                ` : ''}
            </section>

            <section style="margin-bottom: 25px;">
                <h3 style="background: #f1f5f9; padding: 5px 10px; border-radius: 4px; font-size: 14px; color: #1e293b;">PARECER E ORIENTAÇÕES</h3>
                <p style="font-size: 13px;"><b>Hipótese:</b> ${session.hypothesis || 'N/A'}</p>
                <p style="font-size: 13px;"><b>Recomendações:</b> ${session.recommendations || 'N/A'}</p>
            </section>

            <div style="margin-top: 60px; text-align: center;">
                <div style="width: 200px; border-top: 1px solid #333; margin: 0 auto; padding-top: 5px;">
                    <p style="margin: 0; font-size: 12px; font-weight: bold;">${profile.name}</p>
                    <p style="margin: 0; font-size: 10px;">${profile.signature}</p>
                </div>
            </div>
        </div>
    `;

    try {
        const canvas = await html2canvas(container, { scale: 2 });
        const imgData = canvas.toDataURL('image/png');
        const pdf = new (window as any).jspdf.jsPDF('p', 'mm', 'a4');
        const w = pdf.internal.pageSize.getWidth();
        const h = (canvas.height * w) / canvas.width;
        pdf.addImage(imgData, 'PNG', 0, 0, w, h);
        pdf.save(`Relatorio_${student.name.replace(/\s/g, '_')}_${session.date}.pdf`);
    } catch (e) {
        alert('Erro ao gerar PDF.');
    }
};

window.deleteReport = (id: string) => {
    if (confirm('Excluir este relatório?')) {
        DB.set('psy_reports', DB.get('psy_reports').filter((r: any) => r.id !== id));
        renderReports(document.getElementById('app-viewport')!);
    }
};

window.saveTest = (type: string, data: any) => {
    const sessions = DB.get('psy_sessions');
    const idx = sessions.findIndex((s: any) => s.id === State.activeSessionId);
    if (idx !== -1) {
        if (!sessions[idx].tests) sessions[idx].tests = {};
        sessions[idx].tests[type] = data;
        DB.set('psy_sessions', sessions);
    }
};

// --- Início ---
DB.init();
window.router.navigate('home');
