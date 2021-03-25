// URL da API

function procurarLetra(artista, musica) {
    return fetch(`https://api.lyrics.ovh/v1/${artista}/${musica}`);
    // https://api.lyrics.ovh/v1/xuxa/lua_de_cristal
}

// Cancelando a função de enviar padrão do button

const form = document.querySelector('.text-area');
form.addEventListener('submit', el => {
    el.preventDefault();
    doSubmit();
})

 function doSubmit() {
    const caixa = document.querySelector('.caixa');
    const boxLetra = document.querySelector('#box-lyrics');
    const title = document.querySelector('.title'); 
    const letra = document.querySelector('.lyrics');
    const artista = document.querySelector('#artista');
    const music = document.querySelector('#music');

    boxLetra.innerHTML = '<img src="SVG/loader.svg" alt="loading...">';
    
    procurarLetra(artista.value, music.value)
        .then(response => response.json())
        .then(data => {
            if(data.lyrics) {
                var nameMusic = music.value; 
                caixa.classList.add('box-lyrics');
                boxLetra.innerHTML = '';
                title.innerText = nameMusic.toUpperCase();
                letra.innerHTML = data.lyrics;
            } else {
                letra.innerText = data.error;
            }
        })
        .catch(err => {
            console.log(`Opss ${err}`);
        })

    // async await

    // const lyricResponse = await procurarLetra(artista.value, music.value );
    // const data = await lyricResponse.json();
    // letra.innerText = data.lyrics;
}