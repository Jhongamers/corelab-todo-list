<<<<<<< HEAD
## Corelab Challenge:

You are tasked with building a web application that allows users to create and manage their to-do lists. The application should consist of a responsive webpage built in React, and an API built in PHP Laravel to store and manage the to-do lists.

### The repositories
The [frontend repository](https://github.com/corelabbr/corelab-challenge-web-app-php)

If you feel more comfortable, you can pick another React framework and show us your skills.

The [backend repository](https://github.com/corelabbr/corelab-api-challenge-php)

If you feel more comfortable, you can pick another PHP framework and show us your skills.

### The Layout
Open the [layout mockup](https://www.figma.com/file/sQrUVHTlyogq3qGdkqGTXN/mockup?node-id=7%3A2&t=ANTOTiqjqGWYuoUr-0) in desktop and mobile version and follow this design as much as possible.

### The application should have the following functionality:

1. Users should be able to create, read, update, and delete to-do items using the API.
2. Users should be able to mark an item as a favorite.
3. Users should be able to set a color for each to-do item.
4. The React frontend should display the user's to-do list in a responsive and visually appealing manner, with the ability to filter by favorite items and color.
5. The favorited items should be displayed at the top of the list.

### Technical Requirements:
1. The backend API should be built in PHP Laravel framework and use a database of your choice (e.g., MySQL, PostgreSQL, etc.).
2. The frontend should be built in React and use modern web development tools and best practices.
3. The application should be responsive and visually appealing.

### Deliverables:
1. A link to a GitHub repository containing the complete source code for the project.
2. A written description of how to set up and run the application locally.

### Evaluation Criteria:
1. Code Quality
2. Code Format
3. Code Performance
4. Frontend Design
5. If your code is Easily Readable
6. Mobile First approach
7. Code Responsibility
8. Features Work
9. Responsiveness
10. Does the application meet the functionality requirements listed above?
11. Is the code well-organized, easy to read, and well-documented?
12. Are modern web development tools and best practices used?
13. Is the application visually appealing and responsive?

### Backend
Repository: 
1. PHP: ^7.4
2. Laravel: ^8.0
3. Database: Choose your own, you can even use PostgreSQL.

### Frontend
Repository: 
1. Node: ^16.15.0
2. NPM: ^8.5.5
3. Framework: React TS
4. Sass or other preprocessor

### Want to impress us even more?
If you feel comfortable and want to impress us even more, you can do the following:

1. Work on correct types and interfaces
2. Work on eslint rules
3. Work prettier config
4. Work on docker containers
5. Work on tests
6. Work on CI/CD

### What to do when you finish?

Create a file PULL_REQUEST.md where you will describe what you did and how in as much detail as possible. Feel free to add videos for better explanation.

Create a new pull request using the same branch name for Backend and Frontend

Send us the pull requests and that's all!

#### Good luck! The sky is the limit 🚀
=======
# CoreLab Todo List

CoreLab Todo List é uma aplicação de gerenciamento de tarefas que permite criar, editar, excluir e organizar suas notas. O projeto é dividido em duas partes: um **back-end** desenvolvido em PHP/Laravel e um **front-end** desenvolvido com React/Next.js.

---

## 🚀 Funcionalidades

- **Gerenciamento de Tarefas**: Criação, edição e exclusão de tarefas.
- **Favoritar Tarefas**: Marcar tarefas como favoritas para fácil acesso.
- **Organização por Cores**: Personalize as tarefas com cores.
- **Pesquisa**: Pesquise tarefas rapidamente.
- **Responsividade**: Interface otimizada para dispositivos móveis e desktops.

---

## 🛠️ Tecnologias Utilizadas

### **Back-end**
- PHP 8.x
- Laravel 9.x
- MySQL
- Docker

### **Front-end**
- React.js
- Next.js
- TypeScript
- SCSS (para estilização)

### **Infraestrutura**
- Docker e Docker Compose

---

## 📂 Estrutura do Projeto

```plaintext
corelab-api-challenge-php/
├── back-end/                # Código do back-end (Laravel)
│   ├── app/                 # Código principal do Laravel
│   ├── public/              # Arquivos públicos (index.php)
│   ├── routes/              # Arquivos de rotas
│   ├── .env                 # Configurações do ambiente
│   └── Dockerfile           # Configuração do Docker para o back-end
├── front-end/               # Código do front-end (React/Next.js)
│   ├── src/                 # Código principal do front-end
│   ├── public/              # Arquivos públicos (imagens, favicon, etc.)
│   ├── .env.local           # Configurações do ambiente
│   └── Dockerfile           # Configuração do Docker para o front-end
├── [docker-compose.yml](http://_vscodecontentref_/1)       # Configuração do Docker Compose
└── [README.md](http://_vscodecontentref_/2)                # Documentação do projeto
```

---

## ⚙️ Pré-requisitos

Certifique-se de ter as seguintes ferramentas instaladas:

- [Docker](https://www.docker.com/)
- [Docker Compose](https://docs.docker.com/compose/)
- [Node.js](https://nodejs.org/) (para desenvolvimento do front-end)
- [Composer](https://getcomposer.org/) (para desenvolvimento do back-end)

---

## 🚀 Como Rodar o Projeto

### **1. Clone o repositório**
```bash
git clone https://github.com/Jhongamers/corelab-todo-list.git
cd corelab-todo-list
```

### **2. Configure as variáveis de ambiente**

#### Back-end:
Crie o arquivo `.env` na pasta `back-end` com base no arquivo `.env.example`:
```bash
cp back-end/.env.example back-end/.env
```

Atualize as variáveis de ambiente, como `DB_HOST`, `DB_DATABASE`, `DB_USERNAME` e `DB_PASSWORD`.

#### Front-end:
Crie o arquivo `.env.local` na pasta `front-end` com base no arquivo `.env.local.example`:
```bash
cp front-end/.env.local.example front-end/.env.local
```

### **3. Suba os containers com Docker**
Na raiz do projeto, execute:
```bash
docker-compose up --build -d
```

### **4. Acesse a aplicação**
- **Back-end**: [http://localhost:8000](http://localhost:8000)
- **Front-end**: [http://localhost:3000](http://localhost:3000)

---

## 🧪 Testes

### **Back-end**
Para rodar os testes do back-end, execute:
```bash
docker-compose exec backend php artisan test
```

### **Front-end**
Para rodar os testes do front-end, execute:
```bash
cd front-end
npm test
```

---

## 📜 Licença

Este projeto está licenciado sob a [MIT License](LICENSE).

---

## 👨‍💻 Autor

Desenvolvido por **Jonathan Rodrigues**.

- GitHub: [Jhongamers](https://github.com/Jhongamers)
- LinkedIn: [Seu LinkedIn](https://linkedin.com/in/jonathanrodriguescabr)
>>>>>>> master
