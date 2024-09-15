'use client';

// import { useState } from "react";
import { NewToDoForm } from "./_components/new-todo-form";
import { useQuery, useMutation } from "convex/react";
import { api } from "../../convex/_generated/api";
import { Id } from "../../convex/_generated/dataModel";

// type ToDoItem={
//   title:string;
//   description:string;
//   completed:boolean;
// }

export default function Home() {
  // const [todos,setTodos]=useState<ToDoItem[]>([
  //   {title:"Example",description:"This is an example",completed:false}
  // ]);

  const todos=useQuery(api.functions.listTodos);

  return (
    <div className="max-w-screen-md mx-auto p-4 space-y-4">
      <h1 className="text-xl font-bold">To-do List</h1>
      <ul className="space-y-2">
      {todos?.map(({_id,title,description,completed},index)=>(
        <ToDoItem 
          key={index}
          id={_id}
          title={title} 
          description={description} 
          completed={completed} 
          // onCompleteChanged={(newValue) =>{
          //   setTodos(prev=>{
          //     const newTodos=[...prev];
          //     newTodos[index].completed=newValue;
          //     return newTodos;
          //   })
          // }}
          // onRemove={() => {
          //   setTodos(prev => {
          //     const newTodos = [...prev].filter((_,i)=> i !== index);
          //     return newTodos;
          //   })
          // }}
          />
      ))}
      </ul>
      <NewToDoForm 
      // onCreate={(title,description) => {
      //   setTodos(prev =>{
      //     const newTodos = [...prev];
      //     newTodos.push({title,description,completed:false});
      //     return newTodos;
      //   });
      // }}
      />

    </div>
  );
}

function ToDoItem(
  {
    id,
    title, 
    description, 
    completed, 
    // onCompleteChanged, 
    // onRemove
  } :{
    id: Id<"todos">,
    title: string,
    description: string,
    completed: boolean,
  // onCompleteChanged: (newValue: boolean) => void,
  // onRemove: () => void,
}) {
  const updateTodo = useMutation(api.functions.updateTodo);
  const deleteTodo = useMutation(api.functions.deleteTodo);
  return(
    <li className="w-full items-center flex gap-2 border rounded p-2">
      <input 
        type="checkbox" 
        checked={completed} 
        onChange={e => 
          updateTodo({id, completed:e.target.checked})
          // onCompleteChanged(e.target.checked)
          }/>
      <div>
        <p className="font-semibold">{title}</p>
        <p className="text-sm text-gray-600">{description}</p>
      </div>
      <div className="ml-auto">
        <button 
          type="button" 
          className="text-red-500" 
          onClick={() => deleteTodo({id})
            // ()=>onRemove()
          }>Remove
        </button>
      </div>
    </li>
  );
}