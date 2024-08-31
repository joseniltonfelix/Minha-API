import { randomUUID } from 'node:crypto'
import { Response, Request } from "express"
import bancoDeDados from "../bancoDeDados"
import criptografarSenha from "../auxiliares/criptografia"
import fraseSecreta from '../fraseSecreta'
import { validarComprovante } from '../intermediarios/validcomp'

const id = randomUUID()

//  ------------- PÁGINA INICIAL -------------- 


export function pagInicial(req: Request, res: Response) {

    return res.status(200).json({ mensagem: "API de vendas de ingressos" })
} 

// -------------- LISTAR EVENTOS ----------------

export function listarEventos(req: Request, res: Response) {

    const { maxPreco } = req.query

    if (!maxPreco) {
        return res.status(200).send(bancoDeDados.eventos)
    }

    if (isNaN(Number(maxPreco)) || (Number(maxPreco) <= 0)) {
        return res.status(400).json({ mensagem: "O preço máximo do evento deve conter apenas números e deve ser positivo" })

    }
    const preco = bancoDeDados.eventos.filter((item) => item.preco <= (Number(maxPreco)))

    return res.send(preco)
   }   

// ---------------- CADASTRAR USUARIOS -----------------

   export function cadastrarUsuarios(req:Request, res: Response) {
      const { nome, email, senha } = req.body

      // verificar se todos os campos obrigatórios foram enviados

     if (typeof nome !== "string"  || nome.trim() == "" ||typeof email !== "string"  || email.trim() == "" ||
     typeof senha !== "string"  || senha.trim() == "" ) {
        return res.status(400).json({mensagem: "Todos os campos são obrigatórios"})
      }

      // acessar o banco de dados pra saber se já existe o email

      const emailExiste = bancoDeDados.usuarios.find((usuarios) => usuarios.email === email)

      // validar se o email existe no banco de dados 

      if (emailExiste){
        return res.status(400).json({mensagem: "E-mail já cadastrado"})
      }

      //  Criptografar a senha, antes de persistir no banco de dados

     const criptografia =  criptografarSenha(senha)
     
      // cadastrar usuário no banco de dados

      const novoUsuario = {
        id: randomUUID(),
        nome,
        email,
        senha: criptografia
    }
      
    const  resposta = {
        id: novoUsuario.id,
        nome: novoUsuario.nome,
        email: novoUsuario.email
    }

        bancoDeDados.usuarios.push(novoUsuario)

        return res.status(201).json(resposta)
    
    }
    
    //----------- FAZER LOGIN --------------


     export function fazerLogin(req:Request, res: Response) {
        const { email, senha } = req.body

    // validar campos obrigatórios

    if (typeof email !== "string"  || email.trim() == ""||
     typeof senha !== "string"  || senha.trim() == "" ) {
        return res.status(400).json({mensagem: "Todos os campos são obrigatórios"})
     }

    // Buscar o usuário pelo e-mail

     const usuario = bancoDeDados.usuarios.find((usuario) => usuario.email === email)

    // Verificar se o email e senha existe no banco de dados
    
    const criptografia =  criptografarSenha(senha)

    if (!usuario || usuario.senha !== criptografia) {
    return res.status(400).json({ mensagem: "E-mail ou senha inválidos" })
    } 
    const comprovante = `${fraseSecreta}/${usuario.id}`;
  
    res.status(200).json({ 
        comprovante: comprovante 
    })
}

    // --------- FAZER COMPRA--------


    // Validar comprovante 

    export function fazerCompra(req: Request, res: Response ) {
        const comprovante = req.query.comprovante as string
        const { idEvento } = req.body

    if (!idEvento){
         return res.status(400).json({mensagem: "O identificador do evento é obrigatório"})
        }
    // verificar se idEvento consta no bancodedados.eventos

        const verificarId = comprovante.split("/")[1]

        const verificarEvento = bancoDeDados.eventos.findIndex(evento => evento.id === idEvento) 
        
        if (verificarEvento === -1){
            return res.status(404).json({mensagem: "Evento não encontrado"}) 
        }

        
        const novaCompra = {
            id: id,
            id_usuario: verificarId,
            id_evento: idEvento
        }
        
        bancoDeDados.compras.push(novaCompra)

        res.status(201).json(novaCompra) 
    }


    export function listarCompras (req: Request, res: Response) {
        
      const comprovante = req.query.comprovante as string
      const idUsuario2 = comprovante.split("/")[1]

      const listaCompras = bancoDeDados.compras.filter((compra) => compra.id_usuario === idUsuario2)

      type Tretorno = {
        idCompra: string
        idEvento: string
        nome: string
        endereco: string
        data: string
        preco: number
      };

      const listaComprasEventos: Tretorno[] = []

      listaCompras.forEach((compra) => {
        const evento = bancoDeDados.eventos.find((evento) => evento.id === compra.id_evento)
        if (!evento){
            return res.status(400)
        }
        const retorno: Tretorno = {
            idCompra: compra.id,
            idEvento: evento.id,
            nome: evento.nome,
            endereco: evento.endereco,
            data: evento.data,
            preco: evento.preco
          }

          listaComprasEventos.push(retorno)
      })

      return res.status(200).json(listaComprasEventos) 
    }

    // deletar 

      export function deletar(req: Request, res: Response){
        const comprovante = req.query.comprovante as string
        const idUsuario2 = comprovante.split("/")[1]
        const { id } = req.params
   
        const result = bancoDeDados.compras.find((compra) => compra.id === id )
        if(!result || result.id_usuario !== idUsuario2){
            return res.status(404).json({mensagem: "Compra não encontrada"})
        }
        const indice = bancoDeDados.compras.findIndex((compra) => compra.id === id )
        bancoDeDados.compras.splice(indice,1)

        
        return res.status(204).json()

      }

        

    


    

  
        
      















     

       



     
     




     


      
        
 
    