// Variáveis globais
let chartInstance = null;
let currentSupermarket = '';
let selectedTheme = '';
let userKey = '';
let autoSaveIndicator = null;

// Produtos básicos de fallback (caso data/products.js não carregue)
const fallbackProducts = [
  {
    name: "Arroz Branco 5kg",
    category: "Mercearia",
    consumption: 150,
    stock: 45,
    purchasePrice: 18.50,
    salePrice: 24.90,
    leadTime: 7
  },
  {
    name: "Feijão Preto 1kg",
    category: "Mercearia", 
    consumption: 200,
    stock: 80,
    purchasePrice: 6.80,
    salePrice: 9.50,
    leadTime: 5
  },
  {
    name: "Açúcar Cristal 1kg",
    category: "Mercearia",
    consumption: 180,
    stock: 60,
    purchasePrice: 3.20,
    salePrice: 4.80,
    leadTime: 7
  }
];

// Função para achatar os produtos categorizados em uma lista única
function flattenProducts(productsByCategory) {
  if (!productsByCategory) return fallbackProducts;
  
  const flatList = [];
  
  Object.keys(productsByCategory).forEach(category => {
    const products = productsByCategory[category] || [];
    products.forEach(product => {
      flatList.push({
        name: product.name,
        category: category,
        consumption: product.consumption,
        stock: product.stock, 
        purchasePrice: product.purchasePrice,
        salePrice: product.salePrice,
        leadTime: product.leadTime
      });
    });
  });
  
  return flatList.length > 0 ? flatList : fallbackProducts;
}

// Temas disponíveis para seleção manual
const availableThemes = [
  'theme-pao-de-acucar',
  'theme-extra', 
  'theme-carrefour',
  'theme-big',
  'theme-atacadao',
  'theme-default'
];

// === SISTEMA DE LOGIN ===
document.addEventListener('DOMContentLoaded', function() {
  const loginForm = document.getElementById('loginForm');
  const loginBtn = document.getElementById('loginBtn');
  const btnText = loginBtn.querySelector('.btn-text');
  const loadingSpinner = loginBtn.querySelector('.loading-spinner');
  
  loginForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    const supermarketName = document.getElementById('supermarketName').value.trim();
    const password = document.getElementById('password').value;
    
    if (!supermarketName) {
      alert('Por favor, insira o nome do supermercado');
      return;
    }
    
    // Mostrar loading
    btnText.style.display = 'none';
    loadingSpinner.style.display = 'block';
    loginBtn.disabled = true;
    
    // Simular carregamento
    setTimeout(() => {
      const selectedTheme = document.getElementById('colorTheme').value;
      login(supermarketName, selectedTheme);
    }, 1000);
  });
});

function login(supermarketName, theme) {
  currentSupermarket = supermarketName;
  selectedTheme = theme;
  
  // Criar chave única do usuário
  userKey = `supermarket_${supermarketName.toLowerCase().replace(/[^a-z0-9]/g, '_')}_${theme}`;
  
  // Aplicar tema selecionado pelo usuário
  applyTheme(theme);
  
  // Atualizar título do sistema
  document.getElementById('systemTitle').textContent = `📈 Planilha Inteligente - ${supermarketName}`;
  
  // Esconder login e mostrar sistema
  document.getElementById('loginScreen').style.display = 'none';
  document.getElementById('mainSystem').style.display = 'block';
  
  // Criar indicador de auto-save
  createAutoSaveIndicator();
  
  // Tentar carregar dados salvos do usuário
  if (!loadUserData()) {
    // Se não há dados salvos, carregar produtos padrão
    loadDefaultProducts();
  }
  
  // Calcular valores iniciais
  calcular();
  
  // Iniciar auto-save
  setupAutoSave();
}

function applyTheme(themeClass) {
  // Remover temas anteriores
  document.body.className = '';
  
  // Aplicar tema selecionado (se não for theme-default)
  if (themeClass !== 'theme-default') {
    document.body.classList.add(themeClass);
  }
}

