FROM public.ecr.aws/docker/library/node:16.13.2-stretch-slim
COPY --from=public.ecr.aws/awsguru/aws-lambda-adapter:0.9.0 /lambda-adapter /opt/extensions/lambda-adapter
EXPOSE 8080
WORKDIR "/var/task"
ADD package.json /var/task/package.json
ADD package-lock.json /var/task/package-lock.json
ADD tsconfig.json /var/task/tsconfig.json
ADD src/ /var/task/src
RUN npm install
RUN npm run build
ADD /var/task/dist /var/task
CMD ["node", "server.js"]