import { useState,useEffect } from "react";

const KEY='cf939176';
export function useMovies(query){
    const [isLoading, setIsLoading]=useState(false);
    const [error, setError]=useState('');
    const [movies, setMovies] = useState([]);
    useEffect(function(){
        const controller=new AbortController();
        async function fetchMovies(){
          try{   
               setIsLoading(true);
               setError('');
          const res=await fetch(`http://www.omdbapi.com/?apikey=${KEY}&s=${query}`,
          {signal: controller.signal});
    
        if(!res.ok)
         throw new Error("Something Went Wrong"); 
    
          const data=await res.json();
          if(data.Response ==='false')throw new Error('121212'); 
    
          setMovies(data.Search);
          setError('');
         } 
          catch(err){
         
            if(err.name !== 'AbortError'){
          setError(err.message)}}
          finally{
            setIsLoading(false);
          }
          }
          if(query.length<2){
            console.log(1)
            setMovies([]);
            setError('');
          }
        // handleClose();
        fetchMovies();
        return function(){
          controller.abort();
        }
      },[query]);
    return {movies,isLoading,error}
}