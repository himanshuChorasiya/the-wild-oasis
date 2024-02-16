import styled from "styled-components";
import { useUser } from "../features/authentication/useUser";
import Spinner from "./Spinner";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const FullPage = styled.div`
    height: 100vh;
    background-color: var(--color-grey-50);
    display: flex;
    align-items: center;
    justify-content: center;
`;

function ProtectedRoute({children}){
   
    //1. LOad the authenticated user
    const {isLoading, isAuthenticated} = useUser();
    const navigate = useNavigate();

    //2.if there is No authenticated user, redirect to the /login
    useEffect(()=>{
       if(!isAuthenticated && !isLoading){
        navigate("/login", {replace:true});
       }
    },[isAuthenticated, isLoading, navigate]);
     //3. while loading, show a sppiner
     if(isLoading){
        return (<FullPage>
            <Spinner/>
        </FullPage>)
     }
     //4.if there is a user, render the app.
  if(isAuthenticated)  return children;
}
export default ProtectedRoute;