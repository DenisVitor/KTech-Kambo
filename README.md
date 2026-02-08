# KTech-Kambo

## User API - CRUD com Autenticação JWT

### 📋 Descrição

API RESTful completa para gerenciamento de usuários com hierarquia de permissões (admin/user), implementada em **TypeScript** com arquitetura em camadas. A API oferece autenticação segura via JWT, validação de dados com Zod, e documentação interativa com Swagger.

---

## 🛠️ Tecnologias

| Categoria | Tecnologia |
|-----------|-----------|
| **Runtime** | Node.js |
| **Framework** | Express |
| **Linguagem** | TypeScript |
| **Banco de Dados** | MongoDB + Mongoose |
| **Segurança** | JWT + bcryptjs |
| **Validação** | Zod |
| **Documentação** | Swagger UI |

---

## 📦 Instalação

### 1. Clone o projeto e instale dependências:

```bash
git clone https://github.com/DenisVitor/KTech-Kambo.git
cd KTech-Kambo
npm install
```

### 2. Configure o arquivo `.env`:

```env
PORT=3000
MONGODB_URI=mongodb://localhost:27017/userapi
JWT_SECRET=supersecretkey123
```

> **Nota:** Para produção, altere `JWT_SECRET` para uma chave forte e segura.

### 3. Inicie o servidor:

```bash
npm run dev
```

O servidor estará disponível em `http://localhost:3000`

---

## 👤 Campos do Usuário

### Obrigatórios

| Campo | Tipo | Restrição |
|-------|------|-----------|
| `name` | string | Mínimo 2 caracteres |
| `email` | string | Email válido |
| `password` | string | Mínimo 6 caracteres |

### Opcionais

- `avatar` (string/URL)
- `age` (number, mínimo 18)
- `city` (string)
- `role` (enum: "admin" ou "user", padrão: "user")
- `phone` (string)

---

## 🔐 Autenticação

### Registro

**POST** `/api/users/register`

```json
{
  "name": "João Silva",
  "email": "joao@email.com",
  "password": "123456"
}
```

**Resposta de sucesso (201):**
```json
{
  "message": "Usuário criado com sucesso",
  "userId": "uuid"
}
```

### Login

**POST** `/api/users/login`

```json
{
  "email": "joao@email.com",
  "password": "123456"
}
```

**Resposta de sucesso (200):**
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

---

## 🔒 Rotas Protegidas

Todas as rotas abaixo requerem o token JWT no header `Authorization: Bearer {token}`

| Método | Endpoint | Permissão | Descrição |
|--------|----------|-----------|-----------|
| **GET** | `/api/users` | Autenticado | Retorna lista de usuários (nome, email, avatar) |
| **GET** | `/api/users/:id` | Autenticado | Retorna dados completos do usuário |
| **PUT** | `/api/users/:id` | Admin ou proprietário | Atualiza dados do usuário |
| **DELETE** | `/api/users/:id` | Admin ou proprietário | Deleta o usuário |

---

## 🎯 Sistema de Permissões

| Role | Permissões |
|------|-----------|
| **Admin** | Gerencia todos os usuários (ler, editar, deletar) |
| **User** | Lê todos os usuários, mas só pode editar/deletar a si mesmo |

---

## 📚 Documentação Interativa

Acesse a documentação Swagger em:

```
http://localhost:3000/api/docs
```

Nesta interface você pode testar todos os endpoints da API diretamente.

---

## 🚀 Scripts Disponíveis

```bash
npm run dev    # Inicia o servidor em modo desenvolvimento com hot-reload
npm run start  # Inicia o servidor em modo produção
```

---

## 📊 Respostas HTTP

| Status | Descrição |
|--------|-----------|
| **200** | OK - Requisição bem-sucedida |
| **201** | Created - Recurso criado com sucesso |
| **400** | Bad Request - Erro na validação dos dados |
| **401** | Unauthorized - Token inválido ou ausente |
| **403** | Forbidden - Sem permissão para acessar este recurso |
| **404** | Not Found - Usuário/recurso não encontrado |
| **500** | Internal Server Error - Erro no servidor |

---

## 🏗️ Arquitetura

A aplicação segue uma arquitetura em camadas:

- **Controllers:** Manipulam requisições e respostas HTTP
- **Services:** Contêm a lógica de negócio
- **Models:** Definição dos schemas do MongoDB
- **Middleware:** Autenticação, validação e tratamento de erros
- **Routes:** Definição das rotas da API

---

## ✅ Resumo

Uma API RESTful **production-ready** com:
- ✔ CRUD completo de usuários
- ✔ Autenticação segura com JWT
- ✔ Validação robusta com Zod
- ✔ Hierarquia de permissões (admin/user)
- ✔ Arquitetura limpa e escalável
- ✔ Documentação interativa com Swagger
- ✔ Tratamento de erros consistente
