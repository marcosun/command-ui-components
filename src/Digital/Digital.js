// /**
//  * @module Digital
//  */
// import React from 'react';
// import {
//   number,
//   string,
//   oneOfType,
// } from 'prop-types';

// import thousandsSeperator from '../ThousandsSeperator';
// import {animate} from '../Util';

// /**
//  * Digital Component
//  */
// export default class Digital extends React.Component {
//   static propTypes = {
//     value: oneOfType([string, number]),
//     from: oneOfType([string, number]),
//     animateDuration: number,
//   };

//   static defaultProps = {
//     from: 0,
//     value: 2018,
//     animateDuration: 5000,
//   };

//   /**
//    * Contstructor function
//    * @param {Object} props - Props
//    */
//   constructor(props) {
//     super(props);

//     this.props = props;

//     const {
//       from,
//     } = this.props;

//     const [integer, decimal] = from.toString().split('.');

//     this.state = {
//       // Integer section array
//       fromValInteger: integer.split('').reverse(),
//       // Decimal section array
//       fromValDecimal: decimal ? decimal.split('') : [],
//     };

//     this.refresh();
//   }

//   /**
//    * [componentWillReceiveProps]
//    * @param  {object} nextProps
//    */
//   componentWillReceiveProps(nextProps) {
//     this.props = nextProps;
//     this.refresh();
//   }

//   /**
//    * [refresh description]
//    */
//   refresh() {
//     const {
//       value,
//       animateDuration,
//     } = this.props;

//     const showValInteger = value.split('.')[0].split('').reverse();
//     const showValDecimal = value.split('.')[1] ? value.split('.')[1].split('') : [];

//     const {
//       fromValInteger,
//       fromValDecimal,
//     } = this.state;

//     for (let i=0; i < Math.max(showValInteger.length, fromValInteger.length); i++) {
//       animate({
//         from: fromValInteger[i] ? Number(fromValInteger[i]) : 0,
//         to: showValInteger[i] ? Number(showValInteger[i]) : 0,
//         duration: animateDuration,
//         callback: this.setFromInteger.bind(this, i, fromValInteger),
//       });
//     }

//     for (let i=0; i < Math.max(showValDecimal.length, fromValDecimal.length); i++) {
//       animate({
//         from: fromValDecimal[i] ? Number(fromValDecimal[i]) : 0,
//         to: showValDecimal[i] ? Number(showValDecimal[i]) : 0,
//         duration: animateDuration,
//         callback: this.setFromDecimal.bind(this, i, fromValDecimal),
//       });
//     }
//   }

//   /**
//    * [setFromInteger set current value integer]
//    * @param {number} index
//    * @param {array} fromValInteger
//    * @param {number} options.to
//    */
//   setFromInteger(index, fromValInteger, {to}) {
//     fromValInteger[index] = Math.floor(to);

//     this.setState({
//       ...this.state,
//       fromValInteger,
//     });
//   }

//   /**
//    * [setFromDecimal set current value decimal]
//    * @param {number} index
//    * @param {array} fromValDecimal
//    * @param {number} options.to
//    */
//   setFromDecimal(index, fromValDecimal, {to}) {
//     fromValDecimal[index] = Math.floor(to);

//     this.setState({
//       ...this.state,
//       fromValDecimal,
//     });
//   }

//   /**
//    * Render Digital component
//    * @return {Component}
//    */
//   render() {
//     const {
//       fromValInteger,
//       fromValDecimal,
//     } = this.state;

//     let integer = JSON.parse(JSON.stringify(fromValInteger)).reverse().join('').replace(/\b(0+)/gi, ''); // remove zero before integer section
//     integer = integer === '' ? 0 : integer;

//     const decimal = fromValDecimal.join('');
//     const point = decimal.length === 0 ? '' : '.';

//     const fromVal = thousandsSeperator(`${integer}${point}${decimal}`);

//     return (
//       <div>{fromVal}</div>
//     );
//   }
// }

/**
 * @module Digital
 */
import React from 'react';
import {
  number,
  string,
  oneOfType,
} from 'prop-types';

import {thousandsSeperator} from '../ThousandsSeperator';
import {animate} from '../Util';

/**
 * Digital Component
 */
export default class Digital extends React.Component {
  static propTypes = {
    from: oneOfType([string, number]),
    value: oneOfType([string, number]),
    animateDuration: number,
  };

