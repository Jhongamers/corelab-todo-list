# Pull Request - CoreLab Todo List

## 📝 O que foi feito?

- **Backend (Laravel):**
  - Implementação de uma API RESTful para gerenciar tarefas (CRUD).
  - Configuração de autenticação com Laravel Sanctum.
  - Testes unitários e de integração para validar as funcionalidades principais.
  - Configuração de um ambiente de desenvolvimento com Docker.

- **Frontend (React/Next.js):**
  - Criação de uma interface responsiva para gerenciar tarefas.
  - Integração com a API do backend para exibir, criar, editar e excluir tarefas.
  - Implementação de filtros e organização por favoritos.
  - Testes automatizados para garantir a estabilidade do front-end.

- **CI/CD:**
  - Configuração de um pipeline no GitHub Actions para automação de testes e validação do código.

## 🚀 Como funciona?

- O backend foi desenvolvido em Laravel e expõe uma API RESTful para gerenciar tarefas.
- O frontend foi desenvolvido em React/Next.js e consome a API do backend.
- O projeto utiliza Docker para facilitar a configuração do ambiente de desenvolvimento.

## 🛠️ Como rodar o projeto?

As instruções detalhadas para rodar o projeto estão no arquivo [`README.md`](README.md).

## 🧪 Testes

- O backend possui testes unitários e de integração que podem ser executados com o comando:
  ```bash
  php artisan test
  ```

- O frontend possui testes automatizados que podem ser executados com o comando:
  ```bash
  npm test
  ```

## 📂 Estrutura do projeto

- **Backend:** Diretório `back-end/`
- **Frontend:** Diretório `front-end/`
- **CI/CD:** Configuração no arquivo `.github/workflows/ci-cd.yml`

## 🛠️ Tecnologias utilizadas

- **Backend:** PHP (Laravel), MySQL
- **Frontend:** React, Next.js, TypeScript
- **Infraestrutura:** Docker, GitHub Actions
   