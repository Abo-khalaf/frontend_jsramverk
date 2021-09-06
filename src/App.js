import React, { useState } from "react";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import "./App.css";

function App() {
  const [editor, setEditor] = useState(null);
  const [data, setData] = useState("");
  function handleData() {
    setData(editor.getData());
    console.log(editor.getData());
    localStorage.setItem("item", data);
  }
  return (
    <div className="App">
      <h2>My Editor</h2>
      <div className="Editor">
        <CKEditor
        style={{hieght:"400px"}}
          editor={ClassicEditor}
          data={data}
          onReady={(editor) => {
            setEditor(editor);
          }}
        />
      </div>

      <button className="Button" onClick={handleData}>
        save
      </button>
      <div>{data}</div>
    </div>
  );
}

export default App;
