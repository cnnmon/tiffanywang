import { motion } from 'framer-motion';
import Image from 'next/image';
import FadeImage from '../../components/FadeImage';
import LazyVideo from '../../components/LazyVideo';
import Url from '../../components/Url';

const links = [
  ['paper', 'https://openreview.net/pdf?id=ElaELqeFt8'],
  ['code', 'https://github.com/cnnmon/moral-dilemma-tamagotchi'],
  ['dataset', 'https://huggingface.co/datasets/cnnmon/moral-dilemma-responses'],
  ['play', 'https://cnnmon.itch.io/principal'],
];

const citation = `@inproceedings{wang2025principal,
  title={princi/pal: A Moral Dilemma Tamagotchi Game},
  author={Wang, Tiffany},
  booktitle={Proceedings of the Thirty-Ninth Conference on Neural Information Processing Systems, Creative AI Track},
  year={2025},
  url={https://openreview.net/pdf?id=ElaELqeFt8}
}`;

function Principal() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.2, delay: 0.1 }}
      className="space-y-4"
    >
      <div>
        <h1 className="text-xl">princi/pal</h1>
        <h2 className="italic text-[#6a3b7b]">a moral dilemma tamagotchi</h2>
        <h2 className="text-gray-500">NeurIPS Creative AI 2025</h2>
      </div>

      <p>
        {links.map(([label, href], i) => (
          <span key={label}>
            {i > 0 && ' · '}
            <Url href={href}>{label}</Url>
          </span>
        ))}
      </p>

      <div className="bg-gray-100" style={{ aspectRatio: '960 / 542' }}>
        <LazyVideo src="/images/principal.mp4" className="w-full h-full object-cover" />
      </div>

      <p>
        princi/pal explores the anxiety of raising a responsible, good-natured child, with an AI
        twist. Based in a Tamagotchi-like virtual pet game, the pet in princi/pal grows based on the
        player's guidance on moral dilemmas. Scenarios can range from{' '}
        <i>"Should I pick up trash?"</i> to{' '}
        <i>"Should you lie in court to defend a friend, who claims they were falsely accused?"</i>.
        <br />
        <br />
        Players articulate their reasoning in natural language, which the system "internalizes" to
        update the pet's personality and moral stats. The pet evolves from{' '}
        <b>impressionable child to independent moral agent</b>, eventually resolving dilemmas
        autonomously after reaching one of 16 evolutionary paths.
      </p>
      <p>
        Public deployment collected 80k+ moral reasoning inputs, revealing how AI systems
        (mis-)interpret human values. Released a{' '}
        <Url href="https://huggingface.co/datasets/cnnmon/moral-dilemma-responses">
          filtered moral reasoning dataset
        </Url>{' '}
        for publication with NeurIPS 2025.
      </p>

      <a
        href="/text/principal/evolutions.png"
        target="_blank"
        rel="noopener noreferrer"
        className="block no-underline"
      >
        <FadeImage
          src="/text/principal/evolutions.png"
          alt="Sixteen evolutionary paths, from stage-one pets to stage-two forms"
          width={1885}
          height={532}
          sizes="(max-width: 768px) 100vw, 672px"
          className="w-full h-auto"
        />
      </a>

      <section className="space-y-4">
        <div className="space-y-2">
          <h2 className="font-bold">System design</h2>
          <p>
            The system uses gpt-4o-mini to internalize the player's moral reasoning, update the
            pet's personality and moral stats, and generate questions or overrides after maturity.
          </p>
        </div>
        <a
          href="/text/principal/system.png"
          target="_blank"
          rel="noopener noreferrer"
          className="block no-underline"
        >
          <FadeImage
            src="/text/principal/system.png"
            alt="System diagram: a dilemma and the player's advice go to an LLM, which updates the pet's personality, morals, and evolution"
            width={1756}
            height={722}
            sizes="(max-width: 768px) 100vw, 672px"
            className="w-full h-auto"
          />
        </a>
      </section>

      <section className="space-y-4">
        <h2 className="font-bold">Citation</h2>
        <pre className="overflow-x-auto whitespace-pre-wrap bg-white/60 p-4">{citation}</pre>
      </section>

      <div className="flex justify-center">
        <Image
          src="/text/principal/pan.gif"
          alt="princi/pal pet"
          width={180}
          height={150}
          unoptimized
        />
      </div>
    </motion.div>
  );
}

export default Principal;
