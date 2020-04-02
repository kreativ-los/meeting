FROM node:latest

COPY . /app
WORKDIR /app
#RUN git clone https://github.com/kreativ-los/meeting.git . && git checkout develop
RUN cd client && npm ci && npm run build
RUN cd server && npm ci && npm run build
CMD cd server && NODE_ENV=production npm run prod

EXPOSE 5000
