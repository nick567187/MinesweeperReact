import React from 'react';
import styles from './difficulty.css'

const Difficulty = ({selectDifficulty}) => {
	  return (
	    <div className={styles.container}>
        <p className={styles.easy} onClick={selectDifficulty}>Easy</p>
        <p className={styles.medium} onClick={selectDifficulty}>Medium</p>
        <p className={styles.hard} onClick={selectDifficulty}>Hard</p>
	    </div>
	  )	
};

export default Difficulty;