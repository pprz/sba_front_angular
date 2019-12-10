FROM nginx
#当使用本地目录为源目录时，推荐使用 COPY
COPY dist/auvtion/ /usr/share/nginx/html

