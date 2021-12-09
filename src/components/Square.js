import React, { useEffect, useState } from 'react'

const Square = ({ index, value, onClick }) => {
    const [mark, setMark] = useState(0)


    const onPlaceMark = (e) => {
        e.preventDefault()

        if (mark === 0) {
            setMark(value)
            onClick({ index })
        }
    }

    useEffect(() => {
        if (mark === 0) {
            setMark(value)
        }
    })

    return (
        <button className="node" onClick={onPlaceMark}>
            <h2>{mark === 0 ? "." : mark}</h2>
        </button>
    )
}

export default Square
