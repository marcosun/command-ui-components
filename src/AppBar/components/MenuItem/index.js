/**
 * @module MenuItem
 * HOC for material-ui MenuItem
 * Features:
 * Accept color property to config primary or secondary text colour
 */
import React from 'react';
import {string, bool, array, object, func, oneOf, shape} from 'prop-types';
import {withStyles} from 'material-ui/styles';
import {Manager, Target} from 'react-popper';
import {MenuItem} from 'material-ui/Menu';
import KeyboardArrowRight from 'material-ui-icons/KeyboardArrowRight';
import classNames from 'classnames';

import MenuList from '../MenuList';

const styles = (theme) => ({
  flatPrimary: {
    color: theme.palette.primary.main,
  },
  flatSecondary: {
    color: theme.palette.secondary.main,
  },
  colorInherit: {
    color: 'inherit',
  },
  menuList: {},
});

/**
 * MenuItem Component
 * @extends {Component}
 * @param {Object} props
 */
@withStyles(styles)
/**
 * Exports MenuItem component
 */
export default class Component extends React.Component {
  static propTypes = {
    classes: object.isRequired,
    className: string,
    color: oneOf(['default', 'inherit', 'primary', 'secondary']),
    nav: shape({
      name: string,
      id: string,
      isActive: bool,
      isHover: bool,
      navs: array,
    }),
    onClick: func,
    onMouseEnter: func,
    onMouseLeave: func,
  };

  static defaultProps = {
    color: 'default',
  };

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
   * @param  {Object} nav - Selected nav buttons
   */
  onMouseEnter(...navs) {
    const {
      onMouseEnter,
    } = this.props;

    typeof onMouseEnter === 'function' && onMouseEnter(...navs);
  }

  /**
   * onMouseLeave callback
   */
  onMouseLeave(...navs) {
    const {
      onMouseLeave,
    } = this.props;

    typeof onMouseLeave === 'function' && onMouseLeave(...navs);
  }

  /**
   * Return MenuItem component
   * @return {Component}
   */
  render() {
    const {
      classes,
      className: classNameProp,
      color,
      nav,
      onClick,
      onMouseEnter,
      onMouseLeave,
      ...other
    } = this.props;

    const className = classNames(
      {
        [classes.colorInherit]: color === 'inherit',
        [classes.flatPrimary]: color === 'primary',
        [classes.flatSecondary]: color === 'secondary',
      },
      classNameProp,
    );

    return (
      <Manager>
        <Target>
          <MenuItem
            className={className}
            onClick={this.onClick.bind(this, nav)}
            onMouseEnter={this.onMouseEnter.bind(this, nav)}
            onMouseLeave={this.onMouseLeave.bind(this)}
            {...other}
          >
            {nav.name}
            {nav.navs instanceof Array && <KeyboardArrowRight />}
          </MenuItem>
        </Target>
        {
          nav.navs instanceof Array
            && <MenuList
              classes={{menuList: classes.menuList}}
              isOpen={nav.isOpen}
              placement='right-start'
              navs={nav.navs}
              onClick={this.onClick.bind(this, nav)}
              onMouseEnter={this.onMouseEnter.bind(this, nav)}
              onMouseLeave={this.onMouseLeave.bind(this)}
            />
        }
      </Manager>
    );
  }
}
