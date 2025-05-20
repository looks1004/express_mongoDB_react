import React, { Component, useState, useEffect } from "react";
import { Table } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import axios from "axios";
import $ from "jquery";
import {} from "jquery.cookie";
axios.defaults.withCredentials = true;
const headers = { withCredentials: true };

//class BoardRow extends Component {
function BoardRow(props) {

    const sendData = { realIdValue: props._id };
    console.log('===sendData:::',sendData)
    return (
      <tr>
        <td>
          {/* <NavLink
            to={{ pathname: "/board/detail", query: { _id: this.props._id } }}
          > */}

        {/* <NavLink
          to={{
            pathname: "/board/detail",
            search: `?_id=${this.props._id}`, // 쿼리 파라미터로 전달
          }}
        > */}

          <NavLink to='/board/detail'  state={sendData}>
              {props.createdAt.substring(0, 10)}
          </NavLink>
        </td>
        <td>
          {/* <NavLink
            to={{ pathname: "/board/detail", query: { _id: this.props._id } }}
          > */}

            {props.title} //  {props.content}

        </td>
      </tr>
    );

}

//class BoardForm extends Component {
function BoardForm() {

  // state = {
  //   boardList: []
  // };
  const [boardState, setBoardState] = useState([]);


  useEffect(() => {
    console.log("...useEffect...BoradForm..글목록");
    getBoardList();
  }, []);  // 빈 배열([])을 두 번째 인자로 넣으면, 컴포넌트가 마운트될 때만 실행됩니다.


  // componentDidMount() {
  //   this.getBoardList();
  // }

  const getBoardList = () => {
    const send_param = {
      headers,
      _id: $.cookie("login_id")
    };
    axios
      .post("http://localhost:8080/board/getBoardList", send_param)
      .then(returnData => {
        let boardList;
        if (returnData.data.list.length > 0) {
          // console.log(returnData.data.list.length);
          const boards = returnData.data.list;
          boardList = boards.map(item => (
            <BoardRow
              key={Date.now() + Math.random() * 500}
              _id={item._id}
              createdAt={item.createdAt}
              title={item.title}
              content={item.content}
            ></BoardRow>
          ));
          // console.log(boardList);
          setBoardState(boardList)
          // this.setState({
          //   boardList: boardList
          // });
        } else {
          boardList = (
            <tr>
              <td colSpan="2">작성한 게시글이 존재하지 않습니다.</td>
            </tr>
          );

          setBoardState(boardList)

          // this.setState({
          //   boardList: boardList
          // });
          // window.location.reload();
        }
      })
      .catch(err => {
        console.log(err);
      });
  };


    const divStyle = {
      margin: 50
    };

    return (
      <div>
        <div style={divStyle}>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>날짜</th>
                <th>글 제목</th>
              </tr>
            </thead>
            <tbody>{boardState}</tbody>
          </Table>
        </div>
      </div>
    );
 
}

export default BoardForm;
