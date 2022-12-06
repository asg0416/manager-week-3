// src/redux/modules/counterSlice.js

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

// createAsyncThunk(액션타입, 콜백함수)
export const _addNumber = createAsyncThunk(
  "counter/_addNumber",
  async (payload, thunkAPI) => {
    console.log("addNum start", { payload, thunkAPI }); // 실행 순서 1
    try {
      // throw new Error("let's error")
      const fn = () =>
        new Promise((resolve) => {
          setTimeout(() => {
            resolve(payload);
          }, 2000);
        });

      const data = await fn()
      return thunkAPI.fulfillWithValue({ memo: "_addNumber payload", data });
    } catch (error) {
      console.log(error); // 실행 순서 2
      // if (!error.response) {
      //   throw error;
      // }
      return thunkAPI.rejectWithValue(error.message);
    }
    console.log("addNum end"); // 실행 순서 2
  }
);

const initialState = {
  number: 0,
};

/*  
  actionType : counter/addNumber, counter/minusNumber 로 자동 생성
  actionCreator : addNumber, minusNumber
  reducer 내부에서 비동기 작업 불가능함, 리덕스 정책 중 하나 
  -> createAsyncThunk 미들웨어 생성 필요
*/
const counterSlice = createSlice({
  name: "counter",
  initialState,
  reducers: {
    addNumber: (state, action) => {
      state.number = state.number + action.payload;

      // console.log("createSlice start");
      // setTimeout(() => {
      //   console.log("createSlice setTimeout start");
      //   state.number = state.number + action.payload;
      //   console.log("createSlice setTimeout end");
      // }, 3000);
      // state.number = state.number + action.payload;
    },

    minusNumber: (state, action) => {
      state.number = state.number - action.payload;
    },
  },
  // extraReducers : createSlice 에서 생성한 액션타입 외 다른 액션 타입 정의하는 경우 사용
  extraReducers: (builder) => {
    builder
      .addCase(_addNumber.pending, (state, payload) => {
        console.log({ state, payload });
      })
      .addCase(_addNumber.fulfilled, (state, payload) => {
        console.log({ state, payload });
        state.number = state.number + payload.payload.data;
      })
      .addCase(_addNumber.rejected, (state, payload) => {
        console.log({ state, payload });
      });
  },
});

// 액션크리에이터는 컴포넌트에서 사용하기 위해 export 하고
export const { addNumber, minusNumber } = counterSlice.actions;
// reducer 는 configStore에 등록하기 위해 export default 합니다.
export default counterSlice.reducer;
