import React, { Fragment } from "react";
import "./errorModal.css"
import ReactDOM from "react-dom";


function ErrorModal(props)
{
    function Backdrop(props) {
        return <div className="backdrop" onClick = {()=>props.onOkay()}></div>
    }
    
    function ModalOverlay(props)
    {
        return (<div className="modal">
        <header>
            <h2>
                {props.title}
            </h2>
        </header>
        <div>
            <p>{props.message}</p>
        </div>
        <footer>
            <button onClick={()=>props.onOkay()}>Okay</button>
        </footer>
        </div>)
    }
    
    return(
        <Fragment>
            {ReactDOM.createPortal(<Backdrop onOkay={props.onOkay}/>, document.getElementById("backdrop-root"))}
            {ReactDOM.createPortal(
                <ModalOverlay title ={props.title} message = {props.msg} onOkay = {props.onOkay} />,
                document.getElementById("overlay-root")
            )}            
        </Fragment>
    )
}

export default ErrorModal;