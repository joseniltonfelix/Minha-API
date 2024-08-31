import { Router } from "express";
import { cadastrarUsuarios, 
         deletar, 
         fazerCompra, 
         fazerLogin, 
         listarCompras, 
         listarEventos, 
         pagInicial } from "./controladores/controladores";
import { validarComprovante } from "./intermediarios/validcomp";

const rotas = Router();

// pagina inicial

rotas.get('/', pagInicial)

// listar os eventos

rotas.get('/eventos',listarEventos )

// cadastrar usuarios

rotas.post('/usuarios', cadastrarUsuarios )

// fazer login

rotas.post('/login', fazerLogin)

// Validação de comprovante
 
rotas.use(validarComprovante)

// Fazendo compras 

rotas.post('/compras', fazerCompra)

// listar compras

rotas.get('/compras', listarCompras)

// deletar

rotas.delete('/compras/:id', deletar)

export default rotas;
