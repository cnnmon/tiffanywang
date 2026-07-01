import ProjectSections from '../components/ProjectSections';
import projectSections from '../utils/projects.json';

function shouldShowInResearch(item) {
  return (item.type || '').toLowerCase().includes('research');
}

function Research() {
  const sections = projectSections
    .map(({ title, list }) => ({
      title,
      list: list.filter(shouldShowInResearch),
    }))
    .filter(({ list }) => list.length > 0);

  return (
    <div className="flex flex-col gap-4">
      <p>
        I research the playful, collaborative, reflective, even adversarial interactions between man
        & machine. More on{' '}
        <a href="https://scholar.google.com/citations?hl=en&user=p8hhfi4AAAAJ">Google Scholar ʚɞ</a>
        .
      </p>
      <ProjectSections sections={sections} variant="research" />
    </div>
  );
}

export default Research;
