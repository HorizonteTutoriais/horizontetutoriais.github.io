/* ============================================================
   HORIZONTE TUTORIAIS — JavaScript Principal (VERSÃO FINAL)
   Modo Noturno com Forçamento Agressivo
   ============================================================ */

document.addEventListener('DOMContentLoaded', function () {

  /* ---- Modo Noturno (Dark Mode) com Forçamento Agressivo ---- */
  const darkModeToggle = document.getElementById('dark-mode-toggle');
  const body = document.body;

  // Função para aplicar tema a todos os elementos
  function applyThemeToAllElements(isDark) {
    // Aplicar ao body
    if (isDark) {
      body.classList.add('dark-mode');
      body.style.backgroundColor = '#0a0a0a';
      body.style.color = '#e0e0e0';
    } else {
      body.classList.remove('dark-mode');
      body.style.backgroundColor = '#f5f5f5';
      body.style.color = '#222';
    }

    // Forçar tema em todos os elementos de texto
    const allElements = document.querySelectorAll('*');
    allElements.forEach(el => {
      if (isDark) {
        // Forçar cores claras em textos
        if (el.tagName === 'P' || el.tagName === 'LI' || el.tagName === 'SPAN' || 
            el.tagName === 'DIV' || el.tagName === 'TD' || el.tagName === 'TH' ||
            el.tagName === 'H1' || el.tagName === 'H2' || el.tagName === 'H3') {
          
          const computedStyle = window.getComputedStyle(el);
          const currentColor = computedStyle.color;
          
          // Se a cor for muito escura (próxima ao preto), mudar para clara
          if (currentColor === 'rgb(51, 51, 51)' || currentColor === 'rgb(34, 34, 34)' || 
              currentColor === 'rgb(0, 0, 0)' || currentColor === 'rgb(85, 85, 85)') {
            el.style.color = '#e0e0e0 !important';
          }
        }

        // Forçar fundos escuros em containers
        if (el.classList.contains('comments-section') || 
            el.classList.contains('popular-section') ||
            el.classList.contains('post-body') ||
            el.classList.contains('info-table') ||
            el.classList.contains('download-box')) {
          el.style.backgroundColor = '#1e1e1e !important';
          el.style.color = '#e0e0e0 !important';
        }

        // Forçar cor em inputs e textareas
        if (el.tagName === 'TEXTAREA' || el.tagName === 'INPUT') {
          el.style.backgroundColor = '#252525 !important';
          el.style.color = '#e0e0e0 !important';
          el.style.borderColor = '#444 !important';
        }
      }
    });

    // Aplicar a iframes (Cusdis)
    applyDarkModeToIframes(isDark);
  }

  // Aplicar tema salvo ao carregar a página
  if (localStorage.getItem('theme') === 'dark') {
    applyThemeToAllElements(true);
    if (darkModeToggle) darkModeToggle.textContent = '☀️';
  }

  // Adicionar listener ao botão de toggle
  if (darkModeToggle) {
    darkModeToggle.addEventListener('click', function () {
      const isDark = !body.classList.contains('dark-mode');
      applyThemeToAllElements(isDark);
      darkModeToggle.textContent = isDark ? '☀️' : '🌙';
      localStorage.setItem('theme', isDark ? 'dark' : 'light');
    });
  }

  /* ---- Aplicar Modo Noturno a Iframes (Cusdis) ---- */
  function applyDarkModeToIframes(isDark) {
    const iframes = document.querySelectorAll('iframe');
    
    iframes.forEach(iframe => {
      try {
        const doc = iframe.contentDocument || iframe.contentWindow.document;
        if (doc) {
          if (isDark) {
            doc.body.style.backgroundColor = '#1e1e1e !important';
            doc.body.style.color = '#e0e0e0 !important';
            
            // Forçar cores em todos os elementos dentro do iframe
            const allIframeElements = doc.querySelectorAll('*');
            allIframeElements.forEach(el => {
              el.style.backgroundColor = '#1e1e1e !important';
              el.style.color = '#e0e0e0 !important';
              el.style.borderColor = '#333 !important';
            });
          } else {
            doc.body.style.backgroundColor = '#fff !important';
            doc.body.style.color = '#333 !important';
            
            // Restaurar cores claras
            const allIframeElements = doc.querySelectorAll('*');
            allIframeElements.forEach(el => {
              el.style.backgroundColor = '#fff !important';
              el.style.color = '#333 !important';
              el.style.borderColor = '#ddd !important';
            });
          }
        }
      } catch (e) {
        // Iframes de origem diferente não podem ser acessados
      }
    });
  }

  /* ---- Barra de Pesquisa (Sempre Visível) ---- */
  const searchInput = document.getElementById('search-input-fixed');
  const searchBtn = document.getElementById('search-submit-fixed');

  function performSearch() {
    const term = searchInput.value.toLowerCase().trim();
    if (!term) return;

    // Procura o app nos cards e redireciona
    const apps = document.querySelectorAll('[data-app-name]');
    let foundUrl = null;

    for (let app of apps) {
      const appName = app.getAttribute('data-app-name').toLowerCase();
      if (appName.includes(term) || term.includes(appName)) {
        foundUrl = app.getAttribute('data-app-url');
        break;
      }
    }

    if (foundUrl) {
      window.location.href = foundUrl;
    } else {
      alert('App não encontrado. Tente outro nome!');
    }
    searchInput.value = '';
  }

  if (searchBtn) searchBtn.onclick = performSearch;
  if (searchInput) {
    searchInput.onkeypress = function(e) {
      if (e.key === 'Enter') performSearch();
    };
  }

  /* ---- Sistema de Comentários via E-mail (Formspree) ---- */
  const commentForm = document.getElementById('direct-comment-form');
  const formStatus = document.getElementById('form-status');
  const submitBtn = document.getElementById('submit-btn');

  if (commentForm) {
    commentForm.addEventListener('submit', function(e) {
      e.preventDefault();

      // Desabilita o botão durante o envio
      submitBtn.disabled = true;
      submitBtn.textContent = 'Enviando...';
      
      // Limpa mensagens anteriores
      formStatus.className = 'form-status';
      formStatus.textContent = '';

      // Coleta os dados do formulário
      const formData = new FormData(commentForm);
      
      // Envia os dados via Formspree
      fetch(commentForm.action, {
        method: 'POST',
        body: formData,
        headers: {
          'Accept': 'application/json'
        }
      })
      .then(response => {
        if (response.ok) {
          // Sucesso
          formStatus.className = 'form-status success';
          formStatus.textContent = '✅ Comentário enviado com sucesso! Obrigado pela mensagem.';
          commentForm.reset();
          submitBtn.textContent = 'Enviar Comentário';
          submitBtn.disabled = false;
        } else {
          // Erro na resposta
          formStatus.className = 'form-status error';
          formStatus.textContent = '❌ Erro ao enviar comentário. Tente novamente.';
          submitBtn.textContent = 'Enviar Comentário';
          submitBtn.disabled = false;
        }
      })
      .catch(error => {
        // Erro na requisição
        console.error('Erro:', error);
        formStatus.className = 'form-status error';
        formStatus.textContent = '❌ Erro de conexão. Verifique sua internet e tente novamente.';
        submitBtn.textContent = 'Enviar Comentário';
        submitBtn.disabled = false;
      });
    });
  }

  /* ---- Botão Carregar Mais ---- */
  const loadMoreBtn = document.getElementById('load-more-btn');
  const hiddenPosts = document.querySelectorAll('.app-card.hidden-post');
  if (loadMoreBtn && hiddenPosts.length > 0) {
    loadMoreBtn.addEventListener('click', function () {
      hiddenPosts.forEach(el => el.classList.remove('hidden-post'));
      loadMoreBtn.style.display = 'none';
    });
  }

  /* ---- Observador de Mutações para Aplicar Tema a Novos Elementos ---- */
  const observer = new MutationObserver(function(mutations) {
    if (body.classList.contains('dark-mode')) {
      mutations.forEach(function(mutation) {
        if (mutation.addedNodes.length) {
          mutation.addedNodes.forEach(function(node) {
            if (node.nodeType === 1) { // Element node
              // Aplicar tema ao novo elemento
              if (node.tagName === 'TEXTAREA' || node.tagName === 'INPUT') {
                node.style.backgroundColor = '#252525 !important';
                node.style.color = '#e0e0e0 !important';
                node.style.borderColor = '#444 !important';
              }
              
              // Aplicar a filhos também
              const inputs = node.querySelectorAll('textarea, input');
              inputs.forEach(input => {
                input.style.backgroundColor = '#252525 !important';
                input.style.color = '#e0e0e0 !important';
                input.style.borderColor = '#444 !important';
              });
            }
          });
        }
      });
    }
  });

  // Iniciar observador
  observer.observe(document.body, {
    childList: true,
    subtree: true
  });

  /* ---- Reforçar Tema ao Carregar Página Completa ---- */
  window.addEventListener('load', function() {
    if (body.classList.contains('dark-mode')) {
      applyThemeToAllElements(true);
    }
  });

  /* ---- Reforçar Tema Periodicamente ---- */
  setInterval(function() {
    if (body.classList.contains('dark-mode')) {
      // Forçar cores em tabelas e elementos críticos
      const tables = document.querySelectorAll('.info-table td, .info-table th');
      tables.forEach(td => {
        td.style.color = '#e0e0e0 !important';
        td.style.backgroundColor = '#252525 !important';
        td.style.borderColor = '#333 !important';
      });

      // Forçar cores em comentários
      const comments = document.querySelectorAll('.comments-section, .comment-form, #cusdis_thread');
      comments.forEach(comment => {
        comment.style.backgroundColor = '#1e1e1e !important';
        comment.style.color = '#e0e0e0 !important';
      });

      // Forçar cores em post-body
      const postBodies = document.querySelectorAll('.post-body');
      postBodies.forEach(body => {
        body.style.color = '#e0e0e0 !important';
      });

      // Forçar cores em inputs
      const inputs = document.querySelectorAll('textarea, input[type="text"], input[type="email"]');
      inputs.forEach(input => {
        input.style.backgroundColor = '#252525 !important';
        input.style.color = '#e0e0e0 !important';
        input.style.borderColor = '#444 !important';
      });
    }
  }, 1000);

});
