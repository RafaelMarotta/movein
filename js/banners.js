
loadBanners()

$(window).scroll(function () {
    // End of the document reached?
    if ($(document).height() - $(this).height() == $(this).scrollTop()) {
        loadMore()
    }
}); 

let page = 1
const TOKEN = "81e988dee5b3f851450b3b2944b14aca"
const BASE_URL = "https://api.themoviedb.org/3/movie/popular?api_key={{apiKey}}&language=pt-BR&page={{page}}"

async function loadBanners() {
    const cardBanner = await fetch("./components/banner.html")
        .then(response => response.text())
    console.log(getUrl())
    json = await fetch(getUrl()).then(data => data.json())
    json.results.forEach(element => {
        loadBanner(cardBanner, element)
    })
}

function loadMore() {
    page++;
    loadBanners()
}

function getUrl() {
    url = BASE_URL.replace("{{apiKey}}", TOKEN)
    url = url.replace("{{page}}", page)
    return url
}

async function loadBanner(cardBanner, movie) {
    banner = cardBanner.replace("{{titulo}}", movie.title)
    banner = banner.replace("{{data}}", getDataFormatada(movie.release_date))
    banner = banner.replace("{{imagem}}", movie.poster_path)
    banner = banner.replace("{{texto}}", textEllipsis(movie.overview, 75))
    banner = banner.replace("{{id}}", movie.id)
    $("#bannerContainer").append(banner)
}

function getDataFormatada(dataFromJson) {
    let data = new Date(dataFromJson)
    return ((data.getDate()+1)) + "/" + ((data.getMonth() + 1)) + "/" + data.getFullYear();
}

function textEllipsis(str, maxLength, { side = "end", ellipsis = "..." } = {}) {
    if (str.length > maxLength) {
        switch (side) {
            case "start":
                return ellipsis + str.slice(-(maxLength - ellipsis.length));
            case "end":
            default:
                return str.slice(0, maxLength - ellipsis.length) + ellipsis;
        }
    }
    return str;
}