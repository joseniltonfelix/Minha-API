## API REST para Gerenciamento de Eventos 

Bem-vindo ao meu repositório de uma API REST para gerenciamento de eventos. Esta API permite a interação com eventos, contas de usuários e compras. Abaixo, você encontrará uma descrição das principais funcionalidades oferecidas pela API.

## FUNCIONALIDADES

A API possui as seguintes funcionalidades:

- **Listar os eventos cadastrados**: Obtenha uma lista de todos os eventos disponíveis.
- **Criar uma conta**: cadastre um novo usuário na plataforma.
- **Fazer login**: Autentique-se na plataforma para acessar funcionalidades restritas.
- **Fazer uma compra**: Realize a compra de ingressos para um evento.
- **Listar compras**: Visualize todas as compras realizadas pelo usuário autenticado.
- **Cancelar uma compra**: Anule uma compra previamente realizada.

## ENDPOINTS

## Listar Eventos:

- **URL**: '/eventos'
- **Método**: `GET`
- **Descrição**: Recupera uma lista de todos os eventos cadastrados.
- **Resposta**: JSON contendo uma lista de eventos.

## Cadastrar usuário: 

- **URL**: `/usuarios`
- **Método**: `POST`
- **Descrição**: Cria um novo usuário com as credenciais fornecidas.
- **Corpo da Requisição**:
  ```json
  {
    "usuario": "string",
    "senha": "string",
    "email": "string"
  }


## Fazer login:

- **URL**: '/login'
- **Método**: `POST`
- **Descrição**: Autentique-se na plataforma para acessar funcionalidades restritas.
- **Resposta**: Devolve um JSON contendo o comprovante de login.


## Fazer uma compra:

- **URL**: '/compras'
- **Método**: `POST`
- **Descrição**: Faça compras de ingressos para o evento.
- **Resposta**: Retorna um JSON contendo os dados da compra.


## Listar uma compra:

- **URL**: '/compras'
- **Método**: `POST`
- **Descrição**: Ver a lista de compras.
- **Resposta**: Retorna um JSON contendo a lista de compras.

Cancelar uma compra:

- **URL**: '/compras/:id'
- **Método**: `DELETE`
- **Descrição**: Deletar uma compra.

