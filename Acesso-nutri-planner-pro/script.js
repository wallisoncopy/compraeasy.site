// Nutri Planner Pro - JavaScript
let currentUser = null;
let patients = [];
let selectedPatient = null;

// Initialize app
document.addEventListener('DOMContentLoaded', function() {
    loadData();
    if (currentUser) {
        showMainApp();
    }
});

// Login functionality
function login(event) {
    event.preventDefault();
    const username = document.getElementById('username').value;
    const name = document.getElementById('name').value;
    
    currentUser = { username, name };
    localStorage.setItem('nutriUser', JSON.stringify(currentUser));
    
    document.getElementById('welcome').textContent = `Bem-vindo, ${name}!`;
    showNotification(`Bem-vindo, ${name}!`, 'success');
    showMainApp();
}

function showMainApp() {
    document.getElementById('loginScreen').style.display = 'none';
    document.getElementById('mainApp').style.display = 'block';
    updatePatientsList();
    updateProfileInfo();
    showSection('planilha'); // Show planilha section by default
}

// Patient management
document.getElementById('patientForm').addEventListener('submit', function(event) {
    event.preventDefault();
    savePatient();
});

function savePatient() {
    const formData = {
        id: selectedPatient ? selectedPatient.id : `patient-${Date.now()}`,
        name: document.getElementById('patientName').value,
        number: document.getElementById('patientNumber').value,
        phone: document.getElementById('patientPhone').value,
        age: parseInt(document.getElementById('patientAge').value),
        weight: parseFloat(document.getElementById('patientWeight').value),
        height: parseFloat(document.getElementById('patientHeight').value),
        goal: document.getElementById('patientGoal').value,
        notes: document.getElementById('patientNotes').value,
        bmi: 0,
        history: selectedPatient ? selectedPatient.history : []
    };
    
    // Calculate BMI
    if (formData.weight && formData.height) {
        formData.bmi = (formData.weight / (formData.height * formData.height)).toFixed(1);
    }
    
    // Add to history
    const today = new Date().toISOString();
    formData.history.push({
        date: today,
        weight: formData.weight,
        bmi: parseFloat(formData.bmi)
    });
    
    if (selectedPatient) {
        // Update existing patient
        const index = patients.findIndex(p => p.id === selectedPatient.id);
        patients[index] = formData;
        showNotification('Paciente atualizado com sucesso!');
    } else {
        // Add new patient
        patients.push(formData);
        showNotification('Paciente cadastrado com sucesso!');
    }
    
    saveData();
    updatePatientsList();
    clearForm();
    selectedPatient = formData;
}

function selectPatient(patient) {
    selectedPatient = patient;
    
    // Fill form
    document.getElementById('patientName').value = patient.name;
    document.getElementById('patientNumber').value = patient.number;
    document.getElementById('patientPhone').value = patient.phone;
    document.getElementById('patientAge').value = patient.age;
    document.getElementById('patientWeight').value = patient.weight;
    document.getElementById('patientHeight').value = patient.height;
    document.getElementById('patientGoal').value = patient.goal;
    document.getElementById('patientNotes').value = patient.notes;
    
    // Update UI
    updatePatientsList();
    updateChart();
}

function deletePatient(patientId) {
    if (confirm('Tem certeza que deseja excluir este paciente?')) {
        patients = patients.filter(p => p.id !== patientId);
        if (selectedPatient && selectedPatient.id === patientId) {
            selectedPatient = null;
            clearForm();
        }
        saveData();
        updatePatientsList();
        updateChart();
        showNotification('Paciente excluído com sucesso!');
    }
}

function clearForm() {
    document.getElementById('patientForm').reset();
    selectedPatient = null;
    updatePatientsList();
}

function updatePatientsList() {
    const listContainer = document.getElementById('patientsList');
    
    if (patients.length === 0) {
        listContainer.innerHTML = '<p style="text-align: center; color: var(--text-light);">Nenhum paciente cadastrado</p>';
        return;
    }
    
    listContainer.innerHTML = patients.map(patient => `
        <div class="patient-item ${selectedPatient && selectedPatient.id === patient.id ? 'selected' : ''}" 
             onclick="selectPatient(${JSON.stringify(patient).replace(/"/g, '&quot;')})">
            <div class="patient-info">
                <h4>${patient.name}</h4>
                <p>${patient.number} | ${patient.phone} | ${patient.age} anos | ${patient.weight}kg | IMC: ${patient.bmi}</p>
            </div>
            <div class="patient-actions">
                <button onclick="event.stopPropagation(); generatePatientPDF('${patient.id}')">PDF</button>
                <button onclick="event.stopPropagation(); deletePatient('${patient.id}')" style="background: var(--error)">Del</button>
            </div>
        </div>
    `).join('');
}

