import React, { useState, useEffect, useCallback } from "react";
import parse from 'html-react-parser'
import { io } from "socket.io-client";
import Editor from "./editor";
import Login from "./auth/login";
import "./App.css";
import axios from "axios";
const socket = io.connect("http://localhost:1337");
export default function Items() {
  const [editor, setEditor] = useState("");
  const [data, setData] = useState("");
  const [items, setItems] = useState([]);
  const [title, setTitle] = useState("");
  const [id, setId] = useState("");

  const [token, setToken] = useState("");
  const [userId, setUserId] = useState("id");

  const [signInUp, setSignInUp] = useState(false);
  var url;
  var local = ["localhost", "127.0.0.1"];
  if (local.includes(window.location.hostname)) {
    url = "http://localhost:1337";
  } else {
    url = "https://editor--backend--muab19.azurewebsites.net";
  }

  function callbackEditor(editor1) {
    return setEditor(editor1);
  }

  function postData() {
    try {
      setData(editor.getData());
      axios.post(url + "/add", {
        name: title,
        bor: editor.getData(),
        userId: userId,

      });

      socket.emit("send_message", {
        name: title,
        bor: editor.getData(),
      });
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    socket.on("receive_message", (data) => {
      setTitle(data.name);
      setData(data.bor);
    });
  }, [title]);

  const handleChange = (event) => {
    try {
      setTitle(event.target.value);
    } catch (error) {
      console.log(error);
    }
  };


  function componentDidMount1() {

    axios.post(url + '/graphql', {
      query: `{   document {
          name
          bor
          userId
          _id
        }}` })

      .then(res => setItems(res.data.data.document));

  }




  function componentDidMount2() {
    console.log("hej hje", id);
    try {
      axios.delete(`${url}/delete/${id}`).then((res) => {
        console.log(res.data.document);
      });
      alert("This Item was deleted  ...");
      componentDidMount1()
    } catch (error) {
      console.log(error);
    }
  }

  function patchTheMongoData() {
    try {
      axios
        .patch(`${url}/update/${id}`, {
          name: title,
          bor: editor.getData(),
        })

        .then((res) => {
          console.log(res.data);
        });

      socket.emit("send_message", {
        name: title,
        bor: editor.getData(),
      });
      alert("full the inputs to update the item ...");
      componentDidMount1();
    } catch (error) {
      console.log(error);
    }
  }

  function sendItems(id, title, text) {
    try {
      setId(id);
      setTitle(title);
      setData(text);
    } catch (error) {
      console.log(error);
    }
  }

  // const collbackuseID = (userID) => {
  //   Login.sendUserID()
  // }

  const signInCallBack = (uId) => {
    setSignInUp(true);
    setUserId(uId);
    console.log("asjkdflkjsadflkjs", uId);
  };
  if (signInUp === true) {
    console.log("items", items);
    return (
      <div className="App">
        <h2>My Editor</h2>

        <div className="inputs">
          title:{" "}
          <input
            type="text"
            name="title"
            value={title}
            onChange={handleChange}
          />
          <div className="editor" style={{ color: "green" }}>
            <Editor parentCallBack={callbackEditor} data={data} />
          </div>
        </div>
        <div className="buttons">
          <button
            data-testid="save-button"
            className="Button"
            onClick={postData}
          >
            save
          </button>
          <button className="Button" onClick={patchTheMongoData}>
            Edit
          </button>

          <button className="Button" onClick={componentDidMount2}>
            Delete
          </button>

          <button
            data-testid="show-button"
            className="Button"
            onClick={componentDidMount1}
          >
            Show
          </button>
        </div>
        <div>
          <ul>
            {items.map((item) => (
              <li
                key={item._id}
                onClick={() => sendItems(item._id, item.name, item.bor)}
              >
                {item.name}
                {item._id}

              </li>
            ))}
          </ul>
        </div>
      </div>
    );
  } else {
    return <Login callBack={signInCallBack} />;
  }
}

//  Items;
