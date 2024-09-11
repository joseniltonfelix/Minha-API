--- API REST para Gerenciamento de Eventos ---

Bem-vindo ao meu repositório de uma API REST para gerenciamento de eventos. Esta API permite a interação com eventos, contas de usuários e compras. Abaixo, você encontrará uma descrição das principais funcionalidades oferecidas pela API.

--- Funcionalidades ---

A API possui as seguintes funcionalidades:

- **Listar os eventos cadastrados**: Obtenha uma lista de todos os eventos disponíveis.
- **Criar uma conta**: Registre um novo usuário na plataforma.
- **Fazer login**: Autentique-se na plataforma para acessar funcionalidades restritas.
- **Fazer uma compra**: Realize a compra de ingressos para um evento.
- **Listar compras**: Visualize todas as compras realizadas pelo usuário autenticado.
- **Cancelar uma compra**: Anule uma compra previamente realizada.

--- Endpoints ---

### Listar Eventos

- **URL**: `/events`
- **Método**: `GET`
- **Descrição**: Recupera uma lista de todos os eventos cadastrados.
- **Resposta**: JSON contendo uma lista de eventos.

--- Criar uma Conta ---

- **URL**: `/register`
- **Método**: `POST`
- **Descrição**: Cria um novo usuário com as credenciais fornecidas.
- **Corpo da Requisição**:
  ```json
  {
    "usuario": "string",
    "senha": "string",
    "email": "string"
  }
