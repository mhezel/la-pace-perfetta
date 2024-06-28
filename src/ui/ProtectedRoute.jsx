import { styled } from "styled-components";
import { useGetUser } from "../features/authentication/useGetUser";
import { useNavigate } from "react-router-dom";
import Spinner from "../ui/Spinner";
import { useEffect } from "react";

const FullPage = styled.div`
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
`;
function ProtectedRoute({children}) {
  
  const navigate = useNavigate();
  //1. Load authenticated users: 
  const {isLoading, isAuthenticated} = useGetUser();

  //3. If !authenticated redirect to login page
  useEffect(() => {
    if(!isAuthenticated && !isLoading ) navigate("/login");
    }, 
    
    [isAuthenticated, isLoading, navigate]
  );

  // 3. While loading, show a spinner
  if (isLoading)
    return (
      <FullPage>
        <Spinner />
      </FullPage>
    );

  //4. else render app
  if (isAuthenticated) return children;
}

export default ProtectedRoute;
