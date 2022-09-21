import { AiFillLinkedin, AiFillGithub, AiOutlineTwitter } from 'react-icons/ai';
import { FaItchIo } from 'react-icons/fa';
import { COLORS } from '../constants';

function Footer() {
  return (
    <div className="center" style={{ paddingTop: 30 }}>
      <div className="container">
        <h2 style={{ color: COLORS.green }}>get in touch!</h2>
        <p>email me at <a href="mailto:tiffanywang@berkeley.edu">tiffanywang@berkeley.edu</a>.</p>
        <br />
        <p >or find me at:
        <br />
          <a href="https://www.linkedin.com/in/wtiffany/" target="_blank" rel="noreferrer"><AiFillLinkedin className="icon" />linkedin</a> <a href="https://github.com/cnnmon" target="_blank" rel="noreferrer"><AiFillGithub className="icon" />github</a> <a href="https://cnnmon.itch.io/" target="_blank" rel="noreferrer"><FaItchIo className="icon" />itch.io</a> <a href="https://twitter.com/cnnmonsugar" target="_blank" rel="noreferrer"><AiOutlineTwitter className="icon" />twitter</a>
        </p>
        <br /><br />
      </div>
    </div>
  );
}

export default Footer;