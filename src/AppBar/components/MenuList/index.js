/**
 * @module MenuList
 * HOC for material-ui MenuList
 */
import React from 'react';
import {bool, string, func, object, array, oneOf, arrayOf, shape} from 'prop-types';
import PopperJS from 'popper.js';
import {withStyles} from 'material-ui/styles';
import {MenuList} from 'material-ui/Menu';
import Grow from 'material-ui/transitions/Grow';
import {Popper} from 'react-popper';
import classNames from 'classnames';

import MenuItem from '../MenuItem';

const styles = (theme) => ({
  popperClose: {
    pointerEvents: 'none',
  },
  menuList: {
    padding: 0,
    border: `${theme.palette.primary.main} 1px solid`,
  },
  menuItem: {
    justifyContent: 'center',
    '&:hover': {
      color: theme.palette.primary.main,
      backgroundColor: '#0A1432',
    },
  },
});

/**
 * MenuList Component
 * @extends {Component}
 * @param {Object} props
 */
@withStyles(styles)
/**
 * Exports MenuList component
 */
export default class Component extends React.Component {
  static propTypes = {
    classes: object.isRequired,
    isOpen: bool.isRequired,
    placement: oneOf(PopperJS.placements),
    navs: arrayOf(shape({
      name: string,
      id: string,
      isActive: bool,
      isHover: bool,
      navs: array,
    })),
    onClick: func,
    onMouseEnter: func,
  };

  static defaultProps = {
    isOpen: false,
    placement: 'bottom',
  };

  /**
   * Constructor
   * @param  {Object} props
   */
  constructor(props) {
    super(props);
    this.props = props;
  }

  /**
   * onClick callback
   * @param  {Object} navs - Selected nav buttons
   */
  onClick(...navs) {
    const {
      onClick,
    } = this.props;

    typeof onClick === 'function' && onClick(...navs);
  }

  /**
   * onMouseEnter callback
   * @param  {Object} navs - Selected nav buttons
   */
  onMouseEnter(...navs) {
    const {
      onMouseEnter,
    } = this.props;

    typeof onMouseEnter === 'function' && onMouseEnter(...navs);
  }

  /**
   * Return MenuList component
   * @return {Component}
   */
  render() {
    const {
      classes,
      isOpen,
      placement,
      navs,
      onClick,
      onMouseEnter,
      ...other
    } = this.props;

    return (
      <Popper
        placement={placement}
        className={classNames({[classes.popperClose]: !isOpen})}
      >
          <Grow in={isOpen} style={{transformOrigin: '0 0 0'}}>
            <MenuList role="menu" className={classes.menuList} {...other}>
              {
                navs instanceof Array && navs.map((nav) => {
                  return (
                    <MenuItem
                      key={nav.id}
                      classes={{menuList: classes.menuList}}
                      className={classes.menuItem}
                      color={
                        nav.isActive === true || nav.isOpen === true
                          ? 'primary'
                          : 'default'
                      }
                      nav={nav}
                      onClick={this.onClick.bind(this)}
                      onMouseEnter={this.onMouseEnter.bind(this)}
                    />
                  );
                })
              }
            </MenuList>
          </Grow>
      </Popper>
    );
  }
}
