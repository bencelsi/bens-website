const SECTION = 'section'; 
const CHORDS = 'chords'; 
const LYRICS = 'lyrics'
const OPTIONS = get('options')

if (OPTIONS != null) {
    OPTIONS.innerHTML = 
`<div id='optionsToggle'>...</div><div id='buttons'>
    Chords <input type="checkbox" id="chordBox" checked>
    Lyrics <input type="checkbox" id="lyricBox" checked>
    Sections <input type="checkbox" id="sectionBox" checked>
    Centered <input type="checkbox" id="centerBox">
    Transpose: 
    <div style="display: flex; flex-direction: column; gap: 10px;">
        <button style="height: 25px; width: 25px; background: black; color: white;" id="transposeUp">+</button>   
        <button style="height: 25px; width: 25px; background: black; color: white;" id="transposeDown">-</down>
    </div>
    
</div>`
}

const OPTIONS_BUTTONS = get('buttons')
const TOGGLE = get('optionsToggle')
const CENTER_BOX = get('centerBox')
const TRANSPOSE_UP = get('transposeUp')
const TRANSPOSE_DOWN = get('transposeDown')

let transpose = 0;

let optionsOpen = false
TOGGLE.onclick = () => {
    optionsOpen = !optionsOpen
    OPTIONS_BUTTONS.style.display = optionsOpen ? 'flex' : 'none'
    TOGGLE.innerHTML = optionsOpen ? '(close)' : '...'
}

const scale = ['A', 'Bb', 'B', 'C', 'C#', 'D', 'Eb', 'E', 'F', 'F#', 'G', 'Ab'];

// Map notes to their respective indices for quick lookup
const noteToIdx = {
    'A': 0, 'Bb': 1, 'B': 2, 'C': 3, 'C#': 4, 'D': 5, 
    'Eb': 6, 'E': 7, 'F': 8, 'F#': 9, 'G': 10, 'Ab': 11
};

const SONG = get('song')
let text = SONG.innerHTML.split('\n')

function render() {
    let result = ''
    // TODO- automatically center with whitespace
    // when we see a chord line -
    // add whitespace to the shorter line
    //console.log(text)
    
    for (let i = 0; i < text.length; i++) {
        let line = text[i]
        if (lineType(line) == SECTION) { 
            result += "<span class='section'>" + line.substring(0, line.length - 2) + '</span>' 
        } else if (lineType(line) == CHORDS) { 
            line = line.substring(0, line.length - 1)
            line = transposeLine(line, transpose)
            let nextLine = text[i + 1]
            if (lineType(nextLine) == LYRICS) {
                let diff = ' '.repeat(Math.abs(line.length - nextLine.length))
                if (line.length < nextLine.length) line += diff
                else text[i + 1] += diff
            }
            result += "<span class='chords'>" + line + '</span>'
        } else { 
            result += "<span class='lyrics'>" + line + '</span>'
        }
        result += '\n'
    }
    SONG.innerHTML = result
}

render()


function lineType(line) {
    if (line == null) return null
    if (line.endsWith('``')) return SECTION
    if (line.endsWith('`')) return CHORDS
    return LYRICS
}


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

TRANSPOSE_UP.onclick = () => { transpose += 1; render() }

TRANSPOSE_DOWN.onclick = () => { transpose -= 1; render() }

// Process a line containing chords, preserving the spacing/positioning
function transposeLine(line, steps) {
    // Regex to find chunks of non-whitespace characters (the chords)
    return line.replace(/\S+/g, (chord) => {
        // Skip the trailing backtick marker itself
        if (chord === '`') return chord;
        
        // If the backtick is attached to the last chord (e.g., "G`"), strip it, transpose, and re-attach
        if (chord.endsWith('`')) return transposeChord(chord, steps) + '`';
        
        return transposeChord(chord, steps);
    });
}

// Helper to transpose a single chord
function transposeChord(chord, steps) {
    if (!chord.trim()) return chord;

    // Regex to match the root note, capital letter followed optionally by '#' or 'b'
    const match = chord.match(/^([A-G][b#]?)/);
    if (!match) return chord; // Return as-is if it doesn't match a known note pattern

    const rootNote = match[1];
    const extension = chord.slice(rootNote.length); // e.g., "m7", "sus4"
    
    const currentIdx = noteToIdx[rootNote];
    if (currentIdx === undefined) return chord; // Fallback if note isn't in our map

    // Calculate new index, handling negative modulo for down-transposition
    let newIdx = (currentIdx + steps) % 12;
    if (newIdx < 0) newIdx += 12;

    const newRootNote = scale[newIdx];
    return newRootNote + extension;
}

function get(id) { return document.getElementById(id) }
