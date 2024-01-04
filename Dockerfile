# Usa la imagen oficial de Node con Alpine como base
FROM node:alpine
# Establece el conjunto de caracteres en la terminal
ENV LANG C.UTF-8
# Establece el directorio de trabajo en la aplicación
WORKDIR /app
# Copia los archivos de la aplicación al contenedor
COPY package*.json ./
COPY views ./views
COPY index.js .
COPY views/styles.css .
# Instala las dependencias
RUN npm install
# Expone el puerto en el que la aplicación estará escuchando
EXPOSE 3000
# Comando para iniciar la aplicación
CMD ["npm", "start"]