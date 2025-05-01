import Hero from "../components/Hero";
import HowItWorks from "../components/HowItWorks";
import LatestHotels from "../components/LatestHotels";
import SignIn from "./SignIn";

const Homepage = () => {
  return (
    <div className="flex flex-col gap-24">
      <Hero />
      <HowItWorks />
      <LatestHotels />
      <SignIn />
    </div>
  );
};

export default Homepage;
