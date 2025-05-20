import React, { Component } from "react";
import { Form, Button } from "react-bootstrap";
//import { loadReCaptcha, ReCaptcha } from "react-recaptcha-v3";
import axios from "axios";
import $ from "jquery";
import {} from "jquery.cookie";
axios.defaults.withCredentials = true;
const headers = { withCredentials: true };

class BoardWriteForm extends Component {
  /*
  componentDidMount() {
    loadReCaptcha("6LfGieAUAAAAAJSOoqXS5VQdT_e5AH8u0n2e1PDb");
  }

  verifyCallback = recaptchaToken => {
    // Here you will get the final recaptchaToken!!!
    console.log(recaptchaToken, "<= your recaptcha token");
  };
*/
  join = () => {
    //const joinEmail = this.joinEmail.value;
    //const joinName = this.joinName.value;


    const boardTitle = this.boardTitle.value;
    const boardContent = this.boardContent.value;
  

    if (boardTitle === "" || boardTitle === undefined) {
      alert("title 입력해주세요.");
      this.boardTitle.focus();
      return;
   
    } else if (boardContent === "" || boardContent === undefined) {
      alert("content 입력해주세요.");
      this.boardContent.focus();
      return;
    
   
    }

    const send_param = {
      headers,
      _id :  $.cookie("login_id"),
      title: this.boardTitle.value,
      content: this.boardContent.value,
      
    };
    axios
      .post("http://localhost:8080/board/write", send_param)
      //정상 수행
      .then(returnData => {
        if (returnData.data.message) {
          alert(returnData.data.message);
                 
        } else {
          alert("글쓰기 실패");
        }
      })
      //에러
      .catch(err => {
        console.log(err);
      });
  };


  render() {
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
            type="email"
            maxLength="100"
            ref={ref => (this.boardTitle = ref)}
            placeholder="title"
          />



          <Form.Label>contents</Form.Label>
          <Form.Control
            type="text"
            maxLength="20"
            ref={ref => (this.boardContent = ref)}
            placeholder="contents"
          />
          

          <Button
            style={buttonStyle}
            onClick={this.join}
            variant="primary"
            type="button"
            block='true'
          >
            저장하기
          </Button>
        </Form.Group>

       
      </Form>
    );
  }
}

export default BoardWriteForm;