// PDF Generation
function generatePDF() {
    const formData = {
        name: document.getElementById('patientName').value || 'Paciente',
        number: document.getElementById('patientNumber').value || 'N/A',
        phone: document.getElementById('patientPhone').value || 'N/A',
        age: document.getElementById('patientAge').value || 'N/A',
        weight: document.getElementById('patientWeight').value || 'N/A',
        height: document.getElementById('patientHeight').value || 'N/A',
        goal: document.getElementById('patientGoal').value || 'N/A',
        notes: document.getElementById('patientNotes').value || 'N/A'
    };
    
    const bmi = (formData.weight && formData.height) ? 
        (formData.weight / (formData.height * formData.height)).toFixed(1) : 'N/A';
    
    generatePDFReport(formData, bmi);
}

function generatePatientPDF(patientId) {
    const patient = patients.find(p => p.id === patientId);
    if (patient) {
        generatePDFReport(patient, patient.bmi);
    }
}

function generatePDFReport(patient, bmi) {
    const currentDate = new Date().toLocaleDateString('pt-BR');
    const nutricionista = currentUser ? currentUser.name : 'Nutricionista';
    
    const reportData = [
        '='.repeat(50),
        'RELATÓRIO NUTRICIONAL',
        `Nutricionista: ${nutricionista}`,
        '='.repeat(50),
        '',
        `Data do Relatório: ${currentDate}`,
        '',
        'DADOS PESSOAIS:',
        '-'.repeat(20),
        `Nome: ${patient.name}`,
        `Número: ${patient.number}`,
        `Telefone: ${patient.phone}`,
        `Idade: ${patient.age} anos`,
        '',
        'DADOS ANTROPOMÉTRICOS:',
        '-'.repeat(25),
        `Peso Atual: ${patient.weight} kg`,
        `Altura: ${patient.height} m`,
        `IMC: ${bmi}`,
        '',
        'PLANEJAMENTO:',
        '-'.repeat(15),
        `Meta Nutricional: ${patient.goal}`,
        '',
        'OBSERVAÇÕES:',
        '-'.repeat(15),
        `${patient.notes}`,
        '',
        '='.repeat(50),
        `Relatório gerado por: ${nutricionista}`,
        'Sistema: Nutri Planner Pro'
    ].join('\n');
    
    const blob = new Blob([reportData], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    
    const link = document.createElement('a');
    link.href = url;
    link.download = `relatorio-${patient.name.replace(/\s+/g, '-').toLowerCase()}-${currentDate.replace(/\//g, '-')}.txt`;
    link.click();
    
    URL.revokeObjectURL(url);
    showNotification('Relatório PDF gerado com sucesso!');
}

// Chart functionality
function updateChart() {
    const chartArea = document.getElementById('chartArea');
    
    if (!selectedPatient || !selectedPatient.history || selectedPatient.history.length === 0) {
        chartArea.innerHTML = '<p>Selecione um paciente para ver o gráfico de evolução</p>';
        return;
    }
    
    const history = selectedPatient.history.slice(-5); // Last 5 records
    
    chartArea.innerHTML = `
        <div style="width: 100%;">
            <h4>Evolução de ${selectedPatient.name}</h4>
            <div style="display: flex; justify-content: space-between; align-items: end; height: 150px; border-bottom: 2px solid var(--primary); padding: 20px 0;">
                ${history.map((record, index) => {
                    const height = Math.max(20, (record.weight / 100) * 120);
                    return `
                        <div style="display: flex; flex-direction: column; align-items: center;">
                            <div style="width: 30px; height: ${height}px; background: var(--primary); border-radius: 4px; margin-bottom: 10px;"></div>
                            <small>${new Date(record.date).toLocaleDateString('pt-BR', { month: 'short', day: 'numeric' })}</small>
                            <small><strong>${record.weight}kg</strong></small>
                        </div>
                    `;
                }).join('')}
            </div>
        </div>
    `;
}

// Data management
function saveData() {
    localStorage.setItem('nutriPatients', JSON.stringify(patients));
}

function loadData() {
    const savedUser = localStorage.getItem('nutriUser');
    const savedPatients = localStorage.getItem('nutriPatients');
    
    if (savedUser) {
        currentUser = JSON.parse(savedUser);
        document.getElementById('welcome').textContent = `Bem-vindo, ${currentUser.name}!`;
    }
    
    if (savedPatients) {
        patients = JSON.parse(savedPatients);
    }
}

function exportData() {
    const exportData = {
        version: '1.0.0',
        exportDate: new Date().toISOString(),
        exportBy: currentUser ? currentUser.name : 'Usuário',
        user: currentUser,
        patients: patients
    };
    
    const blob = new Blob([JSON.stringify(exportData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    
    const link = document.createElement('a');
    link.href = url;
    link.download = `nutri-planner-backup-${new Date().toISOString().split('T')[0]}.json`;
    link.click();
    
    URL.revokeObjectURL(url);
    showNotification('Dados exportados com sucesso!');
}

function importData() {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.json';
    
    input.onchange = function(e) {
        const file = e.target.files[0];
        if (!file) return;
        
        const reader = new FileReader();
        reader.onload = function(e) {
            try {
                const importData = JSON.parse(e.target.result);
                
                if (confirm(`Importar ${importData.patients ? importData.patients.length : 0} pacientes?\n\nIsto substituirá todos os dados atuais.`)) {
                    if (importData.patients) {
                        patients = importData.patients;
                        saveData();
                        updatePatientsList();
                        showNotification('Dados importados com sucesso!');
                    }
                }
            } catch (error) {
                showNotification('Erro ao importar arquivo!', 'error');
            }
        };
        reader.readAsText(file);
    };
    
    input.click();
}

function clearAll() {
    if (confirm('Tem certeza que deseja limpar todos os dados?\n\nEsta ação não pode ser desfeita.')) {
        patients = [];
        selectedPatient = null;
        clearForm();
        saveData();
        updatePatientsList();
        updateChart();
        showNotification('Todos os dados foram limpos!');
    }
}

// Theme toggle
function toggleTheme() {
    const body = document.body;
    const currentTheme = body.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    
    body.setAttribute('data-theme', newTheme);
    localStorage.setItem('nutriTheme', newTheme);
    
    document.querySelector('.theme-toggle').textContent = newTheme === 'dark' ? '☀️' : '🌙';
}

// Theme management
function setTheme(theme) {
    document.body.setAttribute('data-theme', theme);
    localStorage.setItem('nutriTheme', theme);
    document.querySelector('.theme-toggle').textContent = theme === 'dark' ? '☀️' : '🌙';
    updateThemeSelector();
}

function updateThemeSelector() {
    const currentTheme = document.body.getAttribute('data-theme') || 'light';
    const themeRadios = document.querySelectorAll('input[name="theme"]');
    themeRadios.forEach(radio => {
        radio.checked = radio.value === currentTheme;
    });
}

// Load theme
document.addEventListener('DOMContentLoaded', function() {
    const savedTheme = localStorage.getItem('nutriTheme') || 'light';
    setTheme(savedTheme);
});

// Navigation
function showSection(section) {
    // Hide all sections
    const sections = document.querySelectorAll('.section');
    sections.forEach(sec => sec.style.display = 'none');
    
    // Remove active class from all nav buttons
    const buttons = document.querySelectorAll('.nav-btn');
    buttons.forEach(btn => btn.classList.remove('active'));
    
    // Show selected section
    const targetSection = document.getElementById(section + 'Section');
    if (targetSection) {
        targetSection.style.display = 'flex';
    }
    
    // Add active class to clicked button
    event.target.classList.add('active');
    
    // Update chart if planilha section
    if (section === 'planilha') {
        updateChart();
    }
    
    // Load profile info if config section
    if (section === 'config') {
        updateProfileInfo();
        updateThemeSelector();
    }
}

// Notifications
function showNotification(message, type = 'success') {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    
    document.getElementById('notifications').appendChild(notification);
    
    setTimeout(() => {
        notification.remove();
    }, 5000);
}

// Profile management
function updateProfileInfo() {
    if (currentUser) {
        document.getElementById('profileName').textContent = currentUser.name;
        document.getElementById('profileUsername').textContent = currentUser.username;
    }
}

function logout() {
    if (confirm('Tem certeza que deseja sair do sistema?')) {
        currentUser = null;
        localStorage.removeItem('nutriUser');
        document.getElementById('loginScreen').style.display = 'flex';
        document.getElementById('mainApp').style.display = 'none';
        document.getElementById('username').value = '';
        document.getElementById('name').value = '';
        showNotification('Logout realizado com sucesso!');
    }
}

// Auto-save on form changes
document.getElementById('patientForm').addEventListener('input', function() {
    // Auto-calculate BMI
    const weight = parseFloat(document.getElementById('patientWeight').value);
    const height = parseFloat(document.getElementById('patientHeight').value);
    
    if (weight && height) {
        const bmi = (weight / (height * height)).toFixed(1);
        // You can display BMI here if you add a BMI display element
    }
});