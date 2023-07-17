function generateSentence(desc, arr) {
    let sentence = `The ${arr.length} ${desc} are `
    for (let i = 0; i < arr.length; i++) {
        if (i === arr.length - 1) {
            sentence += `and ${arr[i]}`
        } else {
            sentence += `${arr[i]}, `
        }
    }
    return sentence
}