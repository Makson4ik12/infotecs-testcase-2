import styles from './TaskCard.module.scss'
import { useContext, useState } from 'react'
import Modal from 'react-responsive-modal'
import LocalStorage from '../utils/local-storage'
import { AppContext } from '../App'
import EditTaskModal from './EditTaskModal'
import IconDelete from '../icons/icon-delete.svg'
import IconEdit from '../icons/icon-edit.svg'
import IconDate from '../icons/icon-date.svg'
import IconDone from '../icons/icon-done.svg'

export default function TaskCard({task}) {
  const [viewEditTaskModal, setViewEditTaskModal] = useState(false);
  const context = useContext(AppContext);

  return (
    <div className={styles.container}>
      <div className={styles.title_container}>
        <h1>{task.title}</h1>
        {
          task.progress === "active" ?
            <img src={IconEdit} alt='edit' onClick={() => setViewEditTaskModal(true) }/>
          : <></>
        }
        <img src={IconDelete} alt='delete' onClick={() => LocalStorage.deleteTask(context, task.id) } />
      </div>
      
      <div className={styles.date_container}>
        <img src={IconDate} alt='date' />
        <p className={styles.text_date}>{task.date}</p>
        <p className={task.progress === "active" ? styles.badge_active : styles.badge_completed}>
          { task.progress === "active" ? "in progress" : "completed" }
        </p>
      </div>
      
      <pre className={styles.text_content}>{task.content}</pre>

      {
        task.progress === "active" ?
          <button onClick={() => LocalStorage.updateTask(context, task.id, {progress: "completed"})}>
            <img src={IconDone} alt='done'/>
            Done
          </button>
        : <></>
      }

      <Modal open={viewEditTaskModal} onClose={() => setViewEditTaskModal(false)} center>
        <EditTaskModal closeModal={() => setViewEditTaskModal(false)} task={task}/>
      </Modal>
    </div>
  );
}