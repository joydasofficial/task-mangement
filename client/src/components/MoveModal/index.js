import React, {useState} from "react";
import Lists from '../../data/Lists'
import styles from './style.module.css'

const MoveList = ({setShowModal, taskId, indexList}) => {

  const [listId, setListId] = useState(0)

  const handleChange = (event) => {
    setListId(event.target.value);
  }

  const handleMove = () => {
    let el = Lists[indexList].tasks.splice(taskId, 1)
    Lists[Number(listId)].tasks.push(...el)
    
    if(Lists[indexList].tasks.length===0){
      Lists.splice(indexList, 1)
    }

    setShowModal(false)
  }

  return (
    <div className={styles.modal}>
      <select value={listId} onChange={handleChange} className={styles.selectList}>
        {Lists.map((e, i)=>{
          return <option value={i} key={i}>{e.listname}</option>
        })}
      </select>
      <button onClick={handleMove} className={styles.button}>Move</button>
    </div>
  );
};

export default MoveList;
