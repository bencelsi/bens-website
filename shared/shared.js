if (location.hostname === "") {
    document.title = document.title.toLowerCase()
}

function get(id) { return document.getElementById(id) }

function getAll(clazz) { return document.getElementsByClassName(clazz) }

function random(min, max) { return (min + (Math.floor(Math.random() * (max - min)))) }

function shuffle(array) {
    for (i = 0; i < array.length; i++) {
        randomIndex = random(i, array.length - 1)
        temp = array[i]
        array[i] = array[randomIndex]
        array[randomIndex] = temp
    }
}

function playSound(name, volume = 1, format='.wav') {
    audio = new Audio();
    audio.volume = volume
    audio.src = 'aud/' + name + format
    audio.play();
}

function increment(value, maxValue) { return value == maxValue ? 0 : value + 1 }

function decrement(value, maxValue) { return value == 0 ? maxValue : value - 1 }
