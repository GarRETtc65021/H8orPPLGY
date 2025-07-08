# -------------------------------------------------
# other than sounishnath003
# -------------------------------------------------
WORKDIR /app
COPY . .
RUN npm install
RUN npm i -g @angular/cli
# RUN npm run-script build
EXPOSE 4200
CMD npm start

# COPY --from=node /app /usr/share/nginx/html