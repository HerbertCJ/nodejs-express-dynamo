FROM public.ecr.aws/docker/library/node:16.13.2-stretch-slim
COPY --from=public.ecr.aws/awsguru/aws-lambda-adapter:0.9.0 /lambda-adapter /opt/extensions/lambda-adapter
EXPOSE 8080
WORKDIR "/var/task"
ADD app/package.json /var/task/package.json
ADD app/package-lock.json /var/task/package-lock.json
ADD app/tsconfig.json /var/task/tsconfig.json
RUN npm install
ADD app/src/ /var/task/src/
RUN npm run build
ADD app/dist/ /var/task
CMD ["node", "server.js"]