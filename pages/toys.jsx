import ProjectSections from '../components/ProjectSections';
import Url from '../components/Url';
import projectSections from '../utils/projects.json';

function shouldShowInToys(item) {
  const type = (item.type || '').toLowerCase();
  return !type.includes('research') || type.includes('game');
}

function Toys() {
  const sections = projectSections
    .map(({ title, list }) => ({
      title,
      list: list.filter(shouldShowInToys),
    }))
    .filter(({ list }) => list.length > 0);

  return (
    <div className="flex flex-col gap-4">
      <p>
        Take a look around! Smaller projects live on my{' '}
        <Url href="https://github.com/cnnmon" target="_blank">
          GitHub ❀
        </Url>
        .
      </p>
      <ProjectSections sections={sections} variant="toys" />
    </div>
  );
}

export default Toys;
