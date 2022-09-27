import React, { useState } from 'react';
import { useSelector,useDispatch } from 'react-redux';
import { Increment,Decrement,Reset,AddByAmount } from './counterSlice';

const Counter = () => {
    const [amount,SetAmount]=useState("");
    let value=Number(amount)||0;
    const counter=useSelector((state)=>state.counter.count);
    const dispatch=useDispatch();
    const increment=()=>{
      dispatch(Increment())
    }  ;
    const decrement=()=>{
        dispatch(Decrement())
    } ; 
    const reset=()=>{
        SetAmount("")
        dispatch(Reset())
    };
    const AddBy=(e)=>{
        dispatch(AddByAmount(e))
    };
 return (
    <section className='d-flex justify-content-center ' style={{flexDirection:"column", alignItems:"center",justifyContent:"center",height:"40vh"}}>
        <div  className='text-center'>
    <h3>{counter}</h3>
    <div>
        <input className='form-control w-100' value={amount} onChange={(e)=>SetAmount(e.target.value)} type="text"/>
    </div>
     </div>
     <div className='my-3'>
        <button   className='btn' onClick={increment}>Increment</button> <button className='btn'  onClick={decrement}>Decrement</button>
     <button  className='btn'  onClick={reset}>Reset</button>
     <button  className='btn'  onClick={()=>AddBy(value)}>AddByValue</button>
     </div>

    </section>
  )
}

export default Counter