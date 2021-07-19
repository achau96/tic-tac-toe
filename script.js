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

return {updateDisplay}
})(gameBoard.board);

const Player = () => {
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
  return {state};
}

const game = ((Player)=>{
  let turn='X';
  const buttons = document.querySelectorAll('.xo');
  const start = () => buttons.forEach((button,index) => button.addEventListener('click',
  ()=>{
    Player().state(index,turn);
    if(turn == 'X'){turn = 'O'}
    else {turn = 'X'}
  },{
  once:true //removes event listener once triggered
  }));

  return {start};
})(Player);

game.start();
displayController.updateDisplay();