// === SISTEMA DE LOGOUT ===
document.addEventListener('DOMContentLoaded', function() {
  const logoutBtn = document.getElementById('logoutBtn');
  if (logoutBtn) {
    logoutBtn.addEventListener('click', logout);
  }
});

function logout() {
  // Salvar antes de sair
  if (currentSupermarket && userKey) {
    autoSave();
  }
  
  // Limpar dados da sessão
  currentSupermarket = '';
  selectedTheme = '';
  userKey = '';
  document.body.className = '';
  
  // Remover indicador de auto-save
  if (autoSaveIndicator) {
    autoSaveIndicator.remove();
    autoSaveIndicator = null;
  }
  
  // Resetar formulário
  document.getElementById('supermarketName').value = '';
  document.getElementById('password').value = '';
  document.getElementById('colorTheme').value = 'theme-default';
  
  // Limpar filtros se existirem
  if (document.getElementById('searchProducts')) {
    document.getElementById('searchProducts').value = '';
    document.getElementById('filterCategory').value = '';
    document.getElementById('sortProducts').value = '';
  }
  
  // Resetar botão de login
  const loginBtn = document.getElementById('loginBtn');
  const btnText = loginBtn.querySelector('.btn-text');
  const loadingSpinner = loginBtn.querySelector('.loading-spinner');
  
  btnText.style.display = 'block';
  loadingSpinner.style.display = 'none';
  loginBtn.disabled = false;
  
  // Mostrar login e esconder sistema
  document.getElementById('mainSystem').style.display = 'none';
  document.getElementById('loginScreen').style.display = 'block';
  
  console.log('🚪 Logout realizado com sucesso');
}

// === GESTÃO DE PRODUTOS ===
function loadDefaultProducts() {
  const tbody = document.querySelector('#tabela tbody');
  tbody.innerHTML = '';
  
  let productsToLoad = fallbackProducts;
  
  // Tentar usar a base de dados completa se disponível
  if (window.productsByCategory && window.PRODUCT_DATA_VERSION) {
    try {
      productsToLoad = flattenProducts(window.productsByCategory);
      console.log(`📦 Base completa carregada: ${productsToLoad.length} produtos (v${window.PRODUCT_DATA_VERSION})`);
      if (typeof showAutoSaveIndicator === 'function') {
        showAutoSaveIndicator(`📦 ${productsToLoad.length} produtos carregados`, 4000);
      }
    } catch (error) {
      console.warn('Erro ao carregar base completa, usando fallback:', error);
      productsToLoad = fallbackProducts;
    }
  } else {
    console.log('📦 Base completa não disponível, usando produtos básicos');
  }
  
  productsToLoad.forEach(product => {
    const row = createProductRow(product);
    tbody.appendChild(row);
  });
}

function createProductRow(product = {}) {
  const row = document.createElement('tr');
  row.innerHTML = `
    <td><input type="text" placeholder="Ex: Arroz 5kg" value="${product.name || ''}"></td>
    <td><input type="text" placeholder="Mercearia" value="${product.category || ''}"></td>
    <td><input type="number" value="${product.consumption || 0}" min="0"></td>
    <td><input type="number" value="${product.stock || 0}" min="0"></td>
    <td><input type="number" value="${product.purchasePrice || 0}" step="0.01" min="0"></td>
    <td><input type="number" value="${product.salePrice || 0}" step="0.01" min="0"></td>
    <td><input type="number" value="${product.leadTime || 7}" min="0"></td>
    <td class="qtdSugerida calculated-value">0</td>
    <td class="pontoReposicao calculated-value">0</td>
    <td class="lucroPot calculated-value">0,00</td>
    <td><button class="delete-btn" onclick="excluirLinha(this)" title="Excluir produto">🗑️</button></td>
  `;
  
  // Adicionar evento de mudança para auto-save
  const inputs = row.querySelectorAll('input');
  inputs.forEach(input => {
    input.addEventListener('input', debounce(autoSave, 1000));
  });
  
  return row;
}

