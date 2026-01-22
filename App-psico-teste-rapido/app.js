
/**
 * APP KIT PSICOPEDAGOGO PRO - LÓGICA CORE
 */

// --- BANCO DE DADOS (LOCALSTORAGE) ---
const DB = {
    get: (key, def = []) => JSON.parse(localStorage.getItem(key)) || def,
    set: (key, val) => localStorage.setitem ? localStorage.setItem(key, JSON.stringify(val)) : localStorage.setItem(key, JSON.stringify(val)), // Small polyfill for some browsers
    init() {
        if (!localStorage.getItem('psy_profile')) this.set('psy_profile', { name: '', city: '', phone: '', email: '', signature: '' });
        if (!localStorage.getItem('psy_students')) this.set('psy_students', []);
        if (!localStorage.getItem('psy_sessions')) this.set('psy_sessions', []);
        if (!localStorage.getItem('psy_reports')) this.set('psy_reports', []);
    }
};

// --- ESTADO DA SESSÃO ATUAL ---
const AppState = {
    currentView: 'home',
    activeStudentId: null,
    activeSessionId: null,
    testTemp: {}
};

// --- ROTEAMENTO ---
const router = {
    navigate(view) {
        AppState.currentView = view;
        this.updateNavUI();
        this.render();
        window.scrollTo(0,0);
    },
    updateNavUI() {
        document.querySelectorAll('.nav-btn').forEach(btn => {
            const tab = btn.getAttribute('data-tab');
            btn.classList.toggle('active-tab', tab === AppState.currentView);
            btn.classList.toggle('text-slate-400', tab !== AppState.currentView);
        });
    },
    render() {
        const root = document.getElementById('app-content');
        switch (AppState.currentView) {
            case 'home': renderHome(root); break;
            case 'testes': renderTestList(root); break;
            case 'relatorios': renderReports(root); break;
            case 'alunos': renderStudents(root); break;
            case 'config': renderConfig(root); break;
            case 'student_detail': renderStudentDetail(root); break;
            case 'new_session': renderNewSession(root); break;
            case 'test_fluency': renderTestFluency(root); break;
            case 'test_phonology': renderTestPhonology(root); break;
            case 'test_attention': renderTestAttention(root); break;
            case 'test_writing': renderTestWriting(root); break;
            default: renderHome(root);
        }
    }
};

// --- UTILITÁRIOS ---
const Utils = {
    id: () => Date.now().toString(36) + Math.random().toString(36).substr(2),
    age: (dob) => {
        if (!dob) return '';
        const today = new Date();
        const birthDate = new Date(dob);
        let age = today.getFullYear() - birthDate.getFullYear();
        const m = today.getMonth() - birthDate.getMonth();
        if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) age--;
        return age;
    },
    date: (d) => new Date(d).toLocaleDateString('pt-BR')
};

// --- VIEWS ---

function renderHome(el) {
    const students = DB.get('psy_students');
    const sessions = DB.get('psy_sessions');
    const profile = DB.get('psy_profile');

    el.innerHTML = `
        <div class="space-y-6">
            <div class="bg-emerald-600 p-6 rounded-3xl text-white shadow-lg shadow-emerald-200">
                <p class="text-emerald-100 text-sm font-medium">Olá, ${profile.name || 'Psicopedagoga'}</p>
                <h2 class="text-2xl font-bold">Painel de Controle</h2>
                <div class="mt-4 flex gap-2">
                    <button onclick="router.navigate('alunos')" class="bg-white/20 px-4 py-2 rounded-xl text-xs font-bold backdrop-blur-md">Novo Atendimento</button>
                    <button onclick="router.navigate('config')" class="bg-emerald-500 px-4 py-2 rounded-xl text-xs font-bold border border-white/20">Configurar Perfil</button>
                </div>
            </div>

            <div class="grid grid-cols-2 gap-3">
                <div class="bg-white p-4 rounded-2xl border border-emerald-100 shadow-sm text-center">
                    <div class="text-2xl font-black text-emerald-600">${students.length}</div>
                    <div class="text-[10px] uppercase font-bold text-slate-400">Alunos</div>
                </div>
                <div class="bg-white p-4 rounded-2xl border border-emerald-100 shadow-sm text-center">
                    <div class="text-2xl font-black text-emerald-600">${sessions.length}</div>
                    <div class="text-[10px] uppercase font-bold text-slate-400">Atendimentos</div>
                </div>
            </div>

            <h3 class="font-bold text-slate-700 px-1">Atalhos</h3>
            <div class="grid grid-cols-1 gap-3">
                <button onclick="router.navigate('testes')" class="flex items-center gap-4 bg-white p-4 rounded-2xl border border-emerald-100 shadow-sm hover:bg-emerald-50">
                    <div class="w-12 h-12 bg-blue-100 text-blue-600 rounded-xl flex items-center justify-center text-xl"><i class="fas fa-flask"></i></div>
                    <div class="text-left">
                        <p class="font-bold text-slate-700">Bateria de Testes</p>
                        <p class="text-xs text-slate-400">Acesse leitura, fonologia e atenção.</p>
                    </div>
                </button>
                <button onclick="router.navigate('relatorios')" class="flex items-center gap-4 bg-white p-4 rounded-2xl border border-emerald-100 shadow-sm hover:bg-emerald-50">
                    <div class="w-12 h-12 bg-amber-100 text-amber-600 rounded-xl flex items-center justify-center text-xl"><i class="fas fa-file-pdf"></i></div>
                    <div class="text-left">
                        <p class="font-bold text-slate-700">Gerar Relatórios</p>
                        <p class="text-xs text-slate-400">Documente as sessões aplicadas.</p>
                    </div>
                </button>
            </div>
        </div>
    `;
}

