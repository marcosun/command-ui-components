/**
 * Animate function calls 60 moves in a second
 * @module Util/Animate
 * @param  {number} options.from - Start value
 * @param  {number} options.to - End value
 * @param  {number} options.duration - Animate duration
 * @param  {function} options.callback - Callback for each move
 */
export default function animate({from, to, duration, callback}) {
  const animate = () => {
    // Calcualte stop value
    const stop = from + step * currentFrame;
    // Draw a segment
    callback({from, to: stop});

    // Auto play frame
    currentFrame += 1;

    currentFrame <= totalFrames
      && window.requestAnimationFrame(animate);
  };

  const totalFrames = Math.floor(duration / 1000 * 60); // Must ensure 60fps
  const step = (to - from) / totalFrames;

  let currentFrame = 1; // start from 1

  window.requestAnimationFrame(animate);
}
