appendNavbar()
async function appendNavbar() {
    const text = await fetch("./components/navbar.html")
        .then(data => data.text())
    $("#navbar").append(text)
}