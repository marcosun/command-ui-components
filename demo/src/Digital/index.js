/**
 * @module Demo/Digital
 */
import React from 'react';

import {Digital} from 'command-ui-components';

/**
 * Exports Digital component
 */
export default class Component extends React.Component {
  /**
   * Contstructor function
   * @param {Object} props - Props
   */
  constructor(props) {
    super(props);

    this.state = {
      from: 100,
      value: 50000.532,
    };

    setTimeout(() => {
      this.setState({from: 1000.21, value: 321});
    }, 4000);
  }

  /**
   * Render Digital component
   * @return {Component} - Digital component
   */
  render() {
    return (
      <div>
        <Digital from={this.state.from} value={this.state.value} />
      </div>
    );
  }
}
