# Infotecs testcase-2 website

Test website for Infotecs

## Stack

- React via create-react-app (with react-responsive-modal)
- HTML5 & SASS
- JavaScript

## Project Structure

```bash
src
├── App.jsx -> main component of app (with app context)
├── App.module.css
├── components
│   ├── EditTaskModal.jsx -> component with modal view of edit task
│   ├── Header.jsx -> component with header (include sort & filter logic)
│   ├── Header.module.scss
│   ├── NewTaskModal.jsx -> component with modal view of new task
│   ├── NewTaskModal.module.scss
│   ├── TaskCard.jsx -> component of task card item
│   └── TaskCard.module.scss
├── icons -> project svg icons
│   ├── icon-date.svg
│   ├── icon-delete.svg
│   ├── icon-done.svg
│   ├── icon-edit.svg
│   ├── icon-filter.svg
│   ├── icon-plus.svg
│   ├── icon-sort.svg
│   └── icon-submit.svg
├── index.css
├── index.js
└── utils
    └── local-storage.jsx -> contains functions to work with local storage (create task, get tasks, etc.)
```