import { motion } from "framer-motion";
import { useStart } from "../../context/StartContext";
import TaskBar from "./win95/TaskBar";
import Window from "./win95/Window";
import { useRef } from "react";
import { useApplicationStore } from "../../store/AppStore/DesktopApplicationStore";
import { apps } from "../../data/staticData";

const DesktopScreen = () => {
  const { start } = useStart();
  const constraintsRef = useRef<HTMLDivElement | null>(null);
  const {
    openWindows,
    activeWindows,
    minimizedWindows,
    handleActiveWindows,
    handleOpenWindows,
    handleMinimizeRestore,
    closeWindow,
  } = useApplicationStore();

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={start ? { opacity: 1, zIndex: 10 } : { opacity: 1, zIndex: -1 }}
      transition={{ duration: 0, delay: start ? 6.9 : 0 }}
      className={`relative flex w-full h-full flex-col justify-between bg-[#196364] font-system text-black`}
    >
      <motion.div
        initial={{ opacity: 0 }}
        animate={start ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 0, delay: start ? 8 : 0 }}
        className="relative flex flex-col justify-start items-start overflow-hidden gap-y-6 px-3 py-4 text-[#010101] w-full h-full"
        ref={constraintsRef}
      >
        {/* Render desktop icons */}
        {apps.map(({ DesktopIcon, label, id }) => (
          <button
            key={id}
            className="bg-none shadow-none w-16 h-16 p-0 flex flex-col justify-center items-center leading-[1.1] text-[0.9rem] gap-[5px] hover:bg-white/10"
            onDoubleClick={() => handleOpenWindows(id)}
          >
            <DesktopIcon className="w-[3rem]" variant="32x32_4" />
            <span>{label}</span>
          </button>
        ))}

        {/* Render windows */}
        {apps
          .reverse()
          .map(({ id, Component, label, DesktopIcon, iWidth, iHeight }) => (
            <Window
              key={id}
              title={label}
              Icon={DesktopIcon}
              iWidth={iWidth}
              iHeight={iHeight}
              isResize={id === "tictactoe" || id === "wordle" ? false : true}
              constraintsRef={constraintsRef}
              isOpen={openWindows[id]}
              onOpen={(value: boolean) => {
                if (value) {
                  handleOpenWindows(id);
                } else {
                  closeWindow(id);
                }
              }}
              isActive={activeWindows[id]}
              onActive={() => handleActiveWindows(id)}
              isMinimized={minimizedWindows[id]}
              onMinimizeRestore={() => handleMinimizeRestore(id)}
            >
              <Component />
            </Window>
          ))}
      </motion.div>

      {/* TaskBar */}
      <TaskBar
        desktopApps={apps}
        openWindows={openWindows}
        minimizedWindows={minimizedWindows}
        onMinimizeRestore={handleMinimizeRestore}
        onActive={handleActiveWindows}
        isActive={activeWindows}
      />
    </motion.div>
  );
};

export default DesktopScreen;
