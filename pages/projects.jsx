import ProjectSections from '../components/ProjectSections';
import Url from '../components/Url';
import projectSections from '../utils/projects.json';

function Projects() {
  return (
    <ProjectSections
      sections={projectSections}
      intro={
        <>
          Here you can find some games and toys. Smaller projects live on my{' '}
          <Url href="https://github.com/cnnmon">GitHub</Url>.
        </>
      }
    />
  );
}

export default Projects;
