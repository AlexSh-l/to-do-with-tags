import React, { useState, useEffect } from "react"
import { Task } from "../Interfaces"
import ButtonComponent from "./ButtonComponent"

interface Edit {
    active: boolean
    setActive(isActive: boolean): void
    taskId: string
    tasks: Task[]
    setTasks(tasksList: Task[]): void
}

const EditComponent: React.FC<Edit> = (props) => {
    const [taskInputValue, setValue] = useState<string>("")
    const [tagsList, setTagsList] = useState<string[]>([])

    const SaveTask = () => {
        props.setTasks(props.tasks.map(
            (element) => element.id === props.taskId ? {
                ...element,
                body: taskInputValue.split(" ").filter(element => element[0] !== "#").join(" "),
                tags: taskInputValue.split(" ").filter(element => element[0] === "#")
            } : element
        ))
    }

    useEffect(() => {
        const tags = taskInputValue.split(" ").filter(element => element[0] === "#")
        setTagsList(tags)
    }, [taskInputValue])

    return (
        <div className={props.active ? "edit_active" : "edit"} onClick={() => props.setActive(false)}>
            <div className="edit_content" onClick={e => { e.stopPropagation() }}>
                <div className="edit_input">
                    <input id="taskInput" type="text" value={taskInputValue} placeholder="Edit your task here..." onChange={e => {
                        setValue(e.target.value)
                    }} />
                    <ButtonComponent id="saveButton" value="Save" onClick={SaveTask}></ButtonComponent>
                </div>
                <br /><strong className="tags">{tagsList.join(" ")}</strong>
            </div>
        </div>
    )
}

export default EditComponent