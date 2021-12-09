import React, { useEffect, useState } from 'react'

const Square = ({ index, value, onClick }) => {
    const [mark, setMark] = useState(0)


    // To prevent the default behaviour and
    // restrict the calling of onClick for the block which is marked
    const onPlaceMark = (e) => {
        e.preventDefault()
        if (mark === 0) {
            onClick({ index })
        }
    }

    // useEffect will only be called when the value in variable "value" will change

    // It will not run for all the blocks all the time 
    // but only for the block which will change on click

    useEffect(() => {
        if (mark === 0) {
            setMark(value)
        }
    }, [value])


    return (
        <button className="node" onClick={onPlaceMark}>
            <h2>{mark === 0 ? "." : mark}</h2>
        </button>
    )
}

export default Square
