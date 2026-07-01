let isLocal = location.hostname == ""
if (isLocal) document.title = "." + document.title

const LOCALS = getAll('local')
if (isLocal) { for (let local of LOCALS) local.style.display = 'block' }

function get(id) { return document.getElementById(id) }

function getAll(name) {
    let byClass = document.getElementsByClassName(name)
    if (byClass.length != 0) return byClass
    return document.getElementsByTagName(name)
}

// to use: await d(1);
function d(seconds) { return new Promise(resolve => setTimeout(resolve, seconds * 1000)) }

function random(min, max) { return (min + (Math.floor(Math.random() * (max + 1 - min)))) }

function increment(value, maxValue) { return value === maxValue ? 0 : value + 1 }

function decrement(value, maxValue) { return value === 0 ? maxValue : value - 1 }

async function displayTotal() {
	await d(1);
	const hours = Math.floor(totalLength / 3600);
	const minutes = Math.floor((totalLength / 60) % 60);
	const seconds = Math.floor(totalLength % 60).toString().padStart(2, '0');
	totalLengthDiv.innerHTML = '(Total Length: ' +
		(hours == 0 ? `${minutes}:${seconds})` : `${hours}:${minutes}:${seconds})`)
}

function shuffle(array) {
    for (i = 0; i < array.length; i++) {
        randomIndex = random(i, array.length - 1)
        temp = array[i]
        array[i] = array[randomIndex]
        array[randomIndex] = temp
    }
}

let sounds = new Audio();
function playSound(name, volume = 1, audio = sounds) { 
    audio.volume = volume
    let src = name + (name.includes('.') ? '' : '.wav')
    console.log(src)
    if (audio.src != src) { audio.src = src }
    audio.play();
}

try {
    get("home").innerHTML = 
    // `<img src='../shared/bens.jpg' style='width: 125px'>`
    `<img src='../shared/gif/earth3.gif' >`
// `<div>
//     <img src='shared/gif/letters/B1.gif'/>
//     <img src='shared/gif/letters/E1.gif'/>
//     <img src='shared/gif/letters/N1.gif'/>
//     <img src='shared/gif/letters/apostrophe.gif'/>
//     <img src='shared/gif/letters/S1.gif'/>
//     <span><h3>W E B S I T E ! ! !</h3></span>
// </div>`
} catch(e) {}

function removeExtension(str) { return str.split('.').slice(0, -1).join('.') }