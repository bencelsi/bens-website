let text = document.getElementById("song").innerHTML.split("\n")
let result = ""
for (let i = 0; i < text.length; i++) {
    console.log(i)
    let line = text[i]
    if (line.endsWith("``")) {
        let clazz = "section"
        result += "<span class='" + clazz + "'>" + line.substring(0, line.length - 2) + "</span>"
    } else if (line.endsWith("`")) {
        let clazz = "chords"
        result += "<span class='" + clazz + "'>" + line.substring(0, line.length - 1) + "</span>"
    } else {
        result += line
    }
    result += "\n"
}
document.getElementById("song").innerHTML = result