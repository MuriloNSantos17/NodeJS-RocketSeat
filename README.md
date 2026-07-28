# Formação Node.js — Rocketseat

Repositório de estudos desenvolvido durante a formação de Node.js da Rocketseat. Os projetos registram a evolução desde os fundamentos da plataforma até a construção de APIs com Fastify, SOLID, DDD, Clean Architecture e NestJS.

Cada pasta é um projeto independente, com suas próprias dependências, scripts e configurações.

## Projetos

| Módulo | Projeto | Conteúdo principal |
| --- | --- | --- |
| 01 | [Fundamentos do Node.js](./01-FUNDAMENTOS-NODEJS) | HTTP nativo, streams, buffers, middlewares, rotas e persistência em arquivo JSON |
| 02 | [API REST com Node.js](./02-API-REST-NODEJS) | Fastify, TypeScript, Knex, SQLite, cookies, validação com Zod e testes de integração |
| 03 | [API com SOLID](./03-API-SOLID) | API de academias, Prisma, PostgreSQL, JWT, casos de uso, SOLID e testes unitários/E2E |
| 04 | [Clean DDD](./04-CLEAN-DDD) | Entidades, value objects, agregados, eventos de domínio, repositórios e casos de uso |
| 05 | [NestJS com Clean Architecture](./05-NEST-CLEAN) | Fórum completo com NestJS, Prisma, PostgreSQL, Redis, JWT, armazenamento R2 e eventos de domínio |

## Tecnologias

- Node.js e TypeScript
- Fastify e NestJS
- Knex e Prisma ORM
- SQLite e PostgreSQL
- Redis
- Zod
- JWT e bcrypt
- Vitest e Supertest
- Docker Compose
- Cloudflare R2, por meio da API compatível com Amazon S3

## Pré-requisitos

Para executar todos os módulos, tenha instalado:

- [Node.js](https://nodejs.org/) 18 ou superior
- npm
- [Docker](https://www.docker.com/) e Docker Compose, para os módulos 03 e 05

Os comandos abaixo devem ser executados a partir da raiz deste repositório.

## 01 — Fundamentos do Node.js

API criada apenas com recursos nativos do Node.js. Implementa um CRUD de usuários, busca por nome ou e-mail, leitura de JSON, parâmetros de rota e persistência local no arquivo `db.json`. A pasta `streams` reúne exemplos de buffers e streams.

```bash
cd 01-FUNDAMENTOS-NODEJS
npm run dev
```

O servidor fica disponível em `http://localhost:3333`.

Principais rotas:

| Método | Rota | Descrição |
| --- | --- | --- |
| `GET` | `/users` | Lista usuários; aceita o parâmetro `search` |
| `POST` | `/users` | Cadastra um usuário |
| `PUT` | `/users/:id` | Atualiza um usuário |
| `DELETE` | `/users/:id` | Remove um usuário |

## 02 — API REST com Node.js

API de transações financeiras construída com Fastify e Knex. As transações são vinculadas ao visitante por um cookie de sessão e podem ser registradas como crédito ou débito.

### Configuração

```bash
cd 02-API-REST-NODEJS
npm install
```

Crie um arquivo `.env`:

```env
NODE_ENV=development
DATABASE_CLIENT=sqlite
DATABASE_URL=./db/app.db
PORT=3333
```

Execute as migrations e inicie a API:

```bash
npm run knex -- migrate:latest
npm run dev
```

As rotas estão disponíveis sob `/transactions` e permitem criar, listar, detalhar e consultar o saldo consolidado das transações da sessão.

Para executar os testes:

```bash
npm test
```

## 03 — API com SOLID

API inspirada no GymPass. Permite cadastro e autenticação de usuários, consulta e criação de academias, check-ins, histórico, métricas e validação de check-ins.

O projeto separa regras de negócio em casos de uso e aplica princípios SOLID, repository pattern, autenticação JWT e testes unitários e E2E.

### Configuração

```bash
cd 03-API-SOLID
npm install
docker compose up -d
```

Crie um arquivo `.env`:

```env
NODE_ENV=dev
DATABASE_URL=postgresql://docker:docker@localhost:5432/apisolid?schema=public
JWT_SECRET=uma-chave-secreta-segura
PORT=3333
```

Prepare o banco e inicie a aplicação:

```bash
npx prisma migrate deploy
npm run start:dev
```

Scripts de teste:

```bash
npm test
npm run test:e2e
npm run test:coverage
```

Os requisitos funcionais e as regras de negócio desse módulo estão detalhados em [03-API-SOLID/README.md](./03-API-SOLID/README.md).

## 04 — Clean DDD

Implementação do domínio de um fórum de perguntas e respostas sem dependência de framework HTTP ou banco de dados. O objetivo é exercitar:

- Domain-Driven Design;
- entidades e value objects;
- agregados e listas observadas;
- eventos de domínio;
- casos de uso e contratos de repositório;
- testes com repositórios em memória.

```bash
cd 04-CLEAN-DDD
npm install
npm test
```

Para acompanhar os testes durante o desenvolvimento:

```bash
npm run test:watch
```

## 05 — NestJS com Clean Architecture

Versão completa da aplicação de fórum usando NestJS na camada de infraestrutura e mantendo o domínio isolado. O módulo inclui:

- cadastro e autenticação de estudantes;
- criação, edição e exclusão de perguntas e respostas;
- comentários e anexos;
- escolha da melhor resposta;
- notificações disparadas por eventos de domínio;
- cache com Redis;
- upload de arquivos no Cloudflare R2;
- testes unitários e E2E.

### Configuração

```bash
cd 05-NEST-CLEAN
npm install
docker compose up -d
```

Crie um arquivo `.env`:

```env
DATABASE_URL=postgresql://postgres:docker@localhost:5432/nest-clean?schema=public
JWT_PRIVATE_KEY=chave-privada-rsa-em-base64
JWT_PUBLIC_KEY=chave-publica-rsa-em-base64
CLOUDFLARE_ACCOUNT_ID=seu-account-id
AWS_BUCKET_NAME=nome-do-bucket
AWS_ACCESS_KEY_ID=sua-access-key
AWS_SECRETE_ACCESS_KEY=sua-secret-access-key
REDIS_HOST=127.0.0.1
REDIS_PORT=6379
REDIS_DB=0
PORT=3333
```

As chaves JWT devem formar um par RSA e estar codificadas em Base64. As credenciais do R2 precisam estar preenchidas para testar o upload de anexos.

Prepare o banco e inicie a aplicação:

```bash
npx prisma migrate deploy
npm run start:dev
```

Scripts úteis:

```bash
npm test
npm run test:e2e
npm run test:cov
npm run build
```

O arquivo [05-NEST-CLEAN/client.http](./05-NEST-CLEAN/client.http) contém exemplos de requisições para cadastro, autenticação e criação e consulta de perguntas.

> Os módulos 03 e 05 expõem PostgreSQL na porta `5432`. Execute apenas um dos ambientes Docker por vez ou altere o mapeamento de porta se quiser mantê-los simultaneamente.

## Estrutura do repositório

```text
.
├── 01-FUNDAMENTOS-NODEJS
├── 02-API-REST-NODEJS
├── 03-API-SOLID
├── 04-CLEAN-DDD
├── 05-NEST-CLEAN
├── LICENSE
└── README.md
```

## Licença

Este repositório está licenciado sob a licença MIT. Consulte o arquivo [LICENSE](./LICENSE) para mais informações.
