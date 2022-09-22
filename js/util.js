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

function showAllMines(){
    for (var i = 0; i < gLevel.SIZE; i++) {
        for (var j = 0; j < gLevel.SIZE; j++) {
            if(gBoard[i][j].isMine){
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
    }
    return color
}