  static defaultProps = {
    from: 0,
    value: 2018,
    animateDuration: 500,
  };

  /**
   * Contstructor function
   * @param {Object} props - Props
   */
  constructor(props) {
    super(props);
    this.props = props;

    const {
      from,
      value,
      animateDuration,
    } = this.props;

    this.state = {
      value: '',
    };

    // Number of frames should play during animation
    this.totalFrames = animateDuration / 1000 * 60;

    this.inputValueFilter(from, value);

    this.animate();
  }

  /**
   * Call animate function again if from and value changes
   * @param  {object} prevProps - Previous props
   */
  componentDidUpdate(prevProps) {
    if (this.props.from !== prevProps.from || this.props.value !== prevProps.value) {
      this.totalFrames = this.props.animateDuration / 1000 * 60;

      this.inputValueFilter(this.props.from, this.props.value);

      this.animate();
    }
  }

  /**
   * Filter input values and construct objects containing animation state
   * @param  {number | string} from - Animation start from this value
   * @param  {number | string} value - Animation ends with this value
   */
  inputValueFilter(from, value) {
    // Seperate interger and decimal values
    let [fromInteger, fromDecimal] = from.toString().split('.');
    let [valueInteger, valueDecimal] = value.toString().split('.');

    // From and value integer part should have the same length
    fromInteger = this.matchIntegerLength(fromInteger, valueInteger);
    valueInteger = this.matchIntegerLength(valueInteger, fromInteger);
    fromDecimal = this.matchDecimalLength(fromDecimal, valueDecimal);
    valueDecimal = this.matchDecimalLength(valueDecimal, fromDecimal);

    // Interger of the number
    const fromSplittedInteger = fromInteger.split('');
    // Decimals of the number
    const fromSplittedDecimal = fromDecimal.split('');
    const valueSplittedInteger = valueInteger.split('');
    const valueSplittedDecimal = valueDecimal.split('');

    // An object containing each number and animation state
    this.integerNumbers = fromSplittedInteger.map((from, index) => {
      return {
        from,
        value: valueSplittedInteger[index],
        // Step for each animation
        step: (valueSplittedInteger[index] - from) / this.totalFrames,
      };
    });

    this.decimalNumbers = fromSplittedDecimal.map((from, index) => {
      return {
        from,
        value: valueSplittedDecimal[index],
        step: (valueSplittedDecimal[index] - from) / this.totalFrames,
      };
    });
  }

  /**
   * Call animate
   */
  animate() {
    const {
      animateDuration,
    } = this.props;

    animate({
      from: 0,
      to: this.totalFrames,
      duration: animateDuration,
      callback: ({to: frameNumber}) => {
        const value = this.getContentOfCurrentFrame(frameNumber);

        this.setState({
          value: value,
        });
      },
    });
  }

  /**
   * Get content of current frame
   * @param  {number} frameNumber - Current frame number
   * @return {String}
   */
  getContentOfCurrentFrame(frameNumber) {
    const integer = this.integerNumbers.map((number) => {
      return Math.round(+number.from + number.step * frameNumber).toString();
    });

    const decimal = this.decimalNumbers.map((number) => {
      return Math.round(+number.from + number.step * frameNumber).toString();
    });

    return `${integer.join('')}.${decimal.join('')}`;
  }

  /**
   * Two strings should have the same length
   * For integers padStart with 0
   * @param  {string} self - Self string
   * @param  {string} target - Target string to match length against
   * @return {string} - Padded string
   */
  matchIntegerLength(self = '', target = '') {
    const selfLength = self.length;
    const targetLength = target.length;

    const maxLength = Math.max(selfLength, targetLength);

    return self.padStart(maxLength, '0');
  }

  /**
   * Two strings should have the same length
   * For decimals padEnd with 0
   * @param  {string} self - Self string
   * @param  {string} target - Target string to match length against
   * @return {string} - Padded string
   */
  matchDecimalLength(self = '', target = '') {
    const selfLength = self.length;
    const targetLength = target.length;

    const maxLength = Math.max(selfLength, targetLength);

    return self.padEnd(maxLength, '0');
  }

  /**
   * Render Digital component
   * @return {Component}
   */
  render() {
    const displayContent = thousandsSeperator(this.state.value);

    return <div>{displayContent}</div>;
  }
}
