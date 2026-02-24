/* ============================================================
   HORIZONTE TUTORIAIS — JavaScript Principal (INFALÍVEL)
   ============================================================ */

document.addEventListener('DOMContentLoaded', function () {

  /* ---- Modo Noturno (Dark Mode) ---- */
  const darkModeToggle = document.getElementById('dark-mode-toggle');
  const body = document.body;

  if (localStorage.getItem('theme') === 'dark') {
    body.classList.add('dark-mode');
    if (darkModeToggle) darkModeToggle.textContent = '☀️';
  }

  if (darkModeToggle) {
    darkModeToggle.addEventListener('click', function () {
      body.classList.toggle('dark-mode');
      const isDark = body.classList.contains('dark-mode');
      darkModeToggle.textContent = isDark ? '☀️' : '🌙';
      localStorage.setItem('theme', isDark ? 'dark' : 'light');
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

  /* ---- Sistema de Comentários via WhatsApp ---- */
  const commentForm = document.getElementById('direct-comment-form');
  if (commentForm) {
    commentForm.onsubmit = function(e) {
      e.preventDefault();
      const name = document.getElementById('user-name').value;
      const comment = document.getElementById('user-comment').value;
      
      // Formata a mensagem para o WhatsApp
      const message = `Olá! Novo comentário no site Horizonte Tutoriais:\n\n*Nome:* ${name}\n*Comentário:* ${comment}`;
      const encodedMessage = encodeURIComponent(message);
      
      // Substitua pelo seu número de WhatsApp (com código do país e DDD)
      const whatsappNumber = "5500000000000"; 
      
      // Abre o WhatsApp com a mensagem pronta
      window.open(`https://wa.me/${whatsappNumber}?text=${encodedMessage}`, '_blank');
      
      alert('Obrigado! Seu comentário foi preparado para envio via WhatsApp.');
      commentForm.reset();
    };
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

});
