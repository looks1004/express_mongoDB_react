import React, { Component,useEffect, useState } from "react";
import { Table, Button } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import axios from "axios";

import { useLocation } from 'react-router-dom';

axios.defaults.withCredentials = true;
const headers = { withCredentials: true };

//class BoardDetail extends Component {
function BoardDetail() {
  // state = {
  //   board: []
  // };
  const [brdstate, setBrdstate] = useState([]);
  const location = useLocation();

  //const queryParams = new URLSearchParams(location.search);
  //const realIdValue = queryParams.get('_id'); 
  const { realIdValue } = location.state || {}; // state가 없을 수도 있으니 안전하게 처리
  console.log('====BoardDetail._id::', realIdValue)

  
  useEffect(() => {
    console.log("...useEffect...BoardDetail");
     if (location.pathname !== undefined) {
       getDetail();
     } 
     else {
       window.location.href = "/";
     }
  }, []);  // 빈 배열([])을 두 번째 인자로 넣으면, 컴포넌트가 마운트될 때만 실행됩니다.



  

  // componentDidMount() {
  //   if (this.props.location.query !== undefined) {
  //     this.getDetail();
  //   } else {
  //     window.location.href = "/";
  //   }
  // }

  const deleteBoard = _id => {
    const send_param = {
      headers,
      _id
    };
    if (window.confirm("정말 삭제하시겠습니까?")) {
      axios
        .post("http://localhost:8080/board/delete", send_param)
        //정상 수행
        .then(returnData => {
          alert("게시글이 삭제 되었습니다.");
          window.location.href = "/";
        })
        //에러
        .catch(err => {
          console.log(err);
          alert("글 삭제 실패");
        });
    }
  };

  const getDetail = () => {
    console.log('getDetail 진입 !!!!')

    const send_param = {
      headers,
      _id: realIdValue
    };
    const marginBottom = {
      marginBottom: 5
    };
    axios
      .post("http://localhost:8080/board/detail", send_param)
      //정상 수행
      .then(returnData => {
        if (returnData.data.board[0]) {
           const board = (
            <div>


              <Table striped bordered hover>
                <thead>
                  <tr>
                    <th>{returnData.data.board[0].title}</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td
                      dangerouslySetInnerHTML={{
                        __html: returnData.data.board[0].content
                      }}
                    ></td>
                  </tr>
                </tbody>
              </Table>


              <div>
                {/* <NavLink to={{
                    pathname: "/boardWrite",
                    query: {
                      title: returnData.data.board[0].title,
                      content: returnData.data.board[0].content,
                      //_id: this.props.location.query._id
                      _id: realIdValue
                    }
                  }}
                > */}
                 {/* <NavLink
                 to={{
                  pathname: "/boardWrite",
                  search: `?title=${returnData.data.board[0].title}&content=${returnData.data.board[0].content}&_id=${realIdValue}`
                }}
                >  */}

                <NavLink
                    to={'/boardWrite'}                
                    state= {{ title: returnData.data.board[0].title,
                       content: returnData.data.board[0].content,
                        id: realIdValue}}
                > 
                  <Button block='true' style={marginBottom}>
                     글 수정
                   </Button>
                </NavLink>


                <Button
                  block='true'
                  onClick={deleteBoard.bind(
                    null,
                    realIdValue
                  )}
                >
                  글 삭제
                </Button>
              </div>


            </div>
          );
          // this.setState({
          //   board: board
          // });
          setBrdstate(board)
        } else {
          alert("글 상세 조회 실패");
        }
      })
      //에러
      .catch(err => {
        console.log(err);
      });
  };

  //onClick={this.getBoard.bind(null,this.props._id)}

    const divStyle = {
      margin: 50
    };
    return <div style={divStyle}>{brdstate}</div>;
  
}

export default BoardDetail;
