import React, { useState } from "react";

import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import "./App.css";
import axios from "axios";

function Items() {
  const [editor, setEditor] = useState(null);
  const [data, setData] = useState("");
  const [items, setItems] = useState([]);

  const [title, setTitle] = useState("");

  const [id, setId] = useState("");

  var url;
  var local = ['localhost', '127.0.0.1']

  if (local.includes(window.location.hostname)) {
    url = 'http://localhost:1337'
  } else {
    url = 'https://editor-backend-muab19.azurewebsites.net/';
  }

  


  function postData() {
    setData(editor.getData());
    axios.post(url + "/add", {
      name: title,
      bor: editor.getData(),
    });
  }

  const handleChange = (event) => {
    setTitle(event.target.value);
  };

  function componentDidMount1() {
    axios.get(url + "/items").then((res) => {
      setItems(res.data);
      console.log(res.data);
    });
  }

  function componentDidMount2() {
    axios.delete(`${url}/delete/${id}`).then((res) => {
      //   setItems(res.data);
      console.log(res.data);
    });
    alert("This Item was deleted  ...");
    componentDidMount1();
  }

  function componentDidMount3() {
    axios.patch(`${url}/update/${id}`, {
      name: title,
      bor: editor.getData(),
    });
    alert("full the inputs to update the item ...");
    // alert('this Item was deleted klick Show again to se ..')
    componentDidMount1();
  }

  function sendItems(id, title, text) {
    setId(id);
    setTitle(title);
    setData(text)
  }
  return (
    <div className="App">
      <h2>My Editor</h2>
      <div>
        title:{" "}
        <input type="text" name="title" value={title} onChange={handleChange} />
      </div>
      <div className="Editor">
        <CKEditor
          style={{ hieght: "400px" }}
          editor={ClassicEditor}
          data={data}
          onReady={(editor) => {
            setEditor(editor);
          }}
        />
      </div>
      <button className="Button" onClick={postData}>
        save
      </button>
      <button className="Button" onClick={componentDidMount3}>
        Edit
      </button>

      <button className="Button" onClick={componentDidMount2}>
        Delete
      </button>

      <button className="Button" onClick={componentDidMount1}>
        Show
      </button>
      <div>
        <ul>
          {items.map((item) => (
            <li key={item._id} onClick={() => sendItems(item._id, item.name, item.bor)}>
              {item.name}
            </li>
          ))}
        </ul>
      </div>
      {/* <div>{data}</div>*/}
    </div>
  );
}

export default Items;
