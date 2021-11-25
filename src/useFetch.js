import { useEffect,useState} from 'react';

const useFetch = (url)=>{
    const [data,setData] = useState(null);
     
 
    const [isPending,setIsPending] = useState(true);
   const [error,setError] = useState(null);
    
    useEffect(()=>{
        const abortCont = new AbortController();
          setTimeout(()=>{
            fetch(url,{signal:abortCont.signal})
            .then(res=>{
                console.log(res);
                if(!res.ok){
                    throw Error();
                }
                return res.json();
            })
            .then(data =>{
                console.log(data);
                setData(data);
                setIsPending(false);
                setError(null);
            })
            .catch(e=>{
                if(e.name === "AbortError"){
                    console.log("fetch aborted");
                }
                else{
                    setIsPending(false);
                    setError(e.message);
                }
               
            })
          },100);
          return ()=>abortCont.abort();
    },[url]);

    return {data,isPending,error}
}
export default useFetch;