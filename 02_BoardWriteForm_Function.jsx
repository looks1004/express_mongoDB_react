import React, { Component, useRef,useEffect } from "react";
import { Form, Button } from "react-bootstrap";
//import { loadReCaptcha, ReCaptcha } from "react-recaptcha-v3";
import axios from "axios";
import $ from "jquery";
import {} from "jquery.cookie";
axios.defaults.withCredentials = true;
const headers = { withCredentials: true };

import { useLocation , useNavigate} from 'react-router-dom';

//class BoardWriteForm extends Component {
// https://cdn.ckeditor.com/4.25.1-lts/standard-all/ckeditor.js
function BoardWriteForm() {

  const boardTitleRef = useRef(null);
  const boardContentRef = useRef(null);
  console.log('$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$')


  const location = useLocation();
  const navigate = useNavigate();
  console.log('글쓰기_location.pathname:::',location.pathname)


  const queryParams = new URLSearchParams(location.search);
  console.log('글쓰기_location.queryParams:::',queryParams)
  console.log('                              ')

  
  if (queryParams.size > 0) {
    let resTitle = queryParams.get('title'); 
    let resContent = queryParams.get('content'); 
    let resId = queryParams.get('_id'); 
  }

  let updateChkFlag = false
  if (queryParams.size > 0) {
     updateChkFlag = true
  }

 
  useEffect(() => {
    console.log("...useEffect...BoardWriteForm");
     if (queryParams.size > 0) {
       let resTitle = queryParams.get('title'); 
       let resContent = queryParams.get('content'); 
       let resId = queryParams.get('_id');
       boardTitleRef.current.value = resTitle
       boardContentRef.current.value = resContent
    } else {
       boardTitleRef.current.value = ''
       boardContentRef.current.value = ''
    }
       

  }, [queryParams.size]);  // 빈 배열([])을 두 번째 인자로 넣으면, 컴포넌트가 마운트될 때만 실행됩니다.



  const writeBoard = () => {

    const boardTitle = boardTitleRef.current.value;    
    const boardContent = boardContentRef.current.value;  
    

    if (boardTitle === "" || boardTitle === undefined) {
      alert("title 입력해주세요.");
      boardTitleRef.current.focus();
      return;
   
    } else if (boardContent === "" || boardContent === undefined) {
      alert("content 입력해주세요.");
      boardContentRef.current.focus();
      return;      
    }

    if (queryParams.size > 0) {  //글 수정 시작

      const send_param = {
        headers,
        _id :  queryParams.get('_id'),
        title: boardTitleRef.current.value,
        content: boardContentRef.current.value,
        
      };
      axios
        .post("http://localhost:8080/board/update", send_param)
        //정상 수행
        .then(returnData => {
          if (returnData.data.message) {
            alert(returnData.data.message);
            window.location.href = "/";
                   
          } else {
            alert("글수정 실패");
          }
        })
        //에러
        .catch(err => {
          console.log(err);
        });


    }else {  //새글 쓰기 시작
  

      const send_param = {
        headers,
        _id :  $.cookie("login_id"),
        title: boardTitleRef.current.value,
        content: boardContentRef.current.value,
        
      };
      axios
        .post("http://localhost:8080/board/write", send_param)
        //정상 수행
        .then(returnData => {
          if (returnData.data.message) {
            alert(returnData.data.message);
            window.location.href = "/";
                  
          } else {
            alert("글쓰기 실패");
          }
        })
        //에러
        .catch(err => {
          console.log(err);
        });
    } // 글쓰기와 글수정 분기점 
  };

  

    const formStyle = {
      margin: 50
    };
    const buttonStyle = {
      marginTop: 10
    };

    return (
      <Form style={formStyle}>
        <Form.Group controlId="joinForm">
          <Form.Label>title</Form.Label>
          <Form.Control
            type="text"
            maxLength="100"
            ref={boardTitleRef} // useRef를 ref에 할당
            placeholder="title"
          />



          <Form.Label>contents</Form.Label>
          <Form.Control
            type="text"
            maxLength="20"
            ref={boardContentRef} // useRef를 ref에 할당
            placeholder="contents"
          />
          
          {updateChkFlag ?
            <Button
              style={buttonStyle}
              onClick={writeBoard}
              variant="primary"
              type="button"
              block='true'
            >            
              수정하기
            </Button>
          :
            <Button
            style={buttonStyle}
            onClick={writeBoard}
            variant="primary"
            type="button"
            block='true'
          >            
            저장하기
          </Button>
        }


        </Form.Group>

       
      </Form>
    );
  
}

export default BoardWriteForm;
