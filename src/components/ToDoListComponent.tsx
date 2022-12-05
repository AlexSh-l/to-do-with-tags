import React, { useState, useEffect } from 'react'
import ToDoComponent from './ToDoComponent'
import { Task } from './Interfaces'
import ButtonComponent from './UI/ButtonComponent'

const ToDoListComponent: React.FC = () => {
    const [taskInputValue, setValue] = useState<string>("")
    const [tagInputValue, setTagValue] = useState<string>("")
    const [tasksList, setTasksList] = useState<Task[]>([])
    const [filteredTasksList, setFilteredTasksList] = useState<Task[]>([])

    const addNewTask = () => {
        const task: Task[] = [{
            id: Date.now().toString(),
            body: taskInputValue.split(" ").filter(element => element[0] !== "#").join(" "),
            tags: taskInputValue.split(" ").filter(element => element[0] === "#")
        }]
        setTasksList(task.concat(tasksList))
        setValue("")
    }

    const removeTask = (id: string) => {
        setTasksList(tasksList.filter(element => element.id !== id))
    }

    useEffect(() => {
        localStorage.setItem("tasks", JSON.stringify(tasksList))
        setFilteredTasksList(tasksList.filter(element => element.tags.includes(tagInputValue)))
    }, [tagInputValue, tasksList])

    return (
        <div className="main">
            <div>
                <div>
                    <input id="taskInput" type="text" value={taskInputValue} placeholder="Type in your task here..." onChange={e => {
                        setValue(e.target.value)
                    }} />
                    <ButtonComponent id="submitButton" value="Submit" onClick={addNewTask} />
                    <input id="tagInput" type="text" value={tagInputValue} placeholder="Find tasks with a tag..." onChange={e => {
                        setTagValue(e.target.value)
                    }} />
                </div>
                {tagInputValue === ""
                    ?
                    tasksList.map(toDo => {
                        return <ToDoComponent key={toDo.id} task={toDo} tasks={tasksList} setTasks={setTasksList} remove={removeTask} />
                    })
                    :
                    filteredTasksList.map(toDo => {
                        return <ToDoComponent key={toDo.id} task={toDo} tasks={tasksList} setTasks={setTasksList} remove={removeTask} />
                    })
                }
            </div>
        </div>
    )
}

export default ToDoListComponent