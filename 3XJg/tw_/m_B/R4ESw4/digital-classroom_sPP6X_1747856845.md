# -------------------------------------------------
# other than sounishnath003
# -------------------------------------------------
COPY . .
RUN npm install
RUN npm i -g @angular/cli
# RUN npm run-script build
EXPOSE 4200

# COPY --from=node /app /usr/share/nginx/html