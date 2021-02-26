var searchInput = document.getElementById("input")

var text = document.getElementById("autocomplete");

searchInput.addEventListener("keypress", search1)

function search1(evt) {
    
    searchInput.addEventListener("onkeyup", suggestions())
    
    if (evt.keyCode == 13) {
        dispDetails(searchInput.value)
    }
}
function suggestions() {

    var url = `https://pokeapi.co/api/v2/pokemon?limit=400/`
    console.log(url)

    fetch(url)
        .then((res) => {
            return res.json()
        })
        .then((data) => {

            var pokemons = data.results /*accessing results inside json data*/
            
            var suggestNames = pokemons.filter(pokemon => {
                const regex = new RegExp(`^${searchInput.value}`, 'gi')
                return pokemon.name.match(regex)
            })
            var a = suggestNames.map(suggestionName =>
                `<li class="fetchedname" onclick = "showWhenClicked(this)">${suggestionName.name}</li>`).join("<hr>")
            var b =document.getElementById("autocomplete")
            b.innerHTML = a
            /* supposed to hide the autocomplete class when string value is 0 (but its not working) 
            if (suggestions.length === 0) {
                suggestNames = []
                text.innerHTML = ''
            }*/
            
        })
}
function dispDetails(name) {
    var url2 = `https://pokeapi.co/api/v2/pokemon/${name}`
    fetch(url2)
        .then((res2) => {
            return res2.json()
        })
        .then((data2) => {
            console.log(data2)
            var pokeimg = document.querySelectorAll(".box")
            document.querySelector(".weight").innerHTML = `Weight: ${data2.weight}`
            document.querySelector(".height").innerHTML = `Height: ${data2.height}`
            document.querySelector(".name").innerHTML = `${data2.name}`
            pokeimg.forEach(pokeimg => pokeimg.src = `${data2.sprites.front_default}`)
        })
}
function showWhenClicked(element) {
    let x = element.textContent
    /*hide the suggestions when clicked in the same */
    var d = document.getElementById("autocomplete")
    d.innerHTML = ''
    console.log(x)
    dispDetails(x)
    
}
function hideSuggestions(val) {
    document.getElementById("autocomplete").innerHTML = ''
}



/*
console.log(suggestNames)
var pokeimg = document.querySelectorAll(".box")
document.querySelector(".weight").innerHTML = `Weight: ${suggestNames.url.weight}`
document.querySelector(".height").innerHTML = `Height: ${suggestNames.height}`
document.querySelector(".name").innerHTML = `${suggestNames.name}`
pokeimg.forEach(pokeimg => pokeimg.src = `${suggestNames.sprites.front_default}`)*/