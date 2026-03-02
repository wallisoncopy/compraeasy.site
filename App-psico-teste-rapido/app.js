
/**
 * APP KIT PSICOPEDAGOGO PRO - LÓGICA CORE
 */

// --- BANCO DE DADOS (LOCALSTORAGE) ---
const DB = {
    get: (key, def = []) => JSON.parse(localStorage.getItem(key)) || def,
    set: (key, val) => localStorage.setitem ? localStorage.setItem(key, JSON.stringify(val)) : localStorage.setItem(key, JSON.stringify(val)), // Small polyfill for some browsers
    init() {
        if (!localStorage.getItem('psy_profile')) this.set('psy_profile', { name: '', city: '', phone: '', email: '', signature: '', driveUrl: '' });
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
            case 'test_tea_tdah': renderTestTEA(root); break;
            case 'test_span_digitos': renderTestSpanDigitos(root); break;
            case 'test_memoria_visual': renderTestMemoriaVisual(root); break;
            case 'test_fluencia_verbal': renderTestFluenciaVerbal(root); break;
            case 'fichas': renderFichas(root); break;
            case 'evolucao': renderEvolucao(root); break;
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
                <button onclick="router.navigate('fichas')" class="flex items-center gap-4 bg-gradient-to-r from-violet-500 to-purple-600 p-4 rounded-2xl shadow-lg hover:opacity-90">
                    <div class="w-12 h-12 bg-white/20 text-white rounded-xl flex items-center justify-center text-xl"><i class="fas fa-folder-open"></i></div>
                    <div class="text-left">
                        <p class="font-bold text-white">Fichas & Materiais</p>
                        <p class="text-xs text-purple-100">Acesse a biblioteca de recursos e o manual.</p>
                    </div>
                    <i class="fas fa-arrow-right text-white/60 ml-auto"></i>
                </button>
                <a href="https://compraeasy.site/acesso-app-kit-psicopedagogo-pro/" target="_blank" rel="noopener" class="flex items-center gap-4 bg-gradient-to-r from-emerald-600 to-teal-600 p-4 rounded-2xl shadow-lg hover:opacity-90">
                    <div class="w-12 h-12 bg-white/20 text-white rounded-xl flex items-center justify-center text-xl"><i class="fas fa-star"></i></div>
                    <div class="text-left">
                        <p class="font-bold text-white">Kit Psicopedagogo Pro</p>
                        <p class="text-xs text-emerald-100">Acesse o kit completo de materiais e recursos.</p>
                    </div>
                    <i class="fas fa-arrow-up-right-from-square text-white/60 ml-auto"></i>
                </a>
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
                <div>
                    <label class="block text-xs font-bold text-slate-400 uppercase mb-1">Link da Pasta de Fichas (Google Drive)</label>
                    <input type="url" name="driveUrl" value="${profile.driveUrl || ''}" class="w-full bg-slate-50 p-3 rounded-xl border border-slate-100 outline-none" placeholder="https://drive.google.com/drive/folders/...">
                    <p class="text-[10px] text-slate-400 mt-1">Cole o link da pasta compartilhada do Drive com seus materiais.</p>
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
                <button onclick="router.navigate('evolucao')" class="bg-violet-100 text-violet-600 px-4 rounded-2xl border border-violet-100 flex flex-col items-center justify-center gap-0.5">
                    <i class="fas fa-chart-line text-lg"></i>
                    <span class="text-[8px] font-black uppercase">Evolução</span>
                </button>
                <button onclick="window.deleteStudent('${student.id}')" class="bg-red-50 text-red-500 px-4 rounded-2xl border border-red-100"><i class="fas fa-trash"></i></button>
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
                        ${['fluency','phonology','attention','writing','tea_tdah'].map(t => {
                            const applied = session.tests && session.tests[t];
                            const labels = { fluency: 'Leitura', phonology: 'Consciência Fonológica', attention: 'Atenção', writing: 'Escrita', tea_tdah: 'Escala TEA/TDAH' };
                            const colors = { fluency: 'text-emerald-600', phonology: 'text-blue-600', attention: 'text-purple-600', writing: 'text-orange-500', tea_tdah: 'text-rose-500' };
                            return `<div class="flex items-center gap-2 text-sm ${applied ? (colors[t] + ' font-bold') : 'text-slate-300'}"><i class="fas fa-${applied ? 'check-circle' : 'circle'}"></i> ${labels[t]}</div>`;
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

                <div onclick="router.navigate('test_tea_tdah')" class="bg-gradient-to-r from-rose-50 to-pink-50 p-6 rounded-3xl border border-rose-100 shadow-sm flex items-center gap-4 cursor-pointer active:scale-95 transition-all">
                    <div class="w-14 h-14 bg-rose-500 text-white rounded-2xl flex items-center justify-center text-2xl shadow-lg"><i class="fas fa-puzzle-piece"></i></div>
                    <div class="flex-grow">
                        <p class="font-bold text-slate-700">Escala TEA / TDAH</p>
                        <p class="text-xs text-slate-400">Rastreio comportamental DSM-5.</p>
                    </div>
                    <span class="bg-rose-500 text-white text-[9px] font-black px-2 py-0.5 rounded-full uppercase">Novo</span>
                </div>
            </div>

            <!-- SEÇÃO NEURO -->
            <div class="flex items-center gap-3 mt-2">
                <div class="h-px flex-grow bg-gradient-to-r from-indigo-200 to-transparent"></div>
                <div class="flex items-center gap-2 bg-indigo-600 text-white text-[10px] font-black px-3 py-1.5 rounded-full uppercase tracking-wider shadow-sm">
                    <i class="fas fa-brain text-xs"></i> Neuropsicopedagogia
                </div>
                <div class="h-px flex-grow bg-gradient-to-l from-indigo-200 to-transparent"></div>
            </div>

            <div class="grid grid-cols-1 gap-4">
                <div onclick="router.navigate('test_span_digitos')" class="bg-gradient-to-r from-indigo-50 to-violet-50 p-6 rounded-3xl border border-indigo-100 shadow-sm flex items-center gap-4 cursor-pointer active:scale-95 transition-all">
                    <div class="w-14 h-14 bg-indigo-600 text-white rounded-2xl flex items-center justify-center text-2xl shadow-lg"><i class="fas fa-hashtag"></i></div>
                    <div class="flex-grow">
                        <p class="font-bold text-slate-700">Span de Dígitos</p>
                        <p class="text-xs text-slate-400">Memória de trabalho verbal — direto e inverso.</p>
                    </div>
                    <span class="bg-indigo-600 text-white text-[9px] font-black px-2 py-0.5 rounded-full uppercase">Neuro</span>
                </div>

                <div onclick="router.navigate('test_memoria_visual')" class="bg-gradient-to-r from-indigo-50 to-violet-50 p-6 rounded-3xl border border-indigo-100 shadow-sm flex items-center gap-4 cursor-pointer active:scale-95 transition-all">
                    <div class="w-14 h-14 bg-violet-600 text-white rounded-2xl flex items-center justify-center text-2xl shadow-lg"><i class="fas fa-border-all"></i></div>
                    <div class="flex-grow">
                        <p class="font-bold text-slate-700">Memória Visual (Corsi)</p>
                        <p class="text-xs text-slate-400">Span visuoespacial — sequência de blocos.</p>
                    </div>
                    <span class="bg-violet-600 text-white text-[9px] font-black px-2 py-0.5 rounded-full uppercase">Neuro</span>
                </div>

                <div onclick="router.navigate('test_fluencia_verbal')" class="bg-gradient-to-r from-indigo-50 to-violet-50 p-6 rounded-3xl border border-indigo-100 shadow-sm flex items-center gap-4 cursor-pointer active:scale-95 transition-all">
                    <div class="w-14 h-14 bg-sky-600 text-white rounded-2xl flex items-center justify-center text-2xl shadow-lg"><i class="fas fa-comment-dots"></i></div>
                    <div class="flex-grow">
                        <p class="font-bold text-slate-700">Fluência Verbal</p>
                        <p class="text-xs text-slate-400">Semântica e fonêmica com timer de 60s.</p>
                    </div>
                    <span class="bg-sky-600 text-white text-[9px] font-black px-2 py-0.5 rounded-full uppercase">Neuro</span>
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

                ${session.tests.tea_tdah ? `<div style="margin-bottom: 10px; padding-left: 10px; border-left: 2px solid #f43f5e;">
                    <p style="margin: 0; font-size: 13px;"><b>Escala de Rastreio TEA / TDAH (DSM-5)</b></p>
                    <p style="margin: 0; font-size: 12px;">TDAH Desatenção: ${session.tests.tea_tdah.scores.I}/9 itens significativos${session.tests.tea_tdah.scores.I >= 6 ? ' ⚠️ Indicativo' : ''}</p>
                    <p style="margin: 0; font-size: 12px;">TDAH Hiperatividade: ${session.tests.tea_tdah.scores.H}/9 itens significativos${session.tests.tea_tdah.scores.H >= 6 ? ' ⚠️ Indicativo' : ''}</p>
                    <p style="margin: 0; font-size: 12px;">TEA Interação Social: ${session.tests.tea_tdah.scores.TA}/5 itens significativos${session.tests.tea_tdah.scores.TA >= 3 ? ' ⚠️ Indicativo' : ''}</p>
                    <p style="margin: 0; font-size: 12px;">TEA Padrões Repetitivos: ${session.tests.tea_tdah.scores.TB}/5 itens significativos${session.tests.tea_tdah.scores.TB >= 2 ? ' ⚠️ Indicativo' : ''}</p>
                    <p style="margin: 3px 0 0 0; font-size: 11px; color: #666; font-style: italic;">Este rastreio não substitui avaliação diagnóstica especializada.</p>
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

// =====================================================
// --- NOVO: ESCALA TEA/TDAH (DSM-5 RASTREIO) ---
// =====================================================

const TEA_TDAH_SCALE = {
    I: {
        label: 'TDAH – Desatenção',
        color: '#3b82f6',
        threshold: 6,
        total: 9,
        items: [
            'Não presta atenção em detalhes / comete erros por descuido nas tarefas.',
            'Tem dificuldade em manter a atenção em tarefas ou atividades lúdicas.',
            'Parece não ouvir quando se fala diretamente com ela(e).',
            'Não segue instruções até o fim e não conclui tarefas escolares.',
            'Tem dificuldade em organizar tarefas e atividades.',
            'Evita ou reluta em tarefas que exigem esforço mental sustentado.',
            'Perde objetos necessários (lápis, caderno, material escolar).',
            'É facilmente distraída(o) por estímulos externos.',
            'É esquecida(o) em atividades cotidianas.'
        ]
    },
    H: {
        label: 'TDAH – Hiperatividade / Impulsividade',
        color: '#8b5cf6',
        threshold: 6,
        total: 9,
        items: [
            'Remexe as mãos, os pés ou se contorce na cadeira.',
            'Levanta da cadeira quando se espera que permaneça sentada(o).',
            'Corre ou escala em situações inadequadas.',
            'Não consegue brincar ou participar de atividades com calma.',
            'Está frequentemente "a mil", como se fosse movida(o) a motor.',
            'Fala em excesso.',
            'Deixa escapar a resposta antes de a pergunta ser concluída.',
            'Tem dificuldade em aguardar a sua vez.',
            'Interrompe ou se intromete em conversas e brincadeiras dos outros.'
        ]
    },
    TA: {
        label: 'TEA – Comunicação e Interação Social',
        color: '#ec4899',
        threshold: 3,
        total: 5,
        items: [
            'Dificuldade em reciprocidade socioemocional (não compartilha interesses ou emoções).',
            'Dificuldade com comunicação não verbal (evita contato visual, expressão facial atípica).',
            'Dificuldade em desenvolver e manter relacionamentos com pares.',
            'Prefere brincar sozinha(o) / pouco interesse em interagir com outras crianças.',
            'Não responde ao próprio nome quando chamado(a).'
        ]
    },
    TB: {
        label: 'TEA – Padrões Repetitivos e Restritos',
        color: '#f43f5e',
        threshold: 2,
        total: 5,
        items: [
            'Movimentos motores repetitivos (balançar, agitar as mãos, girar objetos).',
            'Insistência em rotinas / resistência intensa a mudanças.',
            'Interesses muito restritos e fixos com intensidade excessiva.',
            'Hiper ou hipossensibilidade a estímulos sensoriais (sons, texturas, luz, dor).',
            'Linguagem repetitiva ou ecolalia (repete frases de TV, filmes ou o que acabou de ouvir).'
        ]
    }
};

function renderTestTEA(el) {
    const groups = Object.keys(TEA_TDAH_SCALE);
    let currentGroup = 0;
    let currentItem = 0;
    const answers = { I: [], H: [], TA: [], TB: [] };
    const OPTIONS = ['Nunca', 'Às vezes', 'Frequentemente', 'Sempre'];

    const renderQuestion = () => {
        const gKey = groups[currentGroup];
        const group = TEA_TDAH_SCALE[gKey];
        const totalItems = groups.reduce((acc, k) => acc + TEA_TDAH_SCALE[k].items.length, 0);
        const doneItems = groups.slice(0, currentGroup).reduce((acc, k) => acc + TEA_TDAH_SCALE[k].items.length, 0) + currentItem;
        const progress = Math.round((doneItems / totalItems) * 100);

        el.innerHTML = `
            <div class="space-y-5">
                <div class="flex items-center gap-3">
                    <button onclick="router.navigate('testes')" class="w-10 h-10 flex items-center justify-center bg-white rounded-full border border-slate-100 text-slate-400"><i class="fas fa-arrow-left"></i></button>
                    <h2 class="text-lg font-bold text-slate-800">Escala TEA / TDAH</h2>
                </div>

                <div class="bg-white rounded-2xl p-3 border border-slate-100">
                    <div class="flex justify-between text-[10px] font-bold text-slate-400 uppercase mb-1.5">
                        <span>${group.label}</span>
                        <span>${currentItem + 1}/${group.items.length}</span>
                    </div>
                    <div class="w-full bg-slate-100 rounded-full h-2">
                        <div class="h-2 rounded-full transition-all duration-300" style="width:${progress}%; background:${group.color}"></div>
                    </div>
                    <p class="text-[10px] text-slate-300 mt-1">${progress}% concluído</p>
                </div>

                <div class="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm space-y-6">
                    <div class="w-12 h-12 rounded-2xl flex items-center justify-center text-2xl text-white shadow-lg" style="background:${group.color}">
                        <i class="fas fa-${gKey === 'I' || gKey === 'H' ? 'bolt' : 'puzzle-piece'}"></i>
                    </div>
                    <p class="text-base font-semibold text-slate-700 leading-relaxed">${group.items[currentItem]}</p>
                    <p class="text-xs text-slate-400 italic">Com que frequência esse comportamento é observado?</p>
                    <div class="space-y-2">
                        ${OPTIONS.map((opt, i) => `
                            <button onclick="window.answerTEA(${i})"
                                class="w-full flex items-center gap-3 p-4 rounded-2xl border-2 border-slate-100 hover:border-opacity-100 active:scale-95 transition-all text-left font-semibold text-sm text-slate-600"
                                style="border-color: ${i >= 2 ? group.color + '30' : ''}">
                                <span class="w-7 h-7 rounded-full flex items-center justify-center text-xs font-black border-2" style="border-color:${group.color}; color:${group.color}">${i}</span>
                                ${opt}
                            </button>
                        `).join('')}
                    </div>
                </div>
            </div>
        `;

        window.answerTEA = (score) => {
            answers[gKey].push(score);
            currentItem++;
            if (currentItem >= group.items.length) {
                currentGroup++;
                currentItem = 0;
                if (currentGroup >= groups.length) {
                    showTEAResult();
                } else {
                    renderQuestion();
                }
            } else {
                renderQuestion();
            }
        };
    };

    const showTEAResult = () => {
        const scores = {
            I:  answers.I.filter(s => s >= 2).length,
            H:  answers.H.filter(s => s >= 2).length,
            TA: answers.TA.filter(s => s >= 2).length,
            TB: answers.TB.filter(s => s >= 2).length
        };

        const flags = [];
        if (scores.I >= 6)  flags.push({ label: 'Indicativo de Desatenção Significativa', color: '#3b82f6' });
        if (scores.H >= 6)  flags.push({ label: 'Indicativo de Hiperatividade/Impulsividade', color: '#8b5cf6' });
        if (scores.I >= 6 && scores.H >= 6) flags.push({ label: 'Padrão Combinado de TDAH', color: '#6366f1' });
        if (scores.TA >= 3 && scores.TB >= 2) flags.push({ label: 'Perfil Consistente com TEA – Encaminhar para Avaliação', color: '#f43f5e' });
        else if (scores.TA >= 3) flags.push({ label: 'Dificuldades Sociocomunicativas Relevantes', color: '#ec4899' });

        const bars = Object.entries(scores).map(([k, v]) => {
            const g = TEA_TDAH_SCALE[k];
            const pct = Math.round((v / g.total) * 100);
            const alert = v >= g.threshold;
            return `
                <div>
                    <div class="flex justify-between text-[10px] font-bold mb-1" style="color:${g.color}">
                        <span>${g.label}</span>
                        <span>${v}/${g.total} itens${alert ? ' ⚠️' : ''}</span>
                    </div>
                    <div class="w-full bg-slate-100 rounded-full h-3">
                        <div class="h-3 rounded-full" style="width:${pct}%; background:${g.color}"></div>
                    </div>
                </div>`;
        }).join('');

        el.innerHTML = `
            <div class="space-y-5">
                <div class="flex items-center gap-3">
                    <button onclick="router.navigate('testes')" class="w-10 h-10 flex items-center justify-center bg-white rounded-full border border-slate-100 text-slate-400"><i class="fas fa-arrow-left"></i></button>
                    <h2 class="text-lg font-bold text-slate-800">Resultado da Escala</h2>
                </div>

                <div class="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm space-y-4">
                    <h3 class="font-black text-slate-700 text-base">Pontuação por Dimensão</h3>
                    ${bars}
                </div>

                ${flags.length > 0 ? `
                <div class="space-y-2">
                    <h3 class="font-black text-slate-700 text-sm px-1">Indicadores Identificados</h3>
                    ${flags.map(f => `
                        <div class="flex items-center gap-3 p-4 rounded-2xl border-2" style="border-color:${f.color}20; background:${f.color}08">
                            <i class="fas fa-exclamation-circle text-xl" style="color:${f.color}"></i>
                            <span class="font-bold text-sm" style="color:${f.color}">${f.label}</span>
                        </div>
                    `).join('')}
                </div>` : `
                <div class="flex items-center gap-3 p-4 rounded-2xl bg-emerald-50 border border-emerald-100">
                    <i class="fas fa-check-circle text-xl text-emerald-500"></i>
                    <span class="font-bold text-sm text-emerald-700">Nenhum indicador significativo identificado.</span>
                </div>`}

                <div class="bg-amber-50 border border-amber-100 p-4 rounded-2xl text-xs text-amber-700">
                    <i class="fas fa-info-circle mr-1"></i>
                    <b>Importante:</b> Este rastreio é um instrumento de observação clínica e <b>não substitui avaliação diagnóstica</b> por equipe especializada.
                </div>

                <button onclick="window.saveTEA(${JSON.stringify(scores).replace(/"/g, '&quot;')})" class="w-full bg-rose-500 text-white font-bold py-4 rounded-2xl shadow-lg">
                    <i class="fas fa-save mr-2"></i>Salvar no Prontuário
                </button>
            </div>
        `;

        window.saveTEA = (sc) => {
            saveTest('tea_tdah', { scores: sc, flags: flags.map(f => f.label) });
            alert('Escala salva na sessão!');
            router.navigate('testes');
        };
    };

    renderQuestion();
}

// =====================================================
// --- NOVO: GRÁFICOS DE EVOLUÇÃO POR ALUNO ---
// =====================================================

function renderEvolucao(el) {
    const student = DB.get('psy_students').find(s => s.id === AppState.activeStudentId);
    if (!student) return router.navigate('alunos');

    const sessions = DB.get('psy_sessions')
        .filter(s => s.studentId === student.id)
        .sort((a, b) => new Date(a.date) - new Date(b.date));

    const labels    = sessions.map(s => Utils.date(s.date));
    const wpmData   = sessions.map(s => s.tests?.fluency?.wpm   || null);
    const phonoData = sessions.map(s => s.tests?.phonology ? (s.tests.phonology.score / 8 * 100).toFixed(0) : null);
    const attnData  = sessions.map(s => s.tests?.attention?.avg || null);
    const teaI      = sessions.map(s => s.tests?.tea_tdah ? s.tests.tea_tdah.scores.I  : null);
    const teaH      = sessions.map(s => s.tests?.tea_tdah ? s.tests.tea_tdah.scores.H  : null);

    const hasData = wpmData.some(v=>v) || phonoData.some(v=>v) || attnData.some(v=>v);

    el.innerHTML = `
        <div class="space-y-5">
            <div class="flex items-center gap-3">
                <button onclick="router.navigate('student_detail')" class="w-10 h-10 flex items-center justify-center bg-white rounded-full border border-slate-100 text-slate-400"><i class="fas fa-arrow-left"></i></button>
                <div>
                    <h2 class="text-lg font-bold text-slate-800">Evolução</h2>
                    <p class="text-xs text-slate-400">${student.name}</p>
                </div>
            </div>

            ${!hasData ? `
            <div class="flex flex-col items-center justify-center py-16 text-center space-y-3">
                <div class="w-16 h-16 bg-violet-50 text-violet-400 rounded-full flex items-center justify-center text-2xl"><i class="fas fa-chart-line"></i></div>
                <p class="font-bold text-slate-600">Ainda sem dados para exibir</p>
                <p class="text-xs text-slate-400 max-w-xs">Aplique os testes nas sessões do aluno para acompanhar a evolução aqui.</p>
            </div>` : `

            ${wpmData.some(v=>v) ? `
            <div class="bg-white p-5 rounded-3xl border border-emerald-100 shadow-sm">
                <h3 class="font-black text-slate-700 text-sm mb-3 flex items-center gap-2"><span class="w-3 h-3 rounded-full bg-emerald-500 inline-block"></span>Fluência Leitora (WPM)</h3>
                <canvas id="chart-wpm" height="160"></canvas>
            </div>` : ''}

            ${phonoData.some(v=>v) ? `
            <div class="bg-white p-5 rounded-3xl border border-blue-100 shadow-sm">
                <h3 class="font-black text-slate-700 text-sm mb-3 flex items-center gap-2"><span class="w-3 h-3 rounded-full bg-blue-500 inline-block"></span>Consciência Fonológica (%)</h3>
                <canvas id="chart-phono" height="160"></canvas>
            </div>` : ''}

            ${attnData.some(v=>v) ? `
            <div class="bg-white p-5 rounded-3xl border border-purple-100 shadow-sm">
                <h3 class="font-black text-slate-700 text-sm mb-3 flex items-center gap-2"><span class="w-3 h-3 rounded-full bg-purple-500 inline-block"></span>Atenção – Tempo de Reação (ms)<span class="text-[9px] text-slate-400 font-normal">(menor = melhor)</span></h3>
                <canvas id="chart-attn" height="160"></canvas>
            </div>` : ''}

            ${(teaI.some(v=>v!==null) || teaH.some(v=>v!==null)) ? `
            <div class="bg-white p-5 rounded-3xl border border-rose-100 shadow-sm">
                <h3 class="font-black text-slate-700 text-sm mb-3 flex items-center gap-2"><span class="w-3 h-3 rounded-full bg-rose-500 inline-block"></span>TDAH – Itens Significativos por Sessão</h3>
                <canvas id="chart-tdah" height="160"></canvas>
            </div>` : ''}
            `}
        </div>
    `;

    if (!hasData) return;

    const chartDefaults = {
        responsive: true,
        plugins: { legend: { display: false } },
        scales: {
            x: { ticks: { font: { size: 9 }, maxRotation: 30 }, grid: { display: false } },
            y: { ticks: { font: { size: 9 } }, grid: { color: '#f1f5f9' } }
        }
    };

    const makeChart = (id, color, data, label) => {
        const ctx = document.getElementById(id);
        if (!ctx) return;
        new Chart(ctx, {
            type: 'line',
            data: {
                labels,
                datasets: [{
                    label,
                    data,
                    borderColor: color,
                    backgroundColor: color + '15',
                    borderWidth: 2.5,
                    pointBackgroundColor: color,
                    pointRadius: 5,
                    tension: 0.35,
                    fill: true,
                    spanGaps: true
                }]
            },
            options: { ...chartDefaults }
        });
    };

    if (wpmData.some(v=>v))   makeChart('chart-wpm',   '#10b981', wpmData,   'WPM');
    if (phonoData.some(v=>v)) makeChart('chart-phono', '#3b82f6', phonoData, 'Fonologia %');
    if (attnData.some(v=>v))  makeChart('chart-attn',  '#8b5cf6', attnData,  'Reação ms');

    if (teaI.some(v=>v!==null) || teaH.some(v=>v!==null)) {
        const ctx = document.getElementById('chart-tdah');
        if (ctx) {
            new Chart(ctx, {
                type: 'line',
                data: {
                    labels,
                    datasets: [
                        { label: 'Desatenção', data: teaI, borderColor: '#3b82f6', backgroundColor: '#3b82f615', borderWidth: 2, pointRadius: 4, tension: 0.35, spanGaps: true, fill: false },
                        { label: 'Hiperatividade', data: teaH, borderColor: '#8b5cf6', backgroundColor: '#8b5cf615', borderWidth: 2, pointRadius: 4, tension: 0.35, spanGaps: true, fill: false }
                    ]
                },
                options: {
                    responsive: true,
                    plugins: { legend: { display: true, labels: { font: { size: 10 }, boxWidth: 12 } } },
                    scales: {
                        x: { ticks: { font: { size: 9 }, maxRotation: 30 }, grid: { display: false } },
                        y: { min: 0, max: 9, ticks: { font: { size: 9 }, stepSize: 1 }, grid: { color: '#f1f5f9' } }
                    }
                }
            });
        }
    }
}

// =====================================================
// --- NOVO: FICHAS & MATERIAIS ---
// =====================================================

function renderFichas(el) {
    const profile = DB.get('psy_profile');
    const driveUrl = profile.driveUrl || '';

    const manualItems = [
        {
            icon: 'fa-user-plus', color: '#10b981', title: '1. Cadastrar um Aluno',
            text: 'Acesse <b>Alunos</b> na barra inferior → toque no botão <b>"+"</b> → preencha os dados e salve. O aluno ficará disponível para iniciar sessões.'
        },
        {
            icon: 'fa-calendar-plus', color: '#3b82f6', title: '2. Iniciar uma Sessão',
            text: 'Em <b>Alunos</b>, toque no nome do aluno → clique <b>"Iniciar Sessão"</b> → preencha data, objetivo e observações → salve. Após salvar, o botão de testes aparece.'
        },
        {
            icon: 'fa-vial', color: '#8b5cf6', title: '3. Aplicar os Testes',
            text: 'Com uma sessão ativa, acesse <b>Testes</b>. Aplique quantos quiser: Leitura, Fonologia, Atenção, Escrita ou a Escala TEA/TDAH. Os resultados ficam salvos na sessão automaticamente.'
        },
        {
            icon: 'fa-puzzle-piece', color: '#f43f5e', title: '4. Escala TEA/TDAH (DSM-5)',
            text: 'São <b>28 perguntas</b> divididas em 4 dimensões: Desatenção, Hiperatividade, Interação Social e Padrões Repetitivos. Responda com base no comportamento observado. O app calcula os indicadores automaticamente. <b>Não substitui diagnóstico clínico.</b>'
        },
        {
            icon: 'fa-chart-line', color: '#a855f7', title: '5. Ver a Evolução do Aluno',
            text: 'No prontuário do aluno, toque no botão roxo <b>"Evolução"</b>. Gráficos de WPM, fonologia, atenção e TDAH são exibidos ao longo das sessões, mostrando o progresso real.'
        },
        {
            icon: 'fa-file-pdf', color: '#f97316', title: '6. Emitir o Relatório PDF',
            text: 'Dentro de uma sessão, toque em <b>"Emitir Relatório"</b>. O PDF é gerado com dados do paciente, resultados dos testes e assinatura. Configure seu nome e assinatura em <b>Ajustes</b> antes.'
        },
        {
            icon: 'fa-folder-open', color: '#7c3aed', title: '7. Acessar as Fichas do Drive',
            text: 'Cole o link da sua pasta do Google Drive em <b>Ajustes → Link da Pasta de Fichas</b>. Depois o botão abaixo abre direto os seus materiais. As fichas ficam no Drive e abrem no seu navegador/app.'
        }
    ];

    el.innerHTML = `
        <div class="space-y-5">
            <div class="bg-gradient-to-br from-violet-600 to-purple-700 p-6 rounded-3xl text-white shadow-lg">
                <div class="flex items-center gap-3 mb-2">
                    <i class="fas fa-folder-open text-2xl text-purple-200"></i>
                    <h2 class="text-xl font-bold">Fichas & Materiais</h2>
                </div>
                <p class="text-purple-100 text-sm">Biblioteca de recursos e manual de uso do app.</p>
            </div>

            ${driveUrl ? `
            <a href="${driveUrl}" target="_blank" rel="noopener" class="flex items-center gap-4 bg-gradient-to-r from-emerald-500 to-teal-600 p-5 rounded-3xl text-white shadow-lg active:scale-95 transition-all">
                <div class="w-14 h-14 bg-white/20 rounded-2xl flex items-center justify-center text-3xl">
                    <i class="fab fa-google-drive"></i>
                </div>
                <div class="flex-grow">
                    <p class="font-black text-lg">Abrir Pasta de Fichas</p>
                    <p class="text-emerald-100 text-xs">Google Drive → Seus materiais</p>
                </div>
                <i class="fas fa-external-link-alt text-white/60"></i>
            </a>` : `
            <div class="flex items-center gap-4 bg-slate-50 border-2 border-dashed border-slate-200 p-5 rounded-3xl">
                <div class="w-12 h-12 bg-slate-100 text-slate-400 rounded-2xl flex items-center justify-center text-xl">
                    <i class="fab fa-google-drive"></i>
                </div>
                <div class="flex-grow">
                    <p class="font-bold text-slate-500 text-sm">Pasta do Drive não configurada</p>
                    <p class="text-xs text-slate-400">Vá em <b>Ajustes</b> e cole o link da sua pasta.</p>
                </div>
                <button onclick="router.navigate('config')" class="bg-violet-600 text-white text-xs font-bold px-4 py-2 rounded-xl">Configurar</button>
            </div>`}

            <a href="manual.html" target="_blank" rel="noopener" class="flex items-center gap-4 bg-gradient-to-r from-blue-500 to-indigo-600 p-4 rounded-3xl text-white shadow-lg active:scale-95 transition-all">
                <div class="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center text-2xl flex-shrink-0">
                    <i class="fas fa-book-open"></i>
                </div>
                <div class="flex-grow">
                    <p class="font-black">Manual Completo do App</p>
                    <p class="text-blue-100 text-xs">Passo a passo de todas as funções</p>
                </div>
                <i class="fas fa-external-link-alt text-white/60"></i>
            </a>

            <div class="flex items-center gap-2 px-1">
                <div class="h-px flex-grow bg-slate-100"></div>
                <span class="text-[10px] font-black text-slate-400 uppercase tracking-widest">Resumo de Uso</span>
                <div class="h-px flex-grow bg-slate-100"></div>
            </div>

            <div class="space-y-3">
                ${manualItems.map((item, i) => `
                <details class="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden group" ${i === 0 ? 'open' : ''}>
                    <summary class="flex items-center gap-3 p-4 cursor-pointer list-none select-none">
                        <div class="w-9 h-9 rounded-xl flex items-center justify-center text-white text-sm flex-shrink-0" style="background:${item.color}">
                            <i class="fas ${item.icon}"></i>
                        </div>
                        <span class="font-bold text-slate-700 text-sm flex-grow">${item.title}</span>
                        <i class="fas fa-chevron-down text-slate-300 text-xs group-open:rotate-180 transition-transform"></i>
                    </summary>
                    <div class="px-4 pb-4 pt-0">
                        <p class="text-sm text-slate-500 leading-relaxed pl-12">${item.text}</p>
                    </div>
                </details>
                `).join('')}
            </div>

            <div class="bg-emerald-50 border border-emerald-100 p-4 rounded-2xl text-xs text-emerald-700 space-y-1">
                <p class="font-black uppercase tracking-wide">Dicas rápidas</p>
                <p>• O app funciona <b>offline</b> após o primeiro acesso.</p>
                <p>• Todos os dados ficam salvos localmente no seu celular.</p>
                <p>• Para instalar como app: no Chrome, toque em <b>⋮ → Adicionar à tela inicial</b>.</p>
                <p>• Os testes podem ser aplicados em qualquer ordem dentro da sessão.</p>
            </div>
        </div>
    `;
}

// =====================================================
// --- NEURO: SPAN DE DÍGITOS ---
// =====================================================
function renderTestSpanDigitos(el) {
    const sequences = {
        direto: [
            [2,4],  [5,8,1], [7,2,9,4], [3,8,1,6,5], [4,9,2,7,1,8], [1,5,3,9,7,2,6]
        ],
        inverso: [
            [1,3], [6,2,9], [4,7,1,5], [8,3,9,2,6], [3,7,1,5,9,2]
        ]
    };

    el.innerHTML = `
        <div class="space-y-5">
            <div class="flex items-center gap-3">
                <button onclick="router.navigate('testes')" class="w-10 h-10 bg-white border border-slate-100 rounded-2xl flex items-center justify-center shadow-sm"><i class="fas fa-arrow-left text-slate-500"></i></button>
                <div>
                    <h2 class="text-xl font-bold text-slate-800">Span de Dígitos</h2>
                    <p class="text-xs text-indigo-600 font-bold uppercase tracking-wide">Memória de Trabalho Verbal</p>
                </div>
            </div>

            <div class="bg-gradient-to-br from-indigo-600 to-violet-700 p-5 rounded-3xl text-white">
                <p class="text-sm font-bold mb-1">Como aplicar:</p>
                <ol class="text-sm text-indigo-100 space-y-1 list-decimal list-inside">
                    <li>Fale os dígitos em voz alta, 1 por segundo</li>
                    <li>Peça à criança para repetir na ordem correta (direto)</li>
                    <li>Depois peça para repetir ao contrário (inverso)</li>
                    <li>Marque "Acertou" ou "Errou" para cada sequência</li>
                </ol>
            </div>

            <div id="span-tabs" class="grid grid-cols-2 gap-2">
                <button onclick="showSpanTab('direto')" id="tab-direto" class="py-3 rounded-2xl font-bold text-sm bg-indigo-600 text-white shadow">▶ Direto</button>
                <button onclick="showSpanTab('inverso')" id="tab-inverso" class="py-3 rounded-2xl font-bold text-sm bg-white border border-slate-200 text-slate-500">◀ Inverso</button>
            </div>

            <div id="span-content"></div>

            <div id="span-result" class="hidden bg-white border border-emerald-100 rounded-3xl p-5 shadow-sm">
                <h3 class="font-black text-slate-800 mb-3">📊 Resultado</h3>
                <div class="grid grid-cols-2 gap-3">
                    <div class="bg-indigo-50 rounded-2xl p-3 text-center">
                        <div id="res-direto" class="text-3xl font-black text-indigo-700">—</div>
                        <div class="text-xs font-bold text-indigo-500 mt-1">Span Direto</div>
                    </div>
                    <div class="bg-violet-50 rounded-2xl p-3 text-center">
                        <div id="res-inverso" class="text-3xl font-black text-violet-700">—</div>
                        <div class="text-xs font-bold text-violet-500 mt-1">Span Inverso</div>
                    </div>
                </div>
                <div id="span-interp" class="mt-3 text-sm text-slate-600 bg-slate-50 rounded-2xl p-3"></div>
                <button onclick="saveSpanSession()" class="mt-4 w-full bg-indigo-600 text-white font-bold py-3 rounded-2xl">Salvar na Sessão</button>
            </div>
        </div>
    `;

    window._spanScores = { direto: 0, inverso: 0 };

    window.showSpanTab = (type) => {
        document.getElementById('tab-direto').className = type === 'direto'
            ? 'py-3 rounded-2xl font-bold text-sm bg-indigo-600 text-white shadow'
            : 'py-3 rounded-2xl font-bold text-sm bg-white border border-slate-200 text-slate-500';
        document.getElementById('tab-inverso').className = type === 'inverso'
            ? 'py-3 rounded-2xl font-bold text-sm bg-indigo-600 text-white shadow'
            : 'py-3 rounded-2xl font-bold text-sm bg-white border border-slate-200 text-slate-500';

        const seqs = sequences[type];
        const color = type === 'direto' ? 'indigo' : 'violet';
        document.getElementById('span-content').innerHTML = `
            <div class="space-y-3">
                ${seqs.map((seq, i) => `
                <div class="bg-white border border-slate-100 rounded-2xl p-4 shadow-sm">
                    <div class="flex items-center justify-between mb-2">
                        <span class="text-xs font-black text-${color}-600 uppercase">Sequência ${i+1} (${seq.length} dígitos)</span>
                    </div>
                    <div class="flex gap-2 mb-3">
                        ${seq.map(d => `<span class="w-10 h-10 rounded-xl bg-${color}-100 text-${color}-700 font-black text-lg flex items-center justify-center">${d}</span>`).join('')}
                    </div>
                    <div class="grid grid-cols-2 gap-2">
                        <button onclick="markSpan('${type}',${i},'ok',this)" class="py-2 rounded-xl text-sm font-bold bg-emerald-50 text-emerald-700 border border-emerald-200 active:scale-95 transition-all">✔ Acertou</button>
                        <button onclick="markSpan('${type}',${i},'fail',this)" class="py-2 rounded-xl text-sm font-bold bg-red-50 text-red-600 border border-red-200 active:scale-95 transition-all">✘ Errou</button>
                    </div>
                </div>`).join('')}
            </div>`;
    };

    window.markSpan = (type, idx, result, btn) => {
        const seqs = sequences[type];
        if (result === 'ok' && seqs[idx].length > window._spanScores[type]) {
            window._spanScores[type] = seqs[idx].length;
        }
        btn.closest('.grid').querySelectorAll('button').forEach(b => b.classList.remove('ring-2','ring-offset-1'));
        btn.classList.add('ring-2', result === 'ok' ? 'ring-emerald-400' : 'ring-red-400', 'ring-offset-1');

        document.getElementById('res-direto').textContent = window._spanScores.direto || '—';
        document.getElementById('res-inverso').textContent = window._spanScores.inverso || '—';

        const d = window._spanScores.direto, inv = window._spanScores.inverso;
        if (d || inv) {
            document.getElementById('span-result').classList.remove('hidden');
            let interp = '';
            if (d > 0) {
                if (d <= 3) interp += '⚠️ Span direto abaixo da média (esperado ≥5 para 7+ anos). ';
                else if (d <= 5) interp += '✔ Span direto na média para a faixa etária. ';
                else interp += '✨ Span direto acima da média — boa memória de trabalho verbal. ';
            }
            if (inv > 0) {
                if (inv <= 2) interp += '⚠️ Span inverso reduzido (esperado ≥3) — pode indicar dificuldade de manipulação mental.';
                else interp += '✔ Span inverso adequado.';
            }
            document.getElementById('span-interp').textContent = interp;
        }
    };

    window.saveSpanSession = () => {
        if (!AppState.activeSessionId) return alert('Nenhuma sessão ativa.');
        const sessions = DB.get('psy_sessions');
        const idx = sessions.findIndex(s => s.id === AppState.activeSessionId);
        if (idx === -1) return;
        sessions[idx].spanDigitos = { direto: window._spanScores.direto, inverso: window._spanScores.inverso, date: new Date().toISOString() };
        DB.set('psy_sessions', sessions);
        alert('Span de Dígitos salvo na sessão!');
        router.navigate('new_session');
    };

    showSpanTab('direto');
}

// =====================================================
// --- NEURO: MEMÓRIA VISUAL (CORSI) ---
// =====================================================
function renderTestMemoriaVisual(el) {
    const GRID = [0,1,2,3,4,5,6,7,8]; // 3x3 grid
    const sequences = [
        [0,4],[1,5,7],[2,4,6,0],[3,7,1,5,8],[0,6,2,8,4,1],[5,3,7,0,8,2,4]
    ];
    let currentSeq = 0, highlighting = false;

    el.innerHTML = `
        <div class="space-y-5">
            <div class="flex items-center gap-3">
                <button onclick="router.navigate('testes')" class="w-10 h-10 bg-white border border-slate-100 rounded-2xl flex items-center justify-center shadow-sm"><i class="fas fa-arrow-left text-slate-500"></i></button>
                <div>
                    <h2 class="text-xl font-bold text-slate-800">Memória Visual</h2>
                    <p class="text-xs text-violet-600 font-bold uppercase tracking-wide">Span Visuoespacial – Corsi Blocks</p>
                </div>
            </div>

            <div class="bg-gradient-to-br from-violet-600 to-indigo-700 p-5 rounded-3xl text-white">
                <p class="text-sm font-bold mb-1">Como aplicar:</p>
                <ol class="text-sm text-violet-100 space-y-1 list-decimal list-inside">
                    <li>Toque em "Mostrar Sequência" — os blocos acenderão um por um</li>
                    <li>Peça à criança para tocar os blocos na mesma ordem</li>
                    <li>Marque se acertou ou errou a sequência</li>
                </ol>
            </div>

            <div class="bg-white rounded-3xl border border-slate-100 shadow-sm p-5">
                <div class="flex justify-between items-center mb-4">
                    <span id="corsi-level" class="text-sm font-black text-violet-700">Sequência 1 de ${sequences.length} (${sequences[0].length} blocos)</span>
                    <span id="corsi-span-badge" class="text-xs bg-violet-100 text-violet-700 px-3 py-1 rounded-full font-bold">Span: —</span>
                </div>

                <div id="corsi-grid" class="grid grid-cols-3 gap-3 mb-5">
                    ${GRID.map(i => `<div id="corsi-${i}" onclick="corsiTap(${i})" class="h-16 rounded-2xl bg-slate-100 border-2 border-slate-200 cursor-pointer active:scale-95 transition-all"></div>`).join('')}
                </div>

                <button id="corsi-show-btn" onclick="showCorsiSequence()" class="w-full bg-violet-600 text-white font-bold py-3 rounded-2xl mb-3 active:scale-95 transition-all">▶ Mostrar Sequência</button>

                <div id="corsi-mark" class="hidden grid grid-cols-2 gap-2">
                    <button onclick="markCorsi('ok')" class="py-2.5 rounded-xl text-sm font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">✔ Acertou</button>
                    <button onclick="markCorsi('fail')" class="py-2.5 rounded-xl text-sm font-bold bg-red-50 text-red-600 border border-red-200">✘ Errou</button>
                </div>
            </div>

            <div id="corsi-result" class="hidden bg-white border border-emerald-100 rounded-3xl p-5 shadow-sm">
                <h3 class="font-black text-slate-800 mb-2">📊 Resultado</h3>
                <div class="bg-violet-50 rounded-2xl p-4 text-center mb-3">
                    <div id="corsi-final-span" class="text-4xl font-black text-violet-700">—</div>
                    <div class="text-xs font-bold text-violet-500 mt-1">Span Visuoespacial</div>
                </div>
                <div id="corsi-interp" class="text-sm text-slate-600 bg-slate-50 rounded-2xl p-3 mb-3"></div>
                <button onclick="saveCorsiSession()" class="w-full bg-violet-600 text-white font-bold py-3 rounded-2xl">Salvar na Sessão</button>
            </div>
        </div>
    `;

    window._corsiSpan = 0;
    window._corsiSeqIdx = 0;

    window.showCorsiSequence = async () => {
        const seq = sequences[window._corsiSeqIdx];
        document.getElementById('corsi-show-btn').disabled = true;
        document.getElementById('corsi-mark').classList.add('hidden');

        for (let i = 0; i < seq.length; i++) {
            const box = document.getElementById(`corsi-${seq[i]}`);
            box.classList.add('bg-violet-500','border-violet-600','scale-95');
            await new Promise(r => setTimeout(r, 600));
            box.classList.remove('bg-violet-500','border-violet-600','scale-95');
            await new Promise(r => setTimeout(r, 300));
        }
        document.getElementById('corsi-show-btn').disabled = false;
        document.getElementById('corsi-mark').classList.remove('hidden');
        document.getElementById('corsi-mark').style.display = 'grid';
    };

    window.corsiTap = (idx) => {
        const box = document.getElementById(`corsi-${idx}`);
        box.classList.add('bg-indigo-300','scale-90');
        setTimeout(() => box.classList.remove('bg-indigo-300','scale-90'), 200);
    };

    window.markCorsi = (result) => {
        const seq = sequences[window._corsiSeqIdx];
        if (result === 'ok') window._corsiSpan = seq.length;

        document.getElementById('corsi-span-badge').textContent = `Span: ${window._corsiSpan || '—'}`;
        document.getElementById('corsi-final-span').textContent = window._corsiSpan || '—';

        let interp = '';
        if (window._corsiSpan <= 2) interp = '⚠️ Span visuoespacial muito reduzido (esperado ≥4 para 6+ anos) — avalie memória de trabalho não-verbal.';
        else if (window._corsiSpan <= 4) interp = '✔ Span visuoespacial na média inferior para a faixa etária.';
        else if (window._corsiSpan <= 5) interp = '✔ Span visuoespacial adequado para a faixa etária.';
        else interp = '✨ Span visuoespacial acima da média — boa memória de trabalho não-verbal.';
        document.getElementById('corsi-interp').textContent = interp;
        document.getElementById('corsi-result').classList.remove('hidden');

        window._corsiSeqIdx++;
        if (window._corsiSeqIdx < sequences.length && result === 'ok') {
            const next = sequences[window._corsiSeqIdx];
            document.getElementById('corsi-level').textContent = `Sequência ${window._corsiSeqIdx+1} de ${sequences.length} (${next.length} blocos)`;
            document.getElementById('corsi-mark').classList.add('hidden');
            document.getElementById('corsi-mark').style.display = 'none';
        }
    };

    window.saveCorsiSession = () => {
        if (!AppState.activeSessionId) return alert('Nenhuma sessão ativa.');
        const sessions = DB.get('psy_sessions');
        const idx = sessions.findIndex(s => s.id === AppState.activeSessionId);
        if (idx === -1) return;
        sessions[idx].memoriaVisual = { span: window._corsiSpan, date: new Date().toISOString() };
        DB.set('psy_sessions', sessions);
        alert('Memória Visual salva na sessão!');
        router.navigate('new_session');
    };
}

// =====================================================
// --- NEURO: FLUÊNCIA VERBAL ---
// =====================================================
function renderTestFluenciaVerbal(el) {
    const categories = [
        { type: 'Semântica', label: 'Animais', desc: 'Fale o máximo de animais que conseguir em 60 segundos' },
        { type: 'Semântica', label: 'Frutas', desc: 'Fale o máximo de frutas que conseguir em 60 segundos' },
        { type: 'Fonêmica', label: 'Letra "F"', desc: 'Fale palavras que comecem com a letra F em 60 segundos' },
        { type: 'Fonêmica', label: 'Letra "A"', desc: 'Fale palavras que comecem com a letra A em 60 segundos' },
    ];
    let timerInterval = null, timeLeft = 60, running = false;
    let results = [];

    el.innerHTML = `
        <div class="space-y-5">
            <div class="flex items-center gap-3">
                <button onclick="router.navigate('testes')" class="w-10 h-10 bg-white border border-slate-100 rounded-2xl flex items-center justify-center shadow-sm"><i class="fas fa-arrow-left text-slate-500"></i></button>
                <div>
                    <h2 class="text-xl font-bold text-slate-800">Fluência Verbal</h2>
                    <p class="text-xs text-sky-600 font-bold uppercase tracking-wide">Semântica & Fonêmica — 60s</p>
                </div>
            </div>

            <div class="bg-gradient-to-br from-sky-600 to-indigo-700 p-5 rounded-3xl text-white">
                <p class="text-sm font-bold mb-1">Como aplicar:</p>
                <ol class="text-sm text-sky-100 space-y-1 list-decimal list-inside">
                    <li>Selecione a categoria e explique para a criança</li>
                    <li>Toque em "Iniciar 60s" e conte as palavras corretas</li>
                    <li>Ao término, registre o número de palavras válidas</li>
                </ol>
            </div>

            <div class="space-y-3">
                ${categories.map((cat, i) => `
                <div class="bg-white border border-slate-100 rounded-3xl p-4 shadow-sm">
                    <div class="flex items-center justify-between mb-2">
                        <div>
                            <span class="text-sm font-black text-slate-800">${cat.label}</span>
                            <span class="ml-2 text-[9px] font-bold px-2 py-0.5 rounded-full ${cat.type === 'Semântica' ? 'bg-sky-100 text-sky-700' : 'bg-indigo-100 text-indigo-700'}">${cat.type}</span>
                        </div>
                    </div>
                    <p class="text-xs text-slate-400 mb-3">${cat.desc}</p>

                    <div id="timer-display-${i}" class="text-center mb-3 hidden">
                        <div id="timer-num-${i}" class="text-5xl font-black text-sky-600">60</div>
                        <div class="text-xs text-slate-400">segundos</div>
                    </div>

                    <div id="cat-controls-${i}" class="space-y-2">
                        <button onclick="startTimer(${i})" id="start-btn-${i}" class="w-full bg-sky-600 text-white font-bold py-2.5 rounded-2xl text-sm active:scale-95 transition-all">▶ Iniciar 60s</button>
                        <div id="count-row-${i}" class="hidden">
                            <div class="flex items-center gap-2 bg-slate-50 rounded-2xl p-2">
                                <button onclick="adjCount(${i},-1)" class="w-10 h-10 bg-white rounded-xl border border-slate-200 font-black text-xl text-slate-600 active:scale-95">−</button>
                                <div id="count-${i}" class="flex-grow text-center text-2xl font-black text-sky-700">0</div>
                                <button onclick="adjCount(${i},1)" class="w-10 h-10 bg-white rounded-xl border border-slate-200 font-black text-xl text-sky-600 active:scale-95">+</button>
                            </div>
                            <button onclick="saveCategory(${i},'${cat.label}','${cat.type}')" class="w-full mt-2 bg-emerald-600 text-white font-bold py-2.5 rounded-2xl text-sm">✔ Salvar Categoria</button>
                        </div>
                    </div>
                    <div id="saved-${i}" class="hidden mt-2 text-center text-xs font-bold text-emerald-600 bg-emerald-50 rounded-xl p-2">✔ Salvo!</div>
                </div>`).join('')}
            </div>

            <div id="fluencia-result" class="hidden bg-white border border-emerald-100 rounded-3xl p-5 shadow-sm">
                <h3 class="font-black text-slate-800 mb-3">📊 Resultado Consolidado</h3>
                <div id="fluencia-table" class="space-y-2 mb-3"></div>
                <div id="fluencia-interp" class="text-sm text-slate-600 bg-slate-50 rounded-2xl p-3 mb-3"></div>
                <button onclick="saveFluenciaSession()" class="w-full bg-sky-600 text-white font-bold py-3 rounded-2xl">Salvar na Sessão</button>
            </div>
        </div>
    `;

    window._fluenciaResults = [];
    window._fluenciaCounts = [0,0,0,0];
    window._activeTimers = {};

    window.adjCount = (idx, delta) => {
        window._fluenciaCounts[idx] = Math.max(0, (window._fluenciaCounts[idx]||0) + delta);
        document.getElementById(`count-${idx}`).textContent = window._fluenciaCounts[idx];
    };

    window.startTimer = (idx) => {
        if (window._activeTimers[idx]) return;
        let t = 60;
        document.getElementById(`timer-display-${idx}`).classList.remove('hidden');
        document.getElementById(`start-btn-${idx}`).classList.add('hidden');
        document.getElementById(`count-row-${idx}`).classList.remove('hidden');
        document.getElementById(`count-row-${idx}`).style.display = 'block';

        window._activeTimers[idx] = setInterval(() => {
            t--;
            document.getElementById(`timer-num-${idx}`).textContent = t;
            if (t <= 10) document.getElementById(`timer-num-${idx}`).classList.add('text-red-500');
            if (t <= 0) {
                clearInterval(window._activeTimers[idx]);
                window._activeTimers[idx] = null;
                document.getElementById(`timer-num-${idx}`).textContent = '⏱ Fim!';
            }
        }, 1000);
    };

    window.saveCategory = (idx, label, type) => {
        window._fluenciaResults = window._fluenciaResults.filter(r => r.label !== label);
        window._fluenciaResults.push({ label, type, count: window._fluenciaCounts[idx]||0 });
        if (window._activeTimers[idx]) { clearInterval(window._activeTimers[idx]); window._activeTimers[idx] = null; }
        document.getElementById(`saved-${idx}`).classList.remove('hidden');
        document.getElementById(`count-row-${idx}`).style.display = 'none';
        document.getElementById(`timer-display-${idx}`).classList.add('hidden');

        // Atualiza resultado consolidado
        const res = document.getElementById('fluencia-result');
        res.classList.remove('hidden');
        const sem = window._fluenciaResults.filter(r => r.type === 'Semântica');
        const fon = window._fluenciaResults.filter(r => r.type === 'Fonêmica');
        document.getElementById('fluencia-table').innerHTML = window._fluenciaResults.map(r => `
            <div class="flex justify-between items-center bg-slate-50 rounded-xl px-4 py-2">
                <span class="text-sm font-bold text-slate-700">${r.label}</span>
                <span class="text-lg font-black ${r.count < 10 ? 'text-red-600' : r.count < 14 ? 'text-amber-600' : 'text-emerald-600'}">${r.count}</span>
            </div>`).join('');

        let interp = '';
        if (sem.length) {
            const avgSem = sem.reduce((a,b) => a+b.count, 0) / sem.length;
            if (avgSem < 10) interp += '⚠️ Fluência semântica reduzida (esperado ≥12 palavras/60s para 6+ anos). ';
            else if (avgSem < 14) interp += '✔ Fluência semântica na média inferior. ';
            else interp += '✨ Fluência semântica adequada ou acima da média. ';
        }
        if (fon.length) {
            const avgFon = fon.reduce((a,b) => a+b.count, 0) / fon.length;
            if (avgFon < 8) interp += '⚠️ Fluência fonêmica reduzida (esperado ≥10/60s). Pode indicar dificuldade em acesso lexical.';
            else interp += '✔ Fluência fonêmica dentro do esperado.';
        }
        document.getElementById('fluencia-interp').textContent = interp || 'Complete mais categorias para a interpretação.';
    };

    window.saveFluenciaSession = () => {
        if (!AppState.activeSessionId) return alert('Nenhuma sessão ativa.');
        const sessions = DB.get('psy_sessions');
        const idx = sessions.findIndex(s => s.id === AppState.activeSessionId);
        if (idx === -1) return;
        sessions[idx].fluenciaVerbal = { results: window._fluenciaResults, date: new Date().toISOString() };
        DB.set('psy_sessions', sessions);
        alert('Fluência Verbal salva na sessão!');
        router.navigate('new_session');
    };
}

// --- INICIALIZAÇÃO ---
DB.init();
router.navigate('home');
