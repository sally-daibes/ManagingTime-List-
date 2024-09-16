import { useState } from 'react';
import InputBox from './components/InputBox.jsx';
import H2 from './components/H2.jsx';
import ToDoList from './components/ToDoList.jsx';
import Button from './components/Button.jsx';
import DeleteButton from './components/DeleteButton.jsx';

function App() {
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState('all');

  function handleAddTask(task) {
    if (task.trim()  !== '') {
      const newTask = { text: task, isCompleted: false };
      setTasks((prevTasks) => [...prevTasks, newTask]);
    }
  }

  function handleEditTask(index, newTask) {
    const updatedTasks = tasks.map((task, i) => 
      i === index ? { ...task, text: newTask } : task
    );
    setTasks(updatedTasks);
  }

  function handleDeleteTask(index) {
    const updatedTasks = tasks.filter((task, i) => i !== index);
    setTasks(updatedTasks);
  }

  function handleCompleteOrUncompleteTask(index) {
    const updatedTasks = tasks.map((task, i) => 
      i === index ? { ...task, isCompleted: !task.isCompleted } : task
    );
    setTasks(updatedTasks);
  }

  function handleDeleteAllTasks(){
    setTasks([]);
  }

  function handleDeleteDoneTasks(){

    const updatedTasks = tasks.filter((task) => !task.isCompleted);
    setTasks(updatedTasks);
  }

  return (
    <div className='w-11/12 flex justify-center flex-col m-auto'>
      <H2>To Do Input</H2>
      <InputBox onAddTask={handleAddTask} />

      <div className="flex justify-center space-x-4 w-full mt-4">
        <Button onClick={() => setFilter('all')}>All</Button>
        <Button onClick={() => setFilter('completed')}>Done</Button>
        <Button onClick={() => setFilter('pending')}>To Do</Button>
      </div>

      <H2>To Do List</H2>
      <ToDoList
        tasks={tasks}
        filter={filter}
        onEditTask={handleEditTask}
        onDeleteTask={handleDeleteTask}
        onCompleteOrUncompleteTask={handleCompleteOrUncompleteTask}
      />

<div className="flex justify-center space-x-4 w-full mt-4">
      <DeleteButton onClick={handleDeleteDoneTasks} >Delete Done Tasks</DeleteButton>
      <DeleteButton onClick={handleDeleteAllTasks} >Delete All Tasks</DeleteButton>
      </div>

    </div>
  );
}

export default App;