function excluirLinha(button) {
  const row = button.closest('tr');
  const productName = row.cells[0].querySelector('input').value || 'Produto sem nome';
  
  if (confirm(`Tem certeza que deseja excluir "${productName}"?`)) {
    row.remove();
    calcular();
    autoSave();
  }
}

function adicionarLinha() {
  const tbody = document.querySelector('#tabela tbody');
  const newRow = createProductRow();
  tbody.appendChild(newRow);
  calcular(); // Recalcular após adicionar
  autoSave(); // Salvar automaticamente ao adicionar linha
}

// === CÁLCULOS ===
function calcular() {
  const linhas = document.querySelectorAll('#tabela tbody tr');
  const periodDays = 30;
  let totalCompra = 0;
  let totalLucroPot = 0;
  let consumoArray = [];
  let riscoItems = [];
  
  linhas.forEach(linha => {
    const nome = linha.cells[0].querySelector('input').value.trim() || '—';
    const consumoMes = parseFloat(linha.cells[2].querySelector('input').value) || 0;
    const estoque = parseFloat(linha.cells[3].querySelector('input').value) || 0;
    const precoCompra = parseFloat(linha.cells[4].querySelector('input').value) || 0;
    const precoVenda = parseFloat(linha.cells[5].querySelector('input').value) || 0;
    const leadTime = parseFloat(linha.cells[6].querySelector('input').value) || 7;
    
    const consumoDiario = consumoMes / periodDays;
    const pontoReposicao = Math.ceil(consumoDiario * leadTime);
    const qtdSugerida = Math.max(Math.ceil(consumoMes - estoque), 0);
    const lucroPotMensal = Math.max(consumoMes * (precoVenda - precoCompra), 0);
    const custoCompra = qtdSugerida * precoCompra;
    
    // Atualizar células calculadas
    linha.querySelector('.qtdSugerida').textContent = qtdSugerida;
    linha.querySelector('.pontoReposicao').textContent = pontoReposicao;
    linha.querySelector('.lucroPot').textContent = lucroPotMensal.toFixed(2);
    
    totalCompra += custoCompra;
    totalLucroPot += lucroPotMensal;
    consumoArray.push({ nome, consumoMes, lucroPotMensal, estoque });
    
    if (estoque <= pontoReposicao && nome !== '—') {
      riscoItems.push(`${nome} (estoque ${estoque} ≤ ponto ${pontoReposicao})`);
    }
  });
  
  // Atualizar resumos
  document.getElementById('totalCompra').textContent = `R$ ${totalCompra.toFixed(2)}`;
  document.getElementById('totalLucro').textContent = `R$ ${totalLucroPot.toFixed(2)}`;
  
  // Atualizar produtos em risco
  const riscoContainer = document.getElementById('riscoList');
  if (riscoItems.length > 0) {
    riscoContainer.innerHTML = riscoItems.map(item => 
      `<div class="risk-item">${item}</div>`
    ).join('');
  } else {
    riscoContainer.innerHTML = '<span style="color: #16a085; font-weight: 600;">Nenhum produto em risco</span>';
  }
  
  // Desenhar gráfico
  desenharGrafico(consumoArray);
}

// === GRÁFICO ===
function desenharGrafico(dataArr) {
  const sorted = dataArr
    .filter(item => item.nome !== '—' && item.consumoMes > 0)
    .sort((a, b) => b.consumoMes - a.consumoMes)
    .slice(0, 8);
  
  const labels = sorted.map(s => s.nome.length > 15 ? s.nome.substring(0, 15) + '...' : s.nome);
  const valores = sorted.map(s => s.consumoMes);
  
  const ctx = document.getElementById('chartConsumo').getContext('2d');
  
  if (chartInstance) {
    chartInstance.destroy();
  }
  
  chartInstance = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: labels,
      datasets: [{
        label: 'Consumo Médio / Mês',
        data: valores,
        backgroundColor: getComputedStyle(document.documentElement).getPropertyValue('--primary-color') || '#27ae60',
        borderRadius: 6,
        barPercentage: 0.7
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          display: false
        },
        tooltip: {
          callbacks: {
            label: function(context) {
              return ` ${context.formattedValue} unidades/mês`;
            }
          }
        }
      },
      scales: {
        x: {
          ticks: {
            autoSkip: false,
            maxRotation: 45,
            minRotation: 0
          }
        },
        y: {
          beginAtZero: true,
          ticks: {
            callback: function(value) {
              return value + ' un';
            }
          }
        }
      }
    }
  });
}

