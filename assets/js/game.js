const textElement = document.getElementById('text')
const optionButtonsElement = document.getElementById('option-buttons')

let state = {}
var characters = {
    "MC": {
        name: "MC",
        health: 100,
        attack: 10,
        defense: 5,
        imageUrl: ""
    },
    "Spider": {
        name: "Spider",
        health: 50,
        attack: 8,
        defense: 5,
        imageUrl: ""
    }
}

function startGame() {
  state = {}
}