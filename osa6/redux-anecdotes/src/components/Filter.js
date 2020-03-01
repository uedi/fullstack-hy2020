import React from 'react'
import { useDispatch } from 'react-redux'
import { setFilter, removeFilter } from '../reducers/filterReducer'

const Filter = () => {

    const dispatch = useDispatch()

    const handleChange = (event) => {
        const filter = event.target.value
        if(filter && filter.length > 0) {
            dispatch(setFilter(filter))
        } else {
            dispatch(removeFilter())
        }
    }

    const style = {
        marginBottom: 10
    }

    return (
        <div style={style}>
            filter <input onChange={handleChange} />
        </div>
    )
}

export default Filter