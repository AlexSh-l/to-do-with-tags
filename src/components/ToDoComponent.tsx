import React, { useState } from 'react'
import { Task } from './Interfaces'
import ButtonComponent from './UI/ButtonComponent'
import Modal from './UI/EditComponent'

export interface ToDo {
    task: Task
    remove(id: string): void
    tasks: Task[]
    setTasks(tasksList: Task[]): void
}

const ToDoComponent: React.FC<ToDo> = (props: ToDo) => {
    const [modalActive, setModalActive] = useState(false)
    const [taskClass, setTaskClass] = useState("task_incomplete")
    const [tagsClass, setTagsClass] = useState("tags")

    return (
        <div>
            <div className="to_do_content">
                <div>
                    <input type="checkbox" onClick={() => {
                        taskClass === "task_incomplete" ? setTaskClass("task_done") : setTaskClass("task_incomplete")
                        tagsClass === "tags" ? setTagsClass("tags_done") : setTagsClass("tags")
                    }} />
                    <span className={taskClass}>{props.task.body}</span>
                    <strong className={tagsClass}> {props.task.tags?.join(" ")}</strong>
                </div>
                <div>
                    <ButtonComponent id='editButton' value='Edit' onClick={
                        () => modalActive ? setModalActive(false) : setModalActive(true)
                    } />
                    <ButtonComponent id='deleteButton' value='Delete' onClick={() => props.remove(props.task.id)} />
                </div>
            </div>
            <Modal active={modalActive} setActive={setModalActive} taskId={props.task.id} tasks={props.tasks} setTasks={props.setTasks} />
        </div>
    )
}

export default ToDoComponent