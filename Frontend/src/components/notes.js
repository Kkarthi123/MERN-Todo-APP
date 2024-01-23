import React, { useEffect, useRef, useState } from 'react'
import axios from 'axios';
import $ from 'jquery';
import { Link, useNavigate } from 'react-router-dom';



function FirstComponent() {
  const navigate = useNavigate();
  const [inputData, setInputData] = useState('');
  const [list, setList] = useState([]);
  const [isEditeMode, setEditMode] = useState(false);
  const welcomeTitle = useRef(["Welcome", "HI", "Hello"])

  let editIndex = useRef('');
  let auth = JSON.parse(localStorage.getItem("authToken"));

  const config = {
    authorization: `Bearer ${auth?.token}`
  }


  useEffect(() => {
    async function fetchList() {
      let allList = await axios.get("/getList", { headers: config});
      setList(allList.data)
    }
    if (!auth) {
      navigate('/')
    } else {
      fetchList()
    }
  }, [])


  const setListData = (e) => {
    if ((e.key === "Enter" || e.type === "click") && (inputData !== '')) {
      if (isEditeMode) {
        updateData()
        return
      }

      axios.post('/list', {
        todo: inputData
      }, { headers: config}).then(() => {
        setList([inputData, ...list])
      })
      setInputData('')
    }
  }

  const deleteItem = (id, item) => {
    axios.post('/deleteList', {
      todo: item
    }, { headers: config}).then(() => {
      $('#todo-' + id).fadeOut(300, function () {
        this.remove()
      });
    })
  }

  const editItem = (item, idx) => {
    setInputData(item);
    setEditMode(true)
    editIndex.current = idx;
    $('.todo_input').focus();
    $('.todo_input').addClass('focus_input')

    setTimeout(function () {
      $('.todo_input').removeClass('focus_input')
    }, 2000)
  }

  const updateData = () => {
    axios.put("/updateItem", {
      oldItem: list[editIndex.current],
      newItem: inputData
    }, { headers: config})
    list.splice(editIndex.current, 1, inputData)
    setList(list)
    cancelEditMode()
  }

  function cancelEditMode() {
    setEditMode(false);
    setInputData('')
  }

  const logOut = ()=>{
    localStorage.clear("authToken");
    navigate("/")
  }
    

    

    return (

      <div className='todo_main_conatiner'>
        
        <div className='navigation-header'>
          <Link to="/notes">
          <div className='app-name'>
            <i className="fa-solid fa-clipboard-list"></i>
            <span>To Do</span>
           </div>
          </Link>
           <div className='user-details'>
             <div className='user-icon'>
               <i className="fa-solid fa-user"></i>
               <div className='user-detail-cont'>
                 <div className='username'>{auth?.name}</div>
                 <div className='logout' onClick={logOut}>Log Out</div>
               </div>
             </div>
           </div>
        </div>
        <div className='welcome-header'>
          <h1>Welcome<span>😊</span> {auth?.name}!</h1>
        </div>
        <div className='todo_conatiner_wrapper'>
          <div className='todo_input_wrapper'>
            <input placeholder='Enter Your Todo' onChange={(e) => { setInputData(e.target.value) }} onKeyDown={setListData} value={inputData} className='todo_input' />
            {
              (isEditeMode) ? <><button className="todo_btn update_btn" onClick={() => updateData()}>Update</button><button className="todo_btn cancel_btn" onClick={cancelEditMode}>Cancel</button></> : <span className='add_btn' title='Add Todo' onClick={setListData} ><i className="fa-solid fa-plus"></i></span>
            }
          </div>
          <div className='todo-list-wrapper'>
            <ul>
              {
                list.map((item, idx) => {
                  return (
                    <li className='todo_list_item' key={idx} id={`todo-${idx}`}> <span className='todo_name'>{item} </span>
                      <div className='todo_option_btns'><span className='todo_edit' title='Edit Todo' onClick={() => { editItem(item, idx) }}><i className="fa-solid fa-pen-to-square"></i></span> <span className='todo_delete' title='Delete Todo' onClick={(e) => { deleteItem(idx, item) }}><i className="fa-solid fa-trash"></i></span></div>
                    </li>
                  )
                })
              }
            </ul>
          </div>
        </div>
      </div>

      
    );
}


export default FirstComponent;
