const BASE_URL = "https://api.themoviedb.org/3/movie/{{movieId}}?api_key=81e988dee5b3f851450b3b2944b14aca&language=pt-BR"

loadMovie()

async function loadMovie() {
    const cardMovie = await fetch("./components/movie.html")
        .then(response => response.text())
    const json = await fetch(getUrl()).then(data => data.json())
    loadMovieContainer(cardMovie, json)
}

async function loadMovieContainer(cardMovie, json) {
    movie = cardMovie.replace("{{background}}", json.backdrop_path)
    movie = movie.replace("{{poster}}", json.poster_path)
    movie = movie.replace("{{Titulo}}", json.title)
    movie = movie.replace("{{Ano}}", getDataFormatada(json.release_date))
    movie = movie.replace("{{Nota}}", json.vote_average)
    movie = movie.replace("{{Sinpose}}", json.overview)
    movie = movie.replace("{{Orcamento}}", getMoneyFormat(json.budget))
    movie = movie.replace("{{Produtora}}", json.production_companies[0].name)
    $("#movieContainer").append(movie)
}

function getDataFormatada(dataFromJson) {
    let data = new Date(dataFromJson)
    return data.getFullYear();
}

function getMoneyFormat(number) {
    var formatter = new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL',
      
        // These options are needed to round to whole numbers if that's what you want.
        //minimumFractionDigits: 0, // (this suffices for whole numbers, but will print 2500.10 as $2,500.1)
        //maximumFractionDigits: 0, // (causes 2500.99 to be printed as $2,501)
      });
      return formatter.format(number)
}

function getUrl() {
    return BASE_URL.replace("{{movieId}}", getMovieId())
}

function getMovieId() {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get('id');
}