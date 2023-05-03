 const inputTarefa = document.querySelector('.inputtarefa')
 const btnTarefa = document.querySelector('.btn-tarefa')
 const tarefas = document.querySelector('.tarefas')
 btnTarefa.setAttribute('title', 'Clique aqui para adicionar uma tarefa')

function criaLi() {
    const li = document.createElement('li')
    return li
}

function criaTarefa(texto) {
    const li = criaLi()
    li.innerHTML = texto
    tarefas.appendChild(li)
    limpaInput();
    botaoApagar(li)
    salvarTarefa()
 }

inputTarefa.addEventListener('keypress', function(e) {
    if (e.keyCode === 13) {
        if (!inputTarefa.value) return
        criaTarefa(inputTarefa.value)
    }
})

btnTarefa.addEventListener('click', function (e) {
    if (!inputTarefa.value) return;
    criaTarefa(inputTarefa.value)
 });


function limpaInput() {
    inputTarefa.value = '';
    inputTarefa.focus();
}

function botaoApagar(li) {
    li.innerText += ' '
    const botaoapagar = document.createElement('button');
    botaoapagar.innerText = 'Apagar tarefa'
    botaoapagar.setAttribute('class', 'apagar')
    botaoapagar.setAttribute('title', 'Clique aqui para apagar esta tarefa da lista.')
    li.appendChild(botaoapagar)
}

document.addEventListener('click', function(e) {
    el = e.target;
    if (el.classList.contains('apagar')) {
        el.parentElement.remove()
        salvarTarefa()
    }
})

function salvarTarefa() {
    const liTarefas = tarefas.querySelectorAll('li')
    const listaTarefas = []
    for (let tarefa of liTarefas) {
        let tarefaTexto = tarefa.innerText
        tarefaTexto = tarefaTexto.replace('Apagar tarefa', '').trim()
        listaTarefas.push(tarefaTexto)
    }
    const tarefasJSON = JSON.stringify(listaTarefas)
    localStorage.setItem('tarefas', tarefasJSON)
}

function carregarTarefas() {
    const tarefas = localStorage.getItem('tarefas')
    const listaDeTarefas = JSON.parse(tarefas)
    
    for (let tarefa of listaDeTarefas) {
        criaTarefa(tarefa)
    }
}
carregarTarefas()



