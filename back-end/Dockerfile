# Use a imagem PHP com Apache
FROM php:8.2.15-apache

# Instalar dependências necessárias e limpar cache
RUN apt-get update && apt-get install -y \
    libpng-dev \
    libjpeg-dev \
    libfreetype6-dev \
    zip \
    git \
    curl && \
    rm -rf /var/lib/apt/lists/*

# Instalar o Composer
RUN curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer

# Configuração do PHP para o Laravel
RUN docker-php-ext-configure gd --with-freetype --with-jpeg && \
    docker-php-ext-install gd pdo pdo_mysql

# Habilitar mod_rewrite
RUN a2enmod rewrite

# Permitir uso de .htaccess
RUN echo '<Directory /var/www/html/public>' >> /etc/apache2/apache2.conf \
    && echo '    AllowOverride All' >> /etc/apache2/apache2.conf \
    && echo '</Directory>' >> /etc/apache2/apache2.conf

# Altere a porta padrão do Apache de 80 para 8000
RUN sed -i 's/80/8000/' /etc/apache2/ports.conf && \
    sed -i 's/:80/:8000/' /etc/apache2/sites-available/000-default.conf

# Definir o diretório de trabalho
WORKDIR /var/www/html

# Copiar os arquivos do projeto para o container
COPY . .

# Instalar dependências do Laravel usando o Composer
RUN composer install

# Definir permissões adequadas para os arquivos
RUN chown -R www-data:www-data /var/www/html
RUN chmod -R 755 /var/www/html

# Expor a porta 8000 do container (configurado para Apache)
EXPOSE 8000

# Comando para rodar o Apache em primeiro plano
CMD ["apache2-foreground"]
