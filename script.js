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

  const checkWin = () => {
    let winArray = [];
    for(let i = 0; i<winConditions.length;i++){
      winConditions[i].forEach((index,j) => {
        winArray[j] = gameBoard.board[index];
      })
      console.log(winArray);
      if(winArray[0]!='' && winArray[0]==winArray[1] && winArray[1] == winArray[2]){
        console.log(`${winArray[0]} wins!`);
      }
    }
  }

  let turn='X';
  const buttons = document.querySelectorAll('.xo');
  const start = () => buttons.forEach((button,index) => button.addEventListener('click',
  ()=>{
    Player().state(index,turn);
    checkWin();
    if(turn == 'X'){turn = 'O'}
    else {turn = 'X'}
  },{
  once:true //removes event listener once triggered
  }));

  return {start}
})(Player);

game.start();
displayController.updateDisplay();
