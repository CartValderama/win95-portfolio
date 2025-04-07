import { MdKeyboardBackspace } from "react-icons/md";
import { PuzzleStore } from "../../../store/gameStore/PuzzleStore";
import { Button } from "../../monitor/win95/Button";
import { GrReturn } from "react-icons/gr";

export const Qwerty = () => {
  const abcd = ["abcdefg", "hijklmn", "opqrstu", "vwxyz"];
  const { exactGuesses, allGuesses, inexactGuesses, handleKeyClick } =
    PuzzleStore();

  return (
    <div className="flex flex-wrap items-center justify-center gap-0.5 w-full">
      {abcd.map((row, idx) => (
        <div
          key={idx}
          className="flex justify-center gap-0.5 w-full font-semibold lg:font-normal"
        >
          {/* Add Backspace button to the first row */}
          {idx === 3 && (
            <Button
              variant={"default"}
              className="bg-gray-200 px-2 py-1 w-full border-0 rounded lg:border-1 lg:rounded-none"
              onClick={() => handleKeyClick("Delete")}
            >
              <MdKeyboardBackspace />
            </Button>
          )}
          {/* Render each key */}
          {row.split("").map((char, idy) => {
            const bgColor = exactGuesses().includes(char)
              ? "bg-green-400"
              : inexactGuesses().includes(char)
              ? "bg-yellow-400"
              : allGuesses().includes(char)
              ? "bg-gray-400"
              : "bg-gray-200";
            return (
              <Button
                key={idy}
                variant={"default"}
                className={`uppercase px-2 py-1 ${bgColor} w-full min-h-10 border-0 rounded ${
                  char && "active:scale-95"
                } transition-transform duration-100 lg:border-1 lg:rounded-none`}
                onClick={() => handleKeyClick(char)}
              >
                {char}
              </Button>
            );
          })}

          {/* Add Return button to the last row */}
          {idx === 3 && (
            <Button
              variant={"default"}
              className="bg-gray-200 px-2 py-1 w-full border-0 rounded lg:border-1 lg:rounded-none"
              onClick={() => handleKeyClick("Enter")}
            >
              <GrReturn />
            </Button>
          )}
        </div>
      ))}
    </div>
  );
};
