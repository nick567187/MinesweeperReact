import React from 'react';
import styles from './cell.css';

const Cell = (props) => {
	    let cellStyle;
	    let view = ' ';
	    if (props.revealed) {
	    	view = props.neighbors > 0 ? props.neighbors : props.value;
	    	cellStyle = styles.pressed;
	    } else {
	    	cellStyle = styles.cell;
	    }
	  return (
	    <span className={cellStyle} onClick={() => props.revealSquare(props.i, props.j)}> { view } </span>
	  );	
};

export default Cell;