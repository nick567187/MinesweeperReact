import React from 'react';
import styles from './cell.css';

const Cell = (props) => {
	    let view = ' ';
	    if (props.revealed) {
	    	view = props.neighbors > 0 ? props.neighbors : props.value;
	    } 
	  return (
	    <span className={styles.cell}> { view } </span>
	  )	
};

export default Cell;