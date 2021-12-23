import { useState } from "react";
import {ITodos} from "./Interfaces";
import moment from "moment";

const Todos = () => {

  const [newTodo, setNewTodo] = useState<string>("");
  const [deadline, setDeadline] = useState<string>("");
  const [status] = useState<string>("Todo");

  const [todos, setTodos] = useState<ITodos[]>([])

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!newTodo) return;

    const todo = {todoName: newTodo, deadline: deadline, status: status}

    setTodos([todo, ...todos]);

    setNewTodo("");
    setDeadline("");
    
  };

  const removeTodo = (removeIndex: number) => {
    setTodos(todos.filter((_:object, index: number) => index !== removeIndex));
  };

  const updateTodoStatus = (index:number) => (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTodo = [...todos];
    newTodo[index].status = e.target.value;
    setTodos(newTodo);
  }

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        width: 500,
        margin: "0 auto",
        padding: 8,
      }}
    >
      <h2 style={{ textAlign: "center" }}>Todo</h2>
      <form
        onSubmit={onSubmit}
        style={{ display: "flex", marginBottom: 8 }}
      >
        <input
          type="text"
          name="newTodo"
          id="newTodo"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          placeholder="Fix the thing.."
          style={{
            display: "inline-flex",
            flex: 1,
            padding: 4,
            border: "1px solid #eaeaea",
            marginRight: 4,
          }}
        />
        <input type="datetime-local" name="deadline" value={deadline} onChange={(e) => setDeadline(e.target.value)} />
        <button
          type="submit"
          style={{ borderColor: "#eaeaea", backgroundColor: "#fff" }}
        >
          Add
        </button>
      </form>
      <div>
        {todos.length === 0 && (
          <div style={{ textAlign: "center" }}>Add some todos</div>
        )}
        {todos.map((todo, i) => (
          <div
            key={`${todo.todoName}-${i}`}
            style={{
              padding: 4,
              borderBottom: "1px solid #ccc",
              display: "flex",
            }}
          >
            <span style={{ flex: 1 }}>{todo.todoName}</span>
            {todo.deadline !== "" && (<span>&nbsp;Deadline: {moment(todo.deadline).format("MMMM Do YYYY, h:mm:ss a")}</span>)}
            Status:&nbsp;
            <span><input type="radio" name={`${todo.todoName}-${i}`} value="Todo" checked={todo.status === "Todo"} onChange={updateTodoStatus(i)}/>Todo</span>
            <span><input type="radio" name={`${todo.todoName}-${i}`} value="Doing" checked={todo.status === "Doing"} onChange={updateTodoStatus(i)}/>Doing</span>
            <span><input type="radio" name={`${todo.todoName}-${i}`} value="Done" checked={todo.status === "Done"} onChange={updateTodoStatus(i)}/>Done</span>
            &nbsp;&nbsp;
            <span
              style={{ cursor: "pointer" }}
              onClick={() => removeTodo(i)}
            >
              &times;
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Todos;
