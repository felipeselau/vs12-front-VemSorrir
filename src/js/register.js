if (localStorage.getItem("logado")) {
    window.location.href = 'dashboard.html';
}

async function procurarLogradouro(){
    let saida = document.getElementById('logradouro-register-input');
    let cep = parseInt(document.getElementById('cep-register-input').value);

    const regex = /^[0-9]{8}$/;
    
    if (!isNaN(cep) && regex.test(cep)){
        let resposta = await fetch(`https://viacep.com.br/ws/${cep}/json/`);

        if (!resposta.ok){
            throw new Error('Erro ao buscar o CEP na API.');
        }

        let dados = await resposta.json();

        setTimeout(() => {
            saida.value = dados.logradouro;
        }, 300);        
    }    
}

function verificarDataNasc() {
    let dataInput = document.getElementById("dataNasc-register-input");

    var partesData = dataInput.value.split("-");
    var ano = parseInt(partesData[0]);
    var mes = parseInt(partesData[1]) - 1; 
    var dia = parseInt(partesData[2]);
    var dataNascimento = new Date(ano, mes, dia);

    const dataAtual = new Date();

    const dataMinima = new Date(dataAtual.getFullYear(), dataAtual.getMonth(), dataAtual.getDate());

    if (dataNascimento > dataMinima) {
        dataInput.setCustomValidity("Digite uma data válida!");
    } else {
        dataInput.setCustomValidity("");
    }
}

function cadastrarUsuario(){

    let nome = document.getElementById('nome-register-input');
    let email = document.getElementById('email-register-input');
    let senha = document.getElementById('senha-register-input');
    let cep = document.getElementById('cep-register-input');
    let logradouro = document.getElementById('logradouro-register-input');
    let dataInput = document.getElementById("dataNasc-register-input");
    
    if (
        nome.checkValidity() && email.checkValidity() && senha.checkValidity() && 
        cep.checkValidity() && logradouro.checkValidity() && dataInput.checkValidity()
    ) {
        let cadastros = JSON.parse(localStorage.getItem("cadastros")) || [];

        let usuario = {
            id: cadastros.length + 1,
            nome: nome.value,
            email: email.value,
            senha: senha.value,
            cep: cep.value,
            logradouro: logradouro.value,
            dataNascimento: dataInput.value
        }

        cadastros.push(usuario);

        let cadastrosJSON = JSON.stringify(cadastros);

        localStorage.setItem("cadastros", cadastrosJSON);

        let msgSucesso = document.getElementById('cadastro-sucesso');
        msgSucesso.classList.add("show");
        setTimeout(() => {
            msgSucesso.classList.remove("show");
            window.location.href = 'login.html';
        }, 3000);

        nome.value = '';
        email.value = '';
        senha.value = '';
        cep.value = '';
        logradouro.value = '';
        dataInput.value = '';
    }
}