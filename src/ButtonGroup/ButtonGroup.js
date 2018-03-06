/**
 * @module ButtonGroup
 */
import React from 'react';
import {bool, shape, func, number, string, arrayOf, object} from 'prop-types';
import Button from 'material-ui/Button';
import {withStyles} from 'material-ui/styles';

import Defer from 'Util/Defer';

const styles = (theme) => ({
  btnStyle: {
    margin: '0px 5px 5px 0px',
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
    isSelectAll: bool,
    buttons: arrayOf(shape({
      id: string,
      name: string.isRequired,
      isActive: bool,
    })),
    onClick: func,
  };

  /**
   * Set default props
   */
  static defaultProps = {
    isMultiple: false, // Should enable multiple select
    isSelectAll: false, // Should show `select all` button
  }

  /**
   * Contstructor function
   * @param {Object} props - Props
   */
  constructor(props) {
    super(props);

    this.props = props;
    this.state = {
      // Deep copy to isolate props from internal object manipulations
      buttons: this.props.buttons.map((button) => {
        return {
          ...button,
          // Id default to name
          id: button.id !== void 0 ? button.id : button.name,
          // isActive default to false
          isActive: button.isActive === true,
        };
      }),
    };

    this.defer = new Defer(2000);
  }

  /**
   * On button click handler
   * @param  {Object} button - Button object
   * @param  {number} index - Index of the button that has been clicked
   */
  onClick(button, index) {
    const {
      isMultiple,
    } = this.props;

    if (isMultiple === true) {
      this.setClickActive(button, index);
    } else {
      if (button.isActive === true) {
        // Button is already highlighted, do nothing
        return;
      } else {
        // Highlight selected button
        this.setActive(button);
      }
    }
  }

  /**
   * 根据点击改变对应按钮状态支持多选
   * @param {Object} item 按钮属性
   * @param {Object} index
   */
  setClickActive(item, index) {
    let {
      buttonList,
    } = this.state;

    const list = buttonList.map((button, index) => ({
      ...button,
      isActive: item.id === button.id ? item.isActive === true ? false: true : button.isActive,
    }));

    this.setState({
      buttonList: list,
    });

    this.delayedButton.exec(() => {
      typeof this.props.onClick === 'function' && this.props.onClick(item, this.state.allCheck, this.state.chekedList, list, index);
    });

    this.checkActive(list, index);
  }

  /**
   * Highlight button
   * @param {Object} target - Button object that should be highlighted
   */
  setActive(target) {
    let {
      buttons,
    } = this.state;

    this.setState({
      buttons: buttons.map((button) => ({
        ...button,
        isActive: target.id === button.id ? true : false,
      })),
    });
  }

  /**
   * 检查有状态按钮个数
   * @param {Object} item
   * @param {Object} index
   */
  checkActive(item, index) {
    let buttonList = item;
    let length = Object.keys(buttonList).length;
    let list = buttonList.filter((value) => {
      return value.isActive === true;
    });

    let listisActive = list.map((list) => {
      return list.isActive === true ? list.name : '';
    });
    let allCheck;
    if (Object.keys(list).length === length) {
      allCheck = true;
        this.setState({allCheck: true, chekedList: listisActive});
    } else {
      allCheck = false;
        this.setState({allCheck: false, chekedList: listisActive});
    }
    this.delayedButton.exec(()=> {
      typeof this.props.onClick === 'function' && this.props.onClick(item, allCheck, listisActive, buttonList, index);
    });
  }

  /**
   * Update buttonList when new props received
   * For performance reasons, user should prevent frequent update by setting
   * @param  {Object} nextProps - Props
   */
  // componentWillReceiveProps(nextProps) {
  //   this.setState({
  //     buttonList: nextProps.buttonList,
  //   });
  // }

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
    } = this.state;

    return (
      <div>
        {
          buttons.map((button, index) => (
            <Button
              className={classes.btnStyle}
              key={button.id}
              variant='raised'
              size='small'
              color={button.isActive === true ? 'primary' : 'default'}
              onClick={this.onClick.bind(this, button, index)}
            >
              {button.name}
            </Button>
          ))
        }
      </div>
    );
  }
}
