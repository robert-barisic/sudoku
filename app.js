document.addEventListener('DOMContentLoaded', () => {
  const grid = document.querySelector('.game')
  const numbers = document.querySelector(".numbers")
  const modes = document.querySelector(".mode")

  const start = document.querySelector(".start")
  const newSudoku = document.querySelector(".newSudoku")

  const squares = []
  let highlightedSquares = []
  let shift = 0

  let phase = 0     // 0: setUp,  1:  inGame


  function init() {
    createBoard()
    createControl()
    start.addEventListener('click', startGame)
    newSudoku.addEventListener('click', clearGame)
  }

  init()

  //create Board
  function createBoard() {
    for (i = 0; i < 81; i++) {
      const square = document.createElement('div')
      square.setAttribute('id', '' + i);
      grid.appendChild(square)
      squares.push(square)
      if ((i + 1) % 3 == 0) {
        square.style.borderRight = '5px solid black'
      }
      if (i >= 18 && i <= 26 || i >= 45 && i <= 53 || i >= 72) {
        square.style.borderBottom = '5px solid black'
      }
      square.addEventListener('click', highlight);
    }
  }

  function createControl() {
    for(i = 1; i < 10; i++){
      const number = document.createElement('div')
      numbers.appendChild(number)
      number.innerHTML = '' + i
    }

    for(i = 1; i < 5; i++){
      const mode = document.createElement('div')
      modes.appendChild(mode)
      if(i == 1){
        mode.innerHTML = 'big Number'
      }
      else if(i == 2){
        mode.innerHTML = 'corner Number'
      }
      else if(i == 3){
        mode.innerHTML = 'small Number'
      }
      else{
        mode.innerHTML = 'color'
      }
    }
  }

  function startGame() {
    grid.style.color = 'blue'
  }

  function clearGame() {

  }


  function highlight() {
    if (shift == 0) {
      highlightedSquares.forEach(square => square.style.background = 'white')
      highlightedSquares = []
    }
    if(this.style.background == 'gray'){
      this.style.background = 'white'
      highlightedSquares.splice(highlightedSquares.indexOf(this), 1);
    }
    else {
      this.style.background = 'gray'
      highlightedSquares.push(this)
    }
  }


  //KeyListener
  document.addEventListener('keydown', onKeyDown)
  document.addEventListener('keyup', onKeyUp)

  function onKeyDown(e) {
    if (e.keyCode == 16) {
      shift = 1;
    }
    if (e.keyCode >= 49 && e.keyCode <= 57) {
      highlightedSquares.forEach(square => square.innerHTML = '' + (e.keyCode - 48))
    }
    if (e.keyCode == 8){
      highlightedSquares.forEach(square => square.innerHTML = '')
    }
  }

  function onKeyUp(e) {
    if (e.keyCode == 16) {
      shift = 0;
    }
  }

})