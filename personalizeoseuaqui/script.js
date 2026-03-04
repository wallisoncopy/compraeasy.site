// ─── Estado global ─────────────────────────────
const state = {
  step: 1,
  dados: {},
  secoes: [],
  tema: 'verde'
};

let logoData = null;

const TEMAS = {
  verde:  { primary: [21, 128, 61],   light: [220, 252, 231], name: 'Verde Esmeralda' },
  azul:   { primary: [29, 78, 216],   light: [219, 234, 254], name: 'Azul Classico' },
  rosa:   { primary: [219, 39, 119],  light: [252, 231, 243], name: 'Rosa Delicado' },
  neutro: { primary: [107, 114, 128], light: [243, 244, 246], name: 'Neutro Claro' }
};

const MESES = ['Janeiro','Fevereiro','Marco','Abril','Maio','Junho',
               'Julho','Agosto','Setembro','Outubro','Novembro','Dezembro'];

// ─── Logo Upload ────────────────────────────────
function handleLogo(event) {
  const file = event.target.files[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = function(e) {
    logoData = e.target.result;
    document.getElementById('logo-placeholder').style.display = 'none';
    document.getElementById('logo-preview').style.display = 'flex';
    document.getElementById('logo-img').src = logoData;
  };
  reader.readAsDataURL(file);
}

// ─── Navegação de steps ────────────────────────
function goStep(n) {
  if (n === 2 && !validateStep1()) return;

  document.getElementById('step-' + state.step).classList.remove('active');
  document.getElementById('step-dot-' + state.step).classList.remove('active');
  if (n > state.step) {
    document.getElementById('step-dot-' + state.step).classList.add('done');
  } else {
    document.getElementById('step-dot-' + state.step).classList.remove('done');
  }

  state.step = n;
  document.getElementById('step-' + n).classList.add('active');
  document.getElementById('step-dot-' + n).classList.add('active');

  if (n === 4) buildSummary();
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function validateStep1() {
  const nome = document.getElementById('psico-nome').value.trim();
  const local = document.getElementById('psico-local').value.trim();
  if (!nome) { alert('Por favor, informe seu nome.'); return false; }
  if (!local) { alert('Por favor, informe o nome da clinica ou escola.'); return false; }
  state.dados = {
    nome,
    local,
    cidade: document.getElementById('psico-cidade').value.trim() || '',
    ano: document.getElementById('psico-ano').value || '2026'
  };
  return true;
}

// ─── Seções (checkboxes) ───────────────────────
document.querySelectorAll('.section-item').forEach(item => {
  item.addEventListener('click', () => {
    const cb = item.querySelector('input[type="checkbox"]');
    cb.checked = !cb.checked;
    item.classList.toggle('checked', cb.checked);
  });
});

function getSecoesSelecionadas() {
  const secs = [];
  document.querySelectorAll('.section-item input:checked').forEach(cb => secs.push(cb.value));
  return secs;
}

// ─── Tema (radio) ──────────────────────────────
document.querySelectorAll('.theme-card').forEach(card => {
  card.addEventListener('click', () => {
    document.querySelectorAll('.theme-card').forEach(c => c.classList.remove('selected'));
    card.classList.add('selected');
    const radio = card.querySelector('input[type="radio"]');
    radio.checked = true;
    state.tema = radio.value;
  });
});

// ─── Summary ───────────────────────────────────
function buildSummary() {
  state.secoes = getSecoesSelecionadas();
  const tema = TEMAS[state.tema];
  const nomesSec = {
    capa: 'Capa Personalizada',
    agenda: 'Agenda Semanal',
    pacientes: 'Ficha do Paciente',
    evolucao: 'Registro de Evolucao',
    calendario: 'Calendario Mensal',
    plano: 'Plano de Intervencao',
    atividades: 'Banco de Atividades',
    devolutiva: 'Registro de Devolutivas',
    checklist: 'Checklist Diario',
    relatorio: 'Modelo de Relatorio'
  };

  const grupos = [
    {
      titulo: 'Seus Dados',
      step: 1,
      linhas: [
        ['Profissional', state.dados.nome],
        ['Local', state.dados.local],
        ['Cidade', state.dados.cidade || '-'],
        ['Ano Letivo', state.dados.ano],
        ['Logo', logoData ? 'Carregada ✓' : 'Sem logo'],
      ]
    },
    {
      titulo: 'Seções Selecionadas',
      step: 2,
      linhas: [
        ['Seções', state.secoes.map(s => nomesSec[s] || s).join(', ') || 'Nenhuma selecionada']
      ]
    },
    {
      titulo: 'Tema Visual',
      step: 3,
      linhas: [
        ['Tema', tema.name]
      ]
    }
  ];

  document.getElementById('summary-box').innerHTML = grupos.map(g => `
    <div class="summary-group">
      <div class="summary-group-header">
        <strong>${g.titulo}</strong>
        <button class="btn-edit-group" onclick="goStep(${g.step})">✏️ Editar</button>
      </div>
      ${g.linhas.map(([k, v]) => `<div class="row"><span>${k}</span><span>${v}</span></div>`).join('')}
    </div>
  `).join('');
}

// ─── Geração de PDF ────────────────────────────
async function gerarPDF() {
  const btn = document.getElementById('btn-gerar');
  const txt = document.getElementById('btn-text');
  btn.disabled = true;
  txt.textContent = 'Gerando PDF...';

  try {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF({ orientation: 'portrait', unit: 'mm', format: 'a4' });
    const tema = TEMAS[state.tema];
    const d = state.dados;
    const W = 210, H = 297;
    const [pr, pg, pb] = tema.primary;
    const [lr, lg, lb] = tema.light;

    let pageNum = 0;

    function addPage() {
      if (pageNum > 0) doc.addPage();
      pageNum++;
      doc.setFillColor(pr, pg, pb);
      doc.rect(0, H - 10, W, 10, 'F');
      doc.setTextColor(255, 255, 255);
      doc.setFontSize(7);
      doc.setFont('helvetica', 'normal');
      doc.text(`Planner Psicopedagogico ${d.ano} - ${d.nome} - ${d.local}`, W / 2, H - 3.5, { align: 'center' });
      doc.setTextColor(0, 0, 0);
    }

    function pageHeader(title, subtitle) {
      doc.setFillColor(pr, pg, pb);
      doc.rect(0, 0, W, 22, 'F');
      doc.setTextColor(255, 255, 255);
      doc.setFontSize(13);
      doc.setFont('helvetica', 'bold');
      doc.text(title, 14, 13);
      if (subtitle) {
        doc.setFontSize(7.5);
        doc.setFont('helvetica', 'normal');
        doc.text(subtitle, 14, 19);
      }
      doc.setTextColor(0, 0, 0);
      return 28;
    }

    function sectionTitle(y, text) {
      doc.setFillColor(lr, lg, lb);
      doc.rect(10, y, W - 20, 7, 'F');
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(9);
      doc.setTextColor(pr, pg, pb);
      doc.text(text, 14, y + 5);
      doc.setTextColor(0, 0, 0);
      return y + 10;
    }

    function drawGrid(y, colWidths, headers, numRows) {
      const startX = 10;
      let x = startX;
      const totalW = colWidths.reduce((a, b) => a + b, 0);
      doc.setFillColor(pr, pg, pb);
      doc.rect(startX, y, totalW, 6, 'F');
      doc.setTextColor(255, 255, 255);
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(7);
      headers.forEach((h, i) => {
        doc.text(h, x + 2, y + 4.2);
        x += colWidths[i];
      });
      doc.setTextColor(0, 0, 0);
      doc.setFont('helvetica', 'normal');
      y += 6;
      for (let r = 0; r < numRows; r++) {
        x = startX;
        doc.setFillColor(r % 2 === 0 ? 255 : lr, r % 2 === 0 ? 255 : lg, r % 2 === 0 ? 255 : lb);
        doc.rect(startX, y, totalW, 6, 'F');
        colWidths.forEach(w => {
          doc.setDrawColor(200, 220, 200);
          doc.rect(x, y, w, 6);
          x += w;
        });
        y += 6;
      }
      return y + 2;
    }

    // ── CAPA ──────────────────────────────────────
    if (state.secoes.includes('capa')) {
      addPage();
      doc.setFillColor(pr, pg, pb);
      doc.rect(0, 0, W, H, 'F');
      doc.setFillColor(255, 255, 255);
      doc.roundedRect(20, 65, 170, 155, 6, 6, 'F');

      let capaY = 78;

      if (logoData) {
        try {
          const fmt = logoData.includes('data:image/png') ? 'PNG' : 'JPEG';
          doc.addImage(logoData, fmt, W / 2 - 25, capaY, 50, 28);
          capaY += 34;
        } catch (e) {
          try {
            doc.addImage(logoData, 'PNG', W / 2 - 25, capaY, 50, 28);
            capaY += 34;
          } catch (e2) { /* skip */ }
        }
      }

      doc.setTextColor(pr, pg, pb);
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(22);
      doc.text('PLANNER', W / 2, capaY + 10, { align: 'center' });
      doc.setFontSize(14);
      doc.text('PSICOPEDAGOGICO', W / 2, capaY + 20, { align: 'center' });
      doc.setFontSize(13);
      doc.text(d.ano, W / 2, capaY + 30, { align: 'center' });

      doc.setDrawColor(pr, pg, pb);
      doc.setLineWidth(0.5);
      doc.line(50, capaY + 37, 160, capaY + 37);

      doc.setFont('helvetica', 'normal');
      doc.setFontSize(11);
      doc.setTextColor(50, 50, 50);
      doc.text(d.nome, W / 2, capaY + 48, { align: 'center' });
      doc.setFontSize(9);
      doc.text(d.local, W / 2, capaY + 58, { align: 'center' });
      if (d.cidade) {
        doc.text(d.cidade, W / 2, capaY + 68, { align: 'center' });
      }

      doc.setTextColor(255, 255, 255);
      doc.setFontSize(8);
      doc.text('Planner Psicopedagogico - Gerado com App Personalizado', W / 2, H - 12, { align: 'center' });
    }

    // ── AGENDA SEMANAL (48 semanas) ──────────────
    if (state.secoes.includes('agenda')) {
      const diasLetivos = ['Segunda', 'Terca', 'Quarta', 'Quinta', 'Sexta', 'Sabado'];
      const horarios = ['07:30','08:00','08:30','09:00','09:30','10:00',
                        '10:30','13:00','13:30','14:00','14:30','15:00','15:30','16:00'];

      for (let sem = 1; sem <= 48; sem += 2) {
        addPage();
        let y = pageHeader('Agenda de Atendimentos', `Semanas ${sem} e ${sem + 1} de 48 - Ano Letivo ${d.ano}`);

        for (let s = 0; s < 2 && sem + s <= 48; s++) {
          y = sectionTitle(y, `Semana ${sem + s}`);
          const horaW = 16;
          const colW = (W - 20 - horaW) / 6;

          doc.setFillColor(lr, lg, lb);
          doc.rect(10, y, W - 20, 6, 'F');
          doc.setFont('helvetica', 'bold');
          doc.setFontSize(6.5);
          doc.setTextColor(pr, pg, pb);
          doc.text('Horario', 12, y + 4.2);
          diasLetivos.forEach((dia, i) => doc.text(dia, 10 + horaW + i * colW + 2, y + 4.2));
          doc.setTextColor(0, 0, 0);
          y += 6;

          horarios.forEach((hora, ri) => {
            const rowH = 7;
            doc.setFillColor(ri % 2 === 0 ? 255 : lr, ri % 2 === 0 ? 255 : lg, ri % 2 === 0 ? 255 : lb);
            doc.rect(10, y, W - 20, rowH, 'F');
            doc.setFont('helvetica', 'normal');
            doc.setFontSize(6.5);
            doc.text(hora, 12, y + 5);
            for (let col = 0; col < 6; col++) {
              doc.setDrawColor(200, 220, 200);
              doc.rect(10 + horaW + col * colW, y, colW, rowH);
            }
            y += rowH;
          });
          y += 5;
        }
      }
    }

    // ── FICHA DO PACIENTE ─────────────────────────
    if (state.secoes.includes('pacientes')) {
      for (let p = 0; p < 30; p += 2) {
        addPage();
        let y = pageHeader('Ficha do Paciente', 'Dados cadastrais e historico - ' + d.ano);
        const fichaH = 118;

        for (let i = 0; i < 2 && p + i < 30; i++) {
          const num = p + i + 1;
          doc.setFillColor(lr, lg, lb);
          doc.roundedRect(10, y, W - 20, fichaH, 3, 3, 'F');

          doc.setFillColor(pr, pg, pb);
          doc.rect(10, y, W - 20, 9, 'F');
          doc.setFont('helvetica', 'bold');
          doc.setFontSize(9);
          doc.setTextColor(255, 255, 255);
          doc.text(`Paciente ${num}`, 14, y + 6.5);

          let cy = y + 16;
          const colW2 = (W - 28) / 2;
          const campos = [
            { label: 'Nome completo:', full: true },
            { label: 'Data de Nasc.:', full: false },
            { label: 'Escola / Serie:', full: false },
            { label: 'Responsavel:', full: false },
            { label: 'Contato:', full: false },
            { label: 'Encaminhado por:', full: true },
            { label: 'Queixa principal:', full: true },
            { label: 'Historico de desenvolvimento:', full: true },
            { label: 'Hipotese diagnostica:', full: true },
            { label: 'Observacoes gerais:', full: true }
          ];

          let leftCol = true;
          campos.forEach(({ label, full }) => {
            if (cy > y + fichaH - 5) return;
            const startX = (!full && !leftCol) ? 14 + colW2 + 4 : 14;
            const endX   = (!full && leftCol)  ? 14 + colW2       : W - 14;
            doc.setFont('helvetica', 'bold');
            doc.setFontSize(7);
            doc.setTextColor(pr, pg, pb);
            doc.text(label, startX, cy);
            doc.setFont('helvetica', 'normal');
            doc.setTextColor(0, 0, 0);
            doc.setDrawColor(160, 200, 160);
            doc.line(startX + doc.getTextWidth(label) + 2, cy + 0.5, endX, cy + 0.5);

            if (!full) {
              if (leftCol) {
                leftCol = false;
              } else {
                leftCol = true;
                cy += 7;
              }
            } else {
              cy += 7;
              leftCol = true;
            }
          });

          doc.setTextColor(0, 0, 0);
          y += fichaH + 4;
        }
      }
    }

    // ── REGISTRO DE EVOLUÇÃO ──────────────────────
    if (state.secoes.includes('evolucao')) {
      for (let m = 0; m < 12; m++) {
        addPage();
        let y = pageHeader('Registro de Evolucao - ' + MESES[m], `Progresso por sessao - ${d.ano}`);
        y = drawGrid(y, [18, 42, 42, 52, 36],
          ['Data', 'Paciente', 'Objetivo da Sessao', 'Evolucao Observada', 'Prox. Sessao'], 25);
      }
    }

    // ── CALENDÁRIO MENSAL ─────────────────────────
    if (state.secoes.includes('calendario')) {
      const diasSemana = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sab'];
      for (let m = 0; m < 12; m++) {
        addPage();
        let y = pageHeader(MESES[m] + ' - ' + d.ano, 'Calendario Mensal');
        const firstDay = new Date(parseInt(d.ano), m, 1).getDay();
        const totalDays = new Date(parseInt(d.ano), m + 1, 0).getDate();
        const cellW = (W - 20) / 7;
        const cellH = 10;

        diasSemana.forEach((dia, i) => {
          doc.setFillColor(pr, pg, pb);
          doc.rect(10 + i * cellW, y, cellW, 7, 'F');
          doc.setTextColor(255, 255, 255);
          doc.setFontSize(7.5);
          doc.setFont('helvetica', 'bold');
          doc.text(dia, 10 + i * cellW + cellW / 2, y + 4.8, { align: 'center' });
        });
        doc.setTextColor(0, 0, 0);
        y += 7;

        let day = 1;
        for (let week = 0; week < 6; week++) {
          if (day > totalDays) break;
          for (let wd = 0; wd < 7; wd++) {
            const cellX = 10 + wd * cellW;
            const isDay = (week > 0 || wd >= firstDay) && day <= totalDays;
            const isWeekend = wd === 0 || wd === 6;
            doc.setFillColor(
              isDay ? (isWeekend ? lr : 255) : 240,
              isDay ? (isWeekend ? lg : 255) : 240,
              isDay ? (isWeekend ? lb : 255) : 240
            );
            doc.rect(cellX, y, cellW, cellH, 'F');
            doc.setDrawColor(200, 220, 200);
            doc.rect(cellX, y, cellW, cellH);
            if (isDay) {
              doc.setFont('helvetica', 'bold');
              doc.setFontSize(8);
              doc.setTextColor(isWeekend ? pr : 50, isWeekend ? pg : 50, isWeekend ? pb : 50);
              doc.text(String(day), cellX + 2, y + 4);
              day++;
            }
          }
          y += cellH;
        }

        y += 6;
        y = sectionTitle(y, 'Lembretes e anotacoes do mes');
        for (let i = 0; i < 8; i++) {
          doc.setDrawColor(200, 225, 200);
          doc.line(10, y, W - 10, y);
          y += 6;
        }
      }
    }

    // ── PLANO DE INTERVENÇÃO ──────────────────────
    if (state.secoes.includes('plano')) {
      const bimestres = ['1o Bimestre', '2o Bimestre', '3o Bimestre', '4o Bimestre'];
      for (let p = 1; p <= 10; p++) {
        addPage();
        let y = pageHeader('Plano de Intervencao - Paciente ' + p, d.nome + ' - ' + d.ano);
        bimestres.forEach(bim => {
          if (y > H - 60) { addPage(); y = pageHeader('Plano (cont.) - Pac. ' + p, d.ano); }
          y = sectionTitle(y, bim);
          const areas = [
            'Objetivos terapeuticos:', 'Estrategias e recursos:',
            'Metas do bimestre:', 'Resultados observados:'
          ];
          areas.forEach(area => {
            if (y > H - 20) return;
            doc.setFont('helvetica', 'bold');
            doc.setFontSize(7.5);
            doc.setTextColor(70, 70, 70);
            doc.text(area, 12, y);
            doc.setTextColor(0, 0, 0);
            doc.setFont('helvetica', 'normal');
            doc.setDrawColor(190, 220, 190);
            for (let l = 0; l < 2; l++) {
              y += 6;
              doc.line(12, y, W - 12, y);
            }
            y += 7;
          });
        });
      }
    }

    // ── BANCO DE ATIVIDADES ───────────────────────
    if (state.secoes.includes('atividades')) {
      const areas = [
        'Leitura e Escrita', 'Matematica e Logica', 'Atencao e Concentracao',
        'Memoria', 'Coordenacao Motora', 'Linguagem Oral', 'Raciocinio', 'Socializacao'
      ];
      areas.forEach(area => {
        addPage();
        let y = pageHeader('Banco de Atividades - ' + area, d.ano);
        y = drawGrid(y, [62, 38, 50, 16, 24],
          ['Atividade / Material', 'Objetivo', 'Observacoes / Resultados', 'Faixa', 'Avaliacao'], 22);
      });
    }

    // ── REGISTRO DE DEVOLUTIVAS ───────────────────
    if (state.secoes.includes('devolutiva')) {
      for (const mes of MESES) {
        addPage();
        let y = pageHeader('Registro de Devolutivas - ' + mes, d.nome + ' - ' + d.ano);
        y = drawGrid(y, [18, 40, 36, 52, 44],
          ['Data', 'Paciente', 'Responsavel', 'Temas Abordados', 'Combinados / Encaminhamentos'], 22);
      }
    }

    // ── CHECKLIST DIÁRIO ──────────────────────────
    if (state.secoes.includes('checklist')) {
      const itensFixos = [
        'Prontuarios revisados', 'Materiais preparados', 'Espaco organizado',
        'Fichas de evolucao separadas', 'Plano de sessao definido',
        'Comunicados ou devolutivas pendentes', 'Formularios atualizados',
        'Proxima sessao agendada'
      ];
      const diasLetivos = ['Segunda-Feira', 'Terca-Feira', 'Quarta-Feira', 'Quinta-Feira', 'Sexta-Feira'];

      for (let bloco = 0; bloco < 4; bloco++) {
        addPage();
        let y = pageHeader('Checklist Diario - Psicopedagogia', `Bloco ${bloco + 1} de 4 - ${d.ano}`);

        for (let semana = 0; semana < 2; semana++) {
          y = sectionTitle(y, `Semana ${bloco * 2 + semana + 1}`);
          const colW = (W - 20) / 6;

          doc.setFillColor(pr, pg, pb);
          doc.rect(10, y, W - 20, 6, 'F');
          doc.setTextColor(255, 255, 255);
          doc.setFont('helvetica', 'bold');
          doc.setFontSize(7);
          doc.text('Tarefa / Rotina', 12, y + 4.2);
          diasLetivos.forEach((dia, i) => {
            doc.text(dia.substring(0, 3), 10 + colW + i * colW + colW / 2, y + 4.2, { align: 'center' });
          });
          doc.setTextColor(0, 0, 0);
          y += 6;

          itensFixos.forEach((item, ri) => {
            const rowH = 8;
            doc.setFillColor(ri % 2 === 0 ? 255 : lr, ri % 2 === 0 ? 255 : lg, ri % 2 === 0 ? 255 : lb);
            doc.rect(10, y, W - 20, rowH, 'F');
            doc.setFont('helvetica', 'normal');
            doc.setFontSize(7);
            doc.text(item, 12, y + 5);
            for (let col = 0; col < 5; col++) {
              doc.setDrawColor(200, 220, 200);
              doc.rect(10 + colW + col * colW, y, colW, rowH);
              doc.setFillColor(255, 255, 255);
              doc.rect(10 + colW + col * colW + colW / 2 - 2.5, y + 1.5, 5, 5, 'F');
              doc.setDrawColor(170, 200, 170);
              doc.rect(10 + colW + col * colW + colW / 2 - 2.5, y + 1.5, 5, 5);
            }
            y += rowH;
          });
          y += 8;
        }
      }
    }

    // ── MODELO DE RELATÓRIO ───────────────────────
    if (state.secoes.includes('relatorio')) {
      for (let r = 1; r <= 10; r++) {
        addPage();
        let y = pageHeader('Relatorio Psicopedagogico - Modelo ' + r, d.nome + ' - ' + d.ano);

        const secoes = [
          { titulo: '1. Identificacao', campos: ['Nome:', 'Data de Nasc.:', 'Escola / Serie:', 'Responsavel:', 'Data do Relatorio:'] },
          { titulo: '2. Motivo do Encaminhamento', campos: ['Queixa apresentada pela familia / escola:'] },
          { titulo: '3. Historico de Desenvolvimento', campos: ['Desenvolvimento infantil:', 'Historico escolar:', 'Interventcoes anteriores:'] },
          { titulo: '4. Instrumentos Utilizados', campos: ['Observacao clinica:', 'Testes e instrumentos:', 'Entrevistas realizadas:'] },
          { titulo: '5. Resultados e Analise', campos: ['Aspectos cognitivos e academicos:', 'Aspectos emocionais e comportamentais:'] },
          { titulo: '6. Conclusao e Recomendacoes', campos: ['Hipotese diagnostica:', 'Recomendacoes:', 'Encaminhamentos:'] }
        ];

        secoes.forEach(({ titulo, campos }) => {
          if (y > H - 30) { addPage(); y = pageHeader('Relatorio (cont.) - Modelo ' + r, d.nome); }
          y = sectionTitle(y, titulo);
          campos.forEach(campo => {
            if (y > H - 18) return;
            doc.setFont('helvetica', 'bold');
            doc.setFontSize(7.5);
            doc.setTextColor(60, 60, 60);
            doc.text(campo, 12, y);
            doc.setFont('helvetica', 'normal');
            doc.setTextColor(0, 0, 0);
            doc.setDrawColor(190, 220, 190);
            doc.line(12 + doc.getTextWidth(campo) + 2, y + 0.5, W - 12, y + 0.5);
            y += 7;
          });
          y += 4;
        });

        // Assinatura
        const sigY = Math.max(y + 10, H - 48);
        doc.setDrawColor(pr, pg, pb);
        doc.setLineWidth(0.5);
        doc.line(W / 2 - 45, sigY, W / 2 + 45, sigY);
        doc.setFont('helvetica', 'normal');
        doc.setFontSize(8);
        doc.setTextColor(80, 80, 80);
        doc.text(d.nome, W / 2, sigY + 6, { align: 'center' });
        doc.text('Psicopedagogo(a)', W / 2, sigY + 12, { align: 'center' });
      }
    }

    // ── Salvar ────────────────────────────────────
    const nomePDF = `Planner_Psico_${d.nome.replace(/\s+/g, '_')}_${d.ano}.pdf`;
    doc.save(nomePDF);

    txt.textContent = 'PDF gerado! Verifique seus downloads.';
    btn.style.background = 'linear-gradient(135deg, #15803d, #22c55e)';

  } catch (err) {
    console.error(err);
    txt.textContent = 'Erro ao gerar. Tente novamente.';
    btn.disabled = false;
  }
}
