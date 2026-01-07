FROM node:20-alpine

WORKDIR /app

RUN npm install -g pnpm

COPY package.json pnpm-lock.yaml ./
COPY pnpm-workspace.yaml ./

COPY ./backend/package.json ./backend/

RUN pnpm install --frozen-lockfile --prod

COPY backend ./backend

WORKDIR /app/backend

RUN mkdir -p data

CMD ["pnpm", "start"]
