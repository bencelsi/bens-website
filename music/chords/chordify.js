const SECTION = 'section'; const CHORDS = 'chords'; const LYRICS = 'lyrics'

const BUTTONS = get('buttons')
if (BUTTONS != null) {
    BUTTONS.innerHTML = 
`<div id='buttons'>
Sections <input type="checkbox" id="sectionBox" checked>
    Lyrics <input type="checkbox" id="lyricBox" checked>
    Chords <input type="checkbox" id="chordBox" checked>
    Centered <input type="checkbox" id="centerBox">
</div>`
}

const SONG = get('song')

let text = SONG.innerHTML.split('\n')
let result = ''
// TODO- automatically center with whitespace
// when we see a chord line -
// add whitespace to the shorter line

for (let i = 0; i < text.length; i++) {
    let line = text[i]
    if (lineType(line) == SECTION) { result += "<span class='section'>" + line.substring(0, line.length - 2) + '</span>' } 
    else if (lineType(line) == CHORDS) { 
        line = line.substring(0, line.length - 1)
        let nextLine = text[i + 1]
        if (lineType(nextLine) == LYRICS) {
            let diff = ' '.repeat(Math.abs(line.length - nextLine.length))
            if (line.length < nextLine.length) line += diff
            else text[i + 1] += diff
        }
        result += "<span class='chords'>" + line + '</span>'
    }
    else { result += "<span class='lyrics'>" + line + '</span>' }
    result += '\n'
}
SONG.innerHTML = result

function lineType(line) {
    if (line == null) return null
    if (line.endsWith('``')) return SECTION
    if (line.endsWith('`')) return CHORDS
    return LYRICS
}
const CENTER_BOX = get('centerBox')

if (CENTER_BOX != null) {
    function setCentered() { SONG.style.textAlign = CENTER_BOX.checked ? 'center' : 'left'; }
    setCentered()
    CENTER_BOX.onclick = setCentered
}

setup('section', 'sectionBox')
setup('chords', 'chordBox')
setup('lyrics', 'lyricBox')

function setup(name, boxName) {
    let elements = document.getElementsByClassName(name)    
    let box = get(boxName)
    if (box == null || elements == null) return
    let refresh = () => {
        for (i = 0; i < elements.length; i++) {
            elements[i].style.display = box.checked ? 'inline-block' : 'none'
        }
    }
    box.onclick = refresh; refresh()
}

function get(id) { return document.getElementById(id) }