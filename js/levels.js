var gElBtn = document.querySelector('.levels')
function easyMode() {
    gGame.isOn = true
    gLevel.SIZE = 4
    gLevel.MINES = 3
    gElBtn.style.display = 'none'
    var elFace = document.querySelector('.face')
    elFace.innerText = SMILING
     var elTimer = document.querySelector('.timer')
    elTimer.style.display = 'block'
    var elLives = document.querySelector('.lives')
    elLives.style.display = 'block'
    buildBoard()
    renderBoard(gBoard)
    setTimer()
}

function mediumMode() {
    gGame.isOn = true
    gLevel.SIZE = 8
    gLevel.MINES = 14
    gElBtn.style.display = 'none'
    var elFace = document.querySelector('.face')
    elFace.innerText = SMILING
     var elTimer = document.querySelector('.timer')
    elTimer.style.display = 'block'
    var elLives = document.querySelector('.lives')
    elLives.style.display = 'block'
    buildBoard()
    renderBoard(gBoard)
    setTimer()
}

function hardMode() {
    gGame.isOn = true
    gLevel.SIZE = 12
    gLevel.MINES = 32
    gElBtn.style.display = 'none'
    var elFace = document.querySelector('.face')
    elFace.innerText = SMILING
     var elTimer = document.querySelector('.timer')
    elTimer.style.display = 'block'
    var elLives = document.querySelector('.lives')
    elLives.style.display = 'block'
    buildBoard()
    renderBoard(gBoard)
    setTimer()
}
