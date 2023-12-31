import { useState,useEffect,useRef } from "react";
import StarRating from'./StarRating'
import { useMovies } from "./useMovies";


const average = (arr) =>
  arr?.reduce((acc, cur, i, arr) => acc + cur / arr.length, 0);


      export default function App() {

    const [query, setQuery] = useState("");
  const [watched,setWatched]=useState([]);
  const [selectedId, setSelectedId]=useState(null);

  const {movies,isLoading,error}=useMovies(query);

function handleSelectMovie(id){
  setSelectedId(id);
}

function handleClose(){
  setSelectedId(null);
}

function handleAddWatched(movie){
  setWatched((watch)=> [...watch, movie])
}

function handleDelete(id){
  setWatched((watched)=>watched.filter((movie)=>movie.imdbID !==id));
}
useEffect(function(){
  localStorage.setItem('watched', JSON.stringify(watched))
},[watched])

 
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
              <WatchedList watched={watched}
              onDelete={handleDelete}/>
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
 const inputEl=useRef(null)

 useEffect(function(){
  console.log(inputEl.current)


function callBack(e){
  if(document.activeElement===inputEl.current){return;}
  if(e.code==='Enter')
 { inputEl.current.focus();
setQuery('')}
}
document.addEventListener('keydown',callBack)
 },[setQuery]);
  return(
    <input
    className="search"
    type="text"
    placeholder="Search movies..."
    value={query}
    onChange={(e) => setQuery(e.target.value)}
    ref={inputEl}
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
Genre:genre,imdbID}=movie;
const isWatched = watched?.map((movie)=>movie.imdbID).includes(id);
console.log(isWatched); 

function handleAdd(){
  const newWatchedMovie={
    imdbID :id,
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
      const res=await fetch(`http://www.omdbapi.com/?apikey=cf939176&i=${id}`);
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
      {!isWatched ? <><StarRating maxRating={10} size={24} onSetRating={setUserRating}/>
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
  const avgImdbRating = average(watched?.map((movie) => movie.imdbRating));
  const avgUserRating = average(watched?.map((movie) => movie.userRating));
  const avgRuntime = average(watched?.map((movie) => movie.runtime));
  return(
    <div className="summary">
    <h2>Movies you watched</h2>
    <div>
      <p>
        <span>#️⃣</span>
        <span>{watched?.length} movies</span>
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

function WatchedList({watched,onDelete}){
  return(
    <ul className="list">
                {watched?.map((movie) => (
                 <WatchedMovie movie={movie} key={movie.imdbID}
                 onDelete={onDelete}/>
                ))}
              </ul>
  )
}

function WatchedMovie({movie,onDelete}){

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

      <button className="btn-delete" onClick={()=> onDelete(movie.imdbID)}>X</button>
    </div>
  </li>
  )
}
