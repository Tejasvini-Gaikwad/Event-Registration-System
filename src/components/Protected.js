import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Protected = (props) => {
    const {Component} = props;
    const navigate = useNavigate()
    useEffect(()=>{
        const loginInfo = JSON.parse(localStorage.getItem('user-info'));
        if(!loginInfo){
            navigate('/')
        }
    })
    return (
        <div>
            <Component />
        </div>
    )
}

export default Protected