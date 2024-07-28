import styles from './Header.module.scss'
import { useContext, useState } from 'react';
import Modal from 'react-responsive-modal';
import NewTaskModal from './NewTaskModal';
import { AppContext } from '../App';
import LocalStorage from '../utils/local-storage';
import IconPlus from '../icons/icon-plus.svg'
import IconSort from '../icons/icon-sort.svg'
import IconFilter from '../icons/icon-filter.svg'

const FilterTypes = ["All", "Completed", "In progress"];
const SortTypes = ["None", "Date up", "Date down"];

export default function Header() {
  const [viewNewTaskModal, setViewNewTaskModal] = useState(false);
  const [filter, setFilter] = useState({ open: false, state: "All" });
  const [sort, setSort] = useState({ open: false, state: "None" });
  const appContext = useContext(AppContext);

  const tasksApplySort = (state) => {
    if (state.filterType) setFilter({...filter, state: state.filterType});
    if (state.sortType) setSort({...sort, state: state.sortType});

    let tasks = LocalStorage.getTasks();

    switch(state.filterType || filter.state) {
      case "Completed": 
        tasks = tasks.filter((item) => item.progress === "completed");
        break;

      case "In progress": 
        tasks = tasks.filter((item) => item.progress === "active");
        break;
    }

    switch(state.sortType || sort.state) {
      case "None":
        break;
      case "Date up": 
        tasks = tasks.toSorted((a, b) => new Date(a.date) - new Date(b.date));
        break;

      case "Date down": 
        tasks = tasks.toSorted((a, b) => new Date(b.date) - new Date(a.date));
        break;
    }

    appContext.setTasks(tasks);
  }

  return (
    <header>
      <h2>@infotecs-testcase-2</h2>

      <button onClick={() => setViewNewTaskModal(true)}>
        <img src={IconPlus} alt='done' />
        New Task
      </button>

      <img 
        src={IconSort} 
        alt='sort' 
        onMouseEnter={() => setSort({...sort, open: true})}
        onMouseLeave={() => setSort({...sort, open: false})}
        className={sort.state !== "None" ? styles.img_selected : ""}
      />
      
      <img 
        src={IconFilter} 
        alt='filter'
        onMouseEnter={() => setFilter({...filter, open: true})}
        onMouseLeave={() => setFilter({...filter, open: false})}
        className={filter.state !== "All" ? styles.img_selected : ""}
      />

      <div 
        className={sort.open ? styles.sort_menu_opened : styles.sort_menu} 
        onMouseEnter={() => setSort({...sort, open: true})}
        onMouseLeave={() => setSort({...sort, open: false})}
      >
        {
          SortTypes.map((item) => 
            <button 
              key={item}
              className={sort.state === item ? styles.button_selected : ""}
              onClick={() => tasksApplySort({ sortType: item })}
            >
              {item}
            </button>
          )
        }
      </div>

      <div 
        className={filter.open ? styles.sort_menu_opened : styles.sort_menu} 
        onMouseEnter={() => setFilter({...filter, open: true})}
        onMouseLeave={() => setFilter({...filter, open: false})}
      >
        {
          FilterTypes.map((item) => 
            <button 
              key={item}
              className={filter.state === item ? styles.button_selected : ""}
              onClick={() => tasksApplySort({ filterType: item })}
            >
              {item}
            </button>
          )
        }
      </div>

      <Modal open={viewNewTaskModal} onClose={() => setViewNewTaskModal(false)} center>
        <NewTaskModal closeModal={() => setViewNewTaskModal(false)}/>
      </Modal>
    </header>
  );
}