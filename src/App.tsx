import React, {useEffect,useState} from 'react';
import { JsxElement } from 'typescript';
import './App.css';

//todoList를 받아 각각 렌더링
function List(props: { todos: { id: number; title: string; memo: string }[], select:(id:number)=>void }) {
  return (
    <ul>
      {props.todos.map((item) => (
        <li className='todos'>
          <a href={'todo'+item.id} key={item.id} onClick={(event)=>{
            event.preventDefault();
            props.select(item.id);
          }}>
            {item.title}
          </a>
        </li>
      ))}
    </ul>
  );
}

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

  //메인 콘텐츠
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
    <List todos={todoList} select={(id:number):void=>{
      setMode('READ');
      setId(id);
    }}></List>
    </div>
  );
}

export default App;
