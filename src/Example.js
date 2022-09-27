import React from 'react'
import { useSelector,useDispatch } from 'react-redux'
import { AddByAmount } from './Feature/counter/counterSlice'

const Example = () => {
    const dispatch =useDispatch();
    const counter=useSelector((state)=>state.counter.count)
    
    
  return (
    <div>
        <div >
        {counter}
        </div>
        <button className='btn btn-primary' onClick={()=>dispatch(AddByAmount(10))}>incrementBy10</button>
    </div>
  )
}

export default Example