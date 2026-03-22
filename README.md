# 🐦 Mini Twitter - Desafio Frontend (Processo Seletivo B2Bit)

## 🎯 O Desafio: 'Mini Twitter'

Esta aplicação foi desenvolvida para atender aos requisitos do desafio técnico da B2Bit para a vaga de Desenvolvedor Front End. O objetivo foi criar uma interface de usuário (UI) limpa, intuitiva e responsiva para um 'Mini Twitter' que consumisse uma API pré-existente e permitisse aos usuários interagir com posts.

A implementação priorizou a experiência do usuário (UX), garantindo que a criação e consumo de conteúdo fossem fluidos e eficientes.

## 🛠️ Detalhes da Implementação (Front-end)

A arquitetura foi pensada para desempenho e escalabilidade, utilizando as melhores práticas do ecossistema React moderno.

- **Core:** React 19, ReactDOM e TypeScript para uma interface declarativa e tipagem forte.
- **Ferramentas de Build e SPA:** Vite para um build rápido e TanStack React Router para roteamento de Single-Page Application (SPA) robusto.
- **Gerenciamento de Estado e Dados:**
- **Global (Lightweight):** Zustand para gerenciar estados globais leves (como autenticação do usuário e temas).
- **Sincronização com API:** TanStack React Query para gerenciar o cache, revalidação e mutações de dados (como listagem, criação e likes de tweets), garantindo uma experiência de usuário fluida e eficiente.
- **Requisições:** Axios para comunicação assíncrona com a API.
- **Design System e Estilização:** Tailwind CSS v4 para uma abordagem utility-first de design responsivo.
- **Validação de Formulários:** React Hook Form e Zod para validação síncrona de formulários com tipagem segura (como na criação de posts e autenticação, se aplicável).

## 🧪 Estratégia de Testes e Qualidade

A aplicação foi testada rigorosamente para garantir a funcionalidade e robustez dos componentes e lógica de negócios.

- **Testes Unitários:** Implementados com Vitest para testar a lógica de negócios isolada e funções utilitárias.
- **Testes de Integração:** Implementados com Vitest e React Testing Library para validar a interação entre múltiplos componentes e serviços (como hooks de busca de dados e formulários).
- **Nota Importante:** Embora testes E2E (End-to-End) não tenham sido incluídos nesta entrega, a cobertura de testes unitários e de integração cobre a maioria dos casos de uso críticos.

## 🌐 Integração com a API (Visão Geral)

A aplicação se integra com a API pré-fornecida ('Mini Twitter API v1'), focada nos seguintes casos de uso:

- Autenticação via Bearer Token.
- CRUD de posts.
- Sistema de likes.

## 📦 Como Executar o Projeto

A maneira recomendada é utilizando Docker.

**Pré-requisitos:** Docker e Docker Compose instalados.

**Passos:**

1. Clone o repositório.
2. Na raiz do projeto, execute:
   ```bash
   docker-compose up -d --build
   ```

Outra maneira de rodar é usando bun e npm.  
**Pré-requisitos:** bun e node instalados.  
**Passos:**

1. Clone o repositório.
2. Na raiz do projeto, execute:

   ```bash
   cd mini-twitter-backend-main
   # Instalar dependências
    bun install

    # Popular o banco de dados com dados iniciais
    bun run seed

    # Iniciar em modo de desenvolvimento
    bun run dev
    #Depois iniciar Frontend
    cd ..
    cd frontend
    #Instalar dependências
    npm install
    #Iniciar em modo de desenvolvimento
    npm run dev
   ```

Acessos:

Frontend: http://localhost:5173

Backend: http://localhost:3000 (referência)

## 👨‍💻 Candidato

### Pedro Lucas Maia de Paiva
