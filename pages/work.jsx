import { useState } from 'react';
import Card from '../components/Card';
import Footer from '../components/Footer';
import projects, { tags } from '../projects';
import Navbar from '../components/Navbar';
import { COLORS } from '../constants';

function Work() {
  const allProjects = Object.values(projects);
  const [active, setActive] = useState('all');
  const [list, setList] = useState(allProjects);

  const filter = (tag) => {
    setList(allProjects.filter(p => p.tags.indexOf(tags[tag]) !== -1));
    setActive(tag);
  }

  const resetFilter = () => {
    setList(allProjects);
    setActive('all');
  }

  return (
    <>
      <Navbar active="/work" />
      
      <div className="center" style={{ paddingTop: 80 }}>
        <div className="container">
          <h2 style={{ color: COLORS.lightgreen }}>
            works in & out
            <br />
            of progress.
          </h2>
          <div className="tags">
            <p>tags:</p>
            <div className="tag-container">
              <p className="tag-item">
                <a className={active === 'all' ? 'active' : 'inactive'} onClick={resetFilter}>all.</a>
              </p>
              {Object.keys(tags).map((t, index) => (
                <p key={index} className="tag-item">
                  <a className={active === t ? 'active' : 'inactive'} onClick={() => {filter(t)}}>{tags[t]}.</a>
                </p>
              ))}
            </div>
          </div>
          <br />
          <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
            {list.map((data, index) => (
              <div key={index} style={{ width: 300, paddingRight: 20}}>
                <Card data={data} />
              </div>
            ))}
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}

export default Work;
