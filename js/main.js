'use strict'
const MINE = '💣'
const FLAG = '🚩'
const SMILING = '😃'
const WINNER = '😎'
const LOSSER = '😭'
var lives = '❤️❤️❤️'
localStorage.setItem('best time', Infinity)

var gLevel = {
    SIZE: 0,
    MINES: 0
};

var gGame = {
    isOn: false,
    shownCount: 0,
    markedCount: 0,
    secsPassed: 0,
    gCountClicked: 0,
    gCountLives: 0,
    isDark: false,
    countSafeClickes: 3,
    isHint: false,
    countHints: 3
}
var gBoard = []
var arrLocations = []
var gCurrGameStatus = {}
var gKeptMoves = []
var cellShown

function restartGame() {
    var elTable = document.querySelector('table')
    setTimeout(() => {
        elTable.style.display = 'none'
        gElBtn.style.display = 'block'
        initGame()
    }, 300);
}

function initGame() {
    clearInterval(gTimer)
    lives = '❤️❤️❤️'
    document.querySelector('.lives').innerText = '❤️❤️❤️'
    var elTimer = document.querySelector('.timer')
    elTimer.style.display = 'none'
    var elLives = document.querySelector('.lives')
    elLives.style.display = 'none'
    document.querySelector('.bonus').style.display = 'none'

    gLevel = {
        SIZE: 0,
        MINES: 0
    };

    gGame = {
        isOn: false,
        shownCount: 0,
        markedCount: 0,
        secsPassed: 0,
        gCountClicked: 0,
        gCountFirstClicked: 0,
        gCountLives: 0,
        isDark: gGame.isDark,
        countSafeClickes: 3,
        isHint: false,
        countHints: 3
    }
    gBoard = []
    arrLocations = []
    gCurrGameStatus = {}
    gKeptMoves = []
}


function cellMarked(i, j) {

    var elTable = document.querySelector('table')
    elTable.addEventListener('contextmenu', event => { event.preventDefault() })
    if (gGame.isHint) return

    if (gBoard[i][j].isShown && !gBoard[i][j].isMine) return
    if (!gBoard[i][j].isMarked && gGame.isOn) {

        gBoard[i][j].isMarked = true
        if (gBoard[i][j].isMine) gGame.markedCount++
        renderCell(i, j, FLAG)

    } else {
        gBoard[i][j].isMarked = false
        if (gBoard[i][j].isMine) gGame.markedCount--
        renderCell(i, j, '')

    }


    if (gGame.gCountClicked === (gLevel.SIZE * gLevel.SIZE) - gLevel.MINES && gGame.markedCount === gLevel.MINES) {
        if ((+gFullNum) < (+localStorage.getItem('best time'))) {
            localStorage.setItem('best time', gFullNum)
            document.querySelector('.best').innerText = `best time:${gFullNum}`
        }
        restartGame()
        var elFace = document.querySelector('.face')
        elFace.innerText = WINNER
    }

}
function cellClicked(elCell, i, j) {
    gGame.gCountFirstClicked++
    if (gGame.gCountFirstClicked === 1) {
        setRandomMineLocations(arrLocations, i, j)
        checkIfNotMine(gBoard)
        console.table(gBoard)
    }
    if (gGame.isHint) {
        showHint(i, j)
    } else {
       
        if (!gBoard[i][j].isShown && gGame.isOn) {
            cellShown = []

            if (gBoard[i][j].minesAroundCount >= 1) {
                cellShown.push({ i, j })
                gGame.gCountClicked++
                var color = setNumColor(gBoard[i][j].minesAroundCount)
                elCell.style.color = color
                elCell.style.backgroundColor = 'rgb(179, 169, 169)'
                renderCell(i, j, gBoard[i][j].minesAroundCount)
                gBoard[i][j].isShown = true

            } else if (gBoard[i][j].minesAroundCount === 0) {
                var elCell = document.querySelector(`.cell-${i}-${j}`)
                elCell.style.backgroundColor = 'rgb(179, 169, 169)'
                setNegsCellsShown(i, j)

            } else if (gBoard[i][j].isMine) {
                cellShown.push({ i, j })

                elCell.style.backgroundColor = 'rgb(179, 169, 169)'
                gGame.gCountLives++
                switch (gGame.gCountLives) {
                    case 1:
                        lives = '❤️❤️'
                        break;
                    case 2:
                        lives = '❤️'
                        break;
                }
                var elLives = document.querySelector('.lives')
                elLives.innerText = lives
                gBoard[i][j].isShown = true
                if (gGame.gCountLives < 3) {
                    renderCell(i, j, MINE)
                } else {
                    var elFace = document.querySelector('.face')
                    elFace.innerText = LOSSER
                    showAllMines()
                    restartGame()
                }

            }
        }
        gKeptMoves.push(cellShown)
        console.log(gKeptMoves);


        if (gGame.gCountClicked === (gLevel.SIZE * gLevel.SIZE) - gLevel.MINES && gGame.markedCount === gLevel.MINES) {
            if ((+gFullNum) < (+localStorage.getItem('best time'))) {
                localStorage.setItem('best time', gFullNum)
                document.querySelector('.best').innerText = `best time:${gFullNum}`
            }
            console.log(gFullNum);
            var elFace = document.querySelector('.face')
            elFace.innerText = WINNER
            restartGame()
        }
    }




}


