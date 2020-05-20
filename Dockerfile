FROM hayd/alpine-deno

RUN mkdir -p /daily-notes
RUN mkdir -p /tmp/daily-notes
WORKDIR /daily-notes
COPY . .

