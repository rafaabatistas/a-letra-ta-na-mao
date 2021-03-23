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

async function doSubmit() {
    const boxLetra = document.querySelector('#box-lyrics') 
    const letra = document.querySelector('.lyrics');
    const artista = document.querySelector('#artista');
    const music = document.querySelector('#music');

    boxLetra.innerHTML = '<img src="SVG/loader.svg" alt="loading...">';
    // then
    // procurarLetra(artista.value, music.value)
    //     .then(response => response.json())
    //     .then(data => {
    //         if(data.lyrics) {
    //             // boxLetra.classList('.box-lyrics');
    //             letra.innerHTML = data.lyrics;
    //         } else {
    //             letra.innerHTML = data.error;
    //         }
    //     })
    //     .catch(err => {
    //         letra.innerHTML = `Opss ${err}`;
    //     })

    // async await

    const lyricResponse = await procurarLetra(artista.value, music.value );
    const data = await lyricResponse.json();
    letra.innerHTML = data.lyrics;
}