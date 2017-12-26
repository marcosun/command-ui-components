/**
 * @module View/Progress
 */
import React from 'react';

import Progress from '../../src/Progress';

/**
 * Exports Progress component
 */
export default class Component extends React.Component {
  /**
   * Contstructor function
   * @param {Object} props - Props
   */
  constructor(props) {
    super(props);

    this.state = {
      outerCircle: {
        width: 150,
        height: 150,
        arc: {
          radius: 72,
          percentage: 0.01,
          lineStyle: {
            type: [20, 2],
            width: 6,
            color: {
              0: 'rgb(29,208,247)',
              0.5: 'rgb(59,154,239)',
              1: 'rgb(72,99,231)',
            },
          },
        },
      },
      innerCircle: {
        width: 150,
        height: 150,
        arc: {
          radius: 66,
          percentage: 1,
          lineStyle: {
            width: 2,
            color: '#173C63',
          },
        },
      },
    };

    this.outerCircleAnimate();
  }

  /**
   * Outer circle gradually grows from ground to limit
   */
  outerCircleAnimate() {
    const step = 0.01;
    const limit = 0.76;

    const spin = () => {
      this.setState({ // Increment percentage
        ...this.state,
        outerCircle: {
          ...this.state.outerCircle,
          arc: {
            ...this.state.outerCircle.arc,
            percentage: this.state.outerCircle.arc.percentage + step,
          },
        },
      });
      this.state.outerCircle.arc.percentage < limit
        && window.requestAnimationFrame(spin); // Loop
    };

    window.requestAnimationFrame(spin);
  }

  /**
   * Render Progress component
   * @return {Component} - Progress component
   */
  render() {
    return (
      <div style={{
        position: 'relative',
        backgroundColor: 'black',
      }}>
        <Progress {...this.state.innerCircle}
          style={{position: 'absolute', left: '0'}}
        />
        <Progress {...this.state.outerCircle} />
      </div>
    );
  }
}
