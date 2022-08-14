import React from "react";
import { useEffect } from "react";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { io } from "socket.io-client";
// import "./App.css";
// var url;
// var local = ["localhost", "127.0.0.1"];
// if (local.includes(window.location.hostname)) {
//   url = "http://localhost:1337";
// } else {
//   url = "https://editor--backend--muab19.azurewebsites.net";
// }

function Editor({ parentCallBack, data }) {
  return (
    <CKEditor
      style={{ hieght: "400px" }}
      editor={ClassicEditor}
      data={data}
      onReady={(editor) => {
        if (editor) {
          parentCallBack(editor);
        }
      }}
      onKeyUp={(editor) => {
        parentCallBack(editor);
      }}


    />
  );
}

export default Editor;
