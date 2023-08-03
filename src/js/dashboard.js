const formulario = document.getElementById('formUpdate');

formulario.addEventListener('submit', (event) => {
    event.preventDefault();
});


if (!localStorage.getItem("logado")) {
    window.location.href = 'login.html';
}

function logout(){
    localStorage.removeItem("logado");
    window.location.href = 'login.html';
}

let logado = JSON.parse(localStorage.getItem('logado'));
let updateNome = document.getElementById('updateName');
let updateEmail = document.getElementById('updateEmail');
let updateSenha = document.getElementById('updateSenha');
let updateData = document.getElementById('dataNasc-update-input');

updateNome.value = logado.nome;
updateEmail.value = logado.email;
updateData.value = logado.dataNascimento;

document.addEventListener('DOMContentLoaded', atualizarDashboard());

function atualizarDashboard() {
    let imgProfile = document.getElementById('img-profile');
    let nome= document.getElementById('nome-usuario');
    let email= document.getElementById('email-usuario');
    let dataNasc = document.getElementById('data-nasc-usuario');

    let dataFormatada = logado.dataNascimento.split('-');
    let data = dataFormatada[2]+"/"+dataFormatada[1]+"/"+dataFormatada[0];

    imgProfile.src = '../assets/perfil.png';
    nome.innerText = logado.nome;
    email.innerText = logado.email;
    dataNasc.innerText = data;
}

function alterarDados(){
    if (updateSenha.value != logado.senha){
        updateSenha.setCustomValidity("Digite a senha correta!");
    } else {
        updateSenha.setCustomValidity("");
    }

    if ( 
        updateNome.checkValidity() && updateEmail.checkValidity() &&
        updateData.checkValidity() && updateSenha.checkValidity()
    ) {
        let cadastros = JSON.parse(localStorage.getItem('cadastros'));

        let dadosAlterados = {
            id: logado.id,
            nome: updateNome.value,
            email: updateEmail.value,
            senha: logado.senha,
            cep: logado.cep,
            logradouro: logado.logradouro,
            dataNascimento: updateData.value
        };

        logado = dadosAlterados;
        let logadoJSON = JSON.stringify(dadosAlterados);
        localStorage.setItem("logado", logadoJSON);

        cadastros[logado.id - 1] = dadosAlterados;
        let cadastrosJSON = JSON.stringify(cadastros);
        localStorage.setItem("cadastros", cadastrosJSON);

        let msgSucesso = document.getElementById('alteracao-sucesso');
        msgSucesso.classList.add("show");
        setTimeout(() => {
            msgSucesso.classList.remove("show");
        }, 3000);

        updateSenha.value = '';
        document.getElementById('closeModal').click();
        atualizarDashboard();
    }
    
}

function verificarDataNasc() {
    let dataInput = document.getElementById("dataNasc-update-input");

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