function setRandomMineLocations(arrLocations, i, j) {
    //i check if the first clicked cell idx is in the array location and remove it in order to not place mine in this cell
    for (var z = 0; z < arrLocations.length; z++) {
        if (arrLocations[z].i === i && arrLocations[z].j === j) {
            arrLocations.splice(z, 1)
        }
    }
    for (var d = 0; d < gLevel.MINES; d++) {
        var randomIdx = arrLocations.splice(getRandomInt(1, arrLocations.length - 1), 1)[0]
        gBoard[randomIdx.i][randomIdx.j].isMine = true
    }
}



function checkIfNotMine(board) {
    for (var i = 0; i < gLevel.SIZE; i++) {
        for (var j = 0; j < gLevel.SIZE; j++) {
            var minesCount = setMinesNegsCount(board, i, j)
            if (!board[i][j].isMine) board[i][j].minesAroundCount = minesCount
        }
    }
}

function setMinesNegsCount(board, rowIdx, colIdx) {
    var minesCount = 0

    for (var i = rowIdx - 1; i <= rowIdx + 1; i++) {
        if (i < 0 || i >= board.length) continue
        for (var j = colIdx - 1; j <= colIdx + 1; j++) {
            if (j < 0 || j >= board[0].length) continue
            var currCell = board[i][j]
            if (currCell.isMine) minesCount++
        }
    }
    return minesCount
}

function setNegsCellsShown(rowIdx, colIdx) {
    for (var i = rowIdx - 1; i <= rowIdx + 1; i++) {
        if (i < 0 || i >= gBoard.length) continue
        for (var j = colIdx - 1; j <= colIdx + 1; j++) {
            if (j < 0 || j >= gBoard[0].length) continue
            if (gBoard[i][j].isMine) continue
            if (!gBoard[i][j].isShown) {
                cellShown.push({ i, j })
                if (gBoard[i][j].minesAroundCount >= 1) {

                    gBoard[i][j].isShown = true
                    gGame.gCountClicked++
                    renderCell(i, j, gBoard[i][j].minesAroundCount)
                    var elCell = document.querySelector(`.cell-${i}-${j}`)
                    var color = setNumColor(gBoard[i][j].minesAroundCount)
                    elCell.style.color = color
                    elCell.style.backgroundColor = 'rgb(179, 169, 169)'

                } else if (gBoard[i][j].minesAroundCount === 0) {

                    gBoard[i][j].isShown = true
                    gGame.gCountClicked++
                    var elCell = document.querySelector(`.cell-${i}-${j}`)
                    elCell.style.backgroundColor = 'rgb(179, 169, 169)'
                    setNegsCellsShown(i, j)
                }
            }
        }
    }

}











