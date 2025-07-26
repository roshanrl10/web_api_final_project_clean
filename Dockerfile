FROM node:22-alpine

WORKDIR /app

# COPY source(current) destination(docker)
COPY package*.json ./

# Shell/Terminal command
RUN npm install

# Copy rest of the source doe
COPY . .

# Docker port
EXPOSE 5050

# Entry point (run server)
CMD ["node", "server.js"]

#docker build -t backend-app .
#docker run -d -p 5006:5050 --name backend backend-app
#docker ps -a
#docker stop CONTAINERID
#docker rm CONTAINERID