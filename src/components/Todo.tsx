import { Check, Trash } from "phosphor-react";
import styles from "./Todo.module.css"

 interface TodoType {
    title: string;
    ondeleteTodo: (id: number) => void;
    isComplete: boolean;
    id: number;
    taskCompleted: (id: number) => void;
}



export function Todo ({ title, ondeleteTodo, isComplete, id, taskCompleted }: TodoType) {
    function handleDeleteTodo() {
        ondeleteTodo(id);
    }

    function handleTaskCompleted() {
        taskCompleted(id);
        
     }

    return(
        <div className={styles.taskItem}>

            <button 
                
                className={isComplete ? styles.btnComplete : styles.buttonRadio}
                onClick={handleTaskCompleted}
                >
                <Check  size={17.5} />
            </button>
              
              <p className={isComplete ? styles.taskComplete : ""}>{title}</p>

            <button 
                onClick={handleDeleteTodo} 
                className={styles.buttonTrash}
            >

            <Trash size={20} />  

            </button>
              
            </div>
    )
}