import { useState } from 'react';
import Image from 'next/image';

const styles = {
  card: {
    alignItems: 'center',
    margin: '20px 0px',
    maxWidth: 450,
    width: '100%',
  },
  link: {
    display: 'flex',
    width: 400,
    width: '100%',
  },
  description: {
    marginTop: 15,
  }
}

function CardImage(props) {
  const { data } = props;
  const [hovering, setHovering] = useState(false);

  return (
    <div
      onMouseEnter={() => { setHovering(true); }}
      onMouseLeave={() => { setHovering(false); }}
      className="card-image"
    >
      <div style={{ display: hovering ? 'block' : 'none' }}>
        <Image width={400} height={250} objectFit="cover" src={data.static} />
      </div>
      <div style={{ display: hovering ? 'none' : 'block' }}>
        <Image width={400} height={250} objectFit="cover" src={data.thumb} />
      </div>
    </div>
  )
}

function Card({ data }) {
  const getLink = (content, image) => {
    return (
      <a href={data.link} target="_blank" rel="noreferrer" style={image ? styles.link : undefined}>
        {content}
      </a>
    );
  }

  return (
    <div style={styles.card}>
      {getLink(<CardImage data={data} />, true)}
      <div style={styles.description}>
        <p>
          {getLink(<b>{data.name}</b>, false)}<br />
          <b>{data.tags.join(', ')}</b>
          <span> {data.date}</span>
          <br />
          {data.description}
        </p>
      </div>
    </div>
  )
}

export default Card;
