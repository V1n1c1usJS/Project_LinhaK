# GitHub Pages setup

Este repositório publica dois conteúdos no GitHub Pages:

- `apresentacao.html` na raiz do site
- `linha-k-showcase` em `/showcase/`

## Como ativar

1. No GitHub, abra **Settings** > **Pages**.
2. Em **Build and deployment**, selecione **Deploy from a branch**.
3. Escolha a branch **`gh-pages`** e a pasta **`/ (root)`**.
4. Salve.

## Como publicar

O workflow `.github/workflows/deploy-pages.yml` faz o build do showcase, monta o site final e publica tudo na branch `gh-pages`.

Ele roda automaticamente em pushes para:

- `main`
- `master`
- `work`

Também pode ser executado manualmente pela aba **Actions**.

## Estrutura publicada

- `/` → apresentação
- `/apresentacao.html` → apresentação
- `/orcamento.html` → orçamento
- `/showcase/` → showcase React
