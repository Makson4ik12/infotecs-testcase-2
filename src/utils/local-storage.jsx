const tableName = "my-tasks-table";

/*
Task:
id: string
title: string
date: string
content: string
progress: "active" | "completed"
*/

export default class LocalStorage {
  static createTask = (context, task) => {
    const table = JSON.parse(localStorage.getItem(tableName) || '[]') || [];
    let values = Array.from(table);

    values.push(task);
    localStorage.setItem(tableName, JSON.stringify(Array.from(values)));

    context.setTasks(prevState => [...prevState, task]);
  }

  static updateTask = (context, id, task_updated) => {
    const table = JSON.parse(localStorage.getItem(tableName) || '[]') || [];
    let values = Array.from(table);

    const taskIDx = values.findIndex((item) => item.id === id);
    
    values[taskIDx] = {
      ...values[taskIDx],
      title: task_updated.title || values[taskIDx].title,
      date: task_updated.date || values[taskIDx].date,
      content: task_updated.content || values[taskIDx].content,
      progress: task_updated.progress || values[taskIDx].progress,
    }

    localStorage.setItem(tableName, JSON.stringify(Array.from(values)));
    context.setTasks(values);
  }

  static deleteTask = (context, id) => {
    const table = JSON.parse(localStorage.getItem(tableName) || "") || [];
    let values = Array.from(table);

    values.splice(values.findIndex((item) => item.id === id), 1);
    localStorage.setItem(tableName, JSON.stringify(Array.from(values)));

    context.setTasks(values);
  }

  static getTasks = () => {
    const table = JSON.parse(localStorage.getItem(tableName) || '[]') || [];
    return Array.from(table);
  }
}