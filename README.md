# 👕 Projeto Camisa Tsubasa- Sistema de Pedidos

Sistema de gestão de pedidos simples utilizando arquitetura de microsserviços com Docker.

## 🚀 Estrutura do Projeto

O projeto é um **Monorepo** gerenciado pelo pnpm, dividido em:

- **frontend/**: Aplicação estática (HTML/JS/CSS) servida via Nginx.
- **backend/**: API Node.js (Express) para processamento e salvamento de pedidos em JSON.
- **Infrastructure**: Docker Compose orquestrando os serviços e rede interna.

## 🛠️ Tecnologias

- **Runtime:** Node.js v20 (LTS)
- **Gerenciador de Pacotes:** pnpm (Workspaces)
- **Containerização:** Docker & Docker Compose
- **Web Server:** Nginx (Proxy Reverso)

---

## 🏁 Como Rodar (Modo Docker - Recomendado)

Este é o método mais próximo do ambiente de produção (VPS/Coolify).

### Pré-requisitos
- Docker e Docker Compose instalados.

### Passo a Passo

1. **Clone o repositório:**
   ```bash
   git clone [https://github.com/nekurotech/pedido-camisas-tsubasa.git](https://github.com/nekurotech/pedido-camisas-tsubasa.git)
   cd pedido-camisas-tsubasa
   pnpm install
   ```
 
2. **Configure as variáveis de ambiente** 
  Linux/Mac/Git Bash:
  ```bash
  cp backend/.env.example backend/.env
  ```
  
  Windows (PowerShell):
  ```bash
  copy backend/.env.example backend/.env
  ```

3. **Instale as dependências** 
  ```bash
  pnpm install
  ```

4. **Docker** 
  ```bash
  docker compose up -d --build
  ```
