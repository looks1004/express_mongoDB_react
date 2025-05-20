import React, { Component, useRef, useState,useEffect } from "react";
import { Form, Button } from "react-bootstrap";
//import { loadReCaptcha, ReCaptcha } from "react-recaptcha-v3";
import axios from "axios";
import $ from "jquery";
import {} from "jquery.cookie";
axios.defaults.withCredentials = true;
const headers = { withCredentials: true };

import './index.css';

//class LoginForm extends Component {
function LoginForm() {

  const joinEmailRef = useRef(null);
  const joinNameRef = useRef(null);
  const joinPwRef = useRef(null);

  const join = () => {
    //const joinEmail = this.joinEmail.value;
    //const joinName = this.joinName.value;
    //const joinPw = this.joinPw.value;

    const joinEmail = joinEmailRef.current.value;    
    const joinName = joinNameRef.current.value;  
    const joinPw = joinPwRef.current.value;  


    const regExp = /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i;
    const regExp2 = /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,16}$/;
    if (joinEmail === "" || joinEmail === undefined) {
      alert("이메일 주소를 입력해주세요.");
      //this.joinEmail.focus();
      joinEmailRef.current.focus();
      return;
    } else if (
      joinEmail.match(regExp) === null ||
      joinEmail.match(regExp) === undefined
    ) {
      alert("이메일 형식에 맞게 입력해주세요.");
      joinEmailRef.current.value = "";
      joinEmailRef.current.focus();
      return;
    } else if (joinName === "" || joinName === undefined) {
      alert("이름을 입력해주세요.");
      //this.joinName.focus();
      joinNameRef.current.focus();
      return;
    } else if (joinPw === "" || joinPw === undefined) {
      alert("비밀번호를 입력해주세요.");
      //this.joinPw.focus();
      joinPwRef.current.focus();
      return;
    } else if (
      joinPw.match(regExp2) === null ||
      joinPw.match(regExp2) === undefined
    ) {
      alert("비밀번호를 숫자와 문자, 특수문자 포함 8~16자리로 입력해주세요.");
      //this.joinPw.value = "";
      joinPwRef.current.value = "";
      joinPwRef.current.focus();
      return;
    }

    const send_param = {
      headers,
      email:  joinEmailRef.current.value,
      name: joinNameRef.current.value,
      password: joinPwRef.current.value
    };
    axios
      .post("http://localhost:8080/member/join", send_param)
      //정상 수행
      .then(returnData => {
        if (returnData.data.message) {
          alert(returnData.data.message);
          //이메일 중복 체크
          if (returnData.data.dupYn === "1") {
            joinEmailRef.current.value = "";
            joinEmailRef.current.focus();
          } else {
            joinEmailRef.current.value = "";
            joinNameRef.current.value = "";
            joinPwRef.current.value = "";
          }
        } else {
          alert("회원가입 실패");
        }
      })
      //에러
      .catch(err => {
        console.log(err);
      });
  };


  const [loginEmail, setLoginEmail] = useState('')
  const [loginPw, setLoginPw] = useState('')
  const [emailValid, setEmailValid] = useState(false);
  const [pwValid, setPwValid] = useState(false);
  const [notAllow, setNotAllow] = useState(true);


   const login = () => {

    // if (loginEmail === "" || loginEmail === undefined) {
    //   alert("이메일 주소를 입력해주세요.");    
    //   return;
    // } else if (loginPw === "" || loginPw === undefined) {
    //   alert("비밀번호를 입력해주세요.");     
    //   return;
    // }

    const send_param = {
      headers,
      email: loginEmail,
      password: loginPw
    };
    console.log('send_param:::',send_param)
    axios
      .post("http://localhost:8080/member/login", send_param)
      //정상 수행
      .then(returnData => {
        if (returnData.data.message) {
           //console.log("login_id:" + returnData.data._id);
          $.cookie("login_id", returnData.data._id, { expires: 1 });
          $.cookie("login_email", returnData.data.email, { expires: 1 });
          alert(returnData.data.message);
          window.location.reload();
        } else {
          alert(returnData.data.message);
        }
      })
      //에러
      .catch(err => {
        console.log(err);
      });
  };

    const formStyle = {
      margin: 50
    };
    const buttonStyle = {
      marginTop: 10
    };

    
  
  useEffect(() => {
    if(emailValid && pwValid) {
      setNotAllow(false);
      return;
    }
    setNotAllow(true);
  }, [emailValid, pwValid]);

    const handleEmail = (e)=>{
      setLoginEmail(e.target.value);
      const regex =
      /^(([^<>()\[\].,;:\s@"]+(\.[^<>()\[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/i;
      if(regex.test(e.target.value)){
        setEmailValid(true)
      } else {
        setEmailValid(false)
      }
    };

    const handlePw = (e) => {
      setLoginPw(e.target.value);
      const regex =
        /^(?=.*[a-zA-z])(?=.*[0-9])(?=.*[$`~!@$!%*#^?&\\(\\)\-_=+])(?!.*[^a-zA-z0-9$`~!@$!%*#^?&\\(\\)\-_=+]).{8,20}$/;
      if (regex.test(e.target.value)) {
        setPwValid(true);
      } else {
        setPwValid(false);
      }
    };

    return (
      <div className="page">
          <div className="titleWrap">
              이메일과 비밀번호를
              <br />
              입력해주세요
          </div>

          <div className="contentWrap">
              <div className="inputTitle">이메일 주소</div>
              <div className="inputWrap">
                  <input className="input" type="text" placeholder="test@gmail.com" 
                  value={loginEmail} onChange={handleEmail}/>
              </div>
              <div className="errorMessageWrap">
                  {!emailValid && loginEmail.length > 0 && (
                    <div>올바른 이메일을 입력해주세요.</div>
                  )}
              </div>

              <div style={{ marginTop: "26px" }} className="inputTitle">비밀번호</div>
              <div className="inputWrap">
                  <input className="input" type="password"
                  placeholder="영문, 숫자, 특수문자 포함 8자 이상"
                  value={loginPw} onChange={handlePw} />
              </div>
              <div className="errorMessageWrap">
                 {!pwValid && loginPw.length > 0 && (
                   <div>영문, 숫자, 특수문자 포함 8자 이상 입력해주세요.</div>
                 )}
             </div>
          </div>

          <div>
            <button onClick={login}  disabled={notAllow} className="bottomButton">
              로그인
            </button>
          </div>


          <Form style={formStyle}>
            <Form.Group controlId="joinForm">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                maxLength="100"
                //ref={ref => (this.joinEmail = ref)}
                ref={joinEmailRef} // useRef를 ref에 할당
                placeholder="Enter email"
              />
              <Form.Text className="text-muted">
                We'll never share your email with anyone else.
              </Form.Text>
              <Form.Label>name</Form.Label>
              <Form.Control
                type="text"
                maxLength="20"
              // ref={ref => (this.joinName = ref)}
              ref={joinNameRef} // useRef를 ref에 할당
                placeholder="name"
              />
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                maxLength="64"
                //ref={ref => (this.joinPw = ref)}
                ref={joinPwRef} // useRef를 ref에 할당
                placeholder="Password"
              />
              <Button
                style={buttonStyle}
                onClick={join}
                variant="primary"
                type="button"
                block='true'
              >
                회원가입
              </Button>
            </Form.Group>
          </Form>



    </div>
      
    );

}

export default LoginForm;
