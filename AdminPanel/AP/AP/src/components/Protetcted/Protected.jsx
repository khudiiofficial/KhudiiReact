import React from 'react'
import { Navigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
const Protected = ({children}) => {
    const location=useLocation()
    const auth=useSelector((state)=>state.users.auth)
    if(auth && location.pathname==='/Login'){
        return <Navigate to={'/dashboard'}/>
    }
    if(auth){
        return children;
    }
    else if(!auth && location.pathname==='/Login'){
        return children
    }
    else{
return <Navigate to={'/Login'}/>
    }

}

export default Protected