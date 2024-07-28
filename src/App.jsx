import styles from './App.module.css';
import 'react-responsive-modal/styles.css';
import React, { useEffect, useState } from 'react';
import Header from './components/Header';
import TaskCard from './components/TaskCard';
import LocalStorage from './utils/local-storage';

export const AppContext = React.createContext();

function App() {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    setTasks(LocalStorage.getTasks());
  }, []);

  return (
    <AppContext.Provider value={{tasks: tasks, setTasks: setTasks}}>
      <div className={styles.app}>
        <Header />
        <div className={styles.cards_container}>
          { 
            tasks.map((task) => 
              <TaskCard 
                key={task.id}
                task={task}
              />
            )
          }
        </div>
      </div>
    </AppContext.Provider>
  );
}

export default App;
