import { onAuthStateChanged, signOut } from 'firebase/auth';
import React, { useEffect, useRef, useState } from 'react'
import { usePopper } from 'react-popper';
import { useNavigate } from 'react-router-dom';
import { auth } from '../utils/firebase';
import { useDispatch, useSelector } from 'react-redux';
import { addUser, removeUSer } from '../utils/userSlice';
import { LOGO, SUPPORTED_LANGUAGES } from '../utils/constant';
import { changeLanguage } from '../utils/configSlice';
import { toggleGptSearchView } from '../utils/gptSlice';


export const Header = () => {
  const [referenceElement, setReferenceElement] = useState(null);
  const [popperElement, setPopperElement] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const dropdownRef = useRef(null);
  const closeTimeoutRef = useRef(null);
  const user = useSelector(store => store.user);
  const dispatch = useDispatch();
  const showGptSearch = useSelector((store) => store?.gpt?.showGptSearch);
  
 const { styles, attributes } = usePopper(referenceElement, popperElement, {
    placement: 'bottom-end',
  });

  const handleMouseEnter = () => {
    clearTimeout(closeTimeoutRef.current);
    setIsOpen(true);
  };

  const handleMouseLeave = (e) => {
    if (!dropdownRef?.current?.contains(e.relatedTarget)) {
      closeTimeoutRef.current = setTimeout(() => {
        setIsOpen(false);
      },1000);
    }
  };

  const handleSignOut = () =>{
    signOut(auth).then(() => {
    }).catch((error) => {
      navigate("/error")
    });
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        const { uid, email, displayName, photoURL } = user;
        dispatch(
          addUser({
            uid: uid,
            email: email,
            displayName: displayName,
            photoURL: photoURL,
          })
        );
        navigate("/browse");
      } else {
        dispatch(removeUSer());
        navigate("/");
      }
    });

    // Unsubscribe when component unmounts from the DOM
    return () => unsubscribe();
  }, []);

  const handleGptSearchClick = () => {
    // Toggle GPT Search
    dispatch(toggleGptSearchView());
  };

  const handleLanguageChange = (e) => {
    dispatch(changeLanguage(e.target.value));
  };

  return (
    <div className='absolute w-screen px-8 md:py-2 bg-gradient-to-b from-black z-10 flex flex-col md:flex-row justify-between '>
    <img className='w-28 md:w-44 mx-auto md:mx-0'
     src={LOGO}
     alt='logo'
    />

   {user && (
    <div className="flex p-2 justify-between">
    {showGptSearch && (
      <select
      className="p-2 m-2 my-10 bg-gray-900 text-white"
      onChange={handleLanguageChange}
    >
    {SUPPORTED_LANGUAGES.map((lang) => (
      <option key={lang.identifier} value={lang.identifier}>
        {lang.name}
      </option>
    ))}
  </select>
)}
    <button
    className=" mx-4 my-10 px-4 py-2 bg-purple-800 text-white rounded-lg"
    onClick={handleGptSearchClick}
    >
    {showGptSearch ? "Homepage" : "GPT Search"}
    </button>
    <div className="relative p-5">
    <a
      ref={setReferenceElement}
      role="button"
      tabIndex="0"
      aria-haspopup="true"
      aria-expanded={isOpen}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <span role="presentation">
         {user?.photoURL && (
            <img className="w-12 rounded-xl mt-4" src={user?.photoURL} alt={user?.displayName} />
          )}
      </span>
    </a>

    {isOpen && (
      <div
        ref={setPopperElement}
        style={styles.popper}
        {...attributes.popper}
        className="absolute bg-black mt-4 p-6"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <p className='text-red-700'>{user?.displayName}</p>
        <button
          className="mt-4 text-white cursor-pointer whitespace-nowrap bg-red-600 rounded-lg px-1 py-1 w-full"
          onClick={handleSignOut}

        >
          Sign Out
        </button>
      </div>
    )}
  </div> 
  </div>
  )}
    </div>
  ) 
}