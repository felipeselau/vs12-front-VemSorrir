function loginOrDashboard(){
    if (localStorage.getItem("logado")) {
        window.location.href = './src/pages/dashboard.html';
    } else {
        window.location.href = './src/pages/login.html';
    }
}

const formulario = document.getElementById('formReview');

formulario.addEventListener('submit', (event) => {
    event.preventDefault();
});

function cadastraReview(){
    let nome = document.getElementById('reviewName');
    let email = document.getElementById('reviewEmail');
    let mensagem = document.getElementById('reviewMsg');

    if (
        nome.checkValidity() && email.checkValidity() && mensagem.checkValidity()
    ) {
        let avaliacoes = JSON.parse(localStorage.getItem('avaliacoes')) || [];

        let review = {
            nome: nome.value, 
            email: email.value, 
            mensagem: mensagem.value
        };
        
        avaliacoes.push(review);

        let avaliacoesJSON = JSON.stringify(avaliacoes);

        localStorage.setItem('avaliacoes', avaliacoesJSON);

        let msgSucesso = document.getElementById('review-sucesso');
        msgSucesso.classList.add("show");
        setTimeout(() => {
            msgSucesso.classList.remove("show");
        }, 3000);

        renderizarNewReview(nome.value, mensagem.value)

        setTimeout(() => {
            nome.value = ''; 
            email.value = ''; 
            mensagem.value = '';
        }, 100);    

        document.getElementById('closeModal').click();
        document.getElementById('contador').innerText = 0;
    }
}

let classe;
let dataAos;
let cont = 0;
let containerDepoimentos = document.getElementById('containerDepoimentos');

function renderizarReviews(){
    let depoimentos = '';

    let avaliacoes = JSON.parse(localStorage.getItem('avaliacoes')) || [];

    for (review of avaliacoes){
        if (cont % 2 == 0){
            classe = 'card';
            dataAos = 'fade-right';
        } else{
            classe = 'card segundo-card';
            dataAos = 'fade-left';
        }
        cont++;

        let depoimento = `
            <div class="${classe}" data-aos="${dataAos}">
                <div class="card-text">
                    <div class="depoimento">
                        <p>
                            "${review.mensagem}"
                        </p>
                    </div>
                    <div class="autor">
                        <span>
                            <em>
                                ${review.nome}
                            </em>
                        </span>
                    </div>
                </div>
                <figure class="card-foto">
                    <img src="./src/assets/perfil.png" alt="Foto da pessoa que deu o depoimento"
                    width="55"
                    height="55">
                </figure>
            </div>`;
        depoimentos += depoimento;
    }

    containerDepoimentos.innerHTML = depoimentos;
}

function renderizarNewReview(nome, mensagem){
    if (cont % 2 == 0){
        classe = 'card';
        dataAos = 'fade-right';
    } else{
        classe = 'card segundo-card';
        dataAos = 'fade-left';
    }
    cont++;

    let depoimento = `
        <div class="${classe}" data-aos="${dataAos}">
            <div class="card-text">
                <div class="depoimento">
                    <p>
                        "${mensagem}"
                    </p>
                </div>
                <div class="autor">
                    <span>
                        <em>
                            ${nome}
                        </em>
                    </span>
                </div>
            </div>
            <figure class="card-foto">
                <img src="./src/assets/perfil.png" alt="Foto da pessoa que deu o depoimento"
                width="55"
                height="55">
            </figure>
        </div>`;
    containerDepoimentos.innerHTML += depoimento;
}

function contaChar(){
    let texto = document.getElementById('reviewMsg').value;
    let contador = document.getElementById('contador');
    let tamanhoTexto = texto.length;

    contador.innerText = tamanhoTexto;
}

window.addEventListener('load', renderizarReviews());
