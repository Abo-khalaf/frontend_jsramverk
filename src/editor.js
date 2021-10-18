import React from "react";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import "./App.css";

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
    />
  );
}

export default Editor;