function renderConfig(el) {
    const profile = DB.get('psy_profile');
    el.innerHTML = `
        <div class="space-y-6">
            <h2 class="text-2xl font-bold text-emerald-800">Ajustes do Perfil</h2>
            <form id="profile-form" class="bg-white p-6 rounded-3xl border border-emerald-100 space-y-4">
                <div>
                    <label class="block text-xs font-bold text-slate-400 uppercase mb-1">Nome da Psicopedagoga</label>
                    <input type="text" name="name" value="${profile.name}" class="w-full bg-slate-50 p-3 rounded-xl border border-slate-100 outline-none" placeholder="Ex: Maria Oliveira" required>
                </div>
                <div>
                    <label class="block text-xs font-bold text-slate-400 uppercase mb-1">Cidade / UF</label>
                    <input type="text" name="city" value="${profile.city}" class="w-full bg-slate-50 p-3 rounded-xl border border-slate-100 outline-none" placeholder="Ex: São Paulo / SP">
                </div>
                <div class="grid grid-cols-2 gap-3">
                    <div>
                        <label class="block text-xs font-bold text-slate-400 uppercase mb-1">Telefone</label>
                        <input type="text" name="phone" value="${profile.phone}" class="w-full bg-slate-50 p-3 rounded-xl border border-slate-100 outline-none">
                    </div>
                    <div>
                        <label class="block text-xs font-bold text-slate-400 uppercase mb-1">E-mail</label>
                        <input type="email" name="email" value="${profile.email}" class="w-full bg-slate-50 p-3 rounded-xl border border-slate-100 outline-none">
                    </div>
                </div>
                <div>
                    <label class="block text-xs font-bold text-slate-400 uppercase mb-1">Assinatura Digital (Texto)</label>
                    <textarea name="signature" class="w-full bg-slate-50 p-3 rounded-xl border border-slate-100 outline-none">${profile.signature}</textarea>
                </div>
                <button type="submit" class="w-full bg-emerald-600 text-white font-bold py-4 rounded-2xl shadow-lg">Salvar Perfil</button>
            </form>
        </div>
    `;

    document.getElementById('profile-form').onsubmit = (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        DB.set('psy_profile', Object.fromEntries(formData.entries()));
        alert('Perfil salvo com sucesso!');
        router.navigate('home');
    };
}

function renderStudents(el) {
    const students = DB.get('psy_students');
    el.innerHTML = `
        <div class="space-y-6">
            <div class="flex justify-between items-center">
                <h2 class="text-2xl font-bold text-emerald-800">Alunos</h2>
                <button onclick="window.openStudentModal()" class="bg-emerald-600 text-white px-4 py-2 rounded-xl text-sm font-bold flex items-center gap-2">
                    <i class="fas fa-plus text-xs"></i> Novo Aluno
                </button>
            </div>

            <div class="relative">
                <i class="fas fa-search absolute left-4 top-3.5 text-slate-300"></i>
                <input type="text" id="search-student" class="w-full pl-10 p-3 bg-white rounded-2xl border border-emerald-50 outline-none" placeholder="Buscar aluno...">
            </div>

            <div class="space-y-3" id="student-list">
                ${students.length === 0 ? `<p class="text-center py-10 text-slate-400">Nenhum aluno cadastrado.</p>` : ''}
                ${students.map(s => `
                    <div onclick="window.openStudentDetail('${s.id}')" class="bg-white p-4 rounded-2xl border border-emerald-100 shadow-sm flex items-center justify-between cursor-pointer active:scale-95 transition-all">
                        <div class="flex items-center gap-4">
                            <div class="w-10 h-10 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center font-black">${s.name.charAt(0)}</div>
                            <div>
                                <h4 class="font-bold text-slate-700">${s.name}</h4>
                                <p class="text-[10px] text-slate-400 uppercase font-bold">${s.grade || 'Série N/I'} • ${Utils.age(s.birthDate)} anos</p>
                            </div>
                        </div>
                        <i class="fas fa-chevron-right text-slate-200"></i>
                    </div>
                `).join('')}
            </div>
        </div>

        <!-- Modal de Cadastro -->
        <div id="modal-student" class="fixed inset-0 bg-black/50 z-[60] hidden flex items-end justify-center">
            <div class="bg-white w-full max-w-md rounded-t-[40px] p-8 shadow-2xl animate-in slide-in-from-bottom duration-300">
                <div class="flex justify-between items-center mb-6">
                    <h3 class="text-xl font-bold text-slate-800">Cadastrar Aluno</h3>
                    <button onclick="window.closeStudentModal()" class="text-slate-400"><i class="fas fa-times text-xl"></i></button>
                </div>
                <form id="student-form" class="space-y-4">
                    <input type="text" name="name" placeholder="Nome Completo *" class="w-full bg-slate-50 p-4 rounded-2xl border border-slate-100 outline-none" required>
                    <div class="grid grid-cols-2 gap-3">
                        <input type="date" name="birthDate" class="w-full bg-slate-50 p-4 rounded-2xl border border-slate-100 outline-none">
                        <input type="text" name="grade" placeholder="Série/Ano" class="w-full bg-slate-50 p-4 rounded-2xl border border-slate-100 outline-none">
                    </div>
                    <input type="text" name="school" placeholder="Escola" class="w-full bg-slate-50 p-4 rounded-2xl border border-slate-100 outline-none">
                    <input type="text" name="parent" placeholder="Responsável" class="w-full bg-slate-50 p-4 rounded-2xl border border-slate-100 outline-none">
                    <textarea name="notes" placeholder="Observações iniciais..." class="w-full bg-slate-50 p-4 rounded-2xl border border-slate-100 outline-none" rows="2"></textarea>
                    <button type="submit" class="w-full bg-emerald-600 text-white font-bold py-4 rounded-2xl">Salvar Cadastro</button>
                </form>
            </div>
        </div>
    `;

    // Lógica interna
    window.openStudentModal = () => document.getElementById('modal-student').classList.remove('hidden');
    window.closeStudentModal = () => document.getElementById('modal-student').classList.add('hidden');
    window.openStudentDetail = (id) => { AppState.activeStudentId = id; router.navigate('student_detail'); };

    document.getElementById('student-form').onsubmit = (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const list = DB.get('psy_students');
        list.push({ id: Utils.id(), ...Object.fromEntries(formData.entries()), createdAt: new Date().toISOString() });
        DB.set('psy_students', list);
        window.closeStudentModal();
        renderStudents(el);
    };

    document.getElementById('search-student').oninput = (e) => {
        const q = e.target.value.toLowerCase();
        document.querySelectorAll('#student-list > div').forEach(div => {
            div.style.display = div.innerText.toLowerCase().includes(q) ? 'flex' : 'none';
        });
    };
}

