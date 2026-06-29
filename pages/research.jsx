import ProjectSections from '../components/ProjectSections';
import projectSections from '../utils/projects.json';

function Research() {
  const sections = projectSections
    .map(({ title, list }) => ({
      title,
      list: list.filter(
        (item) =>
          item.category === 'research' || (item.type || '').toLowerCase().includes('research'),
      ),
    }))
    .filter(({ list }) => list.length > 0);

  return (
    <div className="flex flex-col gap-4">
      <p>
        I'm interested in the playful, collaborative, reflective, even adversarial interactions
        between man & machine.
      </p>
      <ProjectSections sections={sections} variant="research" />
    </div>
  );
}

export default Research;
