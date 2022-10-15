import React from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";
import { RouterRender } from "./routes/routesRender";

function App() {
    return (
        <>
            <RouterRender></RouterRender>
            <ToastContainer></ToastContainer>
        </>
    );
}

export default App;
