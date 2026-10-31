import ProjectSections from '../components/ProjectSections';
import Url from '../components/Url';
import projectSections from '../utils/projects.json';

function Projects() {
  return (
    <ProjectSections
      sections={projectSections}
      intro={
        <>
          <i>“Playing a game is the voluntary attempt to overcome unnecessary obstacles.”</i> —
          Bernard Suits. Smaller projects live on my{' '}
          <Url href="https://github.com/cnnmon">GitHub</Url>.
        </>
      }
    />
  );
}

export default Projects;
