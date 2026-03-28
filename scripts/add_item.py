#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Horizonte Tutoriais v2.0 - Script de Automação
Adiciona novos apps/jogos/ferramentas automaticamente ao site
"""

import json
import os
import sys
from datetime import datetime

def add_item():
    print("\n" + "="*60)
    print("🚀 SUPER-AUTOMAÇÃO HORIZONTE TUTORIAIS v2.0")
    print("="*60 + "\n")

    # Informações básicas
    id_item = input("🔹 ID do item (ex: gta-sa, whatsapp): ").strip()
    if not id_item:
        print("❌ ID não pode estar vazio!")
        return

    nome = input("🔹 Nome do app/jogo: ").strip()
    if not nome:
        print("❌ Nome não pode estar vazio!")
        return

    print("\n📋 Tipo de Item:")
    print("   1. Aplicativo")
    print("   2. Jogo")
    print("   3. Ferramenta")
    print("   4. Postagem")
    t_idx = input("Escolha (1-4): ").strip()
    tipo = "Aplicativo" if t_idx == "1" else "Jogo" if t_idx == "2" else "Ferramenta" if t_idx == "3" else "Postagem"

    desc = input("🔹 Descrição: ").strip()
    img = input("🔹 URL da Imagem: ").strip()

    # Downloads
    downloads = {}
    down_direto = "#"

    if tipo == "Jogo":
        print("\n⬇️ Links de Download para Jogo:")
        downloads["apk"] = input("   - Link APK: ").strip() or "#"
        downloads["data"] = input("   - Link DATA (opcional): ").strip() or "#"
        downloads["obb"] = input("   - Link OBB (opcional): ").strip() or "#"
    else:
        down_direto = input("🔹 Link Download: ").strip() or "#"

    # Links adicionais
    guia = input("🔹 Link Guia/Download Page: ").strip() or "#"
    tut = input("🔹 Link YouTube Embed (ex: https://www.youtube.com/embed/...): ").strip() or "#"

    # Especificações
    print("\n📊 Especificações Técnicas:")
    versao = input("   - Versão (ex: 1.0.0): ").strip() or "1.0.0"
    tamanho = input("   - Tamanho (ex: 150MB): ").strip() or "---"
    android = input("   - Android Mínimo (ex: 5.0+): ").strip() or "5.0+"
    dev = input("   - Desenvolvedora: ").strip() or "Horizonte Studios"

    # Categorias de exibição
    print("\n🌍 Onde exibir este item? (s/n)")
    exibir = {
        "emDestaques": input("   - Destaques? (s/n): ").lower() == "s",
        "emPopulares": input("   - Populares? (s/n): ").lower() == "s",
        "emQuente": input("   - Aba Quente? (s/n): ").lower() == "s",
        "emAplicativos": input("   - Aba Aplicativos? (s/n): ").lower() == "s",
        "emJogos": input("   - Aba Jogos? (s/n): ").lower() == "s",
        "emTutoriais": input("   - Aba Tutoriais? (s/n): ").lower() == "s",
        "emFerramentas": input("   - Aba Ferramentas? (s/n): ").lower() == "s",
        "emPostagens": input("   - Aba Postagens? (s/n): ").lower() == "s"
    }

    # Criar objeto do item
    novo = {
        "id": id_item,
        "nome": nome,
        "tipo": tipo,
        "descricao": desc,
        "imagem": img,
        "data": datetime.now().strftime("%Y-%m-%d"),
        "download": down_direto,
        "downloads": downloads if tipo == "Jogo" else None,
        "guia_link": guia,
        "tutorial": tut,
        "especificacoes": {
            "versao": versao,
            "tamanho": tamanho,
            "android": android,
            "desenvolvedora": dev
        },
        "exibir": exibir
    }

    # Adicionar ao data.js
    path = "assets/js/data.js"

    if not os.path.exists(path):
        print(f"❌ Arquivo {path} não encontrado!")
        return

    with open(path, "r", encoding="utf-8") as f:
        content = f.read()

    if "const items = [" in content:
        parts = content.split("const items = [")
        novo_json = json.dumps(novo, indent=4, ensure_ascii=False)
        novo_content = parts[0] + "const items = [\n    " + novo_json + "," + parts[1]

        with open(path, "w", encoding="utf-8") as f:
            f.write(novo_content)

        print("\n" + "="*60)
        print(f"✅ SUCESSO! \'{nome}\' foi adicionado com sucesso!")
        print("="*60)
        print(f"\n📝 Detalhes:")
        print(f"   - Tipo: {tipo}")
        print(f"   - ID: {id_item}")
        print(f"   - Exibindo em: {sum(1 for v in exibir.values() if v)} categorias")
        print("\n💡 Próximos passos:")
        print("   1. Teste o site localmente com: python3 -m http.server 8112")
        print("   2. Acesse: http://localhost:8112")
        print("   3. Se tudo estiver OK, faça git add, commit e push para o GitHub!")
        print("\n")
    else:
        print("❌ Erro: Formato de data.js inválido!")

if __name__ == "__main__":
    try:
        add_item()
    except KeyboardInterrupt:
        print("\n\n⚠️ Operação cancelada pelo usuário.")
        sys.exit(0)
    except Exception as e:
        print(f"\n❌ Erro: {e}")
        sys.exit(1)
