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
   * Render Progress component
   * @return {Component} - Progress component
   */
  render() {
    return (
      <div>
        <Progress
          width={150}
          height={150}
          arc={{
            radius: 66,
            percentage: 0.8,
            lineStyle: {
              color: {
                0: 'red',
                0.5: 'green',
                1: 'blue',
              },
            },
          }}
        />
        <Progress
          width={150}
          height={150}
          arc={{
            radius: 72,
            percentage: 0.1,
            lineStyle: {
              width: 6,
              color: 'rgb(67,89,233)',
            },
          }}
        />
      </div>
    );
  }
}
