import React, {createContext, useState} from 'react'
import './loader.css'

export const LoaderContext = createContext();


export default function LoaderContextProvider({children}) {
    const [loader, setLoader] = useState(false);

  return (
    <>
        <article className={`loader ${loader && 'visible'}`} onClick={e => {e.preventDefault(); e.stopPropagation()}}>
            <div></div>
        </article>

        <LoaderContext.Provider value={{setLoader}}>
            {children}
        </LoaderContext.Provider>
    </>
  )
}
