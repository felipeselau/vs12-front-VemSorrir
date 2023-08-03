if (localStorage.getItem("logado")) {
    window.location.href = 'dashboard.html';
}

let form = document.querySelector('form');

form.addEventListener('submit', (event) => {
    event.preventDefault();
    logar();
});

function mostrarMsgErro(){
    let msgErro = document.getElementById('erro-login');

    msgErro.classList.add("show");
    setTimeout(() => {
        msgErro.classList.remove("show");
    }, 3000);
}

function logar(){
    let email = document.getElementById('email-input');
    let senha = document.getElementById('senha-input');

    let cadastros = JSON.parse(localStorage.getItem("cadastros")) || [];

    if (email.checkValidity() && senha.checkValidity()){
        if (cadastros.length == 0){
            mostrarMsgErro();
        } else {
            let cont = cadastros.length;
            for (usuario of cadastros){
                if (email.value == usuario.email && senha.value == usuario.senha){
                    let logadoJSON = JSON.stringify(usuario);
                    localStorage.setItem("logado", logadoJSON);
                    window.location.href = 'dashboard.html';
                    break;
                }
                cont--;
            }
            if (cont == 0) mostrarMsgErro();
        }
    } else {
        mostrarMsgErro();
    }
}
