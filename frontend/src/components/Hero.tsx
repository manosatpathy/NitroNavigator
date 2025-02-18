import { motion } from "framer-motion";

const Hero = () => {
  return (
    <div className="container mx-auto flex flex-col gap-2 mb-5">
      <motion.h1
        className="text-5xl text-black/90 font-extrabold"
        initial={{ x: -10, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: "easeInOut" }}
      >
        Find your next stay
      </motion.h1>
      <p className="text-2xl text-slate-700 font-semibold ">
        Search Low Prices On Hotels For Your Dream Vacation...
      </p>
    </div>
  );
};

export default Hero;
