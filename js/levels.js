
function easyMode(){
    gLevel.SIZE = 4
    gLevel.MINES = 2
    buildBoard()
    renderBoard(gBoard)
}

function mediumMode(){
    gLevel.SIZE = 8
    gLevel.MINES = 14
    buildBoard()
    renderBoard(gBoard)
}

function hardMode(){
    gLevel.SIZE = 12
    gLevel.MINES = 32
    buildBoard()
    renderBoard(gBoard)
}
