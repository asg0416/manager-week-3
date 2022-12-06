import React from "react";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { _addNumber, minusNumber } from "../redux/modules/counterSlice";

const Counter = () => {
  const [number, setNumber] = useState(0);
  const globalNumber = useSelector((state) => state.counter.number);
  const dispatch = useDispatch();

  const onChangeHandler = (event) => {
    const { value } = event.target;
    setNumber(+value);
  };
  const onClickAddNumberHandler = () => {
    dispatch(_addNumber(number));
  };
  const onClickMinusNumberHandler = () => {
    dispatch(minusNumber(number));
  };
  console.log(number);
  return (
    <div>
      {globalNumber}
      <input type="number" onChange={onChangeHandler} />
      <button onClick={onClickAddNumberHandler}>더하기</button>
      <button onClick={onClickMinusNumberHandler}>빼기</button>
    </div>
  );
};

export default Counter;
