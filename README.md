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