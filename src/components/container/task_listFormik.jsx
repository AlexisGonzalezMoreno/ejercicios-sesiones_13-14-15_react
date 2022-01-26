import React, { useState, useEffect } from 'react';
import { Task } from '../../models/task.class';
import { LEVELS } from '../../models/levels.enum';
import TaskComponent from '../pure/task';

//Importamos la hoja de estilos de task.scss
import '../../styles/task.scss'
import Taskformik from '../pure/forms/taskFormik';

const TaskListformik = () => {

    const defaultTask1 = new Task('Example1', 'Description1', true, LEVELS.NORMAL);
    const defaultTask2 = new Task('Example2', 'Description2', false, LEVELS.URGENT);
    const defaultTask3 = new Task('Example3', 'Description3', false, LEVELS.BLOCKING);

    //Estado del componente
    const [tasks, setTasks] = useState([defaultTask1, defaultTask2, defaultTask3]);
    const [loading, setLoading] = useState(true);

    //Control del ciclo de vida
    useEffect(() => {
        console.log('Task state has been modified');
        setTimeout(() => {
            setLoading(false);
        }, 2000)
        return () => {
            console.log('Task list component is going to unmount');
        };
    }, [tasks]);

    function completeTask(task){
        console.log('Complete this task: ', task);
        const index = tasks.indexOf(task);
        const tempTasks = [...tasks];
        tempTasks[index].completed = !tempTasks[index].completed;
        //We update the state of the component with the new list of tasks and 
        //it will update the iteration of the tasks in order to show the task updated
        setTasks(tempTasks);
    }

    function deleteTask(task){
        console.log('Delete this task: ', task);
        const index = tasks.indexOf(task);
        const tempTasks = [...tasks];
        tempTasks.splice(index,1);
        setTasks(tempTasks);
    }

    function addTask(task){
        console.log('Add this task: ', task);
        const index = tasks.indexOf(task);
        const tempTasks = [...tasks];
        tempTasks.push(task);
        setTasks(tempTasks);
    }

    const taskTable= () => {
        if( tasks.length > 0) {
            return(
                    <table>
                        <thead>
                            <tr>
                                <th scope='col'>Title</th>
                                <th scope='col'>Description</th>
                                <th scope='col'>Priority</th>
                                <th scope='col'>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            { tasks.map((task, index) => {
                                return (
                                        <TaskComponent
                                        key = {index}
                                        task = {task}
                                        complete = {completeTask}
                                        remove = {deleteTask}>
                                        </TaskComponent>
                                    )
                                }
                            )}
                        </tbody>
                    </table>
            )
        }
        else {
            return ( <div>
                        <h3>There are no tasks to show</h3>
                        <h4>Please, create one</h4>
                    </div>)
        }
            
    }

    const loadingStyle = {
        color: 'grey',
        fontSize: '30px',
        fontWeight: 'bold'
    }


    return (
        <div>
            <div className='col-12'>
                <div className='card'>
                {/*Card header (title) */}
                    <div className='card-header p-3'>
                        <h5>
                            Your tasks:
                        </h5>
                    </div>
                {/* Card body (content) */}
                <div className='card-body' data-mdb-perfect-scrollbar='true' style={ {position: 'relative', height: '400px'} }>
                
                {/* TODO: Add Loading Spinner */}
                    { loading ? (<p style={ loadingStyle }>Loading tasks</p>) : taskTable() }
                </div>
                </div>
            </div>
            <Taskformik add={addTask} lenght={tasks.length}></Taskformik>
        </div>
    );
}

export default TaskListformik;
