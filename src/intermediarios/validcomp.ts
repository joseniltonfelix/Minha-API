import { NextFunction, Request , Response } from "express"
import bancoDeDados from "../bancoDeDados"


export function validarComprovante(req:Request, res: Response, next:NextFunction) {
    const validar = req.query.comprovante as string 

    if(!validar) {
        return res.status(401).json({mensagem: "Falha na autenticação"})
    }
    
    const idUsuario = validar.split("/")[1]
    
    const user = bancoDeDados.usuarios.findIndex(usuarios => usuarios.id === idUsuario) 
    if (user === -1){
        return res.status(401).json({mensagem: "Falha na autenticação"})
    } 

    next()
    
}

