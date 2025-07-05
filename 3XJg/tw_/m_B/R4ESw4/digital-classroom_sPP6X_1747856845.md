# -------------------------------------------------
# Don't Touch This file | Very Secured | 
# other than sounishnath003
# -------------------------------------------------
FROM node:latest as node
WORKDIR /app
COPY . .
RUN npm install
RUN npm i -g @angular/cli
# RUN npm run-script build
EXPOSE 4200
CMD npm start


# COPY --from=node /app /usr/share/nginx/html
