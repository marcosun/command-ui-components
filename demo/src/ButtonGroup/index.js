/**
 * @module Demo/ButtonGroup
 */
import React from 'react';

import {ButtonGroup} from 'command-ui-components';

/**
 * Exports ButtonGroup component
 */
export default class Component extends React.Component {
  /**
   * Contstructor function
   * @param {Object} props - Props
   */
  constructor(props) {
    super(props);

    this.buttons = [{
      name: '选择1',
    }, {
      name: '选择2',
    }, {
      name: '选择3',
    }];

    this.buttonAll = {
      name: '全部',
    };
  }

  /**
   * Render CircularProgress component
   * @return {Component} - CircularProgress component
   */
  render() {
    return (
      <div>
        <div>
          <div>Single Select Buttons</div>
          <ButtonGroup buttons={this.buttons} />
        </div>
        <div>
          <div>Multiple Select Buttons</div>
          <ButtonGroup isMultiple={true} buttons={this.buttons} />
        </div>
        <div>
          <div>Multiple Select with All Button</div>
          <ButtonGroup buttons={this.buttons} buttonAll={this.buttonAll} />
        </div>
      </div>
    );
  }
}
