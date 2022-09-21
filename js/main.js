'use strict'
const MINE = '💣'


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
    gCountLives: 0
}
var gBoard = []
var arrLocations = []

function initGame() {

}



function cellClicked(elCell, i, j) {
    gGame.gCountClicked++
    if (gGame.gCountClicked === 1) {
        setRandomMineLocations(arrLocations, i, j)
        checkIfNotMine(gBoard)
        console.table(gBoard)
    }
    if (gBoard[i][j].minesAroundCount >= 1) {
        renderCell(i, j, gBoard[i][j].minesAroundCount)
    } else if (gBoard[i][j].minesAroundCount === 0) {
        setNegsCellsShown(i, j)
    } else if (gBoard[i][j].isMine) {
        gGame.gCountLives++
        if(gGame.gCountLives < 3) {
            renderCell(i, j, MINE)
        }else{
            showAllMines()
            var elTable = document.querySelector('table') 
            setTimeout(() => {
                elTable.style.display = 'none'  
            }, 3000);
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
    var minesCount = 0


    for (var i = rowIdx - 1; i <= rowIdx + 1; i++) {
        if (i < 0 || i >= gBoard.length) continue
        for (var j = colIdx - 1; j <= colIdx + 1; j++) {
            if (j < 0 || j >= gBoard[0].length) continue
            var currCell = gBoard[i][j]
            if (gBoard[i][j].minesAroundCount >= 1) renderCell(i, j, gBoard[i][j].minesAroundCount)
            else if (gBoard[i][j].minesAroundCount === 0) {
                var elCell = document.querySelector(`.cell-${i}-${j}`)
                elCell.style.backgroundColor = 'rgb(179, 169, 169)'
            }
        }
    }
    return minesCount
}






// function setNumColor(numCount) {
//     var color = ''
//     switch (numCount) {
//         case 1:
//             color = 'blue'
//             break;
//         case 2:
//             color = 'green'
//             break;
//         case 3:
//             color = 'red'
//             break;
//         case 4:
//             color = 'yellow'
//             break;
//     }
//     return color
// }

// function renderBoard(board) {

//     var strHTML = '<table border="1"><tbody>'
//     for (var i = 0; i < board.length; i++) {

//         strHTML += '<tr>'
//         for (var j = 0; j < board[0].length; j++) {


//             if (board[i][j].isMine) {
//                 var cell = MINE
//                 strHTML += `<td>${cell}</td>`
//             }
//             else if (board[i][j].minesAroundCount >= 1) {
//                 var cell = board[i][j].minesAroundCount
//                 var numColor = setNumColor(board[i][j].minesAroundCount)
//                 strHTML += `<td class="${numColor}">${cell}</td>`

//             } else strHTML += `<td></td>`


//         }
//         strHTML += '</tr>'
//     }
//     strHTML += '</tbody></table>'

//     var elDiv = document.querySelector('.board')
//     elDiv.innerHTML = strHTML

// }



