import { jogosFixos, sabados } from "./dados.js";
import { db } from "./firebase.js";

import {
  collection,
  addDoc,
  onSnapshot,
  deleteDoc,
  doc
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

const agendaLista = document.getElementById("agendaLista");
const selectData = document.querySelector("select[name='data']");
const form = document.getElementById("formReserva");
const btnAdmin = document.getElementById("btnAdmin");

let admin = false;
let reservas = [];

/* ===============================
ADMIN
=============================== */
btnAdmin.addEventListener("click", () => {
  const senha = prompt("Senha admin");

  if (senha === "1234") {
    admin = true;
    alert("Modo admin ativado");
    renderAgenda();
  }
});

/* ===============================
AGENDA
=============================== */
function renderAgenda() {
  agendaLista.innerHTML = "";

  const todos = [...jogosFixos, ...reservas];

  todos.forEach(jogo => {
    const li = document.createElement("li");

    li.innerHTML = `
      <strong>${jogo.data}</strong> — ${jogo.nome || "Amistoso"}
      <br>⏰ ${jogo.horario || "-"}
      <br>📍 ${jogo.campo || "-"}
    `;

    if (admin && jogo.id) {
      const btn = document.createElement("button");
      btn.textContent = "Excluir";
      btn.onclick = () => deleteReserva(jogo.id);
      li.appendChild(btn);
    }

    agendaLista.appendChild(li);
  });
}

/* ===============================
SELECT DATAS LIVRES
=============================== */
function renderSelect() {
  selectData.innerHTML = '<option value="">Escolher data</option>';

  const ocupadas = [...jogosFixos, ...reservas].map(j => j.data);

  sabados
    .filter(d => !ocupadas.includes(d))
    .forEach(data => {
      const opt = document.createElement("option");
      opt.value = data;
      opt.textContent = data;
      selectData.appendChild(opt);
    });
}

/* ===============================
RESERVAR
=============================== */
form.addEventListener("submit", async e => {
  e.preventDefault();

  const reserva = {
    nome: form.nome.value,
    telefone: form.telefone.value,
    campo: form.campo.value,
    horario: form.horario.value,
    obs: form.obs.value,
    data: form.data.value
  };

  if (!reserva.data) return;

  await addDoc(collection(db, "reservas"), reserva);

  form.reset();
});

/* ===============================
EXCLUIR
=============================== */
async function deleteReserva(id) {
  await deleteDoc(doc(db, "reservas", id));
}

/* ===============================
OUVIR FIREBASE
=============================== */
onSnapshot(collection(db, "reservas"), snap => {
  reservas = snap.docs.map(d => ({
    id: d.id,
    ...d.data()
  }));

  renderAgenda();
  renderSelect();
});