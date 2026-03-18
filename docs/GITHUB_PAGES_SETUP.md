# GitHub Pages setup

Este repositório publica dois conteúdos no GitHub Pages:

- `apresentacao.html` na raiz do site
- `linha-k-showcase` em `/showcase/`

## Como ativar

1. No GitHub, abra **Settings** > **Pages**.
2. Em **Build and deployment**, selecione **GitHub Actions**.
3. Salve.

## Como publicar

O workflow `.github/workflows/deploy-pages.yml` faz o build do showcase, monta o site final e publica o artefato usando o deploy oficial do GitHub Pages.

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

## URL esperada

Se o repositório for `Project_LinhaK`, a URL publicada fica neste formato:

- `https://SEU-USUARIO.github.io/Project_LinhaK/`
