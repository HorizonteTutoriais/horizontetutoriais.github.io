/* ============================================================
   HORIZONTE TUTORIAIS — JavaScript Principal
   ============================================================ */

document.addEventListener('DOMContentLoaded', function () {

  /* ---- Menu Mobile ---- */
  const menuToggle = document.getElementById('menu-toggle');
  const navList    = document.getElementById('nav-list');
  if (menuToggle && navList) {
    menuToggle.addEventListener('click', function () {
      navList.classList.toggle('open');
      menuToggle.setAttribute('aria-expanded',
        navList.classList.contains('open') ? 'true' : 'false');
    });
  }

  /* ---- Botão Carregar Mais ---- */
  const loadMoreBtn = document.getElementById('load-more-btn');
  const hiddenPosts = document.querySelectorAll('.app-card.hidden-post');
  if (loadMoreBtn && hiddenPosts.length > 0) {
    loadMoreBtn.addEventListener('click', function () {
      hiddenPosts.forEach(function (el) { el.classList.remove('hidden-post'); });
      loadMoreBtn.style.display = 'none';
    });
  }

  /* ---- Sistema de Comentários (Funcional) ---- */
  const commentForm = document.getElementById('comment-form');
  const commentsList = document.getElementById('comments-list');

  // Carregar comentários salvos
  function loadComments() {
    const savedComments = JSON.parse(localStorage.getItem('site_comments') || '[]');
    if (savedComments.length > 0) {
      commentsList.innerHTML = '';
      savedComments.forEach(comment => {
        addCommentToDOM(comment.name, comment.text, comment.date);
      });
    }
  }

  function addCommentToDOM(name, text, date) {
    const item = document.createElement('div');
    item.style.cssText = 'border-bottom:1px solid #eee;padding:12px 0;margin-bottom:10px;';
    item.innerHTML = `
      <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:5px;">
        <strong style="color:#1a73e8;font-size:14px;">${escapeHtml(name)}</strong>
        <span style="font-size:11px;color:#999;">${date}</span>
      </div>
      <p style="font-size:13px;color:#333;line-height:1.5;">${escapeHtml(text)}</p>
    `;
    commentsList.appendChild(item);
    const noComments = document.querySelector('.no-comments');
    if (noComments) noComments.style.display = 'none';
  }

  if (commentForm) {
    commentForm.addEventListener('submit', function (e) {
      e.preventDefault();
      const name = document.getElementById('comment-name').value.trim();
      const text = document.getElementById('comment-content').value.trim();
      const date = new Date().toLocaleDateString('pt-BR') + ' ' + new Date().toLocaleTimeString('pt-BR', {hour: '2-digit', minute:'2-digit'});

      if (name && text) {
        // Salvar no LocalStorage
        const savedComments = JSON.parse(localStorage.getItem('site_comments') || '[]');
        savedComments.push({ name, text, date });
        localStorage.setItem('site_comments', JSON.stringify(savedComments));

        // Adicionar na tela
        addCommentToDOM(name, text, date);
        commentForm.reset();
      }
    });
  }
  loadComments();

  /* ---- Smooth Scroll para âncoras ---- */
  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  /* ---- Modo Noturno (Dark Mode) ---- */
  const darkModeToggle = document.getElementById('dark-mode-toggle');
  const body = document.body;
  const currentTheme = localStorage.getItem('theme');

  if (currentTheme === 'dark') {
    body.classList.add('dark-mode');
    if (darkModeToggle) darkModeToggle.textContent = '☀️';
  }

  if (darkModeToggle) {
    darkModeToggle.addEventListener('click', function () {
      body.classList.toggle('dark-mode');
      let theme = 'light';
      if (body.classList.contains('dark-mode')) {
        theme = 'dark';
        darkModeToggle.textContent = '☀️';
      } else {
        darkModeToggle.textContent = '🌙';
      }
      localStorage.setItem('theme', theme);
    });
  }

  /* ---- Barra de Pesquisa com Redirecionamento ---- */
  const searchToggle = document.getElementById('search-toggle');
  const searchForm   = document.getElementById('search-form');
  const searchInput  = document.getElementById('search-input');

  if (searchToggle && searchForm) {
    searchToggle.addEventListener('click', function (e) {
      e.stopPropagation();
      searchForm.classList.toggle('active');
      if (searchForm.classList.contains('active')) {
        searchInput.focus();
      }
    });

    document.addEventListener('click', function (e) {
      if (!searchForm.contains(e.target) && !searchToggle.contains(e.target)) {
        searchForm.classList.remove('active');
      }
    });

    searchForm.addEventListener('click', function (e) {
      e.stopPropagation();
    });

    searchInput.addEventListener('keypress', function (e) {
      if (e.key === 'Enter') {
        e.preventDefault();
        performSearch();
      }
    });
  }

  function performSearch() {
    const searchTerm = searchInput.value.toLowerCase().trim();
    if (!searchTerm) return;

    const allApps = document.querySelectorAll('[data-app-name][data-app-url]');
    let foundApp = null;

    for (let app of allApps) {
      const appName = app.getAttribute('data-app-name').toLowerCase();
      if (appName.includes(searchTerm) || searchTerm.includes(appName)) {
        foundApp = app;
        break;
      }
    }

    if (foundApp) {
      window.location.href = foundApp.getAttribute('data-app-url');
    } else {
      alert('App não encontrado. Tente outro nome!');
    }

    searchInput.value = '';
    searchForm.classList.remove('active');
  }

  function escapeHtml(text) {
    return text
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  }

});
