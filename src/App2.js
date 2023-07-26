import { useState,useEffect } from "react";
import StarRating from'./StarRating'


const average = (arr) =>
  arr.reduce((acc, cur, i, arr) => acc + cur / arr.length, 0);

  const KEY='cf939176'

      export default function App() {

  const [movies, setMovies] = useState([]);
    const [query, setQuery] = useState("inception");
  const [watched, setWatched] = useState([]);
  const [isLoading, setIsLoading]=useState(false);
  const [error, setError]=useState('');
  const [selectedId, setSelectedId]=useState(null);

function handleSelectMovie(id){
  setSelectedId(id);
}

function handleClose(){
  setSelectedId(null);
}

function handleAddWatched(movie){
  setWatched(watch=> [...watch, movie])

//   localStorage.setItem('watched',JSON.stringify([...watched, movie]))
}

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
        console.error(err.message)
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
    handleClose();
    fetchMovies();
    return function(){
      controller.abort();
    }
  },[query]);

  return (
    <>
   <Navbar>
   <Logo/>
     <Search query={query} setQuery={setQuery}/>
       <NumResults movies={movies}/> 
   </Navbar>
<Main >
<Box>

{isLoading && <Loader/>}
{!isLoading && !error && <MovieList movies={movies} onSelectMovie={handleSelectMovie}
/>}
{error && <Error message={error}/>}
</Box>
   <Box>
  { selectedId? <SelectedMovie id={selectedId} onClose={handleClose}
  onAddWatched={handleAddWatched} watched={watched}/>:
  <>
  <WatchedSumamry watched={watched}/>
              <WatchedList watched={watched}/>
              </>}
   </Box>
</Main>
    
    </>
  );
}

function Loader(){
  return <p>Loading...</p>
}

function Error({message}){
  console.log(1)
return <p className="error">{message}</p>
}


function Navbar({children}){
return(
     <nav className="nav-bar">
    {children}
      </nav>
)
}

function Logo(){
  return(
    <div className="logo">
    <span role="img">🍿</span>
    <h1>usePopcorn</h1>
  </div>
  )
}

function NumResults({movies}){
 return(<p className="num-results">
  Found <strong>{movies?.length}</strong> results
</p>) 
}

function Search({query,setQuery}){

  return(
    <input
    className="search"
    type="text"
    placeholder="Search movies..."
    value={query}
    onChange={(e) => setQuery(e.target.value)}
  />
  )
}

function Main({children}){
 
return(
    <main className="main">
    {children}
      </main>
)
}

function MovieList({movies, onSelectMovie}){ 
 
  return(
    <ul className="list">
        {movies?.map((movie) => (
      <Movie movie={movie} key={movie.imdbID} onSelectMovie={onSelectMovie}/>
        ))}
      </ul>
  )
}

function SelectedMovie({id,onClose,onAddWatched, watched}){
const [movie, setMovie]=useState({});
const [isLoading,setIsLoading]=useState(false);
const [userRating , setUserRating]=useState('');



const {Title:title,Year:year, Poster:poster,Runtime:runtime,
imdbRating,Plot:plot,Released:released,Actors:actors,Director:director,
Genre:genre}=movie;
const isWatched = watched.map(movie=>movie.imdbId);
console.log(isWatched);
function handleAdd(){
  const newWatchedMovie={
    imdbId :id,
    title,year,poster,
    imdbRating: Number(imdbRating),
    runtime:runtime.split('').at(0),
userRating
  }
  onAddWatched(newWatchedMovie);
onClose();
}

useEffect(function(){
 function callBack(e){
      if(e.code==='Escape'){
     onClose();
      }
    }
    document.addEventListener('keydown',callBack)
 
  return function(){
    document.removeEventListener('keydown',callBack);
  };
},[onClose])

  useEffect(function(){
   
    async function getMovieDetails(){
      setIsLoading(true);
      const res=await fetch(`http://www.omdbapi.com/?apikey=${KEY}&i=${id}`);
      const data=await  res.json();
    setMovie(data);
    setIsLoading(false)
    }
    getMovieDetails();
  },[id]);

  useEffect(function(){
document.title=`Movie  | ${title}`;
if(!title)return;

return function(){
  document.title='usePopCorn';
}
  },[title])
  return<div className="details">
    {isLoading? <Loader/>:<>
    <header>
    <button className="btn-back" onClick={onClose}>Back</button>
    <img src={poster} alt={movie}/>
    <div className="details-overview">
      <h2>{title}</h2>
      <p>{released}</p>
      <p>{genre}</p>
      <p>{imdbRating}</p>
    </div></header>

    <section>
      <div className="rating">
      {!isWatched ? <> <StarRating maxRating={10} size={24} onSetRating={setUserRating}/>
     { userRating > 0 &&( <button className="btn-add" onClick={handleAdd}>+ Add to List</button>)} </>:
     <p>You Already Rate this Movie</p>}
      </div>
  
      <p><em>{plot}</em></p>
      <p>Staring {actors}</p>
      <p>Directed by: {director}</p>
    </section></>}
    </div>
}

function Movie({movie,onSelectMovie}){

  return(
    <li onClick={()=>onSelectMovie(movie.imdbID )} >
            <img src={movie.Poster} alt={`${movie.Title} poster`} />
            <h3>{movie.Title}</h3>
            <div>
              <p>
                <span>🗓</span>
                <span>{movie.Year}</span>
              </p>
            </div>
          </li>
  )
}

function Box({children}){
  const [isOpen, setIsOpen] = useState(true);

  return(
    <div className="box">
    <button
      className="btn-toggle"
      onClick={() => setIsOpen((open) => !open)}
    >
      {isOpen ? "–" : "+"}
    </button>
    {isOpen &&  children}
  </div>
  )
}

function WatchedSumamry({watched}){
  const avgImdbRating = average(watched.map((movie) => movie.imdbRating));
  const avgUserRating = average(watched.map((movie) => movie.userRating));
  const avgRuntime = average(watched.map((movie) => movie.runtime));
  return(
    <div className="summary">
    <h2>Movies you watched</h2>
    <div>
      <p>
        <span>#️⃣</span>
        <span>{watched.length} movies</span>
      </p>
      <p>
        <span>⭐️</span>
        <span>{avgImdbRating}</span>
      </p>
      <p>
        <span>🌟</span>
        <span>{avgUserRating}</span>
      </p>
      <p>
        <span>⏳</span>
        <span>{avgRuntime} min</span>
      </p>
    </div>
  </div>
  )
}

function WatchedList({watched}){
  return(
    <ul className="list">
                {watched.map((movie) => (
                 <WatchedMovie movie={movie} key={movie.imdbID}/>
                ))}
              </ul>
  )
}

function WatchedMovie({movie}){

  return(
    <li >
    <img src={movie.poster} alt={`${movie.title} poster`} />
    <h3>{movie.Title}</h3>
    <div>
      <p>
        <span>⭐️</span>
        <span>{movie.imdbRating}</span>
      </p>
      <p>
        <span>🌟</span>
        <span>{movie.userRating}</span>
      </p>
      <p>
        <span>⏳</span>
        <span>{movie.runtime} min</span>
      </p>
    </div>
  </li>
  )
}
