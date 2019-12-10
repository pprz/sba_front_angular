FROM nginx
WORKDIR /smcfe
#当使用本地目录为源目录时，推荐使用 COPY
COPY dist/ /smcfe
EXPOSE 4200