function renderStudentDetail(el) {
    const student = DB.get('psy_students').find(s => s.id === AppState.activeStudentId);
    if (!student) return router.navigate('alunos');

    const sessions = DB.get('psy_sessions').filter(s => s.studentId === student.id);

    el.innerHTML = `
        <div class="space-y-6">
            <div class="flex items-center gap-4">
                <button onclick="router.navigate('alunos')" class="w-10 h-10 flex items-center justify-center bg-white rounded-full border border-emerald-50 text-slate-400"><i class="fas fa-arrow-left"></i></button>
                <h2 class="text-xl font-bold text-slate-800">Prontuário</h2>
            </div>

            <div class="bg-white p-6 rounded-3xl border border-emerald-100 shadow-sm space-y-4">
                <div class="flex items-center gap-4 border-b border-slate-50 pb-4">
                    <div class="w-14 h-14 bg-emerald-600 text-white rounded-2xl flex items-center justify-center font-black text-xl shadow-lg">${student.name.charAt(0)}</div>
                    <div>
                        <h3 class="text-xl font-bold text-slate-800">${student.name}</h3>
                        <p class="text-xs text-slate-400 font-bold uppercase tracking-tight">${student.grade || 'Série N/I'} • ${Utils.age(student.birthDate)} anos</p>
                    </div>
                </div>
                <div class="grid grid-cols-2 gap-y-3">
                    <div><span class="text-[10px] uppercase font-bold text-slate-300 block">Escola</span> <span class="text-sm font-semibold text-slate-600">${student.school || '---'}</span></div>
                    <div><span class="text-[10px] uppercase font-bold text-slate-300 block">Responsável</span> <span class="text-sm font-semibold text-slate-600">${student.parent || '---'}</span></div>
                </div>
            </div>

            <div class="flex gap-2">
                <button onclick="window.startSession()" class="flex-grow bg-emerald-600 text-white font-bold py-4 rounded-2xl shadow-lg flex items-center justify-center gap-2">
                    <i class="fas fa-plus"></i> Iniciar Sessão
                </button>
                <button onclick="window.deleteStudent('${student.id}')" class="bg-red-50 text-red-500 px-5 rounded-2xl border border-red-100"><i class="fas fa-trash"></i></button>
            </div>

            <h3 class="font-bold text-slate-700 px-1">Histórico</h3>
            <div class="space-y-3">
                ${sessions.length === 0 ? '<p class="text-center py-8 text-slate-400 text-sm italic">Nenhuma sessão registrada.</p>' : ''}
                ${sessions.map(s => `
                    <div onclick="window.continueSession('${s.id}')" class="bg-white p-4 rounded-2xl border border-slate-100 shadow-sm flex items-center justify-between cursor-pointer active:scale-95 transition-all">
                        <div class="flex items-center gap-3">
                            <div class="w-10 h-10 bg-slate-50 text-slate-300 rounded-lg flex items-center justify-center"><i class="fas fa-calendar-day"></i></div>
                            <div>
                                <p class="font-bold text-slate-700">${Utils.date(s.date)}</p>
                                <p class="text-[10px] text-slate-400 truncate w-40">${s.objective || 'Atendimento de rotina'}</p>
                            </div>
                        </div>
                        <i class="fas fa-chevron-right text-emerald-600 text-sm"></i>
                    </div>
                `).reverse().join('')}
            </div>
        </div>
    `;

    window.startSession = () => { AppState.activeSessionId = null; router.navigate('new_session'); };
    window.continueSession = (id) => { AppState.activeSessionId = id; router.navigate('new_session'); };
    window.deleteStudent = (id) => {
        if (confirm('Deseja excluir este aluno e todo seu histórico?')) {
            const list = DB.get('psy_students').filter(s => s.id !== id);
            DB.set('psy_students', list);
            router.navigate('alunos');
        }
    };
}

