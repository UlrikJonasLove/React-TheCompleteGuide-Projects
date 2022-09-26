import React, { useState, useCallback } from 'react'; // useCallback lets us store a function across component execution
                                                      //so we save a function and not be re-created by every execution
import './App.css';
import Button from './components/UI/Button/Button';
import { DemoOutput } from './components/UI/Button/demo/DemoOutput';

function App() {
  // state will never be re-created, only changed
  //state may get removed in child components if the component is conditionally rendered, and removed from the dom
  const [showParagraph, setShowParagraph] = useState(false);
  const [allowToggle, setAllowToggle] = useState(false);

  console.log("app running")

  //when this function re-runs, useCallback will look for this stored function, and use the same
  //if the function will never change, we can use useCallback to store it
  //useCallback works togheter with memo
  const toggleParagraphpHandler = useCallback(() => {
    if(allowToggle) {
      setShowParagraph((prevShowPara) => !prevShowPara);
    }
    // the dependencies are the same as useEffect, in this example allowToggle may change so we re-create the function when it changes
  }, [allowToggle]); //but the function will only be re-created when dependencies changes

  const allowToggleHandler = () => {
    setAllowToggle(true);
  }

  return (
    <div className="app">
      <h1>Hi there!</h1>
      <DemoOutput show={showParagraph} />
      <Button onClick={allowToggleHandler}>Allow Toggle</Button>
      <Button onClick={toggleParagraphpHandler}>toggle paragrahp</Button>
    </div>
    
  );
}

export default App;