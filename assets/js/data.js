const items = [
    {
    "id": "playhop.com/pt-1",
    "nome": "Playhop",
    "tipo": "Postagem",
    "descricao": "desfrute do melhor site de jogos online grátis.",
    "imagem": "https://i.postimg.cc/KcDK5qhQ/Screenshot_20260327_214145.png",
    "data": "2026-03-31",
    "download": "https://playhop.com/pt",
    "downloads": null,
    "guia_link": "https://www.mediafire.com/file/167s9wmknmffs7l/Guia_Playhop.zip/file",
    "tutorial": "https://www.youtube.com/embed/31zDng73TsQ?si=nXH-6e8j97c_pSGQ",
    "especificacoes": {
        "versao": "Não se aplica",
        "tamanho": "Não se aplica",
        "android": "qualquer Android com o navegador atualizado.",
        "desenvolvedora": "Horizonte Tutoriais"
    },
    "exibir": {
        "emDestaques": true,
        "emPopulares": true,
        "emQuente": true,
        "emAplicativos": false,
        "emJogos": true,
        "emTutoriais": true,
        "emFerramentas": false,
        "emPostagens": true
    }
},
    {
    "id": "Horizon Clicker-1",
    "nome": "Horizon Clicker",
    "tipo": "Aplicativo",
    "descricao": "Horizon Clicker é um app que automatiza cliques e tarefas repetitivas no celular.",
    "imagem": "https://i.postimg.cc/DfRPQrFz/horizon_icon.png",
    "data": "2026-03-27",
    "download": "https://4br.me/BaixarHorizonClicker",
    "downloads": null,
    "guia_link": "https://4br.me/BaixarGuiaHorizonCliker",
    "tutorial": "https://www.youtube.com/embed/videoseries?list=PL6qi2hUjNC8qMkMyAxQOcpmJAnhhi12rS&si=NX_DmsbUb2dwqooV",
    "especificacoes": {
        "versao": "1.0",
        "tamanho": "20Mb",
        "android": "4.0",
        "desenvolvedora": "Horizonte Tutoriais"
    },
    "exibir": {
        "emDestaques": true,
        "emPopulares": true,
        "emQuente": true,
        "emAplicativos": true,
        "emJogos": false,
        "emPostagens": false,
        "emTutoriais": true,
        "emFerramentas": false
    }
},
    {
    "id": "re4-1",
    "nome": "Resident Evil 4",
    "tipo": "Jogo",
    "descricao": "Prepare-se para o terror. Confira o tutorial para saber como jogar.",
    "imagem": "https://i.postimg.cc/8cKT5Ws9/re4-icon.png",
    "data": "2026-03-19",
    "download": "#",
    "downloads": {
        "apk": "https://4br.me/BaixarApkR4",
        "data": "https://4br.me/BaixarDico1R4",
        "obb": "https://4br.me/BaixarDisco2R4"
    },
    "guia_link": "https://4br.me/Guiaimportante",
    "tutorial": "https://www.youtube.com/embed/videoseries?list=PL6qi2hUjNC8rO0iQMZUpOcwnrzBOuKthi&si=-6Pdc7eJ4uSJWgR86Pdc7eJ4uSJWgR8",
    "especificacoes": {
        "versao": "1.0",
        "tamanho": "2,6 GB",
        "android": "6.0",
        "desenvolvedora": "Horizonte Tutoriais"
    },
    "exibir": {
        "emDestaques": true,
        "emPopulares": true,
        "emQuente": true,
        "emAplicativos": false,
        "emJogos": true,
        "emTutoriais": true,
        "emFerramentas": false
    }
},];
const HorizonteData = {
    items: items,
    loadItemsFromStorage() {
        const stored = localStorage.getItem('horizonte_items');

        if (stored) {
            try {
                const localItems = JSON.parse(stored);
                const fileIds = new Set(this.items.map(i => i.id));
                localItems.forEach(item => { if (!fileIds.has(item.id)) this.items.push(item); });
            } catch (e) { console.error("Erro:", e); }
        }
    },
getAllItems() { 
        return this.items; 
    },
    getLatestUpdates() { 
        return this.items.slice(0, 8); 
    },
    getHighlights() { 
        return this.items.filter(i => i.exibir?.emDestaques).slice(0, 4);
    },
    getPopular() { 
        return this.items.filter(i => i.exibir?.emPopulares).slice(0, 6);
    }
};
