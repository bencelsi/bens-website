JavaScript

class ChordTransposer {
    constructor(divId) {
        this.div = document.getElementById(divId);
        if (!this.div) {
            console.error(`Element with id "${divId}" not found.`);
            return;
        }
        // Store the original text split into lines
        this.lines = this.div.innerText.split('\n');
        
        // The chromatic scale as defined in your prompt
        this.scale = ['A', 'Bb', 'B', 'C', '#', 'D', 'Eb', 'E', 'F', '#', 'G', 'Ab'];
        
        // Map notes to their respective indices for quick lookup
        this.noteToIdx = {
            'A': 0, 'Bb': 1, 'B': 2, 'C': 3, 'C#': 4, 'D': 5, 
            'Eb': 6, 'E': 7, 'F': 8, 'F#': 9, 'G': 10, 'Ab': 11
        };
    }

    // Helper to transpose a single chord token (e.g., "C#m7" or "Bb")
    transposeChord(chord, steps) {
        if (!chord.trim()) return chord;

        // Regular expression to match the root note (e.g., "C#", "Bb", "A")
        // It looks for a capital letter followed optionally by '#' or 'b'
        const match = chord.match(/^([A-G][b#]?)/);
        if (!match) return chord; // Return as-is if it doesn't match a known note pattern

        const rootNote = match[1];
        const extension = chord.slice(rootNote.length); // e.g., "m7", "sus4"
        
        const currentIdx = this.noteToIdx[rootNote];
        if (currentIdx === undefined) return chord; // Fallback if note isn't in our map

        // Calculate new index, handling negative modulo for down-transposition
        let newIdx = (currentIdx + steps) % 12;
        if (newIdx < 0) newIdx += 12;

        const newRootNote = this.scale[newIdx];
        return newRootNote + extension;
    }

    // Process a line containing chords, preserving the spacing/positioning
    transposeLine(line, steps) {
        // Regex to find chunks of non-whitespace characters (the chords)
        return line.replace(/\S+/g, (chord) => {
            // Skip the trailing backtick marker itself
            if (chord === '`') return chord;
            
            // If the backtick is attached to the last chord (e.g., "G`"), strip it, transpose, and re-attach
            if (chord.endsWith('`')) {
                return this.transposeChord(chord.slice(0, -1), steps) + '`';
            }
            
            return this.transposeChord(chord, steps);
        });
    }

    // Core method to shift chords up or down
    transpose(steps) {
        const transposedLines = this.lines.map(line => {
            // Only transpose lines that end with the ` marker
            if (line.trim().endsWith('`')) {
                return this.transposeLine(line, steps);
            }
            return line; // Leave lyrics or unmarked lines alone
        });

        // Update the DOM
        this.div.innerText = transposedLines.join('\n');
    }

    // Public methods for easy control
    transposeUp() {
        this.transpose(1);
    }

    transposeDown() {
        this.transpose(-1);
    }
}


// HTML

// <div id="song-container" style="font-family: monospace; white-space: pre;">
// C#     F#m     G`
// Yesterday, all my troubles seemed so far away
// Ab     Eb7`
// Now it looks as though they're here to stay
// </div>

// <button onclick="transposer.transposeUp()">Transpose Up ⬆️</button>
// <button onclick="transposer.transposeDown()">Transpose Down ⬇️</button>