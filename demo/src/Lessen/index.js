/**
 * @module Lessen
 */
import React from 'react';

import {Lessen} from 'command-ui-components';

/**
 * Exports Lessen component
 */
export default class Component extends React.Component {
  /**
   * Contstructor function
   * @param {Object} props - Props
   */
  constructor(props) {
    super(props);
    this.props = props;

    this.data = [
      {
        name: '拥堵路段排行',
        id: 'roadRank',
      },
      {
        name: '覆盖率',
        id: 'coverage',
      },
    ];
  }

  /**
   * Render Lessen component
   * @return {Component} - Lessen component
   */
  render() {
    const roadRankElement = (
      <div style={{
          width: '100%',
          height: '100%',
          color: '#a5c9fd',
          background: 'rgba(3,6,18,0.70)',
        }}
      >
        拥堵路段排行
      </div>
    );

    const coverageElemnt = (
      <div style={{
          width: '100%',
          height: '100%',
          color: '#a5c9fd',
          background: 'rgba(3,6,18,0.70)',
        }}
      >
        覆盖率
      </div>
    );

    return (
      <div style={{
        width: '100vw',
        height: '100vh',
      }}>
        <Lessen
          takeSpace={false}
          data={this.data}
          roadRank={roadRankElement}
          coverage={coverageElemnt}
        >
          <div
            style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate3d(-50%, 0, 0)',
              padding: '10px',
              border: '1px solid #a5c9fd',
            }}
          >
            you can override leseen style by data.classes
          </div>
        </Lessen>
      </div>
    );
  }
}
