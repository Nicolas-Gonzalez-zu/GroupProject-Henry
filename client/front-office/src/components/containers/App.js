import React from 'react'

import NavBar from "../navbar";
import SideBar from "../sidebar";
import ContentWrapper from "./ContentWrapper";
import Footer from "./Footer";

function App() {
    return (
        <>
            <NavBar/>
            <SideBar/>
            <ContentWrapper/>
            <Footer/>
        </>
    );
}

export default App;
