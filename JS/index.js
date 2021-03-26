// Consts
const caixa = document.querySelector('.caixa');
const boxLoading = document.querySelector('#box-loading');
const title = document.querySelector('.title'); 
const letra = document.querySelector('.lyrics');
const artista = document.querySelector('#artista');
const music = document.querySelector('#music');
    
// URL da API
function procurarLetra(artista, musica) {
       return fetch(`https://api.lyrics.ovh/v1/${artista}/${musica}`);
}

// Cancelando a função de enviar padrão do button
const form = document.querySelector('.text-area');
form.addEventListener('submit', el => {
    el.preventDefault();
    doSubmit();
})


 function doSubmit() {
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
            if(data.lyrics) {
                title.style.display = "block";
                letra.style.display = "block";
                var nameMusic = music.value; 
                caixa.classList.add('box-lyrics');
                boxLoading.innerHTML = '';
                title.innerText = nameMusic.toUpperCase();
                letra.innerHTML = data.lyrics;
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