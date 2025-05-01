import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { useEffect } from "react";

const HowItWorks = () => {
  const controls = useAnimation();
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.4,
  });

  useEffect(() => {
    if (inView) {
      controls.start("visible");
    }
  }, [controls, inView]);

  const fadeUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  const progressBar = {
    hidden: { scaleX: 0 },
    visible: { scaleX: 1 },
  };

  return (
    <section ref={ref} id="howItWorks" className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <motion.h2
            initial="hidden"
            animate={controls}
            variants={fadeUp}
            transition={{ duration: 0.5 }}
            className="text-4xl font-bold text-neutral-900 mb-4 font-[Poppins]"
          >
            How It Works
          </motion.h2>
          <motion.p
            initial="hidden"
            animate={controls}
            variants={fadeUp}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="text-lg text-neutral-600 font-[Roboto]"
          >
            Book your perfect stay in three simple steps
          </motion.p>
        </div>

        <div className="relative">
          <div className="hidden lg:block absolute top-24 left-[20%] right-[20%] h-0.5 bg-indigo-500">
            <motion.div
              initial="hidden"
              animate={controls}
              variants={progressBar}
              transition={{ duration: 1.5, delay: 0.5 }}
              className="h-full bg-indigo-500 origin-left"
            />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 relative">
            {[
              {
                title: "Search Location",
                desc: "Enter your destination and dates to browse through our curated selection of luxury hotels",
                delay: 0.5,
                iconPath: "M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z",
              },
              {
                title: "Choose Your Stay",
                desc: "Compare amenities, prices, and reviews to find the perfect accommodation for your needs",
                delay: 1.0,
                iconPath:
                  "M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z",
              },
              {
                title: "Instant Confirmation",
                desc: "Secure your booking instantly with our payment protection guarantee",
                delay: 1.5,
                iconPath: "M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z",
              },
            ].map(({ title, desc, delay, iconPath }, i) => (
              <motion.div
                key={i}
                initial="hidden"
                animate={controls}
                variants={fadeUp}
                transition={{ delay }}
                className="flex flex-col items-center text-center"
              >
                <div className="w-20 h-20 bg-indigo-500 rounded-full flex items-center justify-center mb-6 shadow-lg">
                  <svg
                    className="w-10 h-10 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d={iconPath}
                    />
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-4 text-neutral-900 font-[Poppins]">
                  {title}
                </h3>
                <p className="text-neutral-600 font-[Roboto]">{desc}</p>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ delay: 2.0 }}
            className="mt-16 text-center"
          >
            <button className="bg-indigo-500 hover:bg-indigo-400 text-white font-semibold py-4 px-8 rounded-lg transition duration-300">
              Start Booking Now
            </button>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
