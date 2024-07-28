import styles from './NewTaskModal.module.scss'
import React, { useContext, useState } from 'react';
import LocalStorage from '../utils/local-storage';
import { AppContext } from '../App';
import IconPlus from '../icons/icon-plus.svg'

export default function NewTaskModal({closeModal = () => {}}) {
  const [error, setError] = useState(false);
  const formRef = React.createRef();
  const context = useContext(AppContext);

  const handleOnClick = () => {
    const newTask = Object.fromEntries(new FormData(formRef.current))

    if ((newTask.date === "") || (newTask.title === "")) {
      setError(true);
      return;
    } else {
      newTask.progress = "active";
      newTask.id = Math.random().toString(36).substring(2, 18);

      LocalStorage.createTask(context, newTask);
      closeModal();
    }
  }

  return (
    <div className={styles.container}>
      <h2>New Task</h2>
      <form ref={formRef}>
        <label htmlFor="date">Deadline</label>
        <input name='date' type='date' onFocus={(e) => e.target.min = new Date().toISOString().split('T')[0]} max="2099-12-31"/>
        <label htmlFor="title">Title</label>
        <input name='title' type='text' placeholder='Create infotecs testcase' />
        <label htmlFor="content">Note</label>
        <textarea name='content' type='text' placeholder='Complete first testcase and then second' />
      </form>
      <p className={error ? styles.error : styles.error_hidden}>Please, fill all fields</p>
      <button onClick={() => handleOnClick()}>
        <img src={IconPlus} alt='done' />
        Add task
      </button>
    </div>
  );
}