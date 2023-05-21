async function buscaEndereco(cep) {
    var mensagemErro = document.querySelector('#erro');
    mensagemErro.innerHTML = "";
    try {
        var consultaCep = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
        var consultaCepConvertida = await consultaCep.json();
        if (consultaCepConvertida.erro) {
            throw Error('CEP não existente!');
        }
        var cidade = document.querySelector('#cidade');
        var logradouro = document.querySelector('#endereco');
        var bairro = document.querySelector('#bairro');
        var estado = document.querySelector('#estado');

        cidade.value = consultaCepConvertida.localidade;
        logradouro.value = consultaCepConvertida.logradouro;
        bairro.value = consultaCepConvertida.bairro;
        estado.value = consultaCepConvertida.uf; 

        console.log(consultaCepConvertida);
        return (consultaCepConvertida);
    } catch (erro) {
        mensagemErro.innerHTML = `<p>CEP inválido. Tente novamente!</p>`;
        console.log(erro)
    }
}

var cep = document.querySelector('#cep');
cep.addEventListener("focusout", () => buscaEndereco(cep.value));