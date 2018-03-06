/**
 * Util/Defer
 */
export default class Defer {
  /**
   * Contstructor function
   * @param {Number} interval - Delayed time
   */
  constructor(interval) {
    this.interval = interval;
  }

  /**
   * Exec
   * @param  {Function} callback
   */
  exec(callback) {
    this.delayId !== undefined && clearTimeout(this.delayId);

    this.delayId = setTimeout(() => {
      this.delayId = undefined;
      callback();
    }, this.interval);
  }

  /**
   * ExecNodelay
   * @param  {Function} callback
   */
  execNodelay(callback) {
    this.delayId !== undefined && clearTimeout(this.delayId) === undefined && (this.delayId = undefined);

    callback();
  }
}
