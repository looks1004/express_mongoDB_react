import React, { Component, useRef,useEffect } from "react";
import { Form, Button } from "react-bootstrap";
//import { loadReCaptcha, ReCaptcha } from "react-recaptcha-v3";
import axios from "axios";
import $ from "jquery";
import {} from "jquery.cookie";
axios.defaults.withCredentials = true;
const headers = { withCredentials: true };

import { useLocation} from 'react-router-dom';

//class BoardWriteForm extends Component {
function BoardWriteForm() {

  const boardTitleRef = useRef(null);
  const boardContentRef = useRef(null);
  console.log('$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$')


  const location = useLocation();  
  console.log('글쓰기_location.pathname:::',location.pathname)

  const { title, content, id } = location.state || {}; // state가 없을 수도 있으니 안전하게 처리
  console.log('====state.title::', title)
  console.log('====state.content::', content)
  console.log('====state.id::', id)



  let updateChkFlag = false
  let resTitle  =''
  let resContent =''
  let resId =''
  if (location.state != null) {
     resTitle = title; 
     resContent = content; 
     resId =  id; 
     updateChkFlag = true
  }

 
  useEffect(() => {
    console.log("...useEffect...BoardWriteForm");
    if (location.state != null) {   
       boardTitleRef.current.value = title
       boardContentRef.current.value = content
    } else {
       boardTitleRef.current.value = ''
       boardContentRef.current.value = ''
    }
       

  }, [location.state]);  // 빈 배열([])을 두 번째 인자로 넣으면, 컴포넌트가 마운트될 때만 실행됩니다.



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

    if (location.state != null) {  //글 수정 시작

      const send_param = {
        headers,
        _id :  id,
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
            maxLength="100"
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
