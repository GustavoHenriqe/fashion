const nome = nomePerguntar()

function nomePerguntar(){
    let nome = prompt("Digite seu nome !!")

    while(typeof(nome) != "string" || nome == ""){
        nome = prompt("Digite seu nome!!")
    }

    return nome
}


