import { useDebugValue, useState } from 'react'

import '../styles/tasklist.scss'

import { FiTrash, FiCheckSquare } from 'react-icons/fi'

interface Task {
  id: number;
  title: string;
  isComplete: boolean;
}

export function TaskList() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [newTaskTitleError, setSewTaskTitleError] = useState(false)

  function handleCreateNewTask() {
    if(newTaskTitle.length === 0){
      setSewTaskTitleError(true)
    }else{
      const id = Math.floor(Date.now() * Math.random())
      setTasks([...tasks, { id: id, title: newTaskTitle, isComplete: false }])
      setNewTaskTitle('')
    }
  }

  function handleToggleTaskCompletion(id: number) {
    setTasks([
      ...tasks.map((value) => {
        return {...value, isComplete: value.id === id ? !value.isComplete : value.isComplete }
      })
    ])
  }

  function handleRemoveTask(id: number) {
    setTasks([
      ...tasks.filter((value) => value.id != id)
    ])
  }

  return (
    <section className="task-list container">
      <header>
        <h2>Minhas tasks</h2>

        <div className="input-group">
          <div>
            <input 
              type="text" 
              placeholder="Adicionar novo todo" 
              onChange={(e) => { 
                setSewTaskTitleError(false)
                setNewTaskTitle(e.target.value)
              }}
              onKeyDown={(e) => e.key === 'Enter' && handleCreateNewTask()}
              value={newTaskTitle}
            />
            <button type="submit" data-testid="add-task-button" onClick={handleCreateNewTask}>
              <FiCheckSquare size={16} color="#fff"/>
            </button>
          </div>
          {
            newTaskTitleError &&
            <span>Campo obrigatório!</span>
          }
        </div>
      </header>

      <main>
        <ul>
          {tasks.map(task => (
            <li key={task.id}>
              <div className={task.isComplete ? 'completed' : ''} data-testid="task" >
                <label className="checkbox-container">
                  <input 
                    type="checkbox"
                    readOnly
                    checked={task.isComplete}
                    onClick={() => handleToggleTaskCompletion(task.id)}
                  />
                  <span className="checkmark"></span>
                </label>
                <p>{task.title}</p>
              </div>

              <button type="button" data-testid="remove-task-button" onClick={() => handleRemoveTask(task.id)}>
                <FiTrash size={16}/>
              </button>
            </li>
          ))}
          
        </ul>
      </main>
    </section>
  )
}