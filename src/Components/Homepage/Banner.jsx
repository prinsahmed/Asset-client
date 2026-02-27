import { motion } from "framer-motion";
import CardAnimation from "../../Components/Animations/CardAnimation"; // Adjust path
import bgImage from "../../assets/bg-banner.jpg"; // Adjust path

const Banner = () => {
  const title = "Strategic solutions for   your assets";
  const letters = Array.from(title);

  const containerVariants = {
    initial: { opacity: 1 },
    animate: {
      transition: {
        staggerChildren: 0.05,
      },
    },
  };

  const letterVariants = {
    initial: { opacity: 0, y: 15 },
    animate: {
      opacity: [0, 1, 1, 0],
      y: [15, 0, 0, -15],
      transition: {
        duration: 3,
        repeat: Infinity,
        times: [0, 0.1, 0.9, 1],
        ease: "easeInOut",
      },
    },
  };

  return (
    <CardAnimation
      initial={{ opacity: 0, y: -15 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="relative h-dvh overflow-hidden"
    >
      <img
        src={bgImage}
        className="absolute top-12 inset-0 w-full h-full object-cover"
        alt="Banner Background"
      />

      <div className="absolute top-12 inset-0 bg-black/50 pt-36 pl-32 flex flex-col justify-start">
        <motion.h1
          variants={containerVariants}
          initial="initial"
          animate="animate"
          className="text-white font-bold text-7xl flex flex-wrap leading-tight max-w-4xl"
        >
          {letters.map((char, index) => (
            <motion.span
              key={index}
              variants={letterVariants}
              className={char === " " ? "mr-4" : ""}
              style={{ color: index > 23 ? "#7980e4" : "white" }}
            >
              {char === " " ? "\u00A0" : char}
            </motion.span>
          ))}
        </motion.h1>

        <motion.h2
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 1 }}
          className="text-white font-light text-lg mt-8 border-l-4 border-[#7980e4] pl-4"
        >
          Effortless asset management designed to maximize <br />
          your returns and simplify your workflow.
        </motion.h2>
      </div>
    </CardAnimation>
  );
};

export default Banner;
