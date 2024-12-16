let isLocal = location.hostname === "" ? true : false
if (isLocal) {
    document.title = "." + document.title
}

function get(id) { return document.getElementById(id) }

function getAll(clazz) { return document.getElementsByClassName(clazz) }

function random(min, max) { return (min + (Math.floor(Math.random() * (max + 1 - min)))) }

function increment(value, maxValue) { return value === maxValue ? 0 : value + 1 }

function decrement(value, maxValue) { return value === 0 ? maxValue : value - 1 }

function shuffle(array) {
    for (i = 0; i < array.length; i++) {
        randomIndex = random(i, array.length - 1)
        temp = array[i]
        array[i] = array[randomIndex]
        array[randomIndex] = temp
    }
}

let audio = new Audio();
function playSound(name, volume = 1, format='.wav') { 
    console.log(name)
    audio.volume = volume
    let src = name + format
    if (audio.src != src) { audio.src = src }
    audio.play();
}

try {
    get("home").innerHTML = 
    // `<img src='../shared/bens.jpg' style='width: 125px'>`
    `<img src='../gifs/earth3.gif' >`
// `<div>
//     <img src='gif/letters/B1.gif'/>
//     <img src='gif/letters/E1.gif'/>
//     <img src='gif/letters/N1.gif'/>
//     <img src='gif/letters/apostrophe.gif'/>
//     <img src='gif/letters/S1.gif'/>
//     <span><h3>W E B S I T E ! ! !</h3></span>
// </div>`
} catch(e) {}