function renderNewSession(el) {
    const student = DB.get('psy_students').find(s => s.id === AppState.activeStudentId);
    const session = AppState.activeSessionId ? DB.get('psy_sessions').find(s => s.id === AppState.activeSessionId) : null;

    el.innerHTML = `
        <div class="space-y-6">
            <div class="flex items-center gap-4">
                <button onclick="router.navigate('student_detail')" class="w-10 h-10 flex items-center justify-center bg-white rounded-full border border-emerald-50 text-slate-400"><i class="fas fa-arrow-left"></i></button>
                <h2 class="text-xl font-bold text-slate-800">${session ? 'Sessão em Curso' : 'Nova Sessão'}</h2>
            </div>

            <form id="session-form" class="bg-white p-6 rounded-3xl border border-emerald-100 shadow-sm space-y-4">
                <div class="flex items-center gap-3 bg-emerald-50 p-3 rounded-2xl mb-2">
                    <div class="w-8 h-8 bg-emerald-600 text-white rounded-full flex items-center justify-center text-xs font-bold">${student.name.charAt(0)}</div>
                    <span class="text-sm font-bold text-emerald-800">${student.name}</span>
                </div>
                <div>
                    <label class="block text-[10px] font-bold text-slate-400 uppercase mb-1">Data</label>
                    <input type="date" name="date" value="${session ? session.date : new Date().toISOString().split('T')[0]}" class="w-full bg-slate-50 p-4 rounded-2xl border border-slate-100 outline-none" required>
                </div>
                <div>
                    <label class="block text-[10px] font-bold text-slate-400 uppercase mb-1">Objetivo da Sessão</label>
                    <input type="text" name="objective" value="${session ? session.objective : ''}" placeholder="Ex: Avaliação de fluência leitora" class="w-full bg-slate-50 p-4 rounded-2xl border border-slate-100 outline-none">
                </div>
                <div>
                    <label class="block text-[10px] font-bold text-slate-400 uppercase mb-1">Observações / Notas Clínicas</label>
                    <textarea name="observations" class="w-full bg-slate-50 p-4 rounded-2xl border border-slate-100 outline-none" rows="5">${session ? session.observations : ''}</textarea>
                </div>
                <button type="submit" class="w-full bg-emerald-600 text-white font-bold py-4 rounded-2xl shadow-lg">Salvar Informações</button>
            </form>

            ${session ? `
                <div class="grid grid-cols-2 gap-3">
                    <button onclick="router.navigate('testes')" class="bg-blue-600 text-white font-bold py-5 rounded-3xl flex flex-col items-center gap-2 shadow-lg active:scale-95 transition-all">
                        <i class="fas fa-vial text-2xl"></i>
                        <span class="text-xs uppercase">Aplicar Testes</span>
                    </button>
                    <button onclick="window.generateAndExportReport('${session.id}')" class="bg-emerald-700 text-white font-bold py-5 rounded-3xl flex flex-col items-center gap-2 shadow-lg active:scale-95 transition-all">
                        <i class="fas fa-file-export text-2xl"></i>
                        <span class="text-xs uppercase">Emitir Relatório</span>
                    </button>
                </div>

                <div class="bg-white p-5 rounded-3xl border border-slate-100">
                    <h4 class="text-xs font-black text-slate-400 uppercase mb-3">Checklist de Testes Aplicados</h4>
                    <div class="space-y-2">
                        ${['fluency','phonology','attention','writing'].map(t => {
                            const applied = session.tests && session.tests[t];
                            const labels = { fluency: 'Leitura', phonology: 'Consciência Fonológica', attention: 'Atenção', writing: 'Escrita' };
                            return `<div class="flex items-center gap-2 text-sm ${applied ? 'text-emerald-600 font-bold' : 'text-slate-300'}"><i class="fas fa-${applied ? 'check-circle' : 'circle'}"></i> ${labels[t]}</div>`;
                        }).join('')}
                    </div>
                </div>
            ` : ''}
        </div>
    `;

    document.getElementById('session-form').onsubmit = (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const list = DB.get('psy_sessions');
        
        if (AppState.activeSessionId) {
            const idx = list.findIndex(s => s.id === AppState.activeSessionId);
            list[idx] = { ...list[idx], ...Object.fromEntries(formData.entries()) };
            DB.set('psy_sessions', list);
            alert('Sessão atualizada!');
        } else {
            const newS = { id: Utils.id(), studentId: student.id, ...Object.fromEntries(formData.entries()), tests: {} };
            list.push(newS);
            DB.set('psy_sessions', list);
            AppState.activeSessionId = newS.id;
            alert('Sessão iniciada!');
        }
        renderNewSession(el);
    };
}

// --- ABA TESTES ---

