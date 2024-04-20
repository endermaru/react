import React, {useEffect,useState} from 'react';
import { JsxElement } from 'typescript';
import './App.css';

//form 태그를 대신하는 컴포넌트
function Create(props:{clickCreate:(title:string,memo:string)=>void}){

  const [title, setTitle] = useState('');
  const [memo, setMemo] = useState('');

  return <form onSubmit={(event: React.FormEvent<HTMLFormElement>)=>{
    event.preventDefault();
    if (title===''){
      alert('일정 제목을 입력해주세요');
    }
    else{
      props.clickCreate(title,memo);
    }
  }} >
  <p><input type='text' name='title' placeholder='일정 제목' value={title} onChange={(e)=>{setTitle(e.target.value)}}></input></p>
  <p><textarea name='memo' placeholder='메모' value={memo} onChange={(e)=>{setMemo(e.target.value)}}></textarea></p>
  <p><input type='submit' value='새 일정 만들기'></input></p>
</form>
}

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
    content=<div>
      메인 페이지입니다.
      <Create clickCreate={(title:string,memo:string):void=>{
        const newTodo = {id:nextId,title:title,memo:memo};
        const newTodoList:TodoList = [...todoList,newTodo];
        setTodoList(newTodoList);
        setId(nextId);
        setNextId(nextId+1);
        setMode('READ');
      }}></Create>
    </div>
  } else if (mode==='READ'){
    let title:string='';
    let memo:string='';
    for (let i=0;i<todoList.length;i++){
      if (todoList[i].id==id){
        title=todoList[i].title;
        memo=todoList[i].memo;
      }
    }
    content=<div>
        <div>{title}</div>
        <div>{memo}</div>
        <div>
          <button onClick={()=>{
              const newTodoList:TodoList=[];
              for (let i=0;i<todoList.length;i++){
                if (id!==todoList[i].id){
                  newTodoList.push(todoList[i]);
                }
              }
              setTodoList(newTodoList);
              setMode('MAIN');
              setId(0);
          }}>삭제하기</button>
        </div>
    </div>;
    
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
