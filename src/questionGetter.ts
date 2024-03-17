import path from "path"
import fs from "fs"

const txtPath = path.join(process.cwd(), "questions.txt")
const txt = fs.readFileSync(txtPath, "utf-8")
const questions = txt.split("\n")

export async function getRandomQuestionFromTxt() {
    let randomIndex = Math.floor(Math.random() * questions.length)

    // make sure question starts with "Most likely"
    while (!questions[randomIndex].startsWith("Most likely")) {
        randomIndex = Math.floor(Math.random() * questions.length)
    }

    return questions[randomIndex]
}