FROM node:latest

WORKDIR /app
COPY . /app

RUN npm install

EXPOSE 3000

ENTRYPOINT ["node"]
CMD ["src/index.js --unhandled-rejections=strict"]