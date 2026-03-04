/* ============================================================
   HORIZONTE TUTORIAIS — JavaScript Principal (ULTRA-ROBUSTO)
   Busca Infalível + Modo Noturno + Comentários
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

  /* ---- BUSCA ULTRA-ROBUSTA (INFALÍVEL) ---- */
  const searchInput = document.getElementById('search-input-fixed');
  const searchBtn = document.getElementById('search-submit-fixed');

  function performSearch() {
    const term = searchInput.value.toLowerCase().trim();
    
    if (!term) {
      alert('Por favor, digite algo para buscar!');
      return;
    }

    console.log('Buscando por:', term);
    let foundUrl = null;
    let foundName = null;

    // MÉTODO 1: Procurar nos dados globais APPS_DATA
    if (typeof APPS_DATA !== 'undefined' && APPS_DATA) {
      console.log('APPS_DATA encontrado, procurando...');
      
      // Procurar em aplicativos
      if (APPS_DATA.aplicativos && Array.isArray(APPS_DATA.aplicativos)) {
        for (let app of APPS_DATA.aplicativos) {
          const appName = (app.nome || '').toLowerCase();
          const appDesc = (app.descricao || '').toLowerCase();
          const appId = (app.id || '').toLowerCase();
          
          // Busca flexível: nome completo, parcial, ou primeira palavra
          if (appName.includes(term) || 
              appDesc.includes(term) || 
              appId.includes(term) ||
              term.includes(appName.split(' ')[0]) ||
              appName.includes(term.split(' ')[0])) {
            foundUrl = app.url;
            foundName = app.nome;
            console.log('Encontrado em aplicativos:', foundName);
            break;
          }
        }
      }

      // Procurar em jogos (se não encontrou em aplicativos)
      if (!foundUrl && APPS_DATA.jogos && Array.isArray(APPS_DATA.jogos)) {
        for (let game of APPS_DATA.jogos) {
          const gameName = (game.nome || '').toLowerCase();
          const gameDesc = (game.descricao || '').toLowerCase();
          const gameId = (game.id || '').toLowerCase();
          
          // Busca flexível
          if (gameName.includes(term) || 
              gameDesc.includes(term) || 
              gameId.includes(term) ||
              term.includes(gameName.split(' ')[0]) ||
              gameName.includes(term.split(' ')[0])) {
            foundUrl = game.url;
            foundName = game.nome;
            console.log('Encontrado em jogos:', foundName);
            break;
          }
        }
      }
    }

    // MÉTODO 2: Se não encontrou em APPS_DATA, procurar nos cards da página
    if (!foundUrl) {
      console.log('APPS_DATA não disponível ou não encontrou, procurando nos cards da página...');
      
      // Procurar em todos os elementos com data-app-name
      const appCards = document.querySelectorAll('[data-app-name]');
      console.log('Cards encontrados:', appCards.length);
      
      for (let card of appCards) {
        const cardName = (card.getAttribute('data-app-name') || '').toLowerCase();
        const cardDesc = (card.getAttribute('data-app-desc') || '').toLowerCase();
        const cardUrl = card.getAttribute('data-app-url');
        
        console.log('Verificando card:', cardName);
        
        // Busca flexível
        if (cardName.includes(term) || 
            cardDesc.includes(term) ||
            term.includes(cardName.split(' ')[0]) ||
            cardName.includes(term.split(' ')[0])) {
          foundUrl = cardUrl;
          foundName = cardName;
          console.log('Encontrado no card:', foundName);
          break;
        }
      }
    }

    // MÉTODO 3: Se ainda não encontrou, procurar em todos os links da página
    if (!foundUrl) {
      console.log('Procurando em todos os links da página...');
      
      const allLinks = document.querySelectorAll('a[href*="posts/"]');
      console.log('Links encontrados:', allLinks.length);
      
      for (let link of allLinks) {
        const linkText = (link.textContent || '').toLowerCase();
        const linkHref = (link.getAttribute('href') || '').toLowerCase();
        
        // Busca no texto e no href
        if (linkText.includes(term) || linkHref.includes(term)) {
          foundUrl = link.getAttribute('href');
          foundName = link.textContent;
          console.log('Encontrado no link:', foundName);
          break;
        }
      }
    }

    // RESULTADO FINAL
    if (foundUrl) {
      console.log('Redirecionando para:', foundUrl);
      window.location.href = foundUrl;
    } else {
      console.log('Nenhum resultado encontrado para:', term);
      alert(`❌ App ou jogo "${term}" não encontrado.\n\nTente:\n- "Horizon" para Horizon Clicker\n- "Resident" para Resident Evil 4\n- "Evil" para Resident Evil 4`);
    }

    searchInput.value = '';
  }

  // Ativar busca ao clicar no botão
  if (searchBtn) {
    searchBtn.addEventListener('click', performSearch);
  }

  // Ativar busca ao pressionar Enter
  if (searchInput) {
    searchInput.addEventListener('keypress', function(e) {
      if (e.key === 'Enter') {
        performSearch();
      }
    });
  }

  /* ---- Sistema de Comentários via E-mail (Formspree) ---- */
  const commentForm = document.getElementById('direct-comment-form');
  const formStatus = document.getElementById('form-status');
  const submitBtn = document.getElementById('submit-btn');

  if (commentForm) {
    commentForm.addEventListener('submit', function(e) {
      e.preventDefault();

      submitBtn.disabled = true;
      submitBtn.textContent = 'Enviando...';
      
      formStatus.className = 'form-status';
      formStatus.textContent = '';

      const formData = new FormData(commentForm);
      
      fetch(commentForm.action, {
        method: 'POST',
        body: formData,
        headers: {
          'Accept': 'application/json'
        }
      })
      .then(response => {
        if (response.ok) {
          formStatus.className = 'form-status success';
          formStatus.textContent = '✅ Comentário enviado com sucesso! Obrigado pela mensagem.';
          commentForm.reset();
          submitBtn.textContent = 'Enviar Comentário';
          submitBtn.disabled = false;
        } else {
          formStatus.className = 'form-status error';
          formStatus.textContent = '❌ Erro ao enviar comentário. Tente novamente.';
          submitBtn.textContent = 'Enviar Comentário';
          submitBtn.disabled = false;
        }
      })
      .catch(error => {
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

});
