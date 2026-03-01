here/* ============================================================
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

  /* ---- Formulário de Comentário ---- */
  const commentForm = document.getElementById('comment-form');
  if (commentForm) {
    commentForm.addEventListener('submit', function (e) {
      e.preventDefault();
      const name    = document.getElementById('comment-name').value.trim();
      const content = document.getElementById('comment-content').value.trim();
      if (!name || !content) {
        alert('Por favor, preencha seu nome e o comentário.');
        return;
      }
      const list = document.getElementById('comments-list');
      const item = document.createElement('div');
      item.style.cssText = 'border-top:1px solid #eee;padding:10px 0;';
      item.innerHTML = '<strong style="color:#1a73e8">' + escapeHtml(name) + '</strong>'
        + '<span style="font-size:11px;color:#999;margin-left:8px">' + new Date().toLocaleDateString('pt-BR') + '</span>'
        + '<p style="margin-top:4px;font-size:13px">' + escapeHtml(content) + '</p>';
      list.appendChild(item);
      commentForm.reset();
      const noComments = document.querySelector('.no-comments');
      if (noComments) noComments.style.display = 'none';
    });
  }

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

  /* ---- Destaque do link ativo na nav ---- */
  const currentPath = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-list a').forEach(function (link) {
    const href = link.getAttribute('href');
    if (href === currentPath || (currentPath === '' && href === 'index.html')) {
      link.classList.add('active');
    }
  });

  /* ---- Botão de Download (simulado) ---- */
  document.querySelectorAll('.btn-big-download').forEach(function (btn) {
    btn.addEventListener('click', function (e) {
      e.preventDefault();
      const originalText = btn.textContent;
      btn.textContent = '⏳ Preparando download...';
      btn.style.background = '#f57c00';
      setTimeout(function () {
        btn.textContent = '✅ Download iniciado!';
        btn.style.background = '#2e7d32';
        setTimeout(function () {
          btn.textContent = originalText;
          btn.style.background = '';
        }, 3000);
      }, 1500);
    });
  });

  /* ---- Utilitário: escapar HTML ---- */
  function escapeHtml(text) {
    return text
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  }

});
