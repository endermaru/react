import React, {useEffect,useState} from 'react';
import { JsxElement } from 'typescript';
import './App.css';

function App() {
  
  //Todo를 담는 리스트
  type Todo = {id:number,title:string,memo:string};
  type TodoList = Todo[];
  const [todoList, setTodoList]=useState<TodoList>([
    {id:0,title:'todo1',memo:'none'},
    {id:1,title:'todo2',memo:'none'}
  ]);
  //현재 선택한 Id
  const [id,setId] = useState(0);
  //다음 할당할 Id
  const [nextId, setNextId] = useState(todoList.length);
  //Todolist 화면 모드
  const [mode,setMode]=useState('MAIN'); //MAIN / READ / UPDATE

  let content=null;
  if (mode==='MAIN'){
    
  } else if (mode==='READ'){
    
  } else if (mode==='UPDATE'){
    
  }

  return (
    <div className="App">
      <h1><a href='/' onClick={(event)=>{
        event.preventDefault();
        setMode('MAIN');
        setId(0);
      }}>TodoList</a></h1>
      {content}
    </div>
  );
}

export default App;
