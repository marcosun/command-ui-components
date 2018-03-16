/**
 * @module ButtonGroup
 */
import React from 'react';
import {bool, shape, func, number, string, arrayOf, object} from 'prop-types';
import Button from 'material-ui/Button';
import {withStyles} from 'material-ui/styles';

import {Defer} from '../Util';

const styles = (theme) => ({
  button: {
    margin: '2px',
  },
  buttonAll: {
    margin: '2px',
  },
});

@withStyles(styles)
/**
 * Exports ButtonGroup component
 */
export default class ButtonGroup extends React.Component {
  /**
   * Props validation
   * Declares props validation as high as possible,
   * since they serve as documentation.
   * We’re able to do this because of JavaScript function hoisting.
   */
  static propTypes = {
    classes: object.isRequired,
    isMultiple: bool,
    buttons: arrayOf(shape({
      id: string,
      name: string.isRequired,
      isActive: bool,
    })),
    buttonAll: shape({
      id: string,
      name: string,
      isActive: bool,
    }),
    onClick: func,
  };

  /**
   * Set default props
   */
  static defaultProps = {
    isMultiple: false, // Whether to enable multiple select
    buttonAll: {}, // Whether to show button 'select all'
  }

  /**
   * Contstructor function
   * @param {Object} props - Props
   */
  constructor(props) {
    super(props);

    this.props = props;

    const {
      isMultiple,
      buttons,
      buttonAll,
    } = this.props;

    this.state = {
      // Deep copy to isolate props from internal object manipulations
      isMultiple: isMultiple,
      buttons: buttons.map((button) => {
        return {
          ...button,
          // Id default to name
          id: button.id !== void 0 ? button.id : button.name,
          // isActive default to false
          isActive: button.isActive === true,
        };
      }),
      buttonAll: {
        ...buttonAll,
        // Id default to name
        id: buttonAll.id !== void 0 ? buttonAll.id : buttonAll.name,
        // isActive default to false
        isActive: buttonAll.isActive === true,
        // Whether to show button 'select all'
        isFunctioning: buttonAll.name !== void 0,
      },
    };

    /**
     * If buttonAll is functioning, must open multiple select feature
     */
    if (this.isButtonAllFunctioning() === true) this.state.isMultiple = true;

    this.defer = new Defer(2000);
  }

  /**
   * On button click handler
   * @param  {Object} button - Button object
   * @param  {number} index - Index of the button that has been clicked
   */
  onClick(button) {
    const {
      isMultiple,
    } = this.state;

    if (isMultiple === true) {
      this.setMultipleActive(button);
    } else {
      if (button.isActive === true) {
        // Button is already highlighted, do nothing
        return;
      } else {
        // Highlight selected button
        this.setSingleActive(button);
      }
    }

    /**
     * Call parent component onClick handler with clicked button
     * and all selected buttons
     */
    if (typeof this.props.onClick === 'function') {
      // Wait until state has been updated
      setTimeout(() => {
        let clickedButton = {
          name: button.name,
          id: button.id,
        };

        // Find all highlighted buttons
        let selectedButtons = this.state.buttons.filter((button) => {
          return button.isActive === true;
        });
        // Return name and id property only
        selectedButtons = selectedButtons.map((button) => {
          return {
            name: button.name,
            id: button.id,
          };
        });

        this.props.onClick(clickedButton, selectedButtons);
      });
    }
  }

  /**
   * Highlight single button
   * @param {Object} target - Button object that should be highlighted
   */
  setSingleActive(target) {
    let {
      buttons,
    } = this.state;

    this.setState({
      ...this.state,
      buttons: buttons.map((button) => ({
        ...button,
        isActive: target.id === button.id ? true : false,
      })),
    });
  }

  /**
   * Highlight multiple buttons
   * @param {Object} target - Button object that active status
   * should be switched
   * Whether it is highlight or reverse
   */
  setMultipleActive(target) {
    const {
      buttons,
      buttonAll,
    } = this.state;

    if (buttonAll.id === target.id) { // Click on button 'all'
      // Whether to hightlight or unhighlight all buttons
      const isHighlight = !buttonAll.isActive;

      if (isHighlight === true) { // Highlight every single buttons
        this.setState({
          ...this.state,
          buttons: buttons.map((button) => ({
            ...button,
            isActive: true,
          })),
          buttonAll: {
            ...buttonAll,
            isActive: true,
          },
        });
      } else { // Unhighlight every single buttons
        this.setState({
          ...this.state,
          buttons: buttons.map((button) => ({
            ...button,
            isActive: false,
          })),
          buttonAll: {
            ...buttonAll,
            isActive: false,
          },
        });
      }
    } else { // Click on buttons except 'all' button
      /**
       * Toggle isActive property when the button is clicked
       */
      let newState = {
        ...this.state,
        buttons: buttons.map((button) => ({
          ...button,
          isActive: target.id === button.id
            ? !button.isActive
            : button.isActive,
        })),
      };

      if (this.isButtonAllFunctioning() === true) {
        newState = this.synchroniseButtonAll(newState);
      }

      this.setState(newState);
    }
  }

  /**
   * Synchronise buttonAll isActive status when other buttons are clicked
   * @param  {Object} state - Redux state
   * @return {Object} - Button all isActive property ynchronised state
   */
  synchroniseButtonAll(state) {
    let {
      buttons,
      buttonAll,
    } = state;

    const isAllOtherButtonsActive = buttons.find((button) => {
      return button.isActive === false;
    }) === void 0;

    if (isAllOtherButtonsActive) { // All other buttons are highlighted
      // Highlight 'all' button
      return {
        ...state,
        buttonAll: {
          ...buttonAll,
          isActive: true,
        },
      };
    } else { // Not all other buttons are highlighted
      // Unhighlight 'all' button
      return {
        ...state,
        buttonAll: {
          ...buttonAll,
          isActive: false,
        },
      };
    }
  }

  /**
   * @return {Boolean} - Whether button all feature is functioning
   */
  isButtonAllFunctioning() {
    const {
      buttonAll,
    } = this.state;

    return buttonAll.isFunctioning;
  }

  /**
   * Render ButtonGroup component
   * @return {Component} - ButtonGroup component
   */
  render() {
    const {
      classes,
    } = this.props;

    const {
      buttons,
      buttonAll,
    } = this.state;

    const buttonAllElement = this.isButtonAllFunctioning() === true
      ? <div className={classes.buttonAllWrapper}>
        <Button
          className={classes.buttonAll}
          variant='raised'
          size='small'
          color={buttonAll.isActive === true ? 'primary' : 'default'}
          onClick={this.onClick.bind(this, buttonAll)}
        >
          {buttonAll.name}
        </Button>
      </div>
      : undefined;

    return (
      <div className={classes.root}>
        {
          buttonAllElement
        }
        {
          buttons.map((button) => (
            <Button
              className={classes.button}
              key={button.id}
              variant='raised'
              size='small'
              color={button.isActive === true ? 'primary' : 'default'}
              onClick={this.onClick.bind(this, button)}
            >
              {button.name}
            </Button>
          ))
        }
      </div>
    );
  }
}
