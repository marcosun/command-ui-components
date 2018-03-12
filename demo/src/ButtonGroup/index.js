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

    this.props = props;
    this.state = {
      clickedButton: null,
      selectedButtons: null,
    };

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
   * Button group click handler
   * @param  {Object} button - Clicked button object
   * @param  {Object} selectedButtons - An array contains all selected buttons
   */
  onClick(button, selectedButtons) {
    this.setState({
      clickedButton: JSON.stringify(button),
      selectedButtons: JSON.stringify(selectedButtons),
    });
  }

  /**
   * Render ButtonGroup component
   * @return {Component} - ButtonGroup component
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
        <div>
          <div>Callback</div>
          <ButtonGroup buttons={this.buttons} buttonAll={this.buttonAll} onClick={this.onClick.bind(this)} />
          <div>
            {this.state.clickedButton}
          </div>
          <div>
            {this.state.selectedButtons}
          </div>
        </div>
      </div>
    );
  }
}
