import { useEffect, useState } from "react";
import "./App.css";
import Auth from "./component/Auth";
import AuthGoogle from "./component/AuthGoogle";
import { db } from "./config/firebase";
import { getDocs, collection, addDoc ,doc , deleteDoc ,updateDoc } from "firebase/firestore";

function App() {
  const [movieList, setMovieList] = useState([]);

  // For Adding document to DB
  const [movieName, setMovieName] = useState("");
  const [releaseDate, setReleaseDate] = useState(0);
  const [isOscar, setIsOscar] = useState(false);

  // For Updating Title
  const [updatedTitle, setUpdateTitle] = useState("");

  const movieRef = collection(db, "movies");

  const getMovies = async () => {
    try {
      const data = await getDocs(movieRef);
      const filteredData = data.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      console.log(filteredData);
      setMovieList(filteredData);
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    getMovies();
  }, []);

  const addToDB = async () => {
    try {
      await addDoc(movieRef, {
        title: movieName,
        year: releaseDate,
        oscar: isOscar,
      });
      getMovies();
      setIsOscar(false);
      setMovieName("");
      setReleaseDate(0);
    } catch (e) {
      console.error(e);
    }
  };

  const deleteMovie = async (id)=>{
    const movieDoc = doc(db,"movies",id);
    await deleteDoc(movieDoc);
    getMovies()
  }

  const updateTitle = async (id) => {
    const movieDoc = doc(db,"movies",id);
    await updateDoc(movieDoc, {title : updatedTitle})
    setUpdateTitle("");
    getMovies();
  }

  return (
    <div className="h-auto py-8 bg-slate-800 border-4 border-indigo-500">
      <Auth />
      <AuthGoogle />

      <div>
        <div className="bg-white max-w-lg mx-auto mt-10 px-2 py-5">
          <input
            type="text"
            placeholder="Enter Movie..."
            value={movieName}
            onChange={(e) => {
              setMovieName(e.target.value);
            }}
            className=" border border-sky-700 w-full mt-6 pl-2"
          />
          <input
            type="number"
            placeholder="Enter Year..."
            value={releaseDate}
            onChange={(e) => {
              setReleaseDate(e.target.value);
            }}
            className=" border border-sky-700 w-full mt-6 pl-2"
          />
          <br/>
          <input
            type="checkbox"
            checked={isOscar}
            onChange={(e) => {
              setIsOscar(e.target.checked);
            }}
            className="my-8"
          />
          <label className="ml-5">IsAn Oscar</label>
          <br/>
          <button onClick={addToDB} className="bg-slate-700 text-white w-28 p-2">Click Me</button>
        </div>

        {movieList.map((mov) => {
          return (
            <div className="max-w-sm mx-auto mt-4 text-center bg-white py-3">
              <h1>{mov.title}</h1>
              <p>{mov.year}</p>
              <button onClick={()=>deleteMovie(mov.id)} className="bg-slate-700 rounded-sm text-white w-28 p-2">Delete</button>
              <br/>
              <input placeholder="Update Title..." onChange={(e) => {setUpdateTitle(e.target.value)}} className="border border-sky-700 w-1/2 mt-6 pl-2"/>
              <button onClick={()=>updateTitle(mov.id)} className="bg-slate-700 text-white w-28 px-2 py-1 rounded-sm ml-2">Update</button>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default App;