// === SALVAMENTO E CARREGAMENTO ===
function salvarDados() {
  autoSave();
  
  // Salvar também no formato antigo para compatibilidade
  const linhas = document.querySelectorAll('#tabela tbody tr');
  const dados = [];
  
  linhas.forEach(linha => {
    const item = {
      nome: linha.cells[0].querySelector('input').value,
      categoria: linha.cells[1].querySelector('input').value,
      consumo: parseFloat(linha.cells[2].querySelector('input').value) || 0,
      estoque: parseFloat(linha.cells[3].querySelector('input').value) || 0,
      precoCompra: parseFloat(linha.cells[4].querySelector('input').value) || 0,
      precoVenda: parseFloat(linha.cells[5].querySelector('input').value) || 0,
      leadTime: parseFloat(linha.cells[6].querySelector('input').value) || 7
    };
    dados.push(item);
  });
  
  const saveData = {
    supermercado: currentSupermarket,
    produtos: dados,
    dataHora: new Date().toISOString(),
    versao: '3.0'
  };
  
  localStorage.setItem('lista_produtos_supermercado', JSON.stringify(saveData));
  showAutoSaveIndicator('✅ Lista salva manualmente!', 3000);
}

function carregarDados() {
  try {
    const dados = JSON.parse(localStorage.getItem('lista_produtos_supermercado') || '{}');
    
    if (!dados.produtos || dados.produtos.length === 0) {
      alert('⚠️ Nenhuma lista salva encontrada.');
      return;
    }
    
    const tbody = document.querySelector('#tabela tbody');
    tbody.innerHTML = '';
    
    dados.produtos.forEach(item => {
      const product = {
        name: item.nome,
        category: item.categoria,
        consumption: item.consumo,
        stock: item.estoque,
        purchasePrice: item.precoCompra,
        salePrice: item.precoVenda,
        leadTime: item.leadTime
      };
      const row = createProductRow(product);
      tbody.appendChild(row);
    });
    
    calcular();
    alert(`✅ Lista carregada com sucesso!\nSupermercado: ${dados.supermercado}\nData: ${new Date(dados.dataHora).toLocaleString('pt-BR')}`);
  } catch (error) {
    alert('❌ Erro ao carregar dados. Arquivo pode estar corrompido.');
    console.error('Erro ao carregar:', error);
  }
}

// === EXPORTAÇÃO CSV ===
function exportarCSV() {
  let csv = 'Produto,Categoria,Consumo Médio/Mês,Estoque Atual,Preço Compra,Preço Venda,Lead Time (dias),Qtd Sugerida,Ponto Reposição,Lucro Potencial Mensal\n';
  
  const linhas = document.querySelectorAll('#tabela tbody tr');
  
  linhas.forEach(linha => {
    const cells = linha.querySelectorAll('input');
    const calculatedCells = [
      linha.querySelector('.qtdSugerida').textContent,
      linha.querySelector('.pontoReposicao').textContent,
      linha.querySelector('.lucroPot').textContent
    ];
    
    const row = [
      cells[0].value, // produto
      cells[1].value, // categoria  
      cells[2].value, // consumo
      cells[3].value, // estoque
      cells[4].value, // preço compra
      cells[5].value, // preço venda
      cells[6].value, // lead time
      ...calculatedCells
    ].map(v => `"${String(v).replace(/"/g, '""')}"`).join(',');
    
    csv += row + '\n';
  });
  
  // Adicionar informações do supermercado
  csv += `\n"Supermercado: ${currentSupermarket}"\n`;
  csv += `"Gerado em: ${new Date().toLocaleString('pt-BR')}"`;
  
  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `produtos_${currentSupermarket.toLowerCase().replace(/\s+/g, '_')}_${new Date().toISOString().split('T')[0]}.csv`;
  a.click();
  URL.revokeObjectURL(url);
}

