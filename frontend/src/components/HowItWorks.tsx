const HowItWorks = () => {
  return (
    <section id="howItWorks" className="py-20 bg-neutral-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" id="el-q1byxhfm">
        <div className="text-center mb-16" id="el-i9rglnza">
          <h2
            className="text-4xl font-bold text-neutral-900 mb-4 font-[Poppins] animate__animated animate__fadeInUp"
            id="el-29bzpvmh"
          >
            How It Works
          </h2>
          <p
            className="text-lg text-neutral-600 font-[Roboto] animate__animated animate__fadeInUp animate__delay-1s"
            id="el-0pspmifr"
          >
            Book your perfect stay in three simple steps
          </p>
        </div>

        <div className="relative" id="el-yj6jrpmy">
          <div
            className="hidden lg:block absolute top-24 left-[20%] right-[20%] h-0.5 bg-green-500"
            id="el-hsqlwb9d"
          >
            <div
              className="absolute top-0 left-0 right-0 h-full"
              id="el-xn7u5dxm"
            >
              <div
                className="h-full bg-green-500 animate-progress"
                id="el-771hz4pr"
              ></div>
            </div>
          </div>

          <div
            className="grid grid-cols-1 lg:grid-cols-3 gap-12 relative"
            id="el-hyy4l8qn"
          >
            {/* Step 1 */}
            <div
              className="flex flex-col items-center text-center animate__animated animate__fadeInUp"
              id="el-9k5d9ilf"
            >
              <div
                className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mb-6 shadow-lg"
                id="el-j14r0u4n"
              >
                <svg
                  className="w-10 h-10 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  id="el-96jth9oe"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    id="el-uw43fj6e"
                  />
                </svg>
              </div>
              <h3
                className="text-xl font-bold mb-4 text-neutral-900 font-[Poppins]"
                id="el-k0wwzw3r"
              >
                Search Location
              </h3>
              <p className="text-neutral-600 font-[Roboto]" id="el-55gue4ep">
                Enter your destination and dates to browse through our curated
                selection of luxury hotels
              </p>
            </div>

            {/* Step 2 */}
            <div
              className="flex flex-col items-center text-center animate__animated animate__fadeInUp animate__delay-1s"
              id="el-rcjl0n03"
            >
              <div
                className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mb-6 shadow-lg"
                id="el-6st2ly98"
              >
                <svg
                  className="w-10 h-10 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  id="el-gw2cxnbj"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                    id="el-tnqk9hm2"
                  />
                </svg>
              </div>
              <h3
                className="text-xl font-bold mb-4 text-neutral-900 font-[Poppins]"
                id="el-nlu3u8te"
              >
                Choose Your Stay
              </h3>
              <p className="text-neutral-600 font-[Roboto]" id="el-gsxtnq7a">
                Compare amenities, prices, and reviews to find the perfect
                accommodation for your needs
              </p>
            </div>

            {/* Step 3 */}
            <div
              className="flex flex-col items-center text-center animate__animated animate__fadeInUp animate__delay-2s"
              id="el-it29y5yq"
            >
              <div
                className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mb-6 shadow-lg"
                id="el-tluh7bpk"
              >
                <svg
                  className="w-10 h-10 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  id="el-uk63uz5h"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                    id="el-6dkeslup"
                  />
                </svg>
              </div>
              <h3
                className="text-xl font-bold mb-4 text-neutral-900 font-[Poppins]"
                id="el-d78clc5b"
              >
                Instant Confirmation
              </h3>
              <p className="text-neutral-600 font-[Roboto]" id="el-9zodzsfg">
                Secure your booking instantly with our payment protection
                guarantee
              </p>
            </div>
          </div>

          <div className="mt-16 text-center" id="el-2aeguv9o">
            <button
              className="bg-green-500 hover:bg-green-600 text-white font-semibold py-4 px-8 rounded-lg transition duration-300 animate__animated animate__fadeInUp animate__delay-3s"
              id="el-5zt8yh16"
            >
              Start Booking Now
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
