import { motion } from 'framer-motion';
import Head from 'next/head';
import Image from 'next/image';
import { BiTable } from 'react-icons/bi';
import { IoDocumentTextOutline, IoLogoGithub, IoPlayCircle } from 'react-icons/io5';

function Principal() {
  return (
    <>
      <Head>
        <title>princi/pal: A Moral Dilemma Tamagotchi Game - Tiffany Wang</title>
      </Head>

      <div className="min-h-screen w-full bg-white py-10 ">
        {/* Main Content */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.2 }}
          className="max-w-4xl mx-auto px-8 py-12 flex flex-col gap-6"
        >
          {/* Header */}
          <div className="flex flex-col gap-2">
            <h1 className="text-3xl font-bold">princi/pal: A Moral Dilemma Tamagotchi Game</h1>
            <p className="text-lg">
              <a
                href="https://www.tiffanywang.com"
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
            <div className="flex flex-wrap gap-2 text-lg justify-center">
              <button
                onClick={() => window.open('https://openreview.net/pdf?id=ElaELqeFt8', '_blank')}
              >
                <IoDocumentTextOutline /> Paper
              </button>
              <button
                onClick={() =>
                  window.open('https://github.com/cnnmon/moral-dilemma-tamagotchi', '_blank')
                }
              >
                <IoLogoGithub /> Code
              </button>
              <button
                onClick={() =>
                  window.open(
                    'https://huggingface.co/datasets/cnnmon/moral-dilemma-responses',
                    '_blank',
                  )
                }
              >
                <BiTable /> Dataset
              </button>

              <button
                onClick={() => window.open('https://cnnmon.itch.io/principal', '_blank')}
                className="bg-blue-400 text-white hover:bg-blue-500"
              >
                <IoPlayCircle /> Play!
              </button>
            </div>
          </div>

          {/* Game Image */}
          <Image
            src="/images/principal.gif"
            alt="princi/pal game screenshot"
            width={1000}
            height={1000}
            className="object-cover w-full h-full"
          />

          {/* Abstract */}
          <section className="space-y-3 text-lg">
            <h2 className="text-xl font-bold">Abstract</h2>
            <p>
              princi/pal explores the anxiety of raising a responsible, good-natured child, with an
              AI twist. Based in a Tamagotchi-like virtual pet game, the pet in princi/pal grows
              based on the player's guidance on moral dilemmas. Scenarios can range from "Should I
              pick up trash?" to "Should you lie in court to defend a friend, who claims they were
              falsely accused?". Players articulate their reasoning in natural language, which the
              system "internalizes" to update the pet's personality and moral stats. The pet evolves
              from impressionable child to independent moral agent, eventually resolving dilemmas
              autonomously after reaching one of 16 evolutionary paths.
            </p>
            <p>
              Public deployment collected over 12,000 moral reasoning inputs, revealing how AI
              systems interpret human moral reasoning. Players experienced parental anxiety as pets
              gained independence, mirroring real concerns about AI alignment. The AI demonstrated
              concerning patterns: extrapolating from minimal input, sanitizing extreme suggestions,
              and defaulting to embedded moral biases when guidance was absent, revealing AI as both
              mirror and interpreter of human ethics. The game exposes the challenges of AI moral
              interpretation and raises fundamental questions about authorship and understanding in
              autonomous artificial moral reasoning.
            </p>
          </section>

          {/* Citation */}
          <section className="space-y-3">
            <h2 className="text-xl font-bold">Citation</h2>
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
      </div>
    </>
  );
}

// Override the default layout from _app.jsx
Principal.getLayout = function getLayout(page) {
  return page;
};

export default Principal;
