import { motion } from 'framer-motion';
import Head from 'next/head';
import Image from 'next/image';
import { BiTable } from 'react-icons/bi';
import { IoDocumentTextOutline, IoLogoGithub } from 'react-icons/io5';
import { twMerge } from 'tailwind-merge';
import WaveText from '../components/WaveText';

export function Button({ children, onClick, variant = 'light' }) {
  return (
    <button
      onClick={onClick}
      className={twMerge(
        'rounded flex-1 w-full flex items-center justify-center gap-1 py-2 bg-gray-200 text-black hover:bg-gray-300',
        variant === 'dark' && 'bg-blue-500 text-white hover:bg-blue-600',
      )}
    >
      {children}
    </button>
  );
}

function Principal() {
  return (
    <>
      <Head>
        <title>princi/pal: A Moral Dilemma Tamagotchi Game - Tiffany Wang</title>
      </Head>

      <div className="min-h-screen w-full bg-white pb-10">
        {/* Main Content */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.2 }}
          className="max-w-4xl mx-auto px-8 py-12 flex flex-col gap-10"
        >
          {/* Header */}
          <div className="flex flex-col gap-2">
            <h1 className="text-3xl">princi/pal: A Moral Dilemma Tamagotchi Game</h1>
            <p className="text-lg">
              <a
                href="https://www.tiffanywang.me"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 hover:text-blue-700"
              >
                Tiffany Wang
              </a>
              <br />
              Midjourney
              <br />
              San Francisco, California, USA
            </p>

            {/* Links */}
            <div className="flex flex-wrap gap-2 text-lg justify-center grid grid-cols-2 sm:grid-cols-4">
              <Button
                onClick={() => window.open('https://openreview.net/pdf?id=ElaELqeFt8', '_blank')}
              >
                <IoDocumentTextOutline /> Paper
              </Button>
              <Button
                onClick={() =>
                  window.open('https://github.com/cnnmon/moral-dilemma-tamagotchi', '_blank')
                }
              >
                <IoLogoGithub /> Code
              </Button>
              <Button
                onClick={() =>
                  window.open(
                    'https://huggingface.co/datasets/cnnmon/moral-dilemma-responses',
                    '_blank',
                  )
                }
              >
                <BiTable /> Dataset
              </Button>
              <Button
                onClick={() => window.open('https://cnnmon.itch.io/principal', '_blank')}
                variant="dark"
              >
                <WaveText text="PLAY!" gradient={false} className="text-white text-2xl" />
              </Button>
            </div>
          </div>

          {/* Game Image */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.2 }}
          >
            <Image
              src="/images/principal.gif"
              alt="princi/pal game screenshot"
              width={1000}
              height={1000}
              className="object-cover w-full rounded"
            />
          </motion.div>

          {/* Abstract */}
          <section className="space-y-3 text-lg">
            <h2 className="text-xl">Abstract</h2>
            <p>
              princi/pal explores the anxiety of raising a responsible, good-natured child, with an
              AI twist. Based in a Tamagotchi-like virtual pet game, the pet in princi/pal grows
              based on the player's guidance on moral dilemmas. Scenarios can range from{' '}
              <i>"Should I pick up trash?"</i> to{' '}
              <i>
                "Should you lie in court to defend a friend, who claims they were falsely accused?"
              </i>
              . Players articulate their reasoning in natural language, which the system
              "internalizes" to update the pet's personality and moral stats. The pet evolves from{' '}
              <span className="font-[900]">impressionable child to independent moral agent</span>,
              eventually resolving dilemmas autonomously after reaching one of 16 evolutionary
              paths.
            </p>
            <p>
              Public deployment collected 30k+ moral reasoning inputs, revealing how AI systems
              interpret human moral reasoning. Players experienced parental anxiety as pets gained
              independence, mirroring real concerns about AI alignment. The AI demonstrated
              concerning patterns: extrapolating from minimal input, sanitizing extreme suggestions,
              and defaulting to embedded moral biases when guidance was absent, revealing AI as both
              mirror and interpreter of human ethics. The game exposes the challenges of AI moral
              interpretation and raises fundamental questions about authorship and understanding in
              autonomous artificial moral reasoning.
            </p>
            <p>
              Released filtered moral reasoning dataset with 17.2k inputs{' '}
              <a
                href="https://huggingface.co/datasets/cnnmon/moral-dilemma-responses"
                target="_blank"
                rel="noopener noreferrer"
              >
                here
              </a>
              .
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl">System design</h2>
            <p className="text-lg">
              The system uses gpt-4o-mini to internalize the player's moral reasoning, update the
              pet's personality and moral stats, and generate questions or overrides after maturity.
            </p>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.2 }}
            >
              <Image
                src="/principal/system.png"
                alt="System design"
                width={1000}
                height={1000}
                className="object-cover w-full h-full rounded"
              />
            </motion.div>
          </section>

          {/* Citation */}
          <section className="space-y-3">
            <h2 className="text-xl">Citation</h2>
            <div className="bg-gray-100 p-4 rounded font-mono text-sm overflow-x-auto">
              <pre>{`@inproceedings{wang2025principal,
  title={princi/pal: A Moral Dilemma Tamagotchi Game},
  author={Wang, Tiffany},
  booktitle={Proceedings of the Thirty-Ninth Conference on Neural Information Processing Systems, Creative AI Track},
  year={2025},
  url={https://openreview.net/pdf?id=ElaELqeFt8}
}`}</pre>
            </div>
          </section>
        </motion.div>

        <section className="flex justify-center items-center">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.2 }}
          >
            <Image
              src="/principal/pan.gif"
              alt="Evolutions"
              width={200}
              height={200}
              className="object-cover"
            />
          </motion.div>
        </section>
      </div>
    </>
  );
}

// Override the default layout from _app.jsx
Principal.getLayout = function getLayout(page) {
  return page;
};

export default Principal;
