import Banner from '../../components/shared/Banner';
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
        </div>
    );
};

export default Home;