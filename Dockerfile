FROM registry.access.redhat.com/ubi8/nodejs-16 AS my-app-build
WORKDIR /opt/app-root/src
COPY package.json package-lock.json /opt/app-root/src
RUN dir -s 
RUN npm install
RUN dir -s 
COPY . /opt/app-root/src
RUN dir -s 
RUN ls /opt/app-root/src
# Generate the build of the application
RUN npm run build --output-path=/opt/app-root/src/dist
RUN dir -s 
RUN ls /opt/app-root/src/dist
RUN pwd
RUN ls /opt/app-root/src/src
# stage 2
FROM registry.access.redhat.com/ubi8/nginx-120
#COPY nginx.conf /opt/app-root/etc/nginx.default.d/portal.conf
# Add application sources
RUN dir -s 
ADD nginx.conf "${NGINX_CONF_PATH}"
RUN echo "${NGINX_CONF_PATH}"
#ADD nginx-default-cfg/*.conf "${NGINX_DEFAULT_CONF_PATH}"
#ADD nginx-cfg/*.conf "${NGINX_CONFIGURATION_PATH}"
#ADD *.html .
RUN dir -s 
COPY --from=my-app-build /opt/app-root/src/dist/GCAT /usr/share/nginx/html
#RUN dir -s 
CMD ["nginx", "-g", "daemon off;"]
EXPOSE 8080

