const form = document.querySelector('#form-contato')

form.addEventListener('submit', event =>{
    event.preventDefault()

    const name = document.querySelector('#name').value;
    const email = document.querySelector('#email').value;
    const motivo = document.querySelector('#motivo-contato').value;
    const feedback = document.querySelector('#mensagem');

    let vazio = (name == '') || (email == '') || (motivo == '') || (feedback == '');

    if(vazio){
        alert('Preencha todo o Formulário!');
        return;
    }

    let toast = document.getElementById('agendamento-sucesso');

    toast.style.display = 'block';
    setTimeout(() => {
        toast.style.display = 'none';
        form.reset();
    }, 3000);



})

function logout(){
    localStorage.removeItem("logado");
    window.location.href = 'login.html';
}