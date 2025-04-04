import { motion } from "framer-motion";
import { useStart } from "../../context/StartContext";

const BootUpScreen = () => {
  const { start } = useStart();

  const bootMessages = [
    "Award Modular BIOS v4.50PG, An Energy Star Ally",
    "Copyright (C) 1984-95, Award Software, Inc.",
    "\n",
    "Version 3.0E3704",
    "\n",
    "Pentium-S CPU at 100MHz",
    "Memory Test: 16384K OK",
    "\n",
    "Award Plug and Play BIOS Extension v1.0A",
    "Copyright (C) 1995, Award Software, Inc",
    "Engage turbo mode. Just kidding, We're On A 90s CPU.",
    "Detecting HDD Primary Master .... WDC AC34300L",
    "Detecting HDD Primary Slave ..... None",
    "Detecting HDD Secondary Master .. None",
    "All Systems Nominal. Probably.",
    "Please Be Patient, Or Don't.",
    "_",
  ];

  const formatMessage = (message: string) => {
    return message.split("\n").map((line, index) => (
      <span key={index}>
        {line}
        {index < message.split("\n").length - 1 && <br />}{" "}
      </span>
    ));
  };

  return (
    <motion.div
      key={start ? "start-true" : "start-false"}
      initial={{ opacity: 1 }}
      animate={start ? { opacity: 0, zIndex: -1 } : { opacity: 1, zIndex: 10 }}
      transition={{
        duration: 0.1,
        delay: 7,
      }}
      className="z-10 absolute flex w-full h-full font-system opacity-85 text-xl blur-[.4px] bg-black text-neutral-200"
    >
      {/* boot up screen */}
      <motion.div
        initial={{ opacity: 1 }}
        animate={start ? { opacity: 0 } : { opacity: 1 }}
        transition={{
          duration: 0.1,
          delay: 5,
        }}
        className="relative flex-1 leading-7 p-5"
      >
        <motion.div
          initial={{ opacity: 0 }}
          animate={start ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0, delay: 2 }}
        >
          <img
            src="https://i.imgur.com/wA8i2DU.png"
            alt=""
            className="w-60 h-56 absolute top-0 right-0 mx-5 my-2 backdrop-grayscale-75 blur-[.4px] grayscale-100"
          />
        </motion.div>

        {bootMessages.map((text, index) => (
          <motion.p
            key={index}
            initial={{ opacity: 0 }}
            animate={start ? { opacity: 1 } : { opacity: 0 }}
            transition={{
              duration: 0.1,
              delay: index === 0 ? 2 : 2 + index * 0.1,
            }}
            className={`${
              index === bootMessages.length - 1 &&
              "animate-loading absolute bottom-0 mb-5 text-4xl"
            } ${text.startsWith("Detecting") && "ml-5"}`}
          >
            {formatMessage(text)}
          </motion.p>
        ))}
      </motion.div>

      {/* intro */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={start ? { opacity: 1 } : { opacity: 0 }}
        transition={{
          duration: 0.1,
          delay: 5.5,
        }}
        className={`w-full h-full flex flex-col justify-center items-center absolute leading-6 font-system p-5`}
      >
        <h1 className="text-2xl">Welcome to My Personal Portfolio</h1>
        <p className="text-lg">Version 2.0 - February 2025</p>
      </motion.div>
    </motion.div>
  );
};

export default BootUpScreen;
