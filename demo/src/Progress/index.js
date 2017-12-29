/**
 * @module Demo/Progress/CircularProgress
 */
import React from 'react';

import {CircularProgress} from 'ibusComponent';

/**
 * Exports CircularProgress component
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
        to: 0.76,
        animateDuration: 2000,
        arc: {
          radius: 72,
          // percentage: 0.01,
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
    setTimeout(() => {
      this.setState({ // Increment percentage
        ...this.state,
        outerCircle: {
          ...this.state.outerCircle,
          from: 0.76,
          to: 0.5,
        },
      });
    }, 5000);
  }

  /**
   * Render CircularProgress component
   * @return {Component} - CircularProgress component
   */
  render() {
    return (
      <div style={{
        position: 'relative',
        backgroundColor: 'black',
      }}>
        <CircularProgress {...this.state.innerCircle}
          style={{position: 'absolute', left: '0'}}
        />
        <CircularProgress {...this.state.outerCircle} />
      </div>
    );
  }
}
