const SONG = document.getElementById("song")

let text = SONG.innerHTML.split("\n")
let result = ""
for (let i = 0; i < text.length; i++) {
    console.log(i)
    let line = text[i]
    if (line.endsWith("``")) { result += "<span class='section'>" + line.substring(0, line.length - 2) + "</span>" } 
    else if (line.endsWith("`")) { result += "<span class='chords'>" + line.substring(0, line.length - 1) + "</span>" }
    else { result += "<span class='lyrics'>" + line + "</span>" }
    result += "\n"
}
SONG.innerHTML = result

const CHORD_BOX = document.getElementById("chordBox")
const LYRIC_BOX = document.getElementById("lyricBox")
const CENTER_BOX = document.getElementById("centerBox")
const CHORDS = document.getElementsByClassName("chords")
const LYRICS = document.getElementsByClassName("lyrics")


function setCentered() {
    SONG.style.textAlign = CENTER_BOX.checked ? 'center' : 'left' 
}
setCentered()
CENTER_BOX.onclick = setCentered


function setChords() {
    for (i = 0; i < CHORDS.length; i++) CHORDS[i].style.visibility = CHORD_BOX.checked ? 'visible' : 'hidden'
}
setChords()
CHORD_BOX.onclick = setChords


function setLyrics() {
    for (i = 0; i < LYRICS.length; i++) LYRICS[i].style.visibility = LYRIC_BOX.checked ? 'visible' : 'hidden'
}
setLyrics()
LYRIC_BOX.onclick = setLyrics