async function fetchMedicos(){
    const medicos = []

    try{
        let resposta = await fetch('https://jsonplaceholder.typicode.com/users')
        let dados = await resposta.json()
        dados.forEach(medico => {
            medicos.push(
                {
                id: medico.id,
                nome: medico.name
                })
        });
        return medicos;
    }catch{
        throw new Error('Erro ao buscar nomes na API.');
    }
}

async function renderMedicos(){
    const container = document.querySelector('#medicos-container');
    const medicos =  await fetchMedicos();
    
    console.log(medicos)

    medicos.forEach(medico =>{
        container.innerHTML += 
        `<div class='medico-card'>
            <input type="radio" name="medico" id="${medico.id}" value="${medico.nome}">
            <label for='${medico.id}'>
                <span class='nome-medico'>${medico.nome}</span>
            </label>
        </div>
        `
    })

}

function escolherMedico(){
    const medico = document.querySelector('input[name=medico]:checked').value;
    const campoMedico = document.querySelector('#agendar-medico');
    campoMedico.value = medico;
}


window.addEventListener('load', renderMedicos())