// === UTILITÁRIOS ===
// Formatação de números
function formatCurrency(value) {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL'
  }).format(value);
}

// === SISTEMA DE CACHE INFINITO POR USUÁRIO ===
function setupAutoSave() {
  // Auto-save a cada 30 segundos
  setInterval(() => {
    if (currentSupermarket && userKey) {
      autoSave();
    }
  }, 30000);
}

function autoSave() {
  if (!currentSupermarket || !userKey) return;
  
  showAutoSaveIndicator('Salvando...');
  
  try {
    const linhas = document.querySelectorAll('#tabela tbody tr');
    const dados = [];
    
    linhas.forEach(linha => {
      const inputs = linha.querySelectorAll('input');
      dados.push({
        nome: inputs[0].value || '',
        categoria: inputs[1].value || '',
        consumo: parseFloat(inputs[2].value) || 0,
        estoque: parseFloat(inputs[3].value) || 0,
        precoCompra: parseFloat(inputs[4].value) || 0,
        precoVenda: parseFloat(inputs[5].value) || 0,
        leadTime: parseFloat(inputs[6].value) || 7
      });
    });
    
    const saveData = {
      supermercado: currentSupermarket,
      tema: selectedTheme,
      produtos: dados,
      ultimaSalvamento: new Date().toISOString(),
      versao: '3.0'
    };
    
    // Salvar dados específicos do usuário
    localStorage.setItem(userKey, JSON.stringify(saveData));
    
    // Registrar usuário na lista de usuários
    registerUser();
    
    showAutoSaveIndicator('✅ Salvo', 2000);
  } catch (error) {
    console.error('Erro no auto-save:', error);
    showAutoSaveIndicator('❌ Erro', 3000);
  }
}

function loadUserData() {
  if (!userKey) return false;
  
  try {
    const dados = localStorage.getItem(userKey);
    if (!dados) return false;
    
    const data = JSON.parse(dados);
    if (!data.produtos || data.produtos.length === 0) return false;
    
    const tbody = document.querySelector('#tabela tbody');
    tbody.innerHTML = '';
    
    data.produtos.forEach(item => {
      const product = {
        name: item.nome,
        category: item.categoria,
        consumption: item.consumo,
        stock: item.estoque,
        purchasePrice: item.precoCompra,
        salePrice: item.precoVenda,
        leadTime: item.leadTime
      };
      const row = createProductRow(product);
      tbody.appendChild(row);
    });
    
    showAutoSaveIndicator(`📂 Dados carregados (${new Date(data.ultimaSalvamento).toLocaleDateString('pt-BR')})`, 3000);
    return true;
  } catch (error) {
    console.error('Erro ao carregar dados do usuário:', error);
    return false;
  }
}

function registerUser() {
  try {
    let users = JSON.parse(localStorage.getItem('registered_users') || '[]');
    
    const userInfo = {
      key: userKey,
      nome: currentSupermarket,
      tema: selectedTheme,
      ultimoAcesso: new Date().toISOString()
    };
    
    // Remover usuário existente e adicionar atualizado
    users = users.filter(u => u.key !== userKey);
    users.unshift(userInfo);
    
    // Manter apenas os últimos 50 usuários
    users = users.slice(0, 50);
    
    localStorage.setItem('registered_users', JSON.stringify(users));
  } catch (error) {
    console.error('Erro ao registrar usuário:', error);
  }
}

function createAutoSaveIndicator() {
  autoSaveIndicator = document.createElement('div');
  autoSaveIndicator.id = 'autoSaveIndicator';
  autoSaveIndicator.style.cssText = `
    position: fixed;
    top: 20px;
    right: 20px;
    background: var(--primary-color);
    color: white;
    padding: 8px 16px;
    border-radius: 20px;
    font-size: 12px;
    font-weight: 500;
    box-shadow: 0 4px 12px rgba(0,0,0,0.15);
    z-index: 1000;
    opacity: 0;
    transform: translateY(-10px);
    transition: all 0.3s ease;
    pointer-events: none;
  `;
  document.body.appendChild(autoSaveIndicator);
}

