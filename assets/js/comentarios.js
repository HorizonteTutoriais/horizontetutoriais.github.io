import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getFirestore, collection, addDoc, query, where, orderBy, onSnapshot, serverTimestamp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";
import { getAuth, signInWithPopup, GoogleAuthProvider, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

// CONFIGURAÇÃO DO USUÁRIO (COLE SUAS CHAVES AQUI)
const firebaseConfig = {
    apiKey: "AIzaSyAOr7R2x1mxjmvGb0nW3vq59yvYt5oRk-Y",
    authDomain: "horizonte-comentarios.firebaseapp.com",
    projectId: "horizonte-comentarios",
    storageBucket: "horizonte-comentarios.firebasestorage.app",
    messagingSenderId: "841275597135",
    appId: "1:841275597135:web:a5f7b3d51d9bf72fb3a53a"
};

// CONFIGURAÇÕES DE MODO
const CONFIG_MODO_VISITANTE = true; // true = permite comentar sem login
const CONFIG_PRECISA_APROVAR = true; // true = comentários só aparecem após aprovação

// Inicializar Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

let usuarioLogado = null;

// Elementos da Interface
const container = document.getElementById('secao-comentarios');
if (container) {
    renderizarInterface();
}

function renderizarInterface() {
    container.innerHTML = `
        <div class="coment-header">
            <i class="fas fa-comments"></i> COMENTÁRIOS
        </div>
        
        <div id="coment-login-area"></div>
        
        <div class="coment-form">
            <div class="coment-row input-visitante" id="area-nome-visitante">
                <input type="text" id="coment-nome" class="coment-input" placeholder="Seu Nome">
                <input type="email" id="coment-email" class="coment-input" placeholder="E-mail (opcional)">
            </div>
            <textarea id="coment-texto" class="coment-input coment-textarea" placeholder="Escreva aqui sua opinião..."></textarea>
            <div class="coment-actions">
                <div id="status-envio" class="msg-status"></div>
                <button id="btn-enviar-comentario" class="btn-comentar">Comentário</button>
            </div>
        </div>

        <div id="lista-comentarios" class="lista-comentarios">
            <p style="text-align:center; font-size:12px; color:#888;">Carregando comentários...</p>
        </div>
    `;

    document.getElementById('btn-enviar-comentario').addEventListener('click', enviarComentario);
    
    // Gerenciar Login
    onAuthStateChanged(auth, (user) => {
        usuarioLogado = user;
        const loginArea = document.getElementById('coment-login-area');
        const areaNome = document.getElementById('area-nome-visitante');
        
        if (user) {
            loginArea.innerHTML = `<p style="font-size:12px; margin-bottom:10px;">Logado como: <b>${user.displayName}</b> | <a href="#" id="btn-logout" style="color:var(--coment-orange)">Sair</a></p>`;
            areaNome.style.display = 'none';
            document.getElementById('btn-logout').onclick = () => signOut(auth);
        } else {
            if (CONFIG_MODO_VISITANTE) {
                loginArea.innerHTML = `<button id="btn-login-google" class="btn-visitante"><i class="fab fa-google"></i> Fazer Login com Google</button>`;
                areaNome.style.display = 'flex';
                document.getElementById('btn-login-google').onclick = () => signInWithPopup(auth, provider);
            } else {
                loginArea.innerHTML = `<button id="btn-login-google" class="btn-comentar" style="width:100%"><i class="fab fa-google"></i> Login obrigatório para comentar</button>`;
                areaNome.style.display = 'none';
                document.getElementById('btn-login-google').onclick = () => signInWithPopup(auth, provider);
            }
        }
    });

    carregarComentarios();
}

async function enviarComentario() {
    const texto = document.getElementById('coment-texto').value.trim();
    const status = document.getElementById('status-envio');
    
    let nome = "";
    let email = "";

    if (usuarioLogado) {
        nome = usuarioLogado.displayName;
        email = usuarioLogado.email;
    } else {
        if (!CONFIG_MODO_VISITANTE) {
            alert("Você precisa fazer login para comentar.");
            return;
        }
        nome = document.getElementById('coment-nome').value.trim() || "Visitante";
        email = document.getElementById('coment-email').value.trim();
    }

    if (!texto) {
        alert("Por favor, escreva um comentário.");
        return;
    }

    try {
        status.innerText = "Enviando...";
        await addDoc(collection(db, "comentarios"), {
            nome: nome,
            email: email,
            texto: texto,
            aprovado: !CONFIG_PRECISA_APROVAR, // Se não precisa aprovar, já nasce true
            data: serverTimestamp(),
            pagina: window.location.pathname + window.location.search,
            foto: usuarioLogado ? usuarioLogado.photoURL : null
        });

        document.getElementById('coment-texto').value = "";
        status.innerText = CONFIG_PRECISA_APROVAR ? "Aguardando aprovação do moderador..." : "Enviado com sucesso!";
        setTimeout(() => status.innerText = "", 5000);
    } catch (e) {
        console.error("Erro ao enviar:", e);
        status.innerText = "Erro ao enviar. Tente novamente.";
    }
}

function carregarComentarios() {
    const lista = document.getElementById('lista-comentarios');
    const q = query(
        collection(db, "comentarios"), 
        where("aprovado", "==", true),
        where("pagina", "==", window.location.pathname + window.location.search),
        orderBy("data", "desc")
    );

    onSnapshot(q, (snapshot) => {
        if (snapshot.empty) {
            lista.innerHTML = '<p style="text-align:center; font-size:12px; color:#888;">Nenhum comentário ainda. Seja o primeiro!</p>';
            return;
        }

        lista.innerHTML = "";
        snapshot.forEach((doc) => {
            const dados = doc.data();
            const dataFormatada = dados.data ? new Date(dados.data.seconds * 1000).toLocaleString('pt-BR') : "Agora mesmo";
            
            const item = document.createElement('div');
            item.className = 'item-comentario';
            item.innerHTML = `
                <div class="coment-meta">
                    <span class="coment-autor">${dados.nome}</span>
                    <span>${dataFormatada}</span>
                </div>
                <div class="coment-texto">${dados.texto}</div>
                ${dados.resposta ? `<div class="coment-resposta"><b>Resposta:</b> ${dados.resposta}</div>` : ""}
            `;
            lista.appendChild(item);
        });
    });
}