function renderTestList(el) {
    if (!AppState.activeSessionId) {
        el.innerHTML = `
            <div class="flex flex-col items-center justify-center py-20 text-center space-y-4">
                <div class="w-20 h-20 bg-amber-50 text-amber-500 rounded-full flex items-center justify-center text-3xl"><i class="fas fa-exclamation-triangle"></i></div>
                <h2 class="text-xl font-bold text-slate-800">Selecione uma sessão</h2>
                <p class="text-sm text-slate-400 max-w-xs">Você precisa iniciar um atendimento na aba Alunos antes de aplicar testes.</p>
                <button onclick="router.navigate('alunos')" class="bg-emerald-600 text-white px-8 py-3 rounded-2xl font-bold">Ir para Alunos</button>
            </div>
        `;
        return;
    }

    el.innerHTML = `
        <div class="space-y-6">
            <h2 class="text-2xl font-bold text-emerald-800">Bateria de Testes</h2>
            
            <div class="grid grid-cols-1 gap-4">
                <div onclick="router.navigate('test_fluency')" class="bg-white p-6 rounded-3xl border border-emerald-100 shadow-sm flex items-center gap-4 cursor-pointer active:scale-95 transition-all">
                    <div class="w-14 h-14 bg-emerald-100 text-emerald-600 rounded-2xl flex items-center justify-center text-2xl"><i class="fas fa-book-reader"></i></div>
                    <div class="flex-grow">
                        <p class="font-bold text-slate-700">Leitura & Fluência</p>
                        <p class="text-xs text-slate-400">Cronômetro e contagem de WPM.</p>
                    </div>
                    <i class="fas fa-chevron-right text-slate-200"></i>
                </div>

                <div onclick="router.navigate('test_phonology')" class="bg-white p-6 rounded-3xl border border-emerald-100 shadow-sm flex items-center gap-4 cursor-pointer active:scale-95 transition-all">
                    <div class="w-14 h-14 bg-blue-100 text-blue-600 rounded-2xl flex items-center justify-center text-2xl"><i class="fas fa-ear-listen"></i></div>
                    <div class="flex-grow">
                        <p class="font-bold text-slate-700">Consciência Fonológica</p>
                        <p class="text-xs text-slate-400">Rimas, sílabas e sons.</p>
                    </div>
                    <i class="fas fa-chevron-right text-slate-200"></i>
                </div>

                <div onclick="router.navigate('test_attention')" class="bg-white p-6 rounded-3xl border border-emerald-100 shadow-sm flex items-center gap-4 cursor-pointer active:scale-95 transition-all">
                    <div class="w-14 h-14 bg-purple-100 text-purple-600 rounded-2xl flex items-center justify-center text-2xl"><i class="fas fa-bolt"></i></div>
                    <div class="flex-grow">
                        <p class="font-bold text-slate-700">Atenção (Go/No-Go)</p>
                        <p class="text-xs text-slate-400">Tempo de reação e inibição.</p>
                    </div>
                    <i class="fas fa-chevron-right text-slate-200"></i>
                </div>

                <div onclick="router.navigate('test_writing')" class="bg-white p-6 rounded-3xl border border-emerald-100 shadow-sm flex items-center gap-4 cursor-pointer active:scale-95 transition-all">
                    <div class="w-14 h-14 bg-orange-100 text-orange-600 rounded-2xl flex items-center justify-center text-2xl"><i class="fas fa-pen-nib"></i></div>
                    <div class="flex-grow">
                        <p class="font-bold text-slate-700">Escrita Funcional</p>
                        <p class="text-xs text-slate-400">Registro guiado de erros ortográficos.</p>
                    </div>
                    <i class="fas fa-chevron-right text-slate-200"></i>
                </div>
            </div>
        </div>
    `;
}

// --- TESTE 1: FLUÊNCIA ---
const TEXTS = {
    facil: "O pato nada na lagoa. O sol brilha no céu azul. A menina joga bola com o cachorro feliz.",
    medio: "A escola é um lugar muito importante para aprender. Hoje o professor contou uma história sobre as estrelas e o universo distante.",
    dificil: "A complexidade da aprendizagem humana envolve processos cognitivos diversos. É fundamental estimular a curiosidade científica desde os anos iniciais da educação básica."
};

function renderTestFluency(el) {
    let timer = 0, interval = null, errors = { omi: 0, sub: 0, inv: 0, acr: 0 }, level = 'facil';

    const updateUI = () => {
        el.innerHTML = `
            <div class="space-y-6">
                <div class="flex justify-between items-center">
                    <button onclick="router.navigate('testes')" class="text-slate-400"><i class="fas fa-arrow-left"></i></button>
                    <h2 class="text-lg font-bold">Fluência Leitora</h2>
                    <div class="bg-slate-900 text-white font-mono px-3 py-1 rounded-lg text-lg" id="timer-display">00:00</div>
                </div>

                <div class="bg-white p-6 rounded-[40px] border border-emerald-100 shadow-sm space-y-6">
                    <div class="flex gap-2">
                        ${['facil','medio','dificil'].map(l => `<button onclick="window.setLevel('${l}')" class="flex-grow py-2 rounded-xl text-xs font-bold ${level===l ? 'bg-emerald-600 text-white' : 'bg-slate-100 text-slate-400'}">${l.toUpperCase()}</button>`).join('')}
                    </div>

                    <div class="bg-emerald-50 p-6 rounded-3xl text-lg text-slate-600 italic select-none leading-relaxed border border-emerald-100">
                        ${TEXTS[level]}
                    </div>

                    <div class="flex gap-4">
                        <button id="btn-start" class="flex-grow bg-emerald-600 text-white font-bold py-4 rounded-2xl shadow-lg"><i class="fas fa-play"></i> Iniciar</button>
                        <button id="btn-stop" class="flex-grow bg-red-600 text-white font-bold py-4 rounded-2xl shadow-lg hidden"><i class="fas fa-stop"></i> Parar</button>
                    </div>

                    <div class="grid grid-cols-2 gap-2">
                        <button onclick="window.addErr('omi')" class="bg-slate-50 p-3 rounded-2xl flex flex-col items-center">
                            <span class="text-[8px] font-bold text-slate-300 uppercase">Omissão</span>
                            <span class="text-xl font-black text-red-500" id="e-omi">0</span>
                        </button>
                        <button onclick="window.addErr('sub')" class="bg-slate-50 p-3 rounded-2xl flex flex-col items-center">
                            <span class="text-[8px] font-bold text-slate-300 uppercase">Troca</span>
                            <span class="text-xl font-black text-red-500" id="e-sub">0</span>
                        </button>
                        <button onclick="window.addErr('inv')" class="bg-slate-50 p-3 rounded-2xl flex flex-col items-center">
                            <span class="text-[8px] font-bold text-slate-300 uppercase">Inversão</span>
                            <span class="text-xl font-black text-red-500" id="e-inv">0</span>
                        </button>
                        <button onclick="window.addErr('acr')" class="bg-slate-50 p-3 rounded-2xl flex flex-col items-center">
                            <span class="text-[8px] font-bold text-slate-300 uppercase">Acréscimo</span>
                            <span class="text-xl font-black text-red-500" id="e-acr">0</span>
                        </button>
                    </div>
                </div>
            </div>
        `;

        document.getElementById('btn-start').onclick = () => {
            document.getElementById('btn-start').classList.add('hidden');
            document.getElementById('btn-stop').classList.remove('hidden');
            interval = setInterval(() => {
                timer++;
                const m = Math.floor(timer/60).toString().padStart(2,'0');
                const s = (timer%60).toString().padStart(2,'0');
                document.getElementById('timer-display').innerText = `${m}:${s}`;
            }, 1000);
        };

        document.getElementById('btn-stop').onclick = () => {
            clearInterval(interval);
            const words = TEXTS[level].split(' ').length;
            const wpm = Math.round(words / (timer / 60));
            const accuracy = Math.max(0, 100 - ((errors.omi + errors.sub + errors.inv + errors.acr) * 2));
            
            saveTest('fluency', { level, timer, wpm, accuracy, errors });
            alert(`Teste finalizado!\nWPM: ${wpm}\nPrecisão: ${accuracy}%`);
            router.navigate('testes');
        };
    };

    window.setLevel = (l) => { level = l; updateUI(); };
    window.addErr = (t) => { errors[t]++; document.getElementById(`e-${t}`).innerText = errors[t]; };
    updateUI();
}

