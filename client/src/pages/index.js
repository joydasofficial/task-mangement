import { useState } from "react";
import styles from "@/styles/Home.module.css";
import ShowLists from "@/components/ShowLists";
import Lists from "../data/Lists";

export default function Home() {
  const [listName, setListName] = useState("");
  const [task, setTask] = useState("");
  const [show, setShow] = useState(0);

  const handleSave = () => {
    let res = Lists.findIndex((e) => {
      if (e.listname === listName) {
        return e;
      }
    });

    if (res >= 0) {
      Lists[res].tasks.push({
        task: task,
      });
    } else {
      Lists.push({
        listname: listName,
        tasks: [
          {
            task: task,
          },
        ],
      });
    }
    setShow(show + 1);
    console.log(Lists);
  };

  return (
    <>
      <main className={styles.main}>
        <div className={styles.mainContainer}>
          <div className={styles.innerContainer}>
            <h1>Task Manager</h1>
            <input
              type="text"
              value={listName}
              onChange={(e) => setListName(e.target.value)}
              placeholder="Enter List Name"
            />
            <textarea
              type="text"
              value={task}
              onChange={(e) => setTask(e.target.value)}
              placeholder="Enter Task"
            />
            <button onClick={handleSave} className={styles.button}>
              Save
            </button>
          </div>
        </div>
        <div className={styles.listContainer}>{show > 0 && <ShowLists />}</div>
      </main>
    </>
  );
}
