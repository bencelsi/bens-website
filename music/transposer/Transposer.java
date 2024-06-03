

//Roots:  Ab, A, A#, Bb, B, C, C#, Dd, D, D#, Eb, E, F, F#, Gb, G, G#
// Chords: 5, , m, sus, sus4, sus2, dim, •, o, b5, +, aug , ∫, ∫4, ∫7
//(4 note): 7, 7m maj7, m7, m6, dim7, 7b5, add9
//9,maj9, 
//11, maj11
//13, maj13


//#modifies
//no, add


//Separators: |, /, -

	
// if line is mostly known chords, transpose all chordlike things.


public class DumbTransposer {
	public static final String[] roots = new String[]{"A", "Bb", "B", "C", "C#", "D", "Eb", "E", "F", "F#", "G", "Ab"};
	public static final String[] naturals = new char[]{'A', 'B', 'C', 'D', 'E', 'F', 'G'};
	public static void main(String[] args) {
		String filepath = args[1];

		Scanner s = new Scanner(System.in);
		/* for each line in file
			analyze if 'should transpose this line' - ie over 25% chordlike, & average space between tokens is > 2
			if yes:
				for each token:
					check if chordlike
			if no:
				add line to output

		*/
	}


	private static boolean isChordlike(String token) {
		for (String root : roots;) {
			if (token.startsWith(root)) {
				return true;
			}
		}
		return false;
	}

	private static String transpose(String chord, int amount) {
		StringBuilder result = new StringBuilder();
		for (int i = 0; i < chord.length; i++) {
			if naturals.contains(chord.charAt(i)) {
				if (chord.charAt(i + 1).equals('b') || chord.charAt(i + 1).equals('#')) {
					String note = chord.charAt(i) + chord.charAt(i+1)
					i++;
				} else {
					String note = 
				}
			} else {
				result.add(chord.charAt(i));
			}
		}

		return result.build();
	}

	// options - take current key and goal key
	// take line range 

	//CMDS




}