// --- TESTE 2: FONOLOGIA ---
const PHONO_QS = [
    { q: 'Qual palavra rima com MÃO?', a: ['Pé', 'Pão', 'Dedo'], c: 1, t: 'rima' },
    { q: 'Qual começa com o mesmo som de BOLA?', a: ['Bico', 'Dado', 'Pato'], c: 0, t: 'som' },
    { q: 'Quantas sílabas tem MARIPOSA?', a: ['3', '4', '5'], c: 1, t: 'sílaba' },
    { q: 'Qual palavra rima com GATO?', a: ['Rato', 'Casa', 'Bola'], c: 0, t: 'rima' },
    { q: 'Qual começa com o som de FADA?', a: ['Gato', 'Foca', 'Dado'], c: 1, t: 'som' },
    { q: 'Quantas sílabas em SOL?', a: ['1', '2', '3'], c: 0, t: 'sílaba' },
    { q: 'Rima com DENTE:', a: ['Pente', 'Doce', 'Bala'], c: 0, t: 'rima' },
    { q: 'Som inicial de LATA:', a: ['Pato', 'Mala', 'Lixo'], c: 2, t: 'som' }
];

function renderTestPhonology(el) {
    let current = 0, score = 0, breakdown = { rima: 0, som: 0, sílaba: 0 };

    const showQ = () => {
        const q = PHONO_QS[current];
        el.innerHTML = `
            <div class="space-y-6">
                <div class="flex justify-between items-center">
                    <button onclick="router.navigate('testes')" class="text-slate-400"><i class="fas fa-arrow-left"></i></button>
                    <span class="text-xs font-black text-slate-300 uppercase tracking-widest">Questão ${current+1}/8</span>
                </div>
                <div class="bg-white p-8 rounded-[40px] border border-blue-50 shadow-sm text-center space-y-8">
                    <div class="bg-blue-50 text-blue-600 px-4 py-1 rounded-full text-[10px] font-black uppercase inline-block">${q.t}</div>
                    <h3 class="text-2xl font-bold text-slate-800">${q.q}</h3>
                    <div class="space-y-3">
                        ${q.a.map((opt, i) => `<button onclick="window.ansPho(${i})" class="w-full bg-slate-50 p-5 rounded-2xl border border-slate-100 font-bold hover:bg-blue-600 hover:text-white transition-all text-left">${opt}</button>`).join('')}
                    </div>
                </div>
            </div>
        `;
    };

    window.ansPho = (i) => {
        const q = PHONO_QS[current];
        if (i === q.c) { score++; breakdown[q.t]++; }
        current++;
        if (current < 8) showQ();
        else {
            saveTest('phonology', { score, breakdown });
            alert(`Concluído! Pontuação: ${score}/8`);
            router.navigate('testes');
        }
    };
    showQ();
}

// --- TESTE 3: ATENÇÃO (GO/NO-GO) ---
function renderTestAttention(el) {
    let running = false, results = [], errors = { comm: 0, omis: 0 }, timeLeft = 30, timerInt, stimInt, active = false, currentIsGo = false;

    el.innerHTML = `
        <div class="space-y-6">
            <div class="flex justify-between items-center">
                <button onclick="router.navigate('testes')" class="text-slate-400"><i class="fas fa-arrow-left"></i></button>
                <div class="bg-purple-600 text-white font-mono px-3 py-1 rounded-lg text-lg" id="att-timer">30s</div>
            </div>
            <div class="bg-white p-8 rounded-[40px] border border-purple-50 shadow-sm flex flex-col items-center justify-center min-h-[400px] text-center space-y-6">
                <div id="instruction-box">
                    <p class="text-slate-500 text-sm">Toque no círculo apenas quando ele ficar <b class="text-emerald-500">VERDE</b>.<br>Não toque se ficar <b class="text-red-500">VERMELHO</b>.</p>
                </div>
                <div id="stimulus" onclick="window.hitAtt()" class="w-48 h-48 rounded-full bg-slate-100 flex items-center justify-center cursor-pointer border-8 border-white shadow-inner transition-all scale-90">
                    <i class="fas fa-hand-pointer text-4xl text-slate-200"></i>
                </div>
                <button id="start-att" class="bg-purple-600 text-white px-10 py-4 rounded-2xl font-bold shadow-lg">Começar</button>
            </div>
        </div>
    `;

    const start = () => {
        running = true;
        document.getElementById('start-att').classList.add('hidden');
        document.getElementById('instruction-box').classList.add('invisible');
        timerInt = setInterval(() => {
            timeLeft--;
            document.getElementById('att-timer').innerText = timeLeft + 's';
            if (timeLeft <= 0) end();
        }, 1000);
        next();
    };

    const next = () => {
        if (!running) return;
        active = false;
        const stim = document.getElementById('stimulus');
        stim.className = "w-48 h-48 rounded-full bg-slate-100 flex items-center justify-center cursor-pointer border-8 border-white shadow-inner transition-all scale-90";
        stim.innerHTML = "";
        
        const delay = 1000 + Math.random() * 2000;
        stimInt = setTimeout(() => {
            currentIsGo = Math.random() > 0.3;
            active = true;
            stim.classList.remove('scale-90');
            stim.classList.add('scale-100');
            stim.classList.add(currentIsGo ? 'bg-emerald-500' : 'bg-red-500');
            const startT = Date.now();
            
            stimInt = setTimeout(() => {
                if (active && currentIsGo) errors.omis++;
                next();
            }, 1000);
            
            AppState.testTemp.startT = startT;
        }, delay);
    };

    window.hitAtt = () => {
        if (!active) return;
        if (currentIsGo) {
            results.push(Date.now() - AppState.testTemp.startT);
        } else {
            errors.comm++;
        }
        active = false;
        clearTimeout(stimInt);
        next();
    };

    const end = () => {
        running = false;
        clearInterval(timerInt);
        clearTimeout(stimInt);
        const avg = results.length ? Math.round(results.reduce((a,b)=>a+b)/results.length) : 0;
        saveTest('attention', { avg, errors, hits: results.length });
        alert(`Fim! Média de Reação: ${avg}ms`);
        router.navigate('testes');
    };

    document.getElementById('start-att').onclick = start;
}

