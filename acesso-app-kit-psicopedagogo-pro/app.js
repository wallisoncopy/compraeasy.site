// App 100% estático (GitHub Pages). Edite seus links abaixo:
const CONFIG = {
  kitLink: "https://drive.google.com/drive/folders/1iidCfN3RWrVsB1MMydyre_tKfXCI9otT?usp=sharing",
  whatsappLink: "https://chat.whatsapp.com/KoWjKoLz3w24x3AXyqeT0q",
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
    name: "+Leads no zap + Lucro!",
    desc: "Consultoria individual para lotar seu Whatsapp e não depender de ficar postando conteúdo todos os dias nas redes sociais.",
    oldPrice: "R$ 377,90",
    discount: "+de 100%",
    price: "R$ 97,00",
    link: "https://pay.lowify.com.br/checkout?product_id=3wDCRR"
  },
  {
    name: "Guia com Atividades para Adolescentes com Dislexia",
    desc: "Roteiros e atividades práticas focadas em intervenção com adolescentes com dislexia.",
    oldPrice: "R$ 97,90",
    discount: "57%",
    price: "R$ 9,90",
    link: "https://pay.lowify.com.br/checkout?product_id=3Aa1Uq"
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

const TITLES = { home: "INÍCIO", aulas: "AULAS", kits: "KIT", mais: "MAIS", ajuda: "AJUDA", chat: "ASSISTENTE IA" };

// ─── CHAT IA ────────────────────────────────────────────────────────────────
const GEMINI_API_KEY = "AIzaSyCVUZwc8lC_NDqWCLS7JewtzmTZcpsm8h0";

const SYSTEM_PROMPT = `Você é o Assistente Virtual do Kit Psicopedagogo Pro, um app exclusivo para psicopedagogas e profissionais da educação especial.

SOBRE O KIT PSICOPEDAGOGO PRO:
- Produto digital com acesso vitalício (pagamento único)
- Atualizações semanais com novos materiais
- Criado para psicopedagogas atenderem com mais segurança, clareza e excelência profissional

O QUE ESTÁ INCLUÍDO:
1. KIT DE MATERIAIS COMPLETO: Uma pasta no Google Drive com todos os materiais editáveis e sem logomarca, acessível pelo botão "Abrir Kit Completo" na aba Kit ou Início
2. AULAS EM VÍDEO: Curadoria de vídeos práticos sobre como realizar atendimentos psicopedagógicos, estruturar sessões e conduzir o processo com segurança
3. TESTE RÁPIDO ONLINE: Ferramenta para aplicar avaliações de leitura, fonologia, atenção, TEA e TDAH diretamente pelo app, acessível pelo botão "Abrir Teste Rápido" na aba Início
4. SUPORTE: Suporte via WhatsApp disponível na aba Ajuda

ABAS DO APP:
- Início: Boas-vindas, acesso rápido ao Kit, Teste Rápido e suporte WhatsApp
- Aulas: Vídeos curados sobre atendimento psicopedagógico
- Kit: Link único para todos os materiais no Google Drive
- Mais: Produtos complementares com desconto (guias extras, consultoria, planner)
- Ajuda: Suporte via WhatsApp e em breve Fórum de Alunas
- IA: Este chat de suporte inteligente

PRODUTOS EXTRAS DISPONÍVEIS (aba Mais):
- Consultoria "+Leads no zap + Lucro!" (R$ 97,00 - como lotar o WhatsApp sem postar todo dia)
- Guia de Atividades para Adolescentes com Dislexia (R$ 9,90)
- Planner Psicopedagógico 2026 (R$ 9,90)

REGRAS DE COMPORTAMENTO:
- Responda SOMENTE perguntas relacionadas ao app, ao kit psicopedagógico ou à área de psicopedagogia
- Seja acolhedora, empática e profissional — o público é de psicopedagogas
- Respostas curtas e objetivas (máximo 3-4 parágrafos)
- Se a pergunta for sobre algo não relacionado ao app, redirecione gentilmente
- Nunca invente funcionalidades que não existem
- Se não souber algo específico, indique o suporte via WhatsApp
- Responda sempre em português do Brasil`;

let chatHistory = [];
let chatInitialized = false;

function renderChatMessage(role, text) {
  const wrap = document.getElementById("chatMessages");
  if (!wrap) return;

  const isUser = role === "user";
  const div = document.createElement("div");
  div.className = `flex ${isUser ? "justify-end" : "justify-start"} animate-slideIn`;

  const bubble = document.createElement("div");
  bubble.className = isUser
    ? "max-w-[80%] bg-emerald-600 text-white rounded-3xl rounded-br-lg px-4 py-3 text-sm"
    : "max-w-[85%] bg-white border border-emerald-100 text-slate-800 rounded-3xl rounded-bl-lg px-4 py-3 text-sm neo-shadow";

  bubble.innerHTML = text.replace(/\n/g, "<br>");
  div.appendChild(bubble);
  wrap.appendChild(div);
  wrap.scrollTop = wrap.scrollHeight;
}

function showChatTyping() {
  const wrap = document.getElementById("chatMessages");
  if (!wrap) return;
  const div = document.createElement("div");
  div.id = "chat-typing";
  div.className = "flex justify-start animate-slideIn";
  div.innerHTML = `<div class="bg-white border border-emerald-100 rounded-3xl rounded-bl-lg px-4 py-3 neo-shadow flex gap-1 items-center">
    <span class="h-2 w-2 rounded-full bg-emerald-400" style="animation:bounce 1s infinite 0s"></span>
    <span class="h-2 w-2 rounded-full bg-emerald-400" style="animation:bounce 1s infinite 0.2s"></span>
    <span class="h-2 w-2 rounded-full bg-emerald-400" style="animation:bounce 1s infinite 0.4s"></span>
  </div>`;
  wrap.appendChild(div);
  wrap.scrollTop = wrap.scrollHeight;
}

function removeChatTyping() {
  const t = document.getElementById("chat-typing");
  if (t) t.remove();
}

function initChat() {
  if (chatInitialized) return;
  chatInitialized = true;
  chatHistory = [];
  renderChatMessage("model", "Olá! 👋 Sou o Assistente do Kit Psicopedagogo Pro.\n\nPode me perguntar qualquer coisa sobre o app, os materiais ou como funciona o kit! 😊");
}

async function sendChatMessage() {
  const input = document.getElementById("chatInput");
  const btn = document.getElementById("chatSendBtn");
  if (!input) return;

  const text = input.value.trim();
  if (!text) return;

  input.value = "";
  input.disabled = true;
  btn.disabled = true;

  renderChatMessage("user", text);
  chatHistory.push({ role: "user", parts: [{ text }] });

  showChatTyping();

  try {
    const body = {
      system_instruction: { parts: [{ text: SYSTEM_PROMPT }] },
      contents: chatHistory,
      generationConfig: { temperature: 0.7, maxOutputTokens: 500 }
    };

    const res = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${GEMINI_API_KEY}`,
      { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(body) }
    );

    const data = await res.json();
    const reply = data?.candidates?.[0]?.content?.parts?.[0]?.text
      || "Desculpe, não consegui processar sua mensagem. Tente novamente ou fale com o suporte via WhatsApp.";

    chatHistory.push({ role: "model", parts: [{ text: reply }] });
    removeChatTyping();
    renderChatMessage("model", reply);
  } catch (e) {
    removeChatTyping();
    renderChatMessage("model", "Ops! Ocorreu um erro de conexão. Verifique sua internet e tente novamente. 🙏");
  }

  input.disabled = false;
  btn.disabled = false;
  input.focus();
}

window.sendChatMessage = sendChatMessage;

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
  const views = ["home","aulas","kits","mais","ajuda","chat"];
  views.forEach(k => {
    const sec = document.getElementById("view-" + k);
    if (!sec) return;
    if (k === tab) {
      sec.classList.remove("hidden");
      sec.style.display = "";
    } else {
      sec.classList.add("hidden");
      sec.style.display = "none";
    }
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
  if (tab === "chat") initChat();
}

function init() {
  setLinks();

  document.querySelectorAll(".tab-btn").forEach(btn => {
    btn.addEventListener("click", () => setTab(btn.getAttribute("data-tab")));
  });

  setTab("home");
}

init();
