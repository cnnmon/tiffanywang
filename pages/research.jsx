import ProjectSections from '../components/ProjectSections';
import researchSections from '../utils/research.json';

function Research() {
  return (
    <div className="flex flex-col gap-4">
      <p>
        More on{' '}
        <a href="https://scholar.google.com/citations?hl=en&user=p8hhfi4AAAAJ">Google Scholar ʚɞ</a>
        .
      </p>
      <ProjectSections sections={sections} variant="research" />
      <ProjectSections sections={researchSections} variant="research" />
    </div>
  );
}

export default Research;
