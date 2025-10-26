FROM node:20-alpine

WORKDIR /app

# Instalar dependencias
COPY package.json package-lock.json ./
RUN npm install --legacy-peer-deps

# Copiar el resto de la aplicación
COPY . .

# Exponer el puerto
EXPOSE 3000

# Comandos para desarrollo
CMD [ "npm", "run", "dev" ]