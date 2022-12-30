let words: string[] = [
    'PLATO',
    'DATOS',
    'CAMILA',
    'BUS',
    'INGLES'
]

export function getRandomWord() {

    const randomIndex = Math.floor(Math.random() * words.length)
    return words[randomIndex]
}