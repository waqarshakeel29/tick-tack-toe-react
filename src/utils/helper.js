

const generateRandom = (min, max) => {
    return Math.round(min + Math.random() * (max - min)) + max
}

const generateArray = (rows, columns) => {
    var array = []
    for (let row = 0; row < rows; row++) {
        array.push([])
        for (let column = 0; column < columns; column++) {
            array[row].push(0)
        }
    }
    return array
}

export { generateRandom, generateArray }