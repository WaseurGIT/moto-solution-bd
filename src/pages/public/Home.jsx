import Banner from "../../components/shared/Banner";
import Reviews from "../../components/shared/Reviews";
import Technitians from "../../components/shared/Technitians";
import About from "./About";
import Contact from "./Contact";
import Services from "./Services";

const Home = () => {
  return (
    <div>
      <Banner />
      <About/>
      <Services />
      <Technitians />
      <Reviews />
      <Contact />
    </div>
  );
};

export default Home;
