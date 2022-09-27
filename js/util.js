function buildBoard() {
    gBoard = []
    for (var i = 0; i < gLevel.SIZE; i++) {
        gBoard[i] = []
        for (var j = 0; j < gLevel.SIZE; j++) {
            gBoard[i][j] = {
                minesAroundCount: -1,
                isShown: false,
                isMine: false,
                isMarked: false
            }
            arrLocations.push({ i, j })
        }
    }

}


function renderBoard(board) {

    var strHTML = '<table border="1"><tbody>'
    for (var i = 0; i < board.length; i++) {

        strHTML += '<tr>'
        for (var j = 0; j < board[0].length; j++) {

            strHTML += `<td class="cell-${i}-${j}" data-i="${i}" data-j="${j}" 
            oncontextmenu="cellMarked(${i},${j})" onClick="cellClicked(this,${i},${j})"></td>`
        }
        strHTML += '</tr>'
    }
    strHTML += '</tbody></table>'

    var elDiv = document.querySelector('.board')
    elDiv.innerHTML = strHTML

}

function showAllMines() {
    for (var i = 0; i < gLevel.SIZE; i++) {
        for (var j = 0; j < gLevel.SIZE; j++) {
            if (gBoard[i][j].isMine) {
                var elCell = document.querySelector(`.cell-${i}-${j}`)
                elCell.style.backgroundColor = 'rgb(179, 169, 169)'
                renderCell(i, j, MINE)
            }
        }
    }
}

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
}

function renderCell(i, j, value) {
    const elCell = document.querySelector(`.cell-${i}-${j}`)
    elCell.innerHTML = value
}
var gTimer = 0
var gFullNum = ''
function setTimer() {

    var elTimer = document.querySelector('.timer')
    var a = Date.now()
    gTimer = setInterval(() => {
        var b = Date.now()
        var seconds = `${Math.floor((b - a) / 1000)}`
        var miliScn = `${((b - a) / 1000) - Math.floor((b - a) / 1000)}`
        gFullNum = `${(+seconds) + (+miliScn)}`
        while (gFullNum.length < seconds.length + 4) {
            if (gFullNum.length === seconds.length) {
                gFullNum += '.000'
                break
            }
            gFullNum += '0'
        }
        elTimer.innerHTML = `TIMER: ${gFullNum}`
    }, 37)

}

function setNumColor(numCount) {
    var color = ''
    switch (numCount) {
        case 1:
            color = 'blue'
            break;
        case 2:
            color = 'green'
            break;
        case 3:
            color = 'red'
            break;
        case 4:
            color = 'yellow'
            break;
        case 5:
            color = 'brown'
            break;
        case 6:
            color = 'purple'
            break;
        case 7:
            color = 'orange'
            break;
        case 8:
            color = 'pink'
            break;

    }
    return color
}

function darkMode(elBtn) {
    if (!gGame.isDark) {
        document.querySelector('body').style.backgroundColor = 'rgb(15, 126, 126)'
        document.querySelector('h1').style.backgroundColor = 'rgb(99, 42, 152)'
        document.querySelector('h1').style.color = 'rgb(174, 108, 82)'
        elBtn.innerText = 'light mode'
    } else {
        document.querySelector('body').style.backgroundColor = 'rgb(114, 209, 209)'
        document.querySelector('h1').style.backgroundColor = 'rgb(178, 112, 240)'
        document.querySelector('h1').style.color = 'rgb(215, 187, 144)'
        elBtn.innerText = 'dark mode'
    }

    gGame.isDark = !gGame.isDark
}

function undo() {
    var lastMove = gKeptMoves.pop()
    while (gBoard[lastMove[0].i][lastMove[0].j].isMarked) {
        lastMove = gKeptMoves.pop()
    }
    console.log(lastMove);
    for (var i = 0; i < lastMove.length; i++) {

        var elCell = document.querySelector(`.cell-${lastMove[i].i}-${lastMove[i].j}`)
        elCell.style.backgroundColor = 'grey'
        renderCell(lastMove[i].i, lastMove[i].j, '')
        gBoard[lastMove[i].i][lastMove[i].j].isShown = false
        if (!gBoard[lastMove[i].i][lastMove[i].j].isMine) gGame.gCountClicked--

    }
}

function safeClickes(elBtn) {
    gGame.countSafeClickes--
    if (gGame.countSafeClickes < 0) return

    var safeLocations = []
    for (var i = 0; i < gLevel.SIZE; i++) {
        for (var j = 0; j < gLevel.SIZE; j++) {
            if (!gBoard[i][j].isShown && !gBoard[i][j].isMine) safeLocations.push({ i, j })
        }
    }
    var safeLocation = safeLocations[getRandomInt(0, safeLocations.length)]
    elBtn.innerHTML = `${gGame.countSafeClickes} safe clicks`
    var elCell = document.querySelector(`.cell-${safeLocation.i}-${safeLocation.j}`)
    elCell.style.backgroundColor = 'rgb(216, 109, 109)'
    setTimeout(() => {
        elCell.style.backgroundColor = 'gray'
    }, 500);
}

function hints(elBtn) {
    gGame.countHints--
    if (gGame.countHints < 0) return
    gGame.isHint = true
    elBtn.innerHTML = `${gGame.countHints} hints`
}

function showHint(rowIdx, colIdx) {
    var cells = []
    for (var i = rowIdx - 1; i <= rowIdx + 1; i++) {
        if (i < 0 || i >= gBoard.length) continue
        for (var j = colIdx - 1; j <= colIdx + 1; j++) {
            if (j < 0 || j >= gBoard[0].length) continue
            if (!gBoard[i][j].isShown) {
                cells.push({i, j})
                if (gBoard[i][j].minesAroundCount >= 1) {

                    renderCell(i, j, gBoard[i][j].minesAroundCount)
                    var elCell = document.querySelector(`.cell-${i}-${j}`)
                    var color = setNumColor(gBoard[i][j].minesAroundCount)
                    elCell.style.color = color
                    elCell.style.backgroundColor = 'rgb(179, 169, 169)'

                } else if (gBoard[i][j].minesAroundCount === 0) {

                    var elCell = document.querySelector(`.cell-${i}-${j}`)
                    elCell.style.backgroundColor = 'rgb(179, 169, 169)'

                }else if(gBoard[i][j].isMine){
                    renderCell(i, j, MINE)
                    var elCell = document.querySelector(`.cell-${i}-${j}`)
                    elCell.style.backgroundColor = 'rgb(179, 169, 169)'
                }
            }
        }
    }

    setTimeout(() => {
        for (var i = 0; i < cells.length; i++) {
            renderCell(cells[i].i, cells[i].j, '')
            var elCell = document.querySelector(`.cell-${cells[i].i}-${cells[i].j}`)
            elCell.style.backgroundColor = 'grey'
        }
    }, 1000);
    gGame.isHint = !gGame.isHint

}


