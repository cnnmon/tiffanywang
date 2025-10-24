const waveColors = ['#6B5B93', '#96517C', '#5A7B9E'];

function hexToRgb(hex) {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16),
      }
    : null;
}

function rgbToHex(r, g, b) {
  return '#' + [r, g, b].map((x) => Math.round(x).toString(16).padStart(2, '0')).join('');
}

function lerpColor(colors, t) {
  const scaled = t * (colors.length - 1);
  const index = Math.floor(scaled);
  const frac = scaled - index;

  if (index >= colors.length - 1) return colors[colors.length - 1];

  const color1 = hexToRgb(colors[index]);
  const color2 = hexToRgb(colors[index + 1]);

  const r = color1.r + (color2.r - color1.r) * frac;
  const g = color1.g + (color2.g - color1.g) * frac;
  const b = color1.b + (color2.b - color1.b) * frac;

  return rgbToHex(r, g, b);
}

export default function WaveText({ text, className, gradient = 'true' }) {
  const characters = text.split('').map((char) => (char === ' ' ? '\u00A0' : char));
  return (
    <span className="cursor-grab select-none">
      <span className="wave">
        {characters.map((letter, index) => {
          const t = characters.length > 1 ? index / (characters.length - 1) : 0;
          return (
            <span
              key={index}
              className={className}
              style={{
                animationDelay: `${-2 + index * 0.1}s`,
                WebkitTextFillColor: gradient ? lerpColor(waveColors, t) : '#6a3b7b',
              }}
            >
              {letter}
            </span>
          );
        })}
      </span>
    </span>
  );
}
