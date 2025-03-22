FROM public.ecr.aws/docker/library/node:22-slim
COPY --from=public.ecr.aws/awsguru/aws-lambda-adapter:0.9.0 /lambda-adapter /opt/extensions/lambda-adapter
EXPOSE 8080
WORKDIR "/var/task"
ADD package.json package.json
ADD package-lock.json package-lock.json
ADD tsconfig.json tsconfig.json
ADD app/src/ src
RUN npm install
RUN npm run build
RUN rm -rf src
CMD ["node", "server.js"]