// --- TESTE 4: ESCRITA ---
function renderTestWriting(el) {
    const session = DB.get('psy_sessions').find(s => s.id === AppState.activeSessionId);
    const existing = session.tests.writing || { notes: '', checklist: [] };

    el.innerHTML = `
        <div class="space-y-6">
            <div class="flex items-center gap-4">
                <button onclick="router.navigate('testes')" class="w-10 h-10 flex items-center justify-center bg-white rounded-full border border-emerald-50 text-slate-400"><i class="fas fa-arrow-left"></i></button>
                <h2 class="text-xl font-bold">Escrita Funcional</h2>
            </div>
            <div class="bg-white p-6 rounded-[40px] border border-orange-50 space-y-6">
                <div>
                    <label class="block text-xs font-bold text-slate-400 uppercase mb-2">Registro de Ditado / Observações</label>
                    <textarea id="w-notes" class="w-full bg-slate-50 p-4 rounded-3xl border border-slate-100 outline-none" rows="6" placeholder="Registre o desempenho aqui...">${existing.notes}</textarea>
                </div>
                <div>
                    <label class="block text-xs font-bold text-slate-400 uppercase mb-2">Checklist Ortográfico</label>
                    <div class="grid grid-cols-1 gap-2">
                        ${['Troca b/d', 'Troca p/q', 'Omissões', 'Hipossegmentação', 'Hipersegmentação', 'Espelhamento'].map(item => `
                            <label class="flex items-center gap-3 p-3 bg-slate-50 rounded-2xl cursor-pointer">
                                <input type="checkbox" name="chk-w" value="${item}" ${existing.checklist.includes(item) ? 'checked' : ''} class="w-5 h-5 accent-orange-500">
                                <span class="text-sm font-semibold text-slate-600">${item}</span>
                            </label>
                        `).join('')}
                    </div>
                </div>
                <button onclick="window.saveW()" class="w-full bg-orange-600 text-white font-bold py-4 rounded-2xl shadow-lg">Salvar Registro</button>
            </div>
        </div>
    `;

    window.saveW = () => {
        const notes = document.getElementById('w-notes').value;
        const checklist = Array.from(document.querySelectorAll('input[name="chk-w"]:checked')).map(i => i.value);
        saveTest('writing', { notes, checklist });
        alert('Salvo!');
        router.navigate('testes');
    };
}

function saveTest(type, data) {
    const list = DB.get('psy_sessions');
    const idx = list.findIndex(s => s.id === AppState.activeSessionId);
    if (idx !== -1) {
        list[idx].tests[type] = data;
        DB.set('psy_sessions', list);
    }
}

// --- ABA RELATÓRIOS ---

function renderReports(el) {
    const reports = DB.get('psy_reports');
    el.innerHTML = `
        <div class="space-y-6">
            <h2 class="text-2xl font-bold text-emerald-800">Relatórios Gerados</h2>
            <div class="space-y-3">
                ${reports.length === 0 ? '<p class="text-center py-20 text-slate-300">Nenhum relatório emitido.</p>' : ''}
                ${reports.map(r => `
                    <div class="bg-white p-4 rounded-2xl border border-emerald-100 shadow-sm flex items-center justify-between">
                        <div class="flex items-center gap-3">
                            <div class="w-10 h-10 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center"><i class="fas fa-file-contract"></i></div>
                            <div>
                                <p class="font-bold text-slate-700">${r.studentName}</p>
                                <p class="text-[10px] text-slate-400 font-bold uppercase">${Utils.date(r.date)}</p>
                            </div>
                        </div>
                        <div class="flex gap-2">
                            <button onclick="window.downloadPdf('${r.id}')" class="text-emerald-600 p-2"><i class="fas fa-download"></i></button>
                            <button onclick="window.deleteReport('${r.id}')" class="text-red-200 p-2"><i class="fas fa-trash"></i></button>
                        </div>
                    </div>
                `).reverse().join('')}
            </div>
        </div>
    `;

    window.downloadPdf = (id) => {
        const r = DB.get('psy_reports').find(x => x.id === id);
        generatePDF(r);
    };

    window.deleteReport = (id) => {
        if(confirm('Excluir?')) {
            const list = DB.get('psy_reports').filter(x => x.id !== id);
            DB.set('psy_reports', list);
            renderReports(el);
        }
    };
}

