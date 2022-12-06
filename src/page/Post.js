import React, { Fragment, useEffect, useState } from "react";
import axios from "axios"; // axios import 합니다.
// import { useDispatch, useSelector } from "react-redux";
// import { __getTodos } from "../redux/modules/todosSlice";

const Post = () => {
  // const dispatch = useDispatch();

  const [todos, setTodos] = useState(null);
  const [todo, setTodo] = useState({ title: "" });
  const [targetId, setTargetId] = useState(null);
  const [editTodo, setEditTodo] = useState({ title: "" });

  // const {isLoading, error, todos} = useSelector(state => state.todos)
  
  // axios를 통해서 get 요청을 하는 함수를 생성합니다.
  // 비동기처리를 해야하므로 async/await 구문을 통해서 처리합니다.
  // async/await 예외 처리 try...catch... 이용
  const fetchTodos = async () => {
    const { data } = await axios.get("http://localhost:3001/todos"); // await 없으면 data undefined 뜸
    setTodos(data); // 서버로부터 fetching한 데이터를 useState의 state로 set 합니다.

    /* 위 내용과 같은 코드
    axios.get("http://localhost:3001/todos").then((res) => {
      console.log(res);
      setTodos(res.data);
    }); 
    */
  };

  const onSubmitHandler = async (todo) => {
    await axios.post("http://localhost:3001/todos", todo);
    setTodos([...todos, todo]);
  };

  const onClickDeletHandler = async (id) => {
    await axios.delete(`http://localhost:3001/todos/${id}`);
    setTodos([...todos.filter((item) => item.id !== id)]);
  };

  const onClickEditHandler = (id, edit) => {
    axios.patch(`http://localhost:3001/todos/${id}`, edit);
    setTodos([
      ...todos.map((item) => {
        console.log(item, id, edit);

        if (item.id === Number(id)) {
          console.log(edit);
          return edit;
        } else {
          return item;
        }
      }),
    ]);
  };

  // 생성한 함수를 컴포넌트가 mount 됐을 떄 실행하기 위해 useEffect를 사용합니다.
  useEffect(() => {
    // effect 구문에 생성한 함수를 넣어 실행합니다.
    fetchTodos();
  }, []);
  
  // useEffect(() => {
  //   dispatch(__getTodos());
  // }, [dispatch]);
  

  // data fetching이 정상적으로 되었는지 콘솔을 통해 확인합니다.
  console.log(todos); // Post.js:16
  return (
    <Fragment>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          onSubmitHandler(todo);
        }}
      >
        <div>
          <input
            type="text"
            placeholder="수정 ID"
            onChange={(e) => setTargetId(e.target.value)}
          />
          <input
            type="text"
            placeholder="수정 값"
            onChange={(e) => {
              setEditTodo({ ...editTodo, title: e.target.value });
            }}
          />
          <button
            type="button"
            onClick={(e) => onClickEditHandler(targetId, editTodo)}
          >
            수정
          </button>
        </div>
        <input
          type="text"
          onChange={(e) => {
            const { value } = e.target;
            setTodo({
              ...todo,
              title: value,
            });
          }}
        />
        <button>추가하기</button>
      </form>
      <div>
        {todos?.map((todo) => {
          return (
            <div key={todo.id}>
              {todo.title} {todo.id}
              <button
                onClick={(e) => {
                  onClickDeletHandler(todo.id);
                }}
              >
                삭제
              </button>
            </div>
          );
        })}
      </div>
    </Fragment>
  );
};

export default Post;
