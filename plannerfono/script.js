/* ── Planner Fonoaudiológico — script.js ── */

/* ── Estado global ── */
const state = {
  step: 1,
  dados: { nome: '', local: '', cidade: '', ano: 2026, logoDataUrl: null },
  secoes: [],
  tema: 'teal'
};

/* ── Temas de cor ── */
const TEMAS = {
  teal:   { r: 15,  g: 118, b: 110 },
  azul:   { r: 29,  g: 78,  b: 216 },
  rosa:   { r: 219, g: 39,  b: 119 },
  neutro: { r: 107, g: 114, b: 128 }
};

const MESES = [
  'Janeiro','Fevereiro','Março','Abril','Maio','Junho',
  'Julho','Agosto','Setembro','Outubro','Novembro','Dezembro'
];

/* ── Navegação de steps ── */
function goStep(n) {
  if (n === 2 && !validateStep1()) return;

  document.getElementById(`step-${state.step}`).classList.remove('active');
  document.getElementById(`step-dot-${state.step}`).classList.remove('active');
  document.getElementById(`step-dot-${state.step}`).classList.add('done');

  state.step = n;
  document.getElementById(`step-${n}`).classList.add('active');
  document.getElementById(`step-dot-${n}`).classList.add('active');
  document.getElementById(`step-dot-${n}`).classList.remove('done');

  if (n === 4) buildSummary();
  window.scrollTo(0, 0);
}

/* ── Validação do step 1 ── */
function validateStep1() {
  const nome = document.getElementById('fono-nome').value.trim();
  if (!nome) {
    alert('Por favor, preencha seu nome completo.');
    document.getElementById('fono-nome').focus();
    return false;
  }
  state.dados.nome  = nome;
  state.dados.local = document.getElementById('fono-local').value.trim() || 'Consultório';
  state.dados.cidade= document.getElementById('fono-cidade').value.trim() || '';
  state.dados.ano   = parseInt(document.getElementById('fono-ano').value) || 2026;
  return true;
}

