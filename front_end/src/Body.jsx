import React, { Component } from "react";

import BoaTest from "./BoaTest";

import LoginForm from "./LoginForm";
import BoardForm from "./BoardForm";
import BoardWriteForm from "./BoardWriteForm";
import BoardDetail from "./BoardDetail";
import MypageForm from "./MypageForm";
//import { Route, Routes } from "react-router-dom";
import { BrowserRouter as Router, Route, Routes, NavLink ,Link} from 'react-router-dom';
import $ from "jquery";
import {} from "jquery.cookie";

//class Body extends Component {

function Body() {

    let resultForm;
    function getResultForm() {
      // console.log($.cookie("login_id"));
      if ($.cookie("login_id")) {
        resultForm = <Routes>
                        <Route index path="/" element={<BoardForm/>}></Route>
                        <Route path="/BoaTest" element={<BoaTest />}></Route>
                        <Route path="/mypage" element={<MypageForm />}></Route>
                        <Route path="/boardWrite" element={<BoardWriteForm />}></Route>
                        <Route path="/board/detail" element={<BoardDetail />}></Route>
                     </Routes>;
        return resultForm;
      } else {
        resultForm = <Routes>
                        <Route index path="/" element={<LoginForm/>}></Route>
                        <Route path="/BoaTest" element={<BoaTest />}></Route>
                        <Route path="/mypage" element={<MypageForm />}></Route>
                        <Route path="/boardWrite" element={<BoardWriteForm />}></Route>
                        <Route path="/board/detail" element={<BoardDetail />}></Route>
                     </Routes>;
        return resultForm;
      }
    }
    getResultForm();
    
    return (
      <div>      
        {resultForm}        
      </div>
    );    

}

export default Body;
