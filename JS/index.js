// Consts
const caixa = document.querySelector('.caixa');
const boxLoading = document.querySelector('#box-loading');
const title = document.querySelector('.title'); 
const letra = document.querySelector('.lyrics');
const artista = document.querySelector('#artista');
const music = document.querySelector('#music');
    
// URL da API
function procurarLetra(artista, musica) {
    return fetch(`https://api.vagalume.com.br/search.php?art=${artista}&mus=${musica}&apikey=7a44796f0d4bba952b8d3936ffe32dd9`);
}

// Cancelando a função de enviar padrão do button
const form = document.querySelector('.text-area');
form.addEventListener('submit', el => {
    el.preventDefault();
    doSubmit();
})

const doSubmit = () => {
    boxLoading.innerHTML = '';
    title.innerText = '';
    letra.innerHTML = '';
    caixa.classList.remove('box-lyrics');
    title.style.display = "none";
    letra.style.display = "none";
    boxLoading.innerHTML = '<img src="SVG/loader.svg" alt="loading...">';

    procurarLetra(artista.value, music.value)
        .then(response => response.json())
        .then(data => {
            console.log(data.mus[0])
            if(data.mus[0]) {
                title.style.display = "block";
                letra.style.display = "block";
                var nameMusic = data.mus[0].name; 
                caixa.classList.add('box-lyrics');
                boxLoading.innerHTML = '';
                title.innerText = nameMusic.toUpperCase();
                letra.innerHTML = data.mus[0].text;
            } else {
                boxLoading.innerHTML = '<img src="IMG/animatio-not-found.gif" alt="not found">';
                title.style.display = "block";
                letra.style.display = "block";
                title.innerText = 'Desculpe, problema inesperado:(';
            }
        })
        .catch(err => {
            boxLoading.innerHTML = '<img src="IMG/animatio-not-found.gif" alt="not found">';
            title.style.display = "block";
            letra.style.display = "block";
            title.innerText = 'Desculpe, problema inesperado :(';
        })
}