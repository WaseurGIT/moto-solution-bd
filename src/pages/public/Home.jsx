import Banner from '../../components/shared/Banner';
import Reviews from '../../components/shared/Reviews';
import Stats from '../../components/shared/Stats';
import Technitians from '../../components/shared/Technitians';
import Services from './Services';

const Home = () => {
    return (
        <div>
          <Banner/> 
          <Stats/>
          <Services/>
          <Technitians/>
          <Reviews/>
        </div>
    );
};

export default Home;