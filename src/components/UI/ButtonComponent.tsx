import React from 'react'

interface Button {
    id: string
    value: string
    onClick(): void
}

const ButtonComponent: React.FC<Button> = (props) => {
    return (
        <input id={props.id} className="button" type="button" value={props.value} onClick={props.onClick} />
    )
}

export default ButtonComponent