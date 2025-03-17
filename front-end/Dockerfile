# Definir a imagem base para o Node.js
FROM node:latest

# Diretório de trabalho dentro do container
WORKDIR /app

# Copiar os arquivos package.json e package-lock.json (ou yarn.lock) para instalar as dependências
COPY package*.json ./

# Instalar as dependências
RUN npm install

# Copiar o código da aplicação para o container
COPY . .

# Construir o projeto Next.js
RUN npm run build

# Expôr a porta que o Next.js vai rodar
EXPOSE 3000

# Comando para rodar a aplicação Next.js
CMD ["npm", "start"]

