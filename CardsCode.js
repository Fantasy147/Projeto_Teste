import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-app.js";
import { getDatabase, ref, onValue } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-database.js";

const firebaseConfig = {
  apiKey: "SUA_API_KEY",
  authDomain: "myselflist.firebaseapp.com",
  databaseURL: "https://myselflist-default-rtdb.firebaseio.com",
  projectId: "myselflist"
};

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

// ===== ELEMENTOS DOM =====
const galeria = document.getElementById("galeria");
const paginacaoContainer = document.getElementById("paginacaoContainer");

const modal = document.getElementById("modalDetalhes");
const fecharModal = document.getElementById("fecharModal");

// 🔥 FALTAVA ISTO (ESSENCIAL)
const modalCapa = document.getElementById("modalCapa");
const modalTitulo = document.getElementById("modalTitulo");
const modalTitulo2 = document.getElementById("modalTitulo2");
const modalPais = document.getElementById("modalPais");
const modalAno = document.getElementById("modalAno");
const modalEpisodios = document.getElementById("modalEpisodios");
const modalDuracao = document.getElementById("modalDuracao");
const modalTemporadas = document.getElementById("modalTemporadas");
const modalSinopse = document.getElementById("modalSinopse");

// ===== VARIÁVEIS =====
let doramas = [];
let paginaAtual = 1;
const itensPorPagina = 12;

// ===== FUNÇÕES =====
function placeholderCover(w = 400, h = 560) {
  return "data:image/svg+xml;utf8," + encodeURIComponent(
    `<svg xmlns='http://www.w3.org/2000/svg' width='${w}' height='${h}'>
      <rect width='100%' height='100%' fill='#e5e7eb'/>
      <text x='50%' y='50%' text-anchor='middle' dominant-baseline='middle'
        fill='#6b7280' font-size='18'>Sem Capa</text>
    </svg>`
  );
}

function resolveCover(d) {
  return d.cover && d.cover.trim() !== "" ? d.cover : placeholderCover();
}

function scrollToTop() {
  const top = document.querySelector("main").offsetTop;
  window.scrollTo({ top, behavior: "smooth" });
}

// ===== RENDER =====
function renderizaPagina() {
  galeria.innerHTML = "";

  const inicio = (paginaAtual - 1) * itensPorPagina;
  const fim = inicio + itensPorPagina;

  doramas.slice(inicio, fim).forEach(d => {
    const card = document.createElement("div");
    card.className = "card";

    card.innerHTML = `
      <img class="card-img"
           src="${resolveCover(d)}"
           onerror="this.src='${placeholderCover()}'">

      <div class="card-info">
        <h3>${d.title || "Sem título"}</h3>
        <p><strong>País:</strong> ${d.country || "-"}</p>
        <p><strong>Ano:</strong> ${d.release_date || "-"}</p>
      </div>
    `;

    // 🔥 DUPLO CLIQUE
    card.addEventListener("dblclick", () => abrirModal(d));

    galeria.appendChild(card);
  });

  renderizaPaginacao();
}

// ===== PAGINAÇÃO =====
function renderizaPaginacao() {
  const total = Math.ceil(doramas.length / itensPorPagina);
  paginacaoContainer.innerHTML = "";

  const box = document.createElement("div");
  box.className = "paginacao";

  const prev = document.createElement("button");
  prev.textContent = "Anterior";
  prev.disabled = paginaAtual === 1;
  prev.onclick = () => {
    paginaAtual--;
    renderizaPagina();
    scrollToTop();
  };

  const info = document.createElement("span");
  info.className = "info";
  info.textContent = `Página ${paginaAtual} de ${total}`;

  const next = document.createElement("button");
  next.textContent = "Próximo";
  next.disabled = paginaAtual === total;
  next.onclick = () => {
    paginaAtual++;
    renderizaPagina();
    scrollToTop();
  };

  box.append(prev, info, next);
  paginacaoContainer.appendChild(box);
}

// ===== MODAL =====
function abrirModal(d) {
  modalCapa.src = resolveCover(d);
  modalTitulo.textContent = d.title || "-";
  modalTitulo2.textContent = d.title_2 || "-";
  modalPais.textContent = d.country || "-";
  modalAno.textContent = d.release_date || "-";
  modalEpisodios.textContent = d.episodes || "-";
  modalDuracao.textContent = d.duration_minutes || "-";
  modalTemporadas.textContent = d.seasons || "-";
  modalSinopse.textContent = d.synopsis || "Sem sinopse.";

  modal.style.display = "flex";
}

// ===== FECHAR MODAL =====
fecharModal.onclick = () => modal.style.display = "none";

window.onclick = e => {
  if (e.target === modal) {
    modal.style.display = "none";
  }
};

// ===== FIREBASE =====
onValue(ref(db, "tables/0/data"), snap => {
  const dados = snap.val();

  console.log("Firebase:", dados); // debug

  doramas = Object.values(dados || {});
  paginaAtual = 1;

  renderizaPagina();
});