async function generateAndExportReport(sessionId) {
    const session = DB.get('psy_sessions').find(s => s.id === sessionId);
    const student = DB.get('psy_students').find(s => s.id === session.studentId);
    const profile = DB.get('psy_profile');
    
    const report = {
        id: Utils.id(),
        date: new Date().toISOString(),
        studentName: student.name,
        data: { session, student, profile }
    };

    const list = DB.get('psy_reports');
    list.push(report);
    DB.set('psy_reports', list);
    
    alert('Relatório gerado!');
    router.navigate('relatorios');
}

async function generatePDF(report) {
    const area = document.getElementById('pdf-render-area');
    const { session, student, profile } = report.data;

    area.innerHTML = `
        <div style="font-family: Arial, sans-serif; color: #333; padding: 40px; border: 1px solid #eee;">
            <div style="text-align: center; border-bottom: 2px solid #10b981; padding-bottom: 20px; margin-bottom: 30px;">
                <h1 style="color: #065f46; margin: 0; font-size: 24px;">RELATÓRIO PSICOPEDAGÓGICO</h1>
                <p style="margin: 5px 0; font-weight: bold; font-size: 14px;">${profile.name}</p>
                <p style="margin: 0; font-size: 12px; color: #666;">${profile.city} • ${profile.phone} • ${profile.email}</p>
            </div>

            <div style="background: #f8fafc; padding: 15px; border-radius: 8px; margin-bottom: 20px;">
                <h3 style="margin-top: 0; font-size: 14px; color: #1e293b; border-bottom: 1px solid #ddd; padding-bottom: 5px;">DADOS DO PACIENTE</h3>
                <p style="margin: 5px 0; font-size: 13px;"><b>Nome:</b> ${student.name}</p>
                <p style="margin: 5px 0; font-size: 13px;"><b>Série:</b> ${student.grade || '---'} | <b>Idade:</b> ${Utils.age(student.birthDate)} anos</p>
                <p style="margin: 5px 0; font-size: 13px;"><b>Data do Atendimento:</b> ${Utils.date(session.date)}</p>
            </div>

            <div style="margin-bottom: 20px;">
                <h3 style="font-size: 14px; color: #1e293b; border-bottom: 1px solid #ddd; padding-bottom: 5px;">SÍNTESE DA SESSÃO</h3>
                <p style="font-size: 13px;"><b>Objetivo:</b> ${session.objective || 'Atendimento de rotina'}</p>
                <p style="font-size: 13px; text-align: justify;"><b>Observações:</b> ${session.observations || 'N/A'}</p>
            </div>

            <div style="margin-bottom: 30px;">
                <h3 style="font-size: 14px; color: #1e293b; border-bottom: 1px solid #ddd; padding-bottom: 5px;">TESTES APLICADOS</h3>
                ${Object.keys(session.tests).length === 0 ? '<p style="font-size: 12px; font-style: italic;">Nenhum teste aplicado nesta data.</p>' : ''}
                
                ${session.tests.fluency ? `<div style="margin-bottom: 10px; padding-left: 10px; border-left: 2px solid #10b981;">
                    <p style="margin: 0; font-size: 13px;"><b>Fluência Leitora (${session.tests.fluency.level})</b></p>
                    <p style="margin: 0; font-size: 12px;">WPM: ${session.tests.fluency.wpm} | Precisão: ${session.tests.fluency.accuracy}%</p>
                </div>` : ''}

                ${session.tests.phonology ? `<div style="margin-bottom: 10px; padding-left: 10px; border-left: 2px solid #3b82f6;">
                    <p style="margin: 0; font-size: 13px;"><b>Consciência Fonológica</b></p>
                    <p style="margin: 0; font-size: 12px;">Pontuação Total: ${session.tests.phonology.score} / 8</p>
                </div>` : ''}

                ${session.tests.attention ? `<div style="margin-bottom: 10px; padding-left: 10px; border-left: 2px solid #a855f7;">
                    <p style="margin: 0; font-size: 13px;"><b>Atenção (Controle Inibitório)</b></p>
                    <p style="margin: 0; font-size: 12px;">Reação Média: ${session.tests.attention.avg}ms | Erros por Impulsividade: ${session.tests.attention.errors.comm}</p>
                </div>` : ''}

                ${session.tests.writing ? `<div style="margin-bottom: 10px; padding-left: 10px; border-left: 2px solid #f97316;">
                    <p style="margin: 0; font-size: 13px;"><b>Escrita Funcional</b></p>
                    <p style="margin: 0; font-size: 12px;">Erros identificados: ${session.tests.writing.checklist.join(', ') || 'Nenhum'}</p>
                </div>` : ''}
            </div>

            <div style="margin-top: 60px; text-align: center;">
                <div style="width: 250px; border-top: 1px solid #333; margin: 0 auto; padding-top: 5px;">
                    <p style="font-size: 12px; margin: 0;"><b>${profile.name}</b></p>
                    <p style="font-size: 10px; color: #666;">${profile.signature}</p>
                </div>
            </div>
        </div>
    `;

    const canvas = await html2canvas(area, { scale: 2 });
    const imgData = canvas.toDataURL('image/png');
    const { jsPDF } = window.jspdf;
    const pdf = new jsPDF('p', 'mm', 'a4');
    const w = pdf.internal.pageSize.getWidth();
    const h = (canvas.height * w) / canvas.width;
    pdf.addImage(imgData, 'PNG', 0, 0, w, h);
    pdf.save(`Relatorio_${student.name.replace(/\s/g,'_')}.pdf`);
}

// --- INICIALIZAÇÃO ---
DB.init();
router.navigate('home');
