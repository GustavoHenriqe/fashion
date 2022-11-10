const nome = "";
const tecido = document.querySelectorAll(".tecid .camisas")
const gola = document.querySelectorAll(".gola .camisas")
const modelo = document.querySelectorAll(".model .camisas")
const enviar = document.querySelector("#send")
const input = document.getElementsByClassName("url")

function nomePerguntar(){
    let nome = prompt("Digite seu nome !!");

    while(typeof(nome) != "string" || nome == ""){
        nome = prompt("Digite seu nome!!");
    };

    return nome
};

let tecido2 = ""
let gola2 = ""
let modelo2 = ""

function fazerSelecao(tipo2){
    let tipo = tipo2
    
    tipo.forEach(elemento => {
        
        elemento.addEventListener("click", () => {
            
            tipo.forEach(elemento2 => {
                elemento2.classList.remove("selected")
            })
            elemento.classList.toggle("selected")
            
            if(elemento.parentElement.classList[1] == "tecid"){
                tecido2 = elemento.id
                
            }else if(elemento.parentElement.classList[1] == "gola"){
                gola2 = elemento.id
                
            }else if(elemento.parentElement.classList[1] == "model"){
                modelo2 = elemento.id
            
            }
            verificar()

        })
        
    })
}

fazerSelecao(tecido)
fazerSelecao(gola)
fazerSelecao(modelo)

function verificar(){
    if((modelo2 == "" || gola2 == "" || tecido2 == "") == true){
        
    }else{
        enviar.style.backgroundColor = "#404EED"
    }
}

enviar.addEventListener("click", () =>{
    let api = axios.post("https://mock-api.driven.com.br/api/v4/shirts-api/shirts", {
        "model": modelo2,
        "neck": gola2,
        "material": tecido2,
        "image": input.value,
        "owner": "blusa",
        "author": nome
    }).then(response => console.log(response))
})