function showAutoSaveIndicator(message, duration = 1000) {
  if (!autoSaveIndicator) return;
  
  autoSaveIndicator.textContent = message;
  autoSaveIndicator.style.opacity = '1';
  autoSaveIndicator.style.transform = 'translateY(0)';
  
  clearTimeout(autoSaveIndicator.timeout);
  autoSaveIndicator.timeout = setTimeout(() => {
    autoSaveIndicator.style.opacity = '0';
    autoSaveIndicator.style.transform = 'translateY(-10px)';
  }, duration);
}

// Função debounce para otimizar auto-save
function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

// === EVENTOS DE TECLADO ===
document.addEventListener('keydown', function(e) {
  // Ctrl/Cmd + S para salvar rápido
  if ((e.ctrlKey || e.metaKey) && e.key === 's') {
    e.preventDefault();
    if (currentSupermarket) {
      salvarDados();
    }
  }
  
  // Ctrl/Cmd + Enter para calcular
  if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
    if (currentSupermarket) {
      calcular();
    }
  }
});

// === RESPONSIVIDADE AVANÇADA ===
// Ajustar tabela em telas pequenas
window.addEventListener('resize', function() {
  const table = document.getElementById('tabela');
  if (table && window.innerWidth < 768) {
    table.classList.add('mobile-table');
  } else if (table) {
    table.classList.remove('mobile-table');
  }
});

// === SISTEMA DE LIMPEZA ===
function cleanOldData() {
  try {
    // Limpar dados antigos (manter apenas os últimos 30 dias)
    const thirtyDaysAgo = Date.now() - (30 * 24 * 60 * 60 * 1000);
    const users = JSON.parse(localStorage.getItem('registered_users') || '[]');
    
    users.forEach(user => {
      if (new Date(user.ultimoAcesso).getTime() < thirtyDaysAgo) {
        localStorage.removeItem(user.key);
      }
    });
    
    // Atualizar lista de usuários
    const activeUsers = users.filter(user => 
      new Date(user.ultimoAcesso).getTime() >= thirtyDaysAgo
    );
    localStorage.setItem('registered_users', JSON.stringify(activeUsers));
  } catch (error) {
    console.error('Erro na limpeza de dados:', error);
  }
}

// === BUSCA E FILTROS ===
function setupSearchAndFilters() {
  const searchInput = document.getElementById('searchProducts');
  const categoryFilter = document.getElementById('filterCategory');
  const sortSelect = document.getElementById('sortProducts');
  
  if (searchInput) {
    searchInput.addEventListener('input', debounce(filterTable, 300));
  }
  
  if (categoryFilter) {
    categoryFilter.addEventListener('change', filterTable);
  }
  
  if (sortSelect) {
    sortSelect.addEventListener('change', sortTable);
  }
}

function filterTable() {
  const searchTerm = document.getElementById('searchProducts').value.toLowerCase();
  const categoryFilter = document.getElementById('filterCategory').value;
  const rows = document.querySelectorAll('#tabela tbody tr');
  
  let visibleCount = 0;
  
  rows.forEach(row => {
    const name = row.cells[0].querySelector('input').value.toLowerCase();
    const category = row.cells[1].querySelector('input').value;
    
    const matchesSearch = !searchTerm || name.includes(searchTerm);
    const matchesCategory = !categoryFilter || category === categoryFilter;
    
    if (matchesSearch && matchesCategory) {
      row.classList.remove('hidden');
      visibleCount++;
      
      // Destacar texto da busca
      if (searchTerm) {
        const nameInput = row.cells[0].querySelector('input');
        const value = nameInput.value;
        if (value.toLowerCase().includes(searchTerm)) {
          nameInput.classList.add('highlight');
        } else {
          nameInput.classList.remove('highlight');
        }
      } else {
        row.cells[0].querySelector('input').classList.remove('highlight');
      }
    } else {
      row.classList.add('hidden');
      row.cells[0].querySelector('input').classList.remove('highlight');
    }
  });
  
  // Atualizar indicador
  if (visibleCount < rows.length) {
    showAutoSaveIndicator(`🔍 ${visibleCount} de ${rows.length} produtos`, 2000);
  }
}

