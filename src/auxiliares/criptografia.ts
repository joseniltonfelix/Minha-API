
export default function criptografarSenha (senha: string) {

  
        let senhaInvertida = senha.split('').reverse().join('')

        return  `zz${senhaInvertida}yy`
    }
   
    

