import { useEffect } from "react";
import { useWorldStore } from "../../store/gameStore/wordleStore";
import { Qwerty } from "./wordle/Qwerty";
import { Guess } from "./wordle/Guess";

const Wordle = () => {
  const { init, word, guesses, currentGuess, handleKeyup, won, lost } =
    useWorldStore();

  useEffect(() => {
    init();
    window.addEventListener("keyup", handleKeyup);
    return () => {
      window.removeEventListener("keyup", handleKeyup);
    };
  }, []);

  return (
    <div className="flex h-full flex-col flex-1 items-center justify-around overflow-auto lg:bg-white bg-[#55a459] lg:border border-white border-t-none border-l-[#868a8e] leading-6 px-4 gap-y-5 py-4 select-none">
      <div className="flex lg:w-[80%] mobile:[@media(max-height:450px)]:max-w-[500px] w-full h-full flex-col gap-y-3">
        <h1 className="lg:inline mobile:[@media(max-height:450px)]:hidden text-2xl mobile:[@media(max-height:450px)]:text-base font-bold text-center lg:text-black text-white">
          {won ? "You Win!" : lost ? "You Lose!" : "Guess The Word"}
        </h1>
        <div className="flex flex-col items-center gap-y-1 h-full">
          {guesses.map((_, i) => (
            <Guess
              key={i}
              word={word}
              guess={guesses[i]}
              isGuessed={i < currentGuess}
            />
          ))}
        </div>
        <button
          type="button"
          className={`win95-button active:scale-95 ${
            won
              ? "bg-green-900 text-white lg:bg-gray-200 lg:text-black"
              : "bg-red-900 text-white lg:bg-gray-200 lg:text-black "
          } p-4 border-0 rounded lg:border-1 lg:rounded-none lg:w-[45%] w-[35%] ${
            lost || won
              ? "flex  justify-center absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 text-2xl font-semibold lg:font-normal"
              : "hidden"
          }`}
          onClick={() => init()}
        >
          Play Again
        </button>
      </div>
      <Qwerty />
    </div>
  );
};

export default Wordle;
