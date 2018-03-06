/**
 * @module OdometerBoard
 */
import React from 'react';

import {OdometerBoard} from 'command-ui-components';

/**
 * Exports OdometerBoard component
 */
export default class Component extends React.Component {
  /**
   * Contstructor function
   * @param {Object} props - Props
   */
  constructor(props) {
    super(props);
    this.props = props;

    this.state = {
      oneBoard: [{
        name: '当日交易笔数',
        value: 181,
      }],
      multipleBoard: [{
        name: '当日交易笔数',
        value: 181,
      }, {
        name: '月累计交易笔数',
        value: 1234,
      }, {
        name: '年累计交易笔数',
        value: 10358,
      }],
    };

    setTimeout(() => {
      this.setState({
        ...this.state,
        oneBoard: [{
          name: '当日交易笔数',
          value: 18191,
        }],
        multipleBoard: [{
          name: '当日交易笔数',
          value: 18191,
        }, {
          name: '月累计交易笔数',
          value: 123451,
        }, {
          name: '年累计交易笔数',
          value: 1035883,
        }],
      });
    }, 5000);
  }

  /**
   * Render OdometerBoard component
   * @return {Component} - OdometerBoard component
   */
  render() {
    return (
      <div>
        <div>One board corresponds to one element: minWidth of every board is 160px</div>
        <OdometerBoard data={this.state.oneBoard}/>
        <div>Multiple board</div>
        <OdometerBoard data={this.state.multipleBoard}/>
      </div>
    );
  }
}
