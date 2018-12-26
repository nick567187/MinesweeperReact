import React from 'react';
import Cell from './cell.jsx';
import Difficulty from './difficulty.jsx';
import styles from './app.css';

class App extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			diffSelect: true,
			board: [],
			cols: 0
		}
		this.neutralIcon = ' ';
		this.mineIcon = '\\*/'; 
		this.selectDifficulty = this.selectDifficulty.bind(this);
		this.revealSquare = this.revealSquare.bind(this);
	}
  
  selectDifficulty(e) {
  	let text = e.target.innerHTML;
      this.setState(() => { 
        if (text === 'Easy') {
        	return {
      			diffSelect: false,
       		  mines: 10,
        		cols: 10,
      		  rows: 10
    		  };
        } else if (text === 'Medium') {
      		return {
      			diffSelect: false,
       		  mines: 15,
       		  cols: 10,
      		  rows: 13
     		  };
  	    } else {
          return {
      			diffSelect: false,
       		  mines: 20,
      		  cols: 12,
      		  rows: 16
     		  };
  			}
      }, () => this.init());
  }

  init() {
  	let board = this.createBoard(this.state.cols, this.state.rows);
    this.setState({board});
  }

  createBoard(cols, rows) {
    let board = new Array(rows);
    for (var i = 0; i < board.length; i++) {
    	board[i] = new Array(cols);
    }

    for (var i = 0; i < board.length; i++) {
    	for (var j = 0; j < board[i].length; j++) {
    		board[i][j] = {i, j, revealed: false, neighbors: 0, value: this.neutralIcon}
    	}
    }

    this.generateMines(board);
    return board;
  }
  
  generateMines(board) {
    let options = [];
    for (var i = 0; i < board.length; i++) {
    	for (var j = 0; j < board[i].length; j++) {
    		options.push([i, j]);
    	}
    }
    // uniform shuffle for equal probability
    for (var i = 0; i < options.length - 1; i++) {
    	let randIndex = Math.floor(Math.random() * (options.length - i) + i);
    	if (randIndex !== i) {
    		let temp = options[i];
    		options[i] = options[randIndex];
    		options[randIndex] = temp;
    	}
    }
    // place mines
    for (var choice = 0; choice < this.state.mines; choice++) {
    	let option = options[choice];
    	let i = option[0];
    	let j = option[1];
    	board[i][j].value = this.mineIcon
    }
    // count neighbors
    for (var i = 0; i < board.length; i++) {
    	for (var j = 0; j < board[i].length; j++) {
		    this.countNeighbors(i,j,board);
    	}
    }

  }

  countNeighbors(boardI,boardJ,board) {
  	let coordinate = board[boardI][boardJ];
  	if (coordinate.value === this.mineIcon) {
      coordinate.neighbors = -1;
      return;
  	}
  	let total = 0;
    for (var xoff = -1; xoff <= 1; xoff++) {
    	for (var yoff = -1; yoff <= 1; yoff++) {
    		let i = boardI + xoff;
    		let j = boardJ + yoff;
    		if (i > -1 && i < board.length && j > -1 && j < board[0].length) {
	    		let neighbor = board[i][j];
	    		if (neighbor.value === this.mineIcon) {
            total++;
	    		}
    		}
    	}
    }
    coordinate.neighbors = total;
  }
  

  gameOver() {
  	let { board } = this.state;
    for (let i = 0; i < board.length; i++) {
    	for (let j = 0; j < board[i].length; j++) {
		    this.setState((prevState) => {
          let newBoard = prevState.board.slice();
          newBoard[i][j].revealed = true;
          return {
          	board: newBoard
          }
		    });
    	}
    }
  }

  revealSquare(i,j) {
  	let { board } = this.state;

    if (board[i][j].value === this.mineIcon) {
    	this.gameOver();
    }

    this.setState((prevState) => {
      let newBoard = prevState.board.slice();
      newBoard[i][j].revealed = true;
      return {
      	board: newBoard
      }
    }, () => {
    	if (board[i][j].neighbors === 0) {
        this.floodFill(i,j, board);
    	};
    });
  }

  floodFill(boardI,boardJ, board) {
  	for (var xoff = -1; xoff <= 1; xoff++) {
    	for (var yoff = -1; yoff <= 1; yoff++) {
    		let i = boardI + xoff;
    		let j = boardJ + yoff;
    		if (i > -1 && i < board.length && j > -1 && j < board[0].length) {
	    		let neighbor = board[i][j];
	    		if (neighbor.value !== this.mineIcon && !neighbor.revealed) {
            this.revealSquare(i,j);
	    		}
    		}
    	}
    }
  }

	render() {
    let { diffSelect, board, cols } = this.state;
    let boardStyle = null;

    if (cols === 10) {
      boardStyle = styles.easy;
    } else if (cols === 12) {
    	boardStyle = styles.medium;
    } else {
    	boardStyle = styles.hard;
    }

    return (
      <div>
	      <h1> Minesweeper </h1>
	      {diffSelect ? (
	      	<Difficulty selectDifficulty={this.selectDifficulty}/>
	      	) : (
		      <div className={boardStyle}>
		        <React.Fragment>
			      	{board.map(rows => {
			      		return rows.map(item => {
	                return (
	                  <Cell revealSquare={this.revealSquare} i={item.i} j={item.j} value={item.value} neighbors={item.neighbors} revealed={item.revealed}/>                  
	                );
	              })
	            })}
            </React.Fragment>		
		      </div>
		      )}
	    </div>  
    );
	}
}

export default App;