/* ── Logo upload ── */
function handleLogo(event) {
  const file = event.target.files[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = (e) => {
    state.dados.logoDataUrl = e.target.result;
    document.getElementById('logo-img').src = e.target.result;
    document.getElementById('logo-placeholder').style.display = 'none';
    document.getElementById('logo-preview').style.display = 'flex';
  };
  reader.readAsDataURL(file);
}

/* ── Checkboxes de seções ── */
document.querySelectorAll('.section-item input[type="checkbox"]').forEach(cb => {
  cb.addEventListener('change', function () {
    this.closest('.section-item').classList.toggle('checked', this.checked);
  });
});

/* ── Tema ── */
document.querySelectorAll('.theme-card').forEach(card => {
  card.addEventListener('click', function () {
    document.querySelectorAll('.theme-card').forEach(c => c.classList.remove('selected'));
    this.classList.add('selected');
    state.tema = this.querySelector('input[type=radio]').value;
  });
});

/* ── Resumo (step 4) ── */
function buildSummary() {
  const d = state.dados;
  const secoesChecked = [...document.querySelectorAll('.section-item input:checked')]
    .map(cb => cb.closest('.section-item').querySelector('strong').textContent);

  const temaLabel = {
    teal: 'Teal Profissional', azul: 'Azul Clássico',
    rosa: 'Rosa Delicado', neutro: 'Neutro Claro'
  }[state.tema];

  const box = document.getElementById('summary-box');
  box.innerHTML = `
    <div class="summary-group">
      <div class="summary-group-header">
        <strong>✏️ Dados Profissionais</strong>
        <button class="btn-edit-group" onclick="goStep(1)">Editar</button>
      </div>
      <div class="row"><span>Nome</span><span>${d.nome}</span></div>
      <div class="row"><span>Local</span><span>${d.local}</span></div>
      ${d.cidade ? `<div class="row"><span>Cidade</span><span>${d.cidade}</span></div>` : ''}
      <div class="row"><span>Ano</span><span>${d.ano}</span></div>
      <div class="row"><span>Logo</span><span>${d.logoDataUrl ? '✅ Carregada' : '—'}</span></div>
    </div>
    <div class="summary-group">
      <div class="summary-group-header">
        <strong>📋 Seções Selecionadas</strong>
        <button class="btn-edit-group" onclick="goStep(2)">Editar</button>
      </div>
      ${secoesChecked.map(s => `<div class="row"><span>✓</span><span>${s}</span></div>`).join('')}
    </div>
    <div class="summary-group">
      <div class="summary-group-header">
        <strong>🎨 Estilo</strong>
        <button class="btn-edit-group" onclick="goStep(3)">Editar</button>
      </div>
      <div class="row"><span>Tema</span><span>${temaLabel}</span></div>
    </div>
  `;
}

/* ══════════════════════════════════════════
   GERAÇÃO DO PDF
══════════════════════════════════════════ */
async function gerarPDF() {
  if (!validateStep1()) { goStep(1); return; }

  const btn  = document.getElementById('btn-gerar');
  const txt  = document.getElementById('btn-text');
  btn.disabled = true;
  txt.textContent = '⏳ Gerando PDF...';

  await new Promise(r => setTimeout(r, 50));

  try {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF({ orientation: 'portrait', unit: 'mm', format: 'a4' });
    const d   = state.dados;
    const cor = TEMAS[state.tema];
    const W   = 210, H = 297;

    const secoes = [...document.querySelectorAll('.section-item input:checked')]
      .map(cb => cb.value);

    /* ── helpers ── */
    let paginaAtual = 0;
    function addPage() {
      doc.addPage();
      paginaAtual++;
    }
    function corRGB() { return [cor.r, cor.g, cor.b]; }
    function pageHeader(titulo, subtitulo = '') {
      doc.setFillColor(...corRGB());
      doc.rect(0, 0, W, 18, 'F');
      doc.setTextColor(255, 255, 255);
      doc.setFontSize(9);
      doc.setFont('helvetica', 'bold');
      doc.text(titulo, 10, 7.5);
      if (subtitulo) { doc.setFontSize(7); doc.setFont('helvetica', 'normal'); doc.text(subtitulo, 10, 13); }
      doc.setFontSize(7); doc.setFont('helvetica', 'normal');
      doc.text(`${d.nome} · ${d.local} · ${d.ano}`, W - 10, 7.5, { align: 'right' });
    }
    function sectionTitle(txt, y) {
      doc.setFillColor(...corRGB());
      doc.rect(10, y - 5, W - 20, 7, 'F');
      doc.setTextColor(255, 255, 255);
      doc.setFontSize(8.5);
      doc.setFont('helvetica', 'bold');
      doc.text(txt, 14, y);
      doc.setTextColor(0, 0, 0);
    }
    function drawGrid(xArr, yArr, w, h) {
      doc.setDrawColor(200, 200, 200);
      doc.setLineWidth(0.2);
      xArr.forEach(x => yArr.forEach(y => doc.rect(x, y, w, h)));
    }
    function footer(pag) {
      doc.setFontSize(6.5);
      doc.setFont('helvetica', 'normal');
      doc.setTextColor(160, 160, 160);
      doc.text(`Planner Fonoaudiologico ${d.ano} · ${d.nome} · ${d.local}`, W / 2, H - 5, { align: 'center' });
      doc.text(`${pag}`, W - 10, H - 5, { align: 'right' });
    }

    /* ── CAPA ── */
    if (secoes.includes('capa')) {
      doc.setFillColor(...corRGB());
      doc.rect(0, 0, W, H, 'F');
      const R2 = Math.max(cor.r - 30, 0), G2 = Math.max(cor.g - 30, 0), B2 = Math.max(cor.b - 30, 0);
      doc.setFillColor(R2, G2, B2);
      doc.rect(0, H * 0.55, W, H * 0.45, 'F');

      // Logo
      if (d.logoDataUrl) {
        try {
          doc.addImage(d.logoDataUrl, 'AUTO', W / 2 - 20, 20, 40, 20, '', 'FAST');
        } catch (e) {}
      }

      // Ícone
      doc.setTextColor(255, 255, 255);
      doc.setFontSize(40);
      doc.text('🗣️', W / 2, d.logoDataUrl ? 60 : 50, { align: 'center' });

      // Título
      doc.setFontSize(26);
      doc.setFont('helvetica', 'bold');
      doc.text('PLANNER', W / 2, d.logoDataUrl ? 80 : 75, { align: 'center' });
      doc.text('FONOAUDIOLÓGICO', W / 2, d.logoDataUrl ? 92 : 87, { align: 'center' });

      // Ano
      doc.setFontSize(16);
      doc.setFont('helvetica', 'normal');
      doc.text(`${d.ano}`, W / 2, d.logoDataUrl ? 104 : 99, { align: 'center' });

      // Divisor
      doc.setFillColor(255, 255, 255);
      doc.setFillColor(255, 255, 255, 0.3);
      doc.rect(40, d.logoDataUrl ? 110 : 105, W - 80, 0.5, 'F');

      // Nome
      doc.setFontSize(14);
      doc.setFont('helvetica', 'bold');
      doc.text(d.nome, W / 2, d.logoDataUrl ? 124 : 120, { align: 'center' });
      doc.setFontSize(10);
      doc.setFont('helvetica', 'normal');
      if (d.local) doc.text(d.local, W / 2, d.logoDataUrl ? 134 : 130, { align: 'center' });
      if (d.cidade) doc.text(d.cidade, W / 2, d.logoDataUrl ? 143 : 139, { align: 'center' });

      // Áreas de atuação decorativas
      doc.setFontSize(7.5);
      const areas = ['Linguagem', 'Voz', 'Deglutição', 'Fluência', 'Audição', 'Motricidade Orofacial'];
      const startY = H * 0.65;
      areas.forEach((a, i) => {
        const col = i % 3;
        const row = Math.floor(i / 3);
        const x = 30 + col * 60;
        const y = startY + row * 14;
        doc.setFillColor(255, 255, 255);
        doc.roundedRect(x, y - 5, 50, 9, 2, 2, 'F');
        doc.setTextColor(...corRGB());
        doc.text(a, x + 25, y + 1, { align: 'center' });
      });

      // Rodapé capa
      doc.setTextColor(255, 255, 255);
      doc.setFontSize(7);
      doc.text('Planner profissional personalizado · Gerado gratuitamente', W / 2, H - 12, { align: 'center' });
      paginaAtual++;
    }

    /* ── AGENDA SEMANAL (48 semanas) ── */
    if (secoes.includes('agenda')) {
      const semanas = 48;
      const semanasPerPage = 4;
      let semAtual = 0;

      for (let pag = 0; pag < Math.ceil(semanas / semanasPerPage); pag++) {
        addPage();
        pageHeader('AGENDA SEMANAL', `Planner Fonoaudiologico ${d.ano}`);
        footer(paginaAtual);
        const dias = ['Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta'];
        const startY = 24;
        const blockH = 63;

        for (let s = 0; s < semanasPerPage && semAtual < semanas; s++, semAtual++) {
          const bY = startY + s * (blockH + 4);
          sectionTitle(`SEMANA ${semAtual + 1}`, bY + 5);
          const colW = (W - 20) / dias.length;
          dias.forEach((dia, i) => {
            const x = 10 + i * colW;
            doc.setFillColor(245, 245, 245);
            doc.rect(x, bY + 9, colW, 8, 'F');
            doc.setTextColor(80, 80, 80);
            doc.setFontSize(6.5);
            doc.setFont('helvetica', 'bold');
            doc.text(dia, x + colW / 2, bY + 14.5, { align: 'center' });
            doc.setFillColor(255, 255, 255);
            doc.rect(x, bY + 17, colW, blockH - 17, 'F');
            doc.setDrawColor(220, 220, 220);
            doc.setLineWidth(0.2);
            doc.rect(x, bY + 9, colW, blockH - 9);
            // linhas de horário
            const slots = 7;
            const slotH = (blockH - 17) / slots;
            for (let sl = 0; sl < slots; sl++) {
              const ly = bY + 17 + sl * slotH;
              doc.setDrawColor(235, 235, 235);
              doc.line(x + 2, ly, x + colW - 2, ly);
            }
          });
        }
      }
    }

    /* ── FICHA DO PACIENTE (30 fichas) ── */
    if (secoes.includes('pacientes')) {
      const total = 30;
      for (let i = 0; i < total; i++) {
        addPage();
        pageHeader('FICHA DO PACIENTE', `Planner Fonoaudiologico ${d.ano}`);
        footer(paginaAtual);
        sectionTitle('DADOS DO PACIENTE', 26);

        const campos = [
          ['Nome completo', 80],
          ['Data de nascimento', 90],
          ['Responsável', 100],
          ['Telefone de contato', 110],
          ['Encaminhado por', 120],
        ];
        campos.forEach(([label, y]) => {
          doc.setFontSize(7);
          doc.setFont('helvetica', 'bold');
          doc.setTextColor(80, 80, 80);
          doc.text(label + ':', 12, y - 2);
          doc.setDrawColor(200, 200, 200);
          doc.setLineWidth(0.3);
          doc.line(12, y + 2, W - 12, y + 2);
        });

        sectionTitle('QUEIXA PRINCIPAL / DIAGNÓSTICO', 134);
        doc.setFillColor(250, 250, 250);
        doc.rect(10, 136, W - 20, 25, 'F');
        doc.setDrawColor(210, 210, 210);
        doc.rect(10, 136, W - 20, 25);

        sectionTitle('HISTÓRICO E OBSERVAÇÕES', 167);
        doc.setFillColor(250, 250, 250);
        doc.rect(10, 169, W - 20, 35, 'F');
        doc.setDrawColor(210, 210, 210);
        doc.rect(10, 169, W - 20, 35);

        sectionTitle('ÁREAS DE ATUAÇÃO FONOAUDIOLÓGICA', 210);
        const areas2 = ['Linguagem Oral', 'Linguagem Escrita', 'Voz', 'Deglutição / Disfagia', 'Fluência / Gagueira', 'Audição', 'Motricidade Orofacial', 'TEA / Autismo', 'CAA'];
        areas2.forEach((area, idx) => {
          const col = idx % 3;
          const row = Math.floor(idx / 3);
          const x = 12 + col * 62;
          const y = 216 + row * 10;
          doc.setFillColor(245, 245, 245);
          doc.roundedRect(x, y, 56, 7, 1, 1, 'F');
          doc.setDrawColor(210, 210, 210);
          doc.roundedRect(x, y, 56, 7, 1, 1, 'S');
          doc.setFontSize(5.5);
          doc.setFont('helvetica', 'normal');
          doc.setTextColor(80, 80, 80);
          doc.text('☐  ' + area, x + 3, y + 4.5);
        });

        doc.setFontSize(7);
        doc.setFont('helvetica', 'bold');
        doc.setTextColor(80, 80, 80);
        doc.text('Data início:', 12, 250);
        doc.setDrawColor(200, 200, 200);
        doc.line(30, 250, 70, 250);
        doc.text('Frequência semanal:', 80, 250);
        doc.line(115, 250, 155, 250);
      }
    }

    /* ── REGISTRO DE EVOLUÇÃO (12 meses × 4 semanas) ── */
    if (secoes.includes('evolucao')) {
      MESES.forEach((mes, mi) => {
        for (let sem = 1; sem <= 4; sem++) {
          addPage();
          pageHeader('REGISTRO DE EVOLUÇÃO', `${mes.toUpperCase()} ${d.ano} · Semana ${sem}`);
          footer(paginaAtual);

          sectionTitle(`${mes.toUpperCase()} — Semana ${sem} de 4`, 26);

          const cols = ['Paciente', 'Área', 'Objetivos / Atividades', 'Resposta / Evolução', 'Próx.'];
          const widths = [35, 25, 55, 55, 20];
          let x = 10;
          const headerY = 30;
          cols.forEach((c, ci) => {
            doc.setFillColor(...corRGB());
            doc.rect(x, headerY, widths[ci], 7, 'F');
            doc.setTextColor(255, 255, 255);
            doc.setFontSize(6);
            doc.setFont('helvetica', 'bold');
            doc.text(c, x + widths[ci] / 2, headerY + 4.5, { align: 'center' });
            x += widths[ci];
          });

          const rowH = 14;
          const rows = 15;
          for (let r = 0; r < rows; r++) {
            const y = headerY + 7 + r * rowH;
            doc.setFillColor(r % 2 === 0 ? 255 : 248, r % 2 === 0 ? 255 : 248, r % 2 === 0 ? 255 : 252);
            doc.rect(10, y, W - 20, rowH, 'F');
            doc.setDrawColor(225, 225, 225);
            doc.rect(10, y, W - 20, rowH);
            let xr = 10;
            widths.forEach(w => {
              doc.setDrawColor(225, 225, 225);
              doc.line(xr, y, xr, y + rowH);
              xr += w;
            });
          }
        }
      });
    }

    /* ── CALENDÁRIO MENSAL ── */
    if (secoes.includes('calendario')) {
      MESES.forEach((mes, mi) => {
        addPage();
        pageHeader('CALENDÁRIO MENSAL', `Planner Fonoaudiologico ${d.ano}`);
        footer(paginaAtual);
        sectionTitle(`${mes.toUpperCase()} ${d.ano}`, 26);

        const diasSem = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'];
        const colW = (W - 20) / 7;
        diasSem.forEach((dia, i) => {
          doc.setFillColor(...corRGB());
          doc.rect(10 + i * colW, 32, colW, 7, 'F');
          doc.setTextColor(255, 255, 255);
          doc.setFontSize(6.5);
          doc.setFont('helvetica', 'bold');
          doc.text(dia, 10 + i * colW + colW / 2, 37, { align: 'center' });
        });

        const firstDay = new Date(d.ano, mi, 1).getDay();
        const daysInMonth = new Date(d.ano, mi + 1, 0).getDate();
        let day = 1, row = 0;
        const cellH = 22;

        for (let pos = 0; pos < firstDay; pos++) {
          const col = pos;
          doc.setFillColor(248, 248, 248);
          doc.rect(10 + col * colW, 39 + row * cellH, colW, cellH, 'F');
          doc.setDrawColor(220, 220, 220);
          doc.rect(10 + col * colW, 39 + row * cellH, colW, cellH);
        }

        let cellPos = firstDay;
        while (day <= daysInMonth) {
          const col = cellPos % 7;
          if (cellPos > 0 && col === 0) row++;
          const cx = 10 + col * colW;
          const cy = 39 + row * cellH;
          doc.setFillColor(255, 255, 255);
          doc.rect(cx, cy, colW, cellH, 'F');
          doc.setDrawColor(220, 220, 220);
          doc.rect(cx, cy, colW, cellH);
          doc.setTextColor(...corRGB());
          doc.setFontSize(7);
          doc.setFont('helvetica', 'bold');
          doc.text(String(day), cx + 2, cy + 5);
          day++;
          cellPos++;
        }

        // Notas do mês
        const notesY = 39 + (row + 2) * cellH + 4;
        if (notesY < H - 40) {
          sectionTitle('NOTAS DO MÊS', notesY + 5);
          doc.setFillColor(250, 250, 250);
          doc.rect(10, notesY + 7, W - 20, 40, 'F');
          doc.setDrawColor(210, 210, 210);
          doc.rect(10, notesY + 7, W - 20, 40);
          for (let ln = 1; ln <= 5; ln++) {
            doc.setDrawColor(230, 230, 230);
            doc.line(12, notesY + 7 + ln * 7, W - 12, notesY + 7 + ln * 7);
          }
        }
      });
    }

    /* ── FICHA DE AVALIAÇÃO ── */
    if (secoes.includes('avaliacao')) {
      for (let i = 0; i < 20; i++) {
        addPage();
        pageHeader('FICHA DE AVALIAÇÃO FONOAUDIOLÓGICA', `Planner Fonoaudiologico ${d.ano}`);
        footer(paginaAtual);

        sectionTitle('IDENTIFICAÇÃO', 26);
        const camposAval = [
          ['Paciente', 70], ['Data da avaliação', 80], ['Avaliador', 90]
        ];
        camposAval.forEach(([label, y]) => {
          doc.setFontSize(7); doc.setFont('helvetica', 'bold');
          doc.setTextColor(80, 80, 80);
          doc.text(label + ':', 12, y - 2);
          doc.setDrawColor(200, 200, 200); doc.setLineWidth(0.3);
          doc.line(12, y + 2, W - 12, y + 2);
        });

        sectionTitle('ÁREA AVALIADA', 104);
        const areasAval = ['Linguagem Oral', 'Linguagem Escrita', 'Voz', 'Deglutição', 'Fluência', 'Motricidade Orofacial', 'Audição', 'TEA / Autismo'];
        areasAval.forEach((a, idx) => {
          const col = idx % 4; const row = Math.floor(idx / 4);
          const x = 12 + col * 47; const y = 110 + row * 9;
          doc.setFontSize(6); doc.setFont('helvetica', 'normal');
          doc.setTextColor(80, 80, 80);
          doc.text('☐  ' + a, x, y);
        });

        sectionTitle('OBSERVAÇÕES / COMPORTAMENTO DURANTE A AVALIAÇÃO', 133);
        doc.setFillColor(250, 250, 250);
        doc.rect(10, 135, W - 20, 30, 'F');
        doc.setDrawColor(210, 210, 210);
        doc.rect(10, 135, W - 20, 30);

        sectionTitle('INSTRUMENTOS UTILIZADOS / TESTES APLICADOS', 171);
        doc.setFillColor(250, 250, 250);
        doc.rect(10, 173, W - 20, 25, 'F');
        doc.setDrawColor(210, 210, 210);
        doc.rect(10, 173, W - 20, 25);

        sectionTitle('CONCLUSÃO / IMPRESSÃO DIAGNÓSTICA', 204);
        doc.setFillColor(250, 250, 250);
        doc.rect(10, 206, W - 20, 35, 'F');
        doc.setDrawColor(210, 210, 210);
        doc.rect(10, 206, W - 20, 35);

        doc.setFontSize(7);
        doc.setFont('helvetica', 'bold');
        doc.setTextColor(80, 80, 80);
        doc.text('Data:', 12, 252);
        doc.line(22, 252, 80, 252);
        doc.text('Assinatura:', 90, 252);
        doc.line(108, 252, W - 12, 252);
      }
    }

    /* ── PLANO TERAPÊUTICO ── */
    if (secoes.includes('plano')) {
      for (let i = 0; i < 20; i++) {
        addPage();
        pageHeader('PLANO TERAPÊUTICO', `Planner Fonoaudiologico ${d.ano}`);
        footer(paginaAtual);

        sectionTitle('IDENTIFICAÇÃO DO PACIENTE', 26);
        doc.setFontSize(7); doc.setFont('helvetica', 'bold'); doc.setTextColor(80, 80, 80);
        doc.text('Paciente:', 12, 34);
        doc.setDrawColor(200, 200, 200); doc.setLineWidth(0.3);
        doc.line(30, 34, 110, 34);
        doc.text('Período:', 115, 34);
        doc.line(128, 34, W - 12, 34);

        const bimestres = ['1º Bimestre', '2º Bimestre', '3º Bimestre', '4º Bimestre'];
        bimestres.forEach((bim, bi) => {
          const startY = 44 + bi * 56;
          sectionTitle(bim.toUpperCase() + ' — METAS TERAPÊUTICAS', startY + 5);
          const colH = 40;
          const halfW = (W - 20) / 2;

          doc.setFillColor(250, 250, 250);
          doc.rect(10, startY + 9, halfW, colH, 'F');
          doc.setDrawColor(210, 210, 210);
          doc.rect(10, startY + 9, halfW, colH);
          doc.setFontSize(6.5); doc.setFont('helvetica', 'bold'); doc.setTextColor(80, 80, 80);
          doc.text('Objetivos / Metas', 12, startY + 15);

          doc.setFillColor(250, 250, 250);
          doc.rect(10 + halfW, startY + 9, halfW, colH, 'F');
          doc.setDrawColor(210, 210, 210);
          doc.rect(10 + halfW, startY + 9, halfW, colH);
          doc.text('Estratégias / Recursos', 12 + halfW, startY + 15);
        });
      }
    }

    /* ── BANCO DE ATIVIDADES ── */
    if (secoes.includes('atividades')) {
      const areas3 = [
        { nome: 'LINGUAGEM ORAL', icone: '🗣️' },
        { nome: 'LINGUAGEM ESCRITA', icone: '✍️' },
        { nome: 'VOZ', icone: '🎤' },
        { nome: 'DEGLUTIÇÃO / DISFAGIA', icone: '🌊' },
        { nome: 'FLUÊNCIA / GAGUEIRA', icone: '🌀' },
        { nome: 'MOTRICIDADE OROFACIAL', icone: '👄' },
        { nome: 'AUDIÇÃO', icone: '👂' },
        { nome: 'TEA / AUTISMO / CAA', icone: '🧩' },
      ];

      areas3.forEach((area) => {
        addPage();
        pageHeader('BANCO DE ATIVIDADES', `Planner Fonoaudiologico ${d.ano}`);
        footer(paginaAtual);
        sectionTitle(`${area.icone}  ${area.nome}`, 26);

        const cols = ['Atividade / Material', 'Objetivo', 'Nível / Faixa Etária', 'Observações'];
        const widths2 = [60, 45, 40, 45];
        let x = 10;
        cols.forEach((c, ci) => {
          doc.setFillColor(...corRGB());
          doc.rect(x, 32, widths2[ci], 7, 'F');
          doc.setTextColor(255, 255, 255);
          doc.setFontSize(6);
          doc.setFont('helvetica', 'bold');
          doc.text(c, x + widths2[ci] / 2, 36.5, { align: 'center' });
          x += widths2[ci];
        });

        const rowH2 = 13;
        const rows2 = 17;
        for (let r = 0; r < rows2; r++) {
          const y = 39 + r * rowH2;
          doc.setFillColor(r % 2 === 0 ? 255 : 250, r % 2 === 0 ? 255 : 250, r % 2 === 0 ? 255 : 253);
          doc.rect(10, y, W - 20, rowH2, 'F');
          doc.setDrawColor(225, 225, 225);
          doc.rect(10, y, W - 20, rowH2);
          let xr = 10;
          widths2.forEach(w => { doc.line(xr, y, xr, y + rowH2); xr += w; });
        }
      });
    }

    /* ── REGISTRO DE DEVOLUTIVAS ── */
    if (secoes.includes('devolutiva')) {
      for (let pag = 0; pag < 6; pag++) {
        addPage();
        pageHeader('REGISTRO DE DEVOLUTIVAS', `Planner Fonoaudiologico ${d.ano}`);
        footer(paginaAtual);
        sectionTitle('ORIENTAÇÕES E DEVOLUTIVAS FAMILIARES', 26);

        const cols = ['Data', 'Paciente', 'Responsável', 'Orientações Dadas', 'Retorno / Resposta'];
        const widths3 = [20, 35, 35, 55, 45];
        let x = 10;
        cols.forEach((c, ci) => {
          doc.setFillColor(...corRGB());
          doc.rect(x, 32, widths3[ci], 7, 'F');
          doc.setTextColor(255, 255, 255);
          doc.setFontSize(5.5);
          doc.setFont('helvetica', 'bold');
          doc.text(c, x + widths3[ci] / 2, 36.5, { align: 'center' });
          x += widths3[ci];
        });

        const rowH3 = 16;
        const rows3 = 14;
        for (let r = 0; r < rows3; r++) {
          const y = 39 + r * rowH3;
          doc.setFillColor(r % 2 === 0 ? 255 : 250, r % 2 === 0 ? 255 : 250, r % 2 === 0 ? 255 : 253);
          doc.rect(10, y, W - 20, rowH3, 'F');
          doc.setDrawColor(225, 225, 225);
          doc.rect(10, y, W - 20, rowH3);
          let xr = 10;
          widths3.forEach(w => { doc.line(xr, y, xr, y + rowH3); xr += w; });
        }
      }
    }

    /* ── CHECKLIST DIÁRIO ── */
    if (secoes.includes('checklist')) {
      for (let pag = 0; pag < 4; pag++) {
        addPage();
        pageHeader('CHECKLIST DIÁRIO', `Planner Fonoaudiologico ${d.ano}`);
        footer(paginaAtual);

        // Semana header
        doc.setFontSize(8);
        doc.setFont('helvetica', 'bold');
        doc.setTextColor(80, 80, 80);
        doc.text(`Semana: ______ / Data: ____/____/______`, 12, 26);

        const dias2 = ['Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta'];
        const dayW = (W - 20) / 5;
        dias2.forEach((dia, i) => {
          const x = 10 + i * dayW;
          doc.setFillColor(...corRGB());
          doc.rect(x, 30, dayW, 7, 'F');
          doc.setTextColor(255, 255, 255);
          doc.setFontSize(6.5);
          doc.setFont('helvetica', 'bold');
          doc.text(dia, x + dayW / 2, 35, { align: 'center' });
        });

        const itens = [
          'Material preparado',
          'Prontuários revisados',
          'Sala organizada',
          'Objetivos definidos',
          'Fichas impressas',
          'Avaliação pendente?',
          'Devolutiva pendente?',
          'Relatório pendente?',
        ];
        const itemH = 8;
        itens.forEach((item, idx) => {
          const y = 40 + idx * itemH;
          dias2.forEach((dia, i) => {
            const x = 10 + i * dayW;
            doc.setFillColor(idx % 2 === 0 ? 255 : 250, idx % 2 === 0 ? 255 : 250, idx % 2 === 0 ? 255 : 253);
            doc.rect(x, y, dayW, itemH, 'F');
            doc.setDrawColor(225, 225, 225);
            doc.rect(x, y, dayW, itemH);
            if (i === 0) {
              doc.setFontSize(5.5);
              doc.setFont('helvetica', 'normal');
              doc.setTextColor(80, 80, 80);
              doc.text('☐  ' + item, x + 2, y + 5.5);
            } else {
              doc.setFontSize(7);
              doc.setTextColor(200, 200, 200);
              doc.text('☐', x + dayW / 2, y + 5.5, { align: 'center' });
            }
          });
        });

        // Notas do dia
        sectionTitle('NOTAS DO DIA', 116);
        doc.setFillColor(250, 250, 250);
        doc.rect(10, 118, W - 20, H - 130, 'F');
        doc.setDrawColor(210, 210, 210);
        doc.rect(10, 118, W - 20, H - 130);
        const linhas = Math.floor((H - 130) / 8);
        for (let ln = 1; ln < linhas; ln++) {
          doc.setDrawColor(235, 235, 235);
          doc.line(12, 118 + ln * 8, W - 12, 118 + ln * 8);
        }
      }
    }

    /* ── MODELO DE RELATÓRIO ── */
    if (secoes.includes('relatorio')) {
      for (let i = 0; i < 10; i++) {
        addPage();
        pageHeader('MODELO DE RELATÓRIO FONOAUDIOLÓGICO', `Planner Fonoaudiologico ${d.ano}`);
        footer(paginaAtual);

        // Cabeçalho do relatório
        doc.setFillColor(245, 245, 245);
        doc.rect(10, 22, W - 20, 16, 'F');
        doc.setDrawColor(210, 210, 210);
        doc.rect(10, 22, W - 20, 16);
        doc.setFontSize(9);
        doc.setFont('helvetica', 'bold');
        doc.setTextColor(...corRGB());
        doc.text('RELATÓRIO FONOAUDIOLÓGICO', W / 2, 28, { align: 'center' });
        doc.setFontSize(7);
        doc.setFont('helvetica', 'normal');
        doc.setTextColor(80, 80, 80);
        doc.text(`${d.nome} · ${d.local}`, W / 2, 34, { align: 'center' });

        const secoes_relatorio = [
          { titulo: 'I. IDENTIFICAÇÃO DO PACIENTE', h: 25 },
          { titulo: 'II. DADOS DO ENCAMINHAMENTO E QUEIXA PRINCIPAL', h: 20 },
          { titulo: 'III. AVALIAÇÃO FONOAUDIOLÓGICA', h: 35 },
          { titulo: 'IV. DIAGNÓSTICO / IMPRESSÃO CLÍNICA', h: 25 },
          { titulo: 'V. CONDUTA TERAPÊUTICA E EVOLUÇÃO', h: 30 },
          { titulo: 'VI. ORIENTAÇÕES E RECOMENDAÇÕES', h: 25 },
        ];

        let curY = 44;
        secoes_relatorio.forEach((s) => {
          if (curY + s.h + 10 > H - 20) return;
          sectionTitle(s.titulo, curY + 5);
          doc.setFillColor(250, 250, 250);
          doc.rect(10, curY + 7, W - 20, s.h, 'F');
          doc.setDrawColor(210, 210, 210);
          doc.rect(10, curY + 7, W - 20, s.h);
          const lns = Math.floor(s.h / 7);
          for (let ln = 1; ln < lns; ln++) {
            doc.setDrawColor(240, 240, 240);
            doc.line(12, curY + 7 + ln * 7, W - 12, curY + 7 + ln * 7);
          }
          curY += s.h + 12;
        });

        // Assinatura
        const sigY = H - 32;
        doc.setDrawColor(180, 180, 180);
        doc.line(W / 2 - 40, sigY, W / 2 + 40, sigY);
        doc.setFontSize(7);
        doc.setFont('helvetica', 'normal');
        doc.setTextColor(100, 100, 100);
        doc.text(d.nome, W / 2, sigY + 5, { align: 'center' });
        doc.text('CRFa: _____________', W / 2, sigY + 11, { align: 'center' });
        doc.text('Data: ____/____/______', W / 2, sigY + 17, { align: 'center' });
      }
    }

    /* ── SALVAR ── */
    const nomeArquivo = `Planner_Fono_${d.nome.replace(/\s+/g, '_')}_${d.ano}.pdf`;
    doc.save(nomeArquivo);

    btn.disabled = false;
    txt.textContent = '✅ PDF Gerado! Clique para gerar novamente';

  } catch (err) {
    console.error(err);
    btn.disabled = false;
    txt.textContent = '❌ Erro ao gerar PDF. Tente novamente.';
  }
}
