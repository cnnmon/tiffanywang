import ProjectSections from '../components/ProjectSections';
import projectSections from '../utils/projects.json';

function Toys() {
  const sections = projectSections
    .map(({ title, list }) => ({
      title,
      list: list.filter(
        (item) =>
          item.category === 'toys' ||
          (item.category !== 'research' && !(item.type || '').toLowerCase().includes('research')),
      ),
    }))
    .filter(({ list }) => list.length > 0);

  return <ProjectSections sections={sections} variant="toys" />;
}

export default Toys;
