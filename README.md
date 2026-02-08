# KTech-Kambo
## User API - CRUD com Autenticação JWT
### Descrição
 API RESTful para gerenciamento de usuários com hierarquia de permissões (admin/user), implementada em TypeScript com arquitetura em camadas.

* Tecnologias
Node.js + Express + TypeScript

MongoDB + Mongoose

JWT + bcryptjs

Zod (validação)

Swagger UI (documentação)

* Instalação
Clone o projeto e instale dependências:

```
npm install
```

* Configure o .env:

PORT=3000
MONGODB_URI=mongodb://localhost:27017/userapi
JWT_SECRET=supersecretkey123


* Inicie o servidor:

```
npm run dev
```

* Campos do Usuário Obrigatórios

- name (string, min 2 chars)
- email (string válido)
- password (string, min 6 chars)

* Opcionais
avatar, age (min 18), city, role (admin/user), phone

* Autenticação 

- Registro
- POST /api/users/register

```
{"name": "João", "email": "joao@email.com", "password": "123456"}
```

- Login
- POST /api/users/login

Retorna apenas token.


* Rotas Protegidas

| Método | Endpoint | Permissão | Retorno |
| --- | --- | --- | --- |
| GET | /api/users | Autenticado | Lista (nome, email, avatar) |
| GET | /api/users/:id | Autenticado | Dados completos |
| PUT | /api/users/:id | Admin ou si mesmo | Usuário atualizado |
| DELETE | /api/users/:id | Admin ou si mesmo | Mensagem de sucesso |


* Permissões

- Admin: Gerencia todos os usuários
- User: Lê todos, modifica/deleta apenas si mesmo

* Documentação

http://localhost:3000/api/docs

* Scripts
```
npm run dev   # Desenvolvimento
npm run start # Produção
```

* Status HTTP
- 200: OK
- 201: Created
- 400: Bad Request
- 401: Unauthorized
- 403: Forbidden
- 404: Not Found

* Resumo
CRUD completo com autenticação JWT, validação Zod, hierarquia de permissões, arquitetura limpa e documentação Swagger. Production ready.