const $cells = document.querySelectorAll(".cell")
const $currentPlayer = document.querySelector("#current-player")
const $resetBtn = document.querySelector("#reset-btn")

const PLAYER_ONE_MARK = "x"
const PLAYER_TWO_MARK = "o"

const WIN_COMBINATIONS = [
    // Horizontal.
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    
    // Vertical.
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],

    // Diagonal.
    [0, 4, 8],
    [2, 4, 6]
]
const cellsArray = [
    "", "", "",
    "", "", "",
    "", "", ""
]

let currentPlayer = PLAYER_ONE_MARK
let isRunning = false

function getCell(index) {
	return cellsArray[index]
}

function setCell(index, value) {
	$cells[index].textContent = value
	cellsArray[index] = value
}

function clearCell() {
	for (i in cellsArray) {
		setCell(i, "")
	}
}
function isCellEmpty(index) {
	return getCell(index) == ""
}

function nextPlayer() {
	currentPlayer = currentPlayer == PLAYER_ONE_MARK ? PLAYER_TWO_MARK : PLAYER_ONE_MARK
	$currentPlayer.textContent = currentPlayer
}

function playerWins() {
    for (const combination of WIN_COMBINATIONS) {
        if (getCell(combination[0]) == currentPlayer && 
			getCell(combination[1]) == currentPlayer && 
			getCell(combination[2]) == currentPlayer) {
            return true
        }
    }
    return false
}

function PlayerTies() {
    for (const cell of cellsArray) if (cell == "") return false
	return true
}

function resetGame(){
    currentPlayer = PLAYER_ONE_MARK
    $currentPlayer.textContent = currentPlayer
    $resetBtn.setAttribute("disabled", "disabled")
    
    clearCell()
    isRunning = true
}

function cellClickHandler(ev) {
    if (!isRunning) return
    
    if ($resetBtn.getAttribute("disabled")) {
        $resetBtn.removeAttribute("disabled")
    }
    const selectedCellIndex = ev.target.getAttribute("cell-index")
    
    if (isCellEmpty(selectedCellIndex)) {
        setCell(selectedCellIndex, currentPlayer)
        if (playerWins()) {
            window.alert(`Player ${currentPlayer.toUpperCase()} Wins!`)
            isRunning = false
        } else if (PlayerTies()) {
			window.alert("Tie!")
            isRunning = false
        } else {
            nextPlayer()
        }
    }
}

$cells.forEach((cell) => cell.addEventListener("click", cellClickHandler))
$resetBtn.addEventListener("click", resetGame)

resetGame()