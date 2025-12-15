import Die from "./components/Die.jsx";
import { useState } from "react";
import { nanoid } from "nanoid";
import Confetti from "react-confetti";

function App() {
  const [dice, setDice] = useState(() => generateRandon());

  function generateRandon() {
    return new Array(10).fill(10).map(() => ({
      value: Math.floor(Math.random() * 6) + 1,
      isHeld: false,
      id: nanoid(),
    }));
  }
  function hold(id) {
    setDice((prevState) =>
      prevState.map((die) =>
        die.id === id
          ? {
              ...die,
              isHeld: !die.isHeld,
            }
          : die
      )
    );
  }

  function roll() {
    if (!gameWon()) {
      setDice((prevState) =>
        prevState.map((die) =>
          die.isHeld
            ? {
                ...die,
              }
            : { value: Math.floor(Math.random() * 6) + 1, id: nanoid() }
        )
      );
    } else {
      setDice(generateRandon());
    }
  }

  function gameWon() {
    return dice.every(
      (die) => die.isHeld === true && die.value === dice[0].value
    );
  }

  return (
    <div className="bg-blue-50 min-h-screen flex justify-center items-center px-4">
      <div className="flex flex-col text-center bg-char shadow-lg justify-around h-75 px-4 items-center">
        <div className="space-y-1">
          <h1 className="text-3xl">Tenzies</h1>
          <p className="max-w-[50ch]">
            Roll until all dice are the same. Click each die to freeze it at
            it's current value between rolls
          </p>
        </div>
        <div className="grid grid-cols-5 w-75 gap-4">
          {dice.map((die) => (
            <Die
              key={die.id}
              value={die.value}
              class={`${
                die.isHeld ? `bg-blue-700  text-white ` : ` bg - transparent`
              } hover:bg-blue-500 text-blue-700 font-semibold hover:text-white border border-blue-500 hover:border-transparent rounded text-3xl`}
              click={() => hold(die.id)}
            />
          ))}
        </div>
        <button
          onClick={() => roll()}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
        >
          {gameWon() ? `New Game` : `Roll`}
        </button>
        {gameWon() && <Confetti />}
      </div>
    </div>
  );
}

export default App;
