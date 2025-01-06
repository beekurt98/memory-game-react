import { useState } from 'react'
import './App.css'

function App() {
  const [gameOn, setGameOn] = useState(false);
  const [numArr, setArr] = useState([])
  const [gridSize, setGridSize] = useState(0)
  const [theme, setTheme] = useState("number")


  function handleSize(e) {
    const size = parseInt(e.target.value)
    setGridSize(size);
    console.log(gridSize)
    const arr = []
    for(let i = 1; i < size/2+1; i++) {
      arr.push(i);
    }
    const randomizedArray = [...arr.sort(() => Math.random() - 0.5), ...arr.sort(() => Math.random() - 0.5)] 
    setArr(randomizedArray)
  }

  function initializeGame() {
    console.log(gridSize)
    setGameOn(true)
  }

  return (
    <>
    <h1>memory</h1>
    {
      gameOn ? <GameScreen numArr={numArr} gridSize={gridSize} />
      : <MainScreen handleSize={handleSize} initializeGame={initializeGame} />
    }
    </>
  )
}

function MainScreen({ handleSize, initializeGame }) {

  return (
    <div>
      <div>Select Themes: <button>Numbers</button><button>Symbols</button></div>
      <div>Number of Players: <button>1</button><button>2</button><button>3</button><button>4</button></div>
      <div>Grid Size: <button value={16} onClick={handleSize}>4x4</button><button value={36} onClick={handleSize}>6x6</button></div>
      <button onClick={initializeGame}>Start Game</button>
    </div>
  )
}

function GameScreen({ numArr, gridSize }) {
  const [move, setMove] = useState(0);
  const [score, setScore] = useState(0);
  const [pastMove, setPastMove] = useState(null);
  const [currBtns, setCurrBtns] = useState([]); 
  const [matchedBtns, setMatchedBtns] = useState([]); 

  if(matchedBtns.length == numArr.length) {
    console.log("game over!")
  }

  const style = {
    display: "grid",
    gridTemplateColumns: `repeat(${Math.sqrt(gridSize)}, 1fr)`,
    width: "500px",
    height: "500px",
  };

  function handleMove(e, index) {
    if (currBtns.length === 2 || matchedBtns.includes(index)) {
      return;
    }

    const value = parseInt(e.target.value, 10);

    if (currBtns.length === 0) {
      setPastMove(value);
      setCurrBtns([index]); 
    } else if (currBtns.length === 1) {
      setCurrBtns([...currBtns, index]); 
      setMove((prevMove) => prevMove + 1); 

      if (pastMove === value) {
        setScore((prevScore) => prevScore + 1);
        setMatchedBtns((prevMatched) => [...prevMatched, ...currBtns, index]); 
      }

      setTimeout(() => {
        setCurrBtns([]);
        setPastMove(null);
      }, 1000);
    }
  }

  return (
    <>
      <div style={style} className="num-btn-cont">
        {numArr.map((num, index) => (
          <button
            value={num}
            onClick={(e) => handleMove(e, index)}
            className={
              matchedBtns.includes(index) 
                ? "num-btn clicked matched-btns"
                : currBtns.includes(index) 
                ? "num-btn clicked currently-matched"
                : "num-btn hide"
            }
            key={index}
          >
            {num}
          </button>
        ))}
      </div>
      <div>
        <p>Moves: {move}</p>
        <p>Score: {score}</p>
      </div>
    </>
  );
}

export default App
