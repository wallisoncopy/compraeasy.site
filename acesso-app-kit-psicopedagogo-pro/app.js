// App 100% estático (GitHub Pages). Edite seus links abaixo:
const CONFIG = {
  kitLink: "https://drive.google.com/drive/folders/1iidCfN3RWrVsB1MMydyre_tKfXCI9otT?usp=sharing",
  whatsappLink: "https://wa.me/55SEUNUMEROAQUI?text=Ol%C3%A1!%20Preciso%20de%20ajuda%20no%20App%20Kit%20Psicopedagogo%20Pro.",
};

// 5 vídeos (você pode trocar depois)
const VIDEOS = [
  { title: "Como fazer o primeiro atendimento psicopedagógico", desc: "O que organizar e como conduzir o primeiro contato com segurança.", url: "https://www.youtube.com/watch?v=2cM969PNKyo" },
  { title: "Como se preparar para a primeira sessão psicopedagógica", desc: "Checklist mental e prático para começar sem travar.", url: "https://www.youtube.com/watch?v=x285-gjW8O8" },
  { title: "Como iniciar o atendimento Psicopedagógico (Parte 1)", desc: "Passos iniciais e organização do processo de atendimento.", url: "https://www.youtube.com/watch?v=OWzZ0gGPNAs" },
  { title: "Passo a passo do atendimento psicopedagógico em 10 sessões", desc: "Visão geral de estrutura por sessão para clareza na condução.", url: "https://www.youtube.com/watch?v=ZGY7Cp2Px6Y" },
  { title: "Como organizar sua sessão psicopedagógica", desc: "Organização prática para reduzir improviso e aumentar confiança.", url: "https://www.youtube.com/watch?v=aWR73GExmmA" },
];

// 3 ofertas (upsell)
const UPSELLS = [
  {
    name: "A Sessão Termina, Mas a Intervenção Não",
    desc: "Guia prático com orientações e atividades para dar continuidade à intervenção após a sessão.",
    oldPrice: "R$ 27,90",
    discount: "36%",
    price: "R$ 17,90",
    link: "#"
  },
  {
    name: "Guia com Atividades para Adolescentes com Dislexia",
    desc: "Roteiros e atividades práticas focadas em intervenção com adolescentes com dislexia.",
    oldPrice: "R$ 29,90",
    discount: "57%",
    price: "R$ 12,90",
    link: "#"
  },
  {
    name: "Planner Psicopedagógico 2026",
    desc: "Organize seu Ano de 2026 com clareza.",
    oldPrice: "R$ 79,90",
    discount: "63%",
    price: "R$ 9,90",
    link: "https://pay.lowify.com.br/checkout?product_id=zru8Ym"
  },
];

const TITLES = { home: "INÍCIO", aulas: "AULAS", kits: "KIT", mais: "MAIS", ajuda: "AJUDA" };

function el(html) {
  const t = document.createElement("template");
  t.innerHTML = html.trim();
  return t.content.firstChild;
}

function setLinks() {
  const kitA = document.getElementById("kitLink");
  const kitHome = document.getElementById("kitLinkHome");
  if (kitA) kitA.href = CONFIG.kitLink;
  if (kitHome) kitHome.href = CONFIG.kitLink;

  const w1 = document.getElementById("whatsLink");
  const w2 = document.getElementById("whatsHome");
  if (w1) w1.href = CONFIG.whatsappLink;
  if (w2) w2.href = CONFIG.whatsappLink;
}

function renderVideos() {
  const wrap = document.getElementById("videosList");
  if (!wrap) return;
  wrap.innerHTML = "";
  VIDEOS.forEach(v => {
    wrap.appendChild(el(`
      <div class="bg-white border border-emerald-100 rounded-3xl p-4 neo-shadow">
        <div class="text-sm font-extrabold">${v.title}</div>
        <div class="text-sm text-slate-600 mt-1">${v.desc}</div>
        <a href="${v.url}" target="_blank" rel="noopener"
           class="mt-3 inline-flex items-center gap-2 text-emerald-700 font-extrabold">
          Assistir no YouTube <span class="text-sm">↗</span>
        </a>
      </div>
    `));
  });
}

function renderUpsells() {
  const wrap = document.getElementById("upsellsList");
  if (!wrap) return;
  wrap.innerHTML = "";
  UPSELLS.forEach(u => {
    wrap.appendChild(el(`
      <div class="bg-white border border-emerald-100 rounded-3xl p-4 neo-shadow">
        <div class="text-base font-extrabold">${u.name}</div>
        <div class="text-sm text-slate-600 mt-1">${u.desc}</div>

        <div class="mt-3 flex items-center gap-2">
          <span class="text-sm text-slate-400 line-through">${u.oldPrice}</span>
          <span class="text-xs font-extrabold px-2 py-1 rounded-full bg-emerald-50 border border-emerald-100 text-emerald-800">${u.discount} OFF</span>
        </div>

        <div class="mt-1 text-2xl font-extrabold text-emerald-700">${u.price}</div>

        <a href="${u.link}" target="_blank" rel="noopener"
           class="mt-3 w-full inline-flex items-center justify-center px-4 py-3 rounded-2xl bg-emerald-600 text-white font-extrabold active:scale-[0.98] transition"
           onclick="console.log('Upsell:', '${u.name}')">
          Adicionar produto
        </a>
      </div>
    `));
  });
}

function setTab(tab) {
  const views = ["home","aulas","kits","mais","ajuda"];
  views.forEach(k => {
    const sec = document.getElementById("view-" + k);
    if (!sec) return;
    if (k === tab) sec.classList.remove("hidden");
    else sec.classList.add("hidden");
  });

  const top = document.getElementById("topTitle");
  if (top) top.textContent = TITLES[tab] || "INÍCIO";

  document.querySelectorAll(".tab-btn").forEach(btn => {
    const active = btn.getAttribute("data-tab") === tab;
    btn.classList.toggle("tab-active", active);
    btn.classList.toggle("tab-inactive", !active);
  });

  if (tab === "aulas") renderVideos();
  if (tab === "mais") renderUpsells();
}

function init() {
  setLinks();

  document.querySelectorAll(".tab-btn").forEach(btn => {
    btn.addEventListener("click", () => setTab(btn.getAttribute("data-tab")));
  });

  setTab("home");
}

init();
