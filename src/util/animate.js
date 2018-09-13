/**
 * Call callback with the number corresponding to the current move.
 * Animate function assumes 60 fps.
 * @param  {number} [from=0] - Animate starts from this number.
 * @param  {number} [to=0] - Animate stops at this number.
 * @param  {number} [duration=1000] - Animate duration.
 * @param  {function} callback - Callback for each move.
 */
export default function animate(from = 0, to = 0, duration = 1000, callback) {
  const totalFrames = Math.floor(duration / 1000 * 60); // Assume 60 fps.
  const step = (to - from) / totalFrames;

  let currentFrame = 1; // Frame start from 1

  const run = () => {
    // Calcualte number corresponding to the current move.
    const stopAt = from + step * currentFrame;

    callback(stopAt);

    // Auto play frame
    currentFrame += 1;

    if (currentFrame <= totalFrames) {
      window.requestAnimationFrame(run);
    }
  };

  window.requestAnimationFrame(run);
}
