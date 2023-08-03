const consultas = [];
const consultasAgendadas = document.querySelector('#consultas');

if(consultas.length == 0 ){
    consultasAgendadas.innerHTML = `
    <span class="material-symbols-outlined">broken_image</span>
    <p><em>Você ainda não possui agendamentos...</em></p>`
}

function cadastrarConsulta(){
    let form = document.querySelector('#agendar-form');
    let servico = document.querySelector('#agendar-servico').value;
    let data = document.querySelector('#agendar-data').value;
    let horario = document.querySelector('#agendar-hora').value;
    let medico = document.querySelector('#agendar-medico').value;
    let hoje = new Date().toISOString();
    
    form.addEventListener('submit', event =>{
        event.preventDefault()
    })
    
    let vazio = (servico == '') || (data == '') || (horario == '') || (medico == '')
    
    if(vazio){
        //alert('Preencha todos os dados do formulário!');
        mostrarToast('error')
        data
        return;
    }
    
    if (data < hoje){
        data = '';
        mostrarToast('data');
        return;
    } 

    let dataFormatada = data.split('-')
    data = dataFormatada[2]+"/"+dataFormatada[1]+"/"+dataFormatada[0];
    


    switch(servico){
        case 'aparelho':
            servico = 'Aparelho Ortodôntico';
        break;

        case 'clareamento':
            servico = 'Clareamento Dental';
        break;
        case 'implante':
            servico = 'Implante Dentário';
        break;

        
    }

    horario = ( document.querySelector(`.horario[value="${horario}"]`).innerText)




    consultas.push
    ({
        id: consultas.length+1,
        servico: servico,
        data: data,
        horario: horario,
        medico: medico
    })

    console.log(consultas)
    mostrarToast('success')

    form.reset()

    renderConsultas()

}

function renderConsultas(){

    if(consultas.length > 0 ){
        consultasAgendadas.innerHTML = ``
    }

    consultas.forEach(consulta =>{
        consultasAgendadas.innerHTML += 
        `<div class='consulta-card'>
            <h1>${consulta.servico}</h1>
            <div class = 'consulta-detalhes'>
                <p class='consulta-data'>Data: <span class='js-info'>${consulta.data}</span></p>
                <p class='consulta-hora'>Horário: <span class='js-info'>${consulta.horario}</span></p>
                <p class='consulta-medico'>Médico(a): <span class='js-info'>${consulta.medico}</span></p>
            </div>
        </div> `
    })
}

function mostrarToast(toast){
    let msg;
    if(toast == 'error'){
        msg = document.querySelector('#erro-agendamento');
        msg.innerHTML = 'Erro no agendamento :( Tente novamente.'
    }else if(toast == 'success'){
        msg = document.querySelector('#agendamento-sucesso');
    }else if( toast == 'data'){
        msg = document.querySelector('#erro-agendamento');
        msg.innerHTML = 'Data Inválida!';
    }

    msg.style.display = 'block';
    setTimeout(() => {
        msg.style.display = 'none';

    }, 3000);
}

