import { useEffect, useRef } from "react";

function useOutsideClick(handler, listenCapturing = true) {
    const ref = useRef();
    useEffect(() => {
      function handleClick(e){
        if (ref.current && !ref.current.contains(e.target)){
            // console.log("click outside");
            handler();  
        } 
      }
      //event should be handled in the capturing phase not on the bubbling phase
      document.addEventListener("click", handleClick, listenCapturing); 

      return () => document.removeEventListener("click", handleClick);
      },[handler]
    );

    return ref;
}

export default useOutsideClick;

