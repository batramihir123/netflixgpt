import { useState, useRef } from "react";
import { Header } from './Header'
import { checkValidData } from '../utils/validate';
import { auth } from '../utils/firebase';
import { createUserWithEmailAndPassword , signInWithEmailAndPassword, updateProfile } from "firebase/auth";
import { BG_URL, USER_AVATAR } from "../utils/constant";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";

export const Login = () => {

  const[isSignInForm,setIsSignInForm] = useState(true);
  const[isErrorMessage,SetISErrorMessage]=useState(true);
  const fullname = useRef(null);
  const email = useRef(null);
  const password = useRef(null);
  const dispatch = useDispatch();

 

  const toggleSignInForm = () => {
    setIsSignInForm(!isSignInForm);
  };

  const handleButtonClick = () =>{
    const message = checkValidData(email.current?.value, password.current?.value ,fullname.current?.value);
    SetISErrorMessage(message);
    if(message) return;

    if(!isSignInForm)
    {
        createUserWithEmailAndPassword
        (auth, 
        email?.current?.value,
        password?.current?.value)
    .then((userCredential) => {
      const user = userCredential.user;
      updateProfile(user, {
        displayName: fullname.current.value,
        photoURL: USER_AVATAR,
      })
      .then(() => {
        const { uid, email, displayName, photoURL} = auth?.currentUser;
        dispatch(
          addUser({
            uid: uid,
            email: email,
            displayName: displayName,
            photoURL: photoURL,
          })
        );
      })
    .catch((error) => {
      SetISErrorMessage(error.message);
    });
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      SetISErrorMessage(errorCode + "-" + errorMessage);
  });
  }
  else{
    signInWithEmailAndPassword(auth, email.current?.value, password.current?.value)
  .then((userCredential) => {
    const user = userCredential.user;
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    SetISErrorMessage(errorCode + "-" + errorMessage);
  });
  }
  }

 return (
    <div>
   <Header/>
    <div className="absolute">
    <img src ={BG_URL}
     alt='logo'
     className="h-screen w-screen object-cover" />
     </div>
    
     <form
        onSubmit={(e) => e.preventDefault()}
        className="w-full md:w-3/12 absolute p-12 bg-black my-36 mx-auto right-0 left-0 text-white rounded-lg bg-opacity-80"
      >
        <h1 className="font-bold text-3xl py-4">
          {isSignInForm ? "Sign In" : "Sign Up"}
        </h1>

        {!isSignInForm && (
          <input
            ref={fullname}
            type="text"
            placeholder="Full Name"
            className="p-4 my-4 w-full bg-gray-700"
          />
        )}
        <input
          ref={email}
          type="text"
          placeholder="Email Address"
          className="p-4 my-4 w-full bg-gray-700"
        />
        <input
          ref={password}
          type="password"
          placeholder="Password"
          className="p-4 my-4 w-full bg-gray-700"
        />
        <p className="text-red-500 font-bold text-lg py-2">{isErrorMessage}</p>
        <button
          className="p-4 my-6 bg-red-700 w-full rounded-lg"
          onClick={handleButtonClick}
        >
          {isSignInForm ? "Sign In" : "Sign Up"}
        </button>
        <p className="py-4 cursor-pointer" onClick={toggleSignInForm}>
          {isSignInForm
            ? "New to Netflix? Sign Up Now"
            : "Already registered? Sign In Now."}
        </p>
      </form>
      </div>
  )
}
