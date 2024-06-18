import React, { useEffect } from "react";
import NavSection from "../components/nav";
import LoginSection from "../components/login";
import { useState } from "react";

const Login = () => {
    const [firstLetter, setFirstLetter] = useState('U');

    return (
        <>
            
            <NavSection firstletter={firstLetter}></NavSection>
            <LoginSection setFirstLetter={setFirstLetter}></LoginSection>
        </>


    )
}

export default Login
