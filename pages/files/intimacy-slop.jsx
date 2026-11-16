import Head from 'next/head';
import Image from 'next/image';

const title =
  'would you still love me if everything i said to you came from eavesdropping on other relationships?';

function IntimacySlop() {
  return (
    <>
      <Head>
        <title>{`exhibit: ${title}`}</title>
        <meta
          name="description"
          content="An exhibit by Tiffany Wang and Vincent Huang repurposing visitors’ expressions of affection into a digital companion."
        />
        <meta name="robots" content="noindex, nofollow" />
      </Head>

      <main className="exhibit">
        <article aria-labelledby="exhibit-title">
          <header className="introduction">
            <h1 id="exhibit-title">{title}</h1>
            <p className="byline flex flex-col">
              <span>
                exhibit at{' '}
                <a href="https://www.tiat.place/">tiat (the intersection of art and technology)</a>{' '}
                in san francisco (june 2026)
              </span>
            </p>
          </header>

          <div className="gallery" aria-label="Exhibit photographs">
            <figure>
              <Image
                src="/images/intimacy-slop-conversation.webp"
                alt="Visitors using the two stations, with a smiling visitor typing to the digital companion."
                width={1200}
                height={1600}
                sizes="(max-width: 600px) calc(100vw - 48px), (max-width: 808px) calc((100vw - 64px) / 2), 372px"
                className="exhibit-image"
              />
            </figure>
            <figure>
              <Image
                src="/images/intimacy-slop-visitors.webp"
                alt="Two visitors seated side by side at the exhibit’s love letter and digital companion stations."
                width={1200}
                height={1600}
                sizes="(max-width: 600px) calc(100vw - 48px), (max-width: 808px) calc((100vw - 64px) / 2), 372px"
                className="exhibit-image"
              />
            </figure>
          </div>

          <div className="statement">
            <p>In this exhibit, we recycle visitors' emotional labor into a digital companion.</p>
            <p>
              Two people sit down next to each other. The person on the left is given a
              letter-writing interface that will prompt them to write, draw, and reflect intimately
              on a cherished relationship. Here, we harvest visitor-provided personal details from a
              “love letter writing service” to produce intimacy slop.
            </p>
            <p>
              This data is fed directly into a resulting companion appearing to be responsive and
              personal, while in fact drawing upon fragments of many other visitors&apos;
              expressions of affection.
            </p>
          </div>

          <div className="gallery" aria-label="Details of the exhibit">
            <figure>
              <Image
                src="/images/intimacy-slop-love-letter.webp"
                alt="A close-up of the illustrated love letter writing service and its personal prompts."
                width={1200}
                height={1600}
                sizes="(max-width: 600px) calc(100vw - 48px), (max-width: 808px) calc((100vw - 64px) / 2), 372px"
                className="exhibit-image"
              />
            </figure>
            <figure>
              <Image
                src="/images/intimacy-slop-companion.webp"
                alt="A visitor types to the digital companion beside the yellow love letter writing screen."
                width={1200}
                height={1600}
                sizes="(max-width: 600px) calc(100vw - 48px), (max-width: 808px) calc((100vw - 64px) / 2), 372px"
                priority
                className="exhibit-image"
              />
            </figure>
          </div>

          <footer className="artists" aria-label="About the artists">
            <p>
              <a href="https://tiffanywang.me/">Tiffany</a> is an sf-based toy maker building
              offbeat games about intention, perception, and misunderstanding.
            </p>
            <p>
              <a href="https://www.vvhuang.com/">Vincent</a> enjoys writing narratives about
              feelings, technology, and human-AI interaction.
            </p>
          </footer>
        </article>
      </main>

      <style jsx>{`
        .exhibit {
          min-height: 100vh;
          background: #f7f5f0;
          color: #37352f;
          padding: 112px 24px 104px;
        }
        article {
          max-width: 760px;
          margin: 0 auto;
        }
        .introduction,
        .statement,
        .artists {
          max-width: 580px;
          margin-left: auto;
          margin-right: auto;
        }
        h1 {
          font-family: Georgia, 'Times New Roman', serif;
          font-size: clamp(30px, 4.3vw, 40px);
          font-weight: 400;
          line-height: 1.25;
          letter-spacing: -0.025em;
          text-wrap: pretty;
        }
        .byline {
          margin-top: 28px;
          font-size: 15px;
        }
        a {
          color: inherit;
          text-decoration-color: #b4afa4;
          text-underline-offset: 4px;
        }
        a:focus-visible {
          outline: 2px solid currentColor;
          outline-offset: 6px;
        }
        .gallery {
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          gap: 16px;
          margin: 56px 0;
        }
        figure {
          margin: 0;
        }
        figure :global(.exhibit-image) {
          display: block;
          width: 100%;
          height: auto;
        }
        .statement {
          font-size: 18px;
          line-height: 1.75;
        }
        .statement p + p {
          margin-top: 24px;
        }
        .artists {
          margin-top: 56px;
          padding-top: 28px;
          border-top: 1px solid #dcd8cf;
          color: #68645b;
          font-size: 15px;
          line-height: 1.7;
        }
        .artists p + p {
          margin-top: 16px;
        }
        @media (max-width: 600px) {
          .exhibit {
            padding-top: 64px;
            padding-bottom: 64px;
          }
          .gallery {
            grid-template-columns: 1fr;
            margin: 40px 0;
          }
          .statement {
            font-size: 17px;
          }
        }
      `}</style>
    </>
  );
}

IntimacySlop.getLayout = (page) => page;

export default IntimacySlop;
