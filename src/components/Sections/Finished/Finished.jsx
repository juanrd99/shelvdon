import React, { useContext, useState } from "react";

//@context
import { GlobalContext } from "../../../context/GlobalState";
import AlphabetMenu from "../../AlphabetMenu/AlphabetMenu";

//@component
import { BookFinishedCard } from "../../BookFinishedCard/BookFinishedCard";

//@style
import "./Finished.css";


export const Finished = () => {
  const { finished } = useContext(GlobalContext);
  let indexedList = {};
  let [index, setIndex] = useState('');


  const setIndexStructure = () => {
    finished.map(i => indexedList[i.name[0]] = [])
  }

  const setIndexValues = () => {
    setIndexStructure();
    finished.map(i => indexedList[i.name[0]].push(i))
  }

  const sendDataToParent = (index) => {
    setIndex(index);
  };

  setIndexValues();

  return (
    <div>
      <div style={{ display: 'flex', flexFlow:'row', margin:'3% 2% 0.5% 2%'}}>
        <h2>Finished books</h2>
        {index? (
                  <h2 style={{marginLeft:'1%'}}>by letter:</h2>
        ):null}
        <h1 style={{ fontWeight: 'bold', color: '#9A4444', marginLeft:'1%', marginTop:'-0.5%'}}>{index}</h1>
      </div>
      <AlphabetMenu index={index} sendDataToParent={sendDataToParent}/>
      <div className="w-100 h-100 d-flex flex-row justify-content-center align-items-center" style={{ marginTop: '5%' }}>
        {indexedList[index]?.length > 0 ? (
          <ul>
            {indexedList[index]?.map((book) => (
              <BookFinishedCard book={book} />
            ))}
          </ul>
        ) : (<h2>Empty List</h2>)}
      </div>
    </div>
  );
};
