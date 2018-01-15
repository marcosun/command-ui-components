/**
 * @module Digital
 */
import React from 'react';
import {
  number,
  string,
  oneOfType,
} from 'prop-types';

import thousandsSeperator from '../ThousandsSeperator';
import {animate} from '../Util';

/**
 * Digital Component
 */
export default class Digital extends React.Component {
  static propTypes = {
    value: oneOfType([string, number]),
    from: oneOfType([string, number]),
    animateDuration: number,
  };

  static defaultProps = {
    from: 0,
    value: 2018,
    animateDuration: 5000,
  };

  /**
   * Contstructor function
   * Deep merge props with default values
   * @param {Object} props - Props
   */
  constructor(props) {
    super(props);

    this.props = props;

    const {
      from,
    } = this.props;

    this.state = {
      fromValInteger: from.toString().split('.')[0].split('').reverse(), // integer section array
      fromValDecimal: from.toString().split('.')[1] ? from.toString().split('.')[1].split('') : [], // decimal section array
    };
  }

  /**
   * [componentDidMount]
   */
  componentDidMount() {
    this.refresh();
  }

  /**
   * [componentWillReceiveProps]
   * @param  {object} nextProps
   */
  componentWillReceiveProps(nextProps) {
    this.props = nextProps;
    this.refresh();
  }

  /**
   * [refresh description]
   */
  refresh() {
    const {
      value,
      animateDuration,
    } = this.props;

    const showValInteger = value.split('.')[0].split('').reverse();
    const showValDecimal = value.split('.')[1] ? value.split('.')[1].split('') : [];

    const {
      fromValInteger,
      fromValDecimal,
    } = this.state;

    for (let i=0; i < Math.max(showValInteger.length, fromValInteger.length); i++) {
      animate({
        from: fromValInteger[i] ? Number(fromValInteger[i]) : 0,
        to: showValInteger[i] ? Number(showValInteger[i]) : 0,
        duration: animateDuration,
        callback: this.setFromInteger.bind(this, i, fromValInteger),
      });
    }

    for (let i=0; i < Math.max(showValDecimal.length, fromValDecimal.length); i++) {
      animate({
        from: fromValDecimal[i] ? Number(fromValDecimal[i]) : 0,
        to: showValDecimal[i] ? Number(showValDecimal[i]) : 0,
        duration: animateDuration,
        callback: this.setFromDecimal.bind(this, i, fromValDecimal),
      });
    }
  }

  /**
   * [setFromInteger set current value integer]
   * @param {number} index
   * @param {array} fromValInteger
   * @param {number} options.to
   */
  setFromInteger(index, fromValInteger, {to}) {
    fromValInteger[index] = Math.floor(to);

    this.setState({
      ...this.state,
      fromValInteger,
    });
  }

  /**
   * [setFromDecimal set current value decimal]
   * @param {number} index
   * @param {array} fromValDecimal
   * @param {number} options.to
   */
  setFromDecimal(index, fromValDecimal, {to}) {
    fromValDecimal[index] = Math.floor(to);

    this.setState({
      ...this.state,
      fromValDecimal,
    });
  }

  /**
   * Render Digital component
   * @return {Component}
   */
  render() {
    const {
      fromValInteger,
      fromValDecimal,
    } = this.state;

    let integer = JSON.parse(JSON.stringify(fromValInteger)).reverse().join('').replace(/\b(0+)/gi, ''); // remove zero before integer section
    integer = integer === '' ? 0 : integer;

    const decimal = fromValDecimal.join('');
    const point = decimal.length === 0 ? '' : '.';

    const fromVal = thousandsSeperator(`${integer}${point}${decimal}`);

    return (
      <div>{fromVal}</div>
    );
  }
}
