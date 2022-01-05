const X_CLASS = 'x'
const CIRCLE_CLASS = 'circle'

const WINNING_COMBINATIONS = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
]

// created 'cell elements' and set it equal to all the 'data-cell' divs
const cellElements = document.querySelectorAll('[data-cell]')

const board = document.getElementById('board')
const winningMessageElement = document.getElementById('winningMessage')

const restartButton = document.getElementById('restartButton')
const winningMessageTextElement = document.querySelector('[data-winning-message-text]')

//this is defined so that it can be used in currentClass to allow for the differentiating of a circle class and an cross class
let circleTurn

startGame()

restartButton.addEventListener('click', startGame)

// now 'cell elements' can be used to specify what logic is required to happen 
//  for each cell when clicked using an event listener and handle click function
//  which has its logic specified further down

// { once:true } stops multiple markers being placed in the same cell as thats cheating

// allows for the game to be initiated & setBoardHoverClass function to be called
//so the hover function is active on the first turn

function startGame() {
    circleTurn = false;
    cellElements.forEach(cell => {
        cell.classList.remove(X_CLASS)
        cell.classList.remove(CIRCLE_CLASS)
        cell.removeEventListener('click', handleClick)
        cell.addEventListener('click', handleClick, { once:true })
    })
    setBoardHoverClass()
    winningMessageElement.classList.remove('show')
}


// the handle click function essentially contains a series of functions 
// which allow for a naught or cross marker to be placed then change to allow the next player to
// place their opposite marker
// also has logic to check if the game has been won or is a draw after each marker is placed

function handleClick(e) {
    const cell = e.target
    const currentClass = circleTurn ? CIRCLE_CLASS : X_CLASS
    // place a mark
    placeMark(cell, currentClass)
    //check for win & check for draw
    if (checkWin(currentClass)){
        gameOver(false)
    } else if (isDraw()) {
        gameOver(true)
    } else {
    // switch turns
    switchturns()
    //set the class of hover feature
    setBoardHoverClass()
}
}

// logic for the functions within the handle click funtion specified below
//looks cleaner and easier to edit debug if i find a problem 

function placeMark(cell, currentClass){
    cell.classList.add(currentClass)
}

function switchturns() {
    circleTurn = !circleTurn
}

function setBoardHoverClass() {
    board.classList.remove(X_CLASS)
    board.classList.remove(CIRCLE_CLASS)
    if (circleTurn) {
        board.classList.add(CIRCLE_CLASS)
    } else {
        board.classList.add(X_CLASS)
    }

}

function checkWin(currentClass) {
    return WINNING_COMBINATIONS.some(combination => {
        return combination.every(index => {
            return cellElements[index].classList.contains(currentClass)
        })
    })
}

function isDraw() {
    return [...cellElements].every(cell => {
        return cell.classList.contains(X_CLASS) ||
        cell.classList.contains(CIRCLE_CLASS)
    })
}

function gameOver(draw) {
    if (draw){
        winningMessageTextElement.innerText = 'Draw! No Winner'
    } else {
        winningMessageTextElement.innerText = `${circleTurn ? "O's" : "X's" } Win The Game`
    }
    winningMessageElement.classList.add('show')
}