function sortTable() {
  const sortBy = document.getElementById('sortProducts').value;
  if (!sortBy) return;
  
  const tbody = document.querySelector('#tabela tbody');
  const rows = Array.from(tbody.querySelectorAll('tr'));
  
  rows.sort((a, b) => {
    let valueA, valueB;
    
    switch (sortBy) {
      case 'name':
        valueA = a.cells[0].querySelector('input').value.toLowerCase();
        valueB = b.cells[0].querySelector('input').value.toLowerCase();
        return valueA.localeCompare(valueB);
        
      case 'category':
        valueA = a.cells[1].querySelector('input').value;
        valueB = b.cells[1].querySelector('input').value;
        return valueA.localeCompare(valueB);
        
      case 'profit':
        valueA = parseFloat(a.cells[9].textContent.replace(/[^0-9,-]/g, '').replace(',', '.')) || 0;
        valueB = parseFloat(b.cells[9].textContent.replace(/[^0-9,-]/g, '').replace(',', '.')) || 0;
        return valueB - valueA; // Maior primeiro
        
      case 'stock':
        valueA = parseFloat(a.cells[3].querySelector('input').value) || 0;
        valueB = parseFloat(b.cells[3].querySelector('input').value) || 0;
        return valueA - valueB; // Menor primeiro
        
      case 'consumption':
        valueA = parseFloat(a.cells[2].querySelector('input').value) || 0;
        valueB = parseFloat(b.cells[2].querySelector('input').value) || 0;
        return valueB - valueA; // Maior primeiro
        
      default:
        return 0;
    }
  });
  
  // Reorganizar as linhas na tabela
  rows.forEach(row => tbody.appendChild(row));
  
  showAutoSaveIndicator(`📋 Ordenado por ${getSortLabel(sortBy)}`, 2000);
}

function getSortLabel(sortBy) {
  const labels = {
    'name': 'Nome',
    'category': 'Categoria',
    'profit': 'Maior Lucro',
    'stock': 'Menor Estoque',
    'consumption': 'Mais Vendido'
  };
  return labels[sortBy] || sortBy;
}

function limparFiltros() {
  document.getElementById('searchProducts').value = '';
  document.getElementById('filterCategory').value = '';
  document.getElementById('sortProducts').value = '';
  
  // Remover todas as classes hidden e highlight
  const rows = document.querySelectorAll('#tabela tbody tr');
  rows.forEach(row => {
    row.classList.remove('hidden');
    row.cells[0].querySelector('input').classList.remove('highlight');
  });
  
  showAutoSaveIndicator('🗑️ Filtros limpos', 1500);
}

// Reset Completo
function resetarTudo() {
  if (!confirm('⚠️ Tem certeza que deseja resetar TUDO? Isso vai:\n\n• Apagar todos os produtos atuais\n• Voltar aos produtos padrão\n• Limpar todos os filtros\n\nEssa ação não pode ser desfeita!')) {
    return;
  }
  
  try {
    // Limpar filtros
    limparFiltros();
    
    // Carregar produtos padrão novamente
    loadDefaultProducts();
    
    // Recalcular tudo
    calcular();
    
    // Salvar o estado resetado
    autoSave();
    
    showAutoSaveIndicator('🔄 Sistema resetado com sucesso!', 3000);
    console.log('🔄 Reset completo realizado');
  } catch (error) {
    console.error('Erro durante reset:', error);
    alert('❌ Erro durante o reset. Tente novamente.');
  }
}

