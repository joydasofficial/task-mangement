import React, { useState } from "react";
import Lists from "../../data/Lists";
import MoveList from "../MoveModal";
import styles from "./style.module.css";

//excel export
import * as FileSaver from 'file-saver'
import XLSX from 'sheetjs-style'

const ShowLists = () => {
  const [flag, setFlag] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [taskId, setTaskId] = useState(-1);
  const [indexList, setIndexList] = useState(-1);
  

  const handleDelete = (id, listIndex) => {
    console.log(id);
    if (Lists[listIndex].tasks.length === 1) {
      Lists.splice(listIndex, 1);
    } else {
      Lists[listIndex].tasks.splice(id, 1);
    }
    setFlag(!flag);
  };

  const handleMove = (id, index) => {
    setTaskId(id);
    setIndexList(index);
    setShowModal(true);
  };

  const fileType = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8'
  const fileExtention = '.xlsx'

  const exportToFile = async(listData, filename) => {
    const ws = XLSX.utils.json_to_sheet([listData])
    const wb = { Sheets : {"data" : ws}, SheetNames: ["data"]}
    const excelBuffer = XLSX.write(wb, {bookType: 'xlsx', type: 'array'})
    const data = new Blob([excelBuffer], {type: fileType})
    FileSaver.saveAs(data, filename + fileExtention)
  }

  const handleExport = (index) => {
    let arr = {}
    Lists[index].tasks.map((e, i)=>{
      arr['task '+ (i + 1)] = e.task
    })
    exportToFile(arr, Lists[index].listname)
  }

  return (
    <>
      {Lists.map((e, index) => {
        return (
          <div className={styles.listCard} key={index}>
            <div className={styles.listHeader}>
              <h3>{e.listname}</h3>
              <button className={styles.headerButton} onClick={()=>handleExport(index)}>Export</button>
            </div>

            {e.tasks.map((el, i) => {
              return (
                <div className={styles.tasks} key={i}>
                  <p>{el.task}</p>
                  <button
                    className={styles.button}
                    onClick={() => handleMove(i, index)}
                  >
                    Move
                  </button>
                  <button
                    className={styles.button}
                    style={{ marginLeft: "5px" }}
                    onClick={() => handleDelete(i, index)}
                  >
                    Delete
                  </button>
                  <div>
                    {showModal && taskId === i && index === indexList && (
                      <MoveList
                        setShowModal={setShowModal}
                        taskId={taskId}
                        indexList={indexList}
                      />
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        );
      })}
    </>
  );
};

export default ShowLists;
