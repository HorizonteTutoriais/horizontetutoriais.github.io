#!/usr/bin/env python3
# -*- coding: utf-8 -*-
import json
import os
import sys

def remove_item():
    print("\n" + "="*60)
    print("🗑️ REMOVEDOR DE ITENS - HORIZONTE TUTORIAIS")
    print("="*60 + "\n")

    path = "assets/js/data.js"
    if not os.path.exists(path):
        path = "../assets/js/data.js"
        if not os.path.exists(path):
            print(f"❌ Erro: Arquivo data.js não encontrado!")
            return

    with open(path, "r", encoding="utf-8") as f:
        content = f.read()

    start_marker = "const items = ["
    end_marker = "];"
    start_idx = content.find(start_marker)
    end_idx = content.find(end_marker, start_idx)

    if start_idx == -1 or end_idx == -1:
        print("❌ Erro: Formato de data.js inválido!")
        return

    json_str = content[start_idx + len(start_marker):end_idx].strip()
    if json_str.endswith(","):
        json_str = json_str[:-1]

    try:
        items = json.loads("[" + json_str + "]")
    except Exception as e:
        print(f"❌ Erro ao ler os itens atuais: {e}")
        return

    if not items:
        print("📭 O site não possui nenhum item para remover.")
        return

    print(f"📋 Itens encontrados ({len(items)}):")
    for i, item in enumerate(items):
        print(f"   {i+1}. [{item.get('id')}] - {item.get('nome')}")

    print("\n" + "-"*30)
    id_remover = input("🔹 Digite o ID do item que deseja remover (ou 'sair'): ").strip()
    
    if id_remover.lower() == 'sair':
        print("👋 Saindo...")
        return

    novos_items = [item for item in items if item.get('id') != id_remover]

    if len(novos_items) == len(items):
        print(f"⚠️ Aviso: Nenhum item com o ID '{id_remover}' foi encontrado.")
        return

    confirmar = input(f"❓ Tem certeza que deseja remover o item '{id_remover}'? (s/n): ").lower()
    if confirmar != 's':
        print("❌ Operação cancelada.")
        return

    novos_items_json = ",\n".join([json.dumps(item, indent=4, ensure_ascii=False) for item in novos_items])
    if novos_items_json:
        novos_items_json = "\n    " + novos_items_json + ","

    novo_content = content[:start_idx + len(start_marker)] + \
                   novos_items_json + \
                   "\n" + content[end_idx:]

    with open(path, "w", encoding="utf-8") as f:
        f.write(novo_content)

    print("\n" + "="*60)
    print(f"✅ SUCESSO! Item '{id_remover}' removido com sucesso!")
    print("="*60 + "\n")
    print("💡 Agora não esqueça de fazer o git add, commit e push!")

if __name__ == "__main__":
    try:
        remove_item()
    except KeyboardInterrupt:
        print("\n\n⚠️ Operação cancelada.")
        sys.exit(0)
    except Exception as e:
        print(f"\n❌ Erro crítico: {e}")
        sys.exit(1)
