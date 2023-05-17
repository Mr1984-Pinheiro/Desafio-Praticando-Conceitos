
import plus from "./assets/plus.svg"
import styles from "./App.module.css"
import { ChangeEvent, FormEvent, InvalidEvent, KeyboardEvent, useState } from "react"
import { Todo } from "./components/Todo";
import { ClipboardText } from "phosphor-react";
import { Header } from "./components/Header";


interface Task {
  id: number;
  title: string;
  isComplete: boolean;
}


function App() {

  const [tasks, setTasks] = useState<Task[]>([]);   
  const [newTaskTitle, setNewTaskTitle] = useState('');

  function handleCreateNewTask(event: FormEvent) {
    event.preventDefault();
    if (!newTaskTitle) return;

    const newTask = {
      id: Math.random(),
      title: newTaskTitle,
      isComplete: false,
    }

    setTasks(oldStage => [...oldStage, newTask]);
    setNewTaskTitle('');
  }

  function deleteTodo (id: number ){
    const filteredTasks = tasks.filter(task => task.id !== id);
    setTasks(filteredTasks);
    
  }  

  function taskCompleted (id: number) {
    const newTasks = tasks.map(task => task.id === id ? {
      ...task, 
      isComplete: !task.isComplete,
    } : task );

    setTasks(newTasks);
  }

  function handleNewTodoChange(event: ChangeEvent<HTMLInputElement>) {
    event.target.setCustomValidity('');
    setNewTaskTitle(event.target.value);
  }

  function handleHotKeySubmit(event: KeyboardEvent) {
    const newTask = {
      id: Math.random(),
      title: newTaskTitle,
      isComplete: false,
    }

    if(newTaskTitle.length !== 0) {
      if(event.key === "Enter" && (event.ctrlKey || event.metaKey)) {
        setTasks(oldStage => [...oldStage, newTask]);
        setNewTaskTitle('');
      }
    }
   
  }

  function handleNewTodoInvalid(event: InvalidEvent<HTMLInputElement>){
    event.target.setCustomValidity('Esse campo é obrigatório!');
  }

  const isNewTodoEmpty = newTaskTitle.length === 0;
  const totalTasks = tasks.length
  const completedTasks = tasks.filter(task => task.isComplete).length

  return (
    <div>
      <Header />

      <div className={styles.container}>

      <form onSubmit={handleCreateNewTask} className={styles.newTodoForm}>
        
        <input 
          placeholder="Adicione uma nova tarefa"
          name="todo"
          value={newTaskTitle}
          onChange={handleNewTodoChange}
          onKeyDown={handleHotKeySubmit}
          onInvalid={handleNewTodoInvalid}
          required
        />
        

        <button 
          type="submit" 
          disabled={isNewTodoEmpty}
        >
          Criar
          <img src={plus} alt="" />
        </button>
      </form>

      <div className={styles.tasksContainer}>

        <div className={styles.info}>
              <div className={styles.created}>
                <strong>Tarefas criadas</strong>
                <span>{totalTasks}</span>
              </div>
              <div className={styles.done}>
                <strong>Concluidas</strong>
                <span>{completedTasks} de {totalTasks}</span>
              </div>
        </div> 
        <div className={styles.list}>
          
          
          {tasks.map(task => {
            return (
              <Todo 
              key={task.id}
              isComplete={task.isComplete}
              title={task.title} 
              id={task.id}
              ondeleteTodo={deleteTodo}
              taskCompleted={taskCompleted}
              />
            )
          })}

          {tasks.length <= 0 && (
            <section className={styles.tasksEmpty}>
              <ClipboardText size={50} />
              <div>
                <p>Você ainda não tem tarefas cadastradas</p>
                <span>Crie tarefas e organize seus itens a fazer</span>
              </div>
            </section>
          )}
            
          </div> 
      </div>
      </div>
    </div>
  )
}

export default App
