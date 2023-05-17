import React, { useState, useEffect, useCallback } from "react";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

import axios from "axios";



function Editor({ parentCallBack, data }) {

  const [executedResponse, setExecutedResponse] = React.useState("")
  const [inputValue, setInputValue] = useState('');
  async function executeCode() {
    try {
      const response = await axios.post('https://execjs.emilfolino.se/code', { code: btoa(inputValue) });
      const result = response.data;
      console.log("moody", result.data);
      setExecutedResponse(atob(result.data));
    } catch (error) {
      // Handle error here
      console.error(error);
    }
  }

  return (
    <>
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


      <div>
        <input type="text" value={inputValue} onChange={(e) => setInputValue(e.target.value)} />
        <button
          execute
          onClick={() => executeCode(data)}
        >
          Execute code
        </button>
        <pre className="output">
          <p>Output:</p>
          <p>{executedResponse}</p>
        </pre>

      </div>

    </>
  );
}

export default Editor;