// Lista de Compras
function gerarListaCompras() {
  const rows = document.querySelectorAll('#tabela tbody tr');
  const produtosParaComprar = [];
  
  rows.forEach(row => {
    const name = row.cells[0].querySelector('input').value.trim();
    const estoque = parseFloat(row.cells[3].querySelector('input').value) || 0;
    const pontoReposicao = parseFloat(row.cells[8].textContent) || 0;
    const qtdSugerida = parseFloat(row.cells[7].textContent) || 0;
    const precoCompra = parseFloat(row.cells[4].querySelector('input').value) || 0;
    
    if (name && estoque <= pontoReposicao && qtdSugerida > 0) {
      produtosParaComprar.push({
        nome: name,
        estoque: estoque,
        pontoReposicao: pontoReposicao,
        qtdSugerida: qtdSugerida,
        precoCompra: precoCompra,
        total: qtdSugerida * precoCompra
      });
    }
  });
  
  if (produtosParaComprar.length === 0) {
    alert('🎉 Parabéns! Todos os produtos estão com estoque adequado.');
    return;
  }
  
  // Gerar relatório de compras
  let relatorio = `🛒 LISTA DE COMPRAS - ${currentSupermarket}\n`;
  relatorio += `📅 ${new Date().toLocaleDateString('pt-BR')}\n\n`;
  relatorio += `📋 PRODUTOS PARA REPOR (${produtosParaComprar.length} itens):\n`;
  relatorio += `${'='.repeat(60)}\n\n`;
  
  let totalGeral = 0;
  
  produtosParaComprar.forEach((produto, index) => {
    relatorio += `${index + 1}. ${produto.nome}\n`;
    relatorio += `   📦 Estoque atual: ${produto.estoque}\n`;
    relatorio += `   ⚠️  Ponto reposição: ${produto.pontoReposicao}\n`;
    relatorio += `   🛒 Comprar: ${produto.qtdSugerida} unidades\n`;
    relatorio += `   💰 Valor: R$ ${produto.precoCompra.toFixed(2)} x ${produto.qtdSugerida} = R$ ${produto.total.toFixed(2)}\n\n`;
    totalGeral += produto.total;
  });
  
  relatorio += `${'='.repeat(60)}\n`;
  relatorio += `💰 TOTAL ESTIMADO: R$ ${totalGeral.toFixed(2)}\n`;
  relatorio += `📊 ${produtosParaComprar.length} produtos para comprar\n\n`;
  relatorio += `💡 Esta lista foi gerada automaticamente baseada no ponto de reposição de cada produto.`;
  
  // Mostrar em uma nova janela para impressão
  const novaJanela = window.open('', '_blank');
  novaJanela.document.write(`
    <html>
      <head>
        <title>Lista de Compras - ${currentSupermarket}</title>
        <style>
          body { font-family: 'Courier New', monospace; padding: 20px; line-height: 1.4; }
          .header { background: #f8f9fa; padding: 15px; border-radius: 5px; margin-bottom: 20px; }
          .total { background: #e3f2fd; padding: 15px; border-radius: 5px; margin-top: 20px; font-weight: bold; }
          @media print { .no-print { display: none; } }
        </style>
      </head>
      <body>
        <div class="no-print">
          <button onclick="window.print()" style="background: #007bff; color: white; padding: 10px 20px; border: none; border-radius: 5px; cursor: pointer; margin-bottom: 20px;">🖨️ Imprimir Lista</button>
        </div>
        <pre>${relatorio}</pre>
      </body>
    </html>
  `);
  
  showAutoSaveIndicator(`🛒 Lista com ${produtosParaComprar.length} produtos gerada`, 3000);
}

// Inicializar quando a página carregar
document.addEventListener('DOMContentLoaded', function() {
  // Limpar dados antigos na inicialização
  cleanOldData();
  
  // Configurar busca e filtros
  setupSearchAndFilters();
  
  console.log('🚀 Sistema de Cache Infinito Ativado!');
  console.log('💾 Dados salvos automaticamente a cada 30 segundos');
  console.log('🗑️ Limpeza automática de dados com +30 dias');
  console.log('🔍 Sistema de busca e filtros configurado');
});