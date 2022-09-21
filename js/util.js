function buildBoard() {
    gBoard = []
    for (var i = 0; i < gLevel.SIZE; i++) {
        gBoard[i] = []
        for (var j = 0; j < gLevel.SIZE; j++) {
            gBoard[i][j] = {
                minesAroundCount: -1,
                isShown: true,
                isMine: false,
                isMarked: false
            }
            arrLocations.push({ i, j })
        }
    }
    console.table(gBoard)
}


function renderBoard(board) {

    var strHTML = '<table border="1"><tbody>'
    for (var i = 0; i < board.length; i++) {

        strHTML += '<tr>'
        for (var j = 0; j < board[0].length; j++) {

            strHTML += `<td class="cell-${i}-${j}" data-i="${i}" data-j="${j}" onClick="cellClicked(this,${i},${j})"></td>`
        }
        strHTML += '</tr>'
    }
    strHTML += '</tbody></table>'

    var elDiv = document.querySelector('.board')
    elDiv.innerHTML = strHTML

}

function showAllMines(){
    for (var i = 0; i < gLevel.SIZE; i++) {
        for (var j = 0; j < gLevel.SIZE; j++) {
            if(gBoard[i][j].isMine){
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