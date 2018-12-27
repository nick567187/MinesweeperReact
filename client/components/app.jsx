import React from 'react';
import Difficulty from './difficulty.jsx';
import Board from './board.jsx';

class App extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			diffSelect: true,
			cols: 0,
			rows: 0,
			mines: 0
		} 
		this.selectDifficulty = this.selectDifficulty.bind(this);
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
      });
  }

	render() {
    let { diffSelect, cols, rows, mines } = this.state;

    return (
      <div>
	      <h1 style={{'marginLeft': '20%'}}> Minesweeper </h1>
	      {diffSelect ? (
	      	<Difficulty selectDifficulty={this.selectDifficulty}/>
	      	) : (
		      <Board cols={cols} rows={rows} mines={mines}/>
		      )}
	    </div>  
    );
	}
}

export default App;