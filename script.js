const gameBoard = (()=>{
const board = ['','','','','','','','',''];
return {board};
})();

const displayController = ((board)=>{
const buttons = Array.from(document.querySelectorAll('.xo'));
const updateDisplay = () => buttons.forEach((button,i) => {
  button.value=board[i];
  button.textContent=board[i];
});
const winDisplay = (arr) => {
buttons.forEach(button => {
  if(arr.includes(Number(button.id)))
  button.classList.add("win");
})
}
return {updateDisplay,winDisplay}
})(gameBoard.board);

const Player = (name,marker,turn) => {

  const mark = (index) =>{
    gameBoard.board[index] = marker;
    displayController.updateDisplay();
  }
  const markX = (index) => {
    gameBoard.board[index] = 'X';
    displayController.updateDisplay();
  }
  const markO = (index) => {
    gameBoard.board[index] = 'O';
    displayController.updateDisplay();
  }
  const state = (index,turn) => {
      if(turn=='X'){
        markX(index);
      } else {
        markO(index);
      }
  }
  return {name, state};
}

const game = ((Player)=>{
  const playerOne = Player('playerone', 'X',true);
  const playerTwo = Player('playertwo', 'O',false);
  let turn='X';
  const buttons = document.querySelectorAll('.xo');
  const winner = document.querySelector('.winner');
  const winConditions = [
    [0,1,2], //rows
    [3,4,5],
    [6,7,8],
    [0,3,6], //columns
    [1,4,7],
    [2,5,8],
    [0,4,8],//diagonials
    [2,4,6]
  ];

  const playerMove = (e) => {
    Player().state(e.target.id,turn);
    checkWin();
    if(turn == 'X'){turn = 'O'}
    else {turn = 'X'}
  }

  const checkWin = () => {
    let winStatus = 0;
    let winArray = [];
    for(let i = 0; i<winConditions.length;i++){
      winConditions[i].forEach((index,j) => {
        winArray[j] = gameBoard.board[index];
      })
      if(winArray[0]!='' && winArray[0]==winArray[1] && winArray[1] == winArray[2]){
        winner.textContent = `${winArray[0]} wins!`
        buttons.forEach(button => button.removeEventListener('click', playerMove));
        console.log(winConditions[i]);
        displayController.winDisplay(winConditions[i]);
        winStatus = 1;
      }
    }
    if(winStatus == 0 && !gameBoard.board.includes('')){
      winner.textContent = `It's a TIE!`
    }
  }

  const reset = () => gameBoard.board = ['','','','','','','','',''];
  const start = () => buttons.forEach(button => button.addEventListener('click',
  playerMove,
  {
  once:true //removes event listener once triggered
  }));

  return {start,reset}
})(Player);

game.start();

const restart = document.querySelector('.restart');
restart.addEventListener('click', () => {
  game.reset();
  location.reload();
  game.start();
  displayController.updateDisplay();
})

