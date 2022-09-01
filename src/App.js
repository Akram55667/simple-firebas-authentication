import "./App.css";
import app from "./firebase.init";
import { getAuth, GithubAuthProvider, GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";
import { useState } from "react";
 

const auth = getAuth(app);

function App() {
  const [user, setUser] = useState({});

  const googleProvider = new GoogleAuthProvider();

  const  githubProvider = new GithubAuthProvider();

  const handleGoogleSingIn = () => {
    signInWithPopup(auth, googleProvider)
      .then((result) => {
        const user = result.user;
        setUser(user);
        console.log(user);
      })

      .catch((error) => {
        console.log("error", error);
      });
  };

  const handleGithubSingIn = () =>{
    signInWithPopup(auth, githubProvider)
    .then(result =>{
      const user = result.user;
      setUser(user);
      console.log(user);
    })
    .catch(error =>{
      console.error(error);
    })
  }
  const handleSingOut = () =>{
    signOut(auth)
    .then(() =>{
      setUser({});
    })
    .catch(error =>{
      setUser({});
    })
  }
  return (
    <div className="App">
    {/* { condition ? true: false} */}
     {
       user.displayName ? <button onClick={handleSingOut}>Sing Out</button> :

       <>
         <button onClick={handleGoogleSingIn}>Google sing in</button>
         <button onClick={handleGithubSingIn}>Github Sing In</button>
       </>
       
     }
     <h2>Name: {user.displayName}</h2>
      <img src={user.photoURL} alt="" />
      <p><small>Email: {user.email}</small></p>
   
   </div>
  );
}

export default App;