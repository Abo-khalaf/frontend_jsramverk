import { useState } from 'react';
import jsPDF from 'jspdf';
import Items from './items';
import Login from './auth/login';



function Download() {
    const [item, setItems] = useState();
    const [userId, setUserId] = useState("id");
    const [signInUp, setSignInUp] = useState(false);
    const handleItems = (item) => {
        setItems(item)
    }
    const downloadPDF = () => {
        const doc = new jsPDF("p", "pt", "a4");
        doc.html(document.querySelector("#cont"), {
            callback: function (pdf) {
                pdf.save("mypdf.pdf")
            }
        })
    }
    const signInCallBack = (uId) => {
        setSignInUp(true);
        setUserId(uId);
    }
    if (signInUp === true) {
        return (
            <>
                <h3 id="cont">{item?.name}<hr></hr><spam>{item?.bor}</spam></h3>
                <Items getSpecificId={handleItems} />
                <button onClick={downloadPDF} >Download</button>

            </>
        )

    } else {
        return <Login callBack={signInCallBack} />;
    }
}
export default Download;

