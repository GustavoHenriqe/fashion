const nome = nomePerguntar();
const tecido = document.querySelectorAll(".tecid .camisas")
const gola = document.querySelectorAll(".gola .camisas")
const modelo = document.querySelectorAll(".model .camisas")
const enviar = document.querySelector("#send")
const input = document.querySelector(".url")
const pegar_pedidos = axios.get("https://mock-api.driven.com.br/api/v4/shirts-api/shirts").then(
    response => carregarPedidos(response)
)
const ultimos_pedidos = document.querySelector(".list-response")

let array_pedidos = []
let tecido2 = ""
let gola2 = ""
let modelo2 = ""

function carregarPedidos(response){
    ultimos_pedidos.innerHTML = ""
    array_pedidos = []

    for(let i = 0; 5 > i; i++){
        array_pedidos.push(response.data[i])
        ultimos_pedidos.innerHTML += `<div id="${i}" onclick="encomenda(this)" class="responses">
        <div class="responses-camisis">
            <img src="${response.data[i].image}" alt="">
            <h3><span class="strong">Criador:</span> ${response.data[i].owner}</h3>
        </div>  
    </div>`
    }
    
}

function nomePerguntar(){
    let nome = prompt("Digite seu nome !!");

    while(typeof(nome) != "string" || nome == ""){
        nome = prompt("Digite seu nome!!");
    };

    return nome
};

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
    if((modelo2 == "" || gola2 == "" || tecido2 == "") == true || input.value == ""){
        enviar.style.backgroundColor = "#C4C4C4"
        return false
    }else{
        enviar.style.backgroundColor = "#404EED"
        return true
    }
}

input.addEventListener("keyup", () => {
    verificar()
})

enviar.addEventListener("click", () =>{
    if(verificar() == true){
        let api = axios.post("https://mock-api.driven.com.br/api/v4/shirts-api/shirts", {
        "model": modelo2,
        "neck": gola2,
        "material": tecido2,
        "image": input.value,
        "owner": nome,
        "author": nome
    })
    
    api.then(response => {
        alert("Sua encomenda foi feita!!")
        let pegar_pedidos2 = axios.get("https://mock-api.driven.com.br/api/v4/shirts-api/shirts").then(
    response => carregarPedidos(response)
    )
    }); 
    api.catch(response => alert(`Erro, não foi possivel processar sua encomenda !!`))
    }
})

function encomenda(elemento){
    let confrimar = confirm("Deseja realmente fazer o pedido?")
    
    if(confrimar){
        let api = axios.post("https://mock-api.driven.com.br/api/v4/shirts-api/shirts", {
        "model": array_pedidos[elemento.id].model,
        "neck": array_pedidos[elemento.id].neck,
        "material": array_pedidos[elemento.id].material,
        "image": array_pedidos[elemento.id].image,
        "owner": array_pedidos[elemento.id].owner,
        "author": array_pedidos[elemento.id].owner
        }).then(response => alert("pedido enviado com sucesso"))
    }
}