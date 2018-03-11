/**
 * @module MenuItem
 * HOC for material-ui MenuItem
 * Features:
 * Accept color property to config primary or secondary text colour
 */
import React from 'react';
import {string, bool, array, object, func, oneOf, shape} from 'prop-types';
import {withStyles} from 'material-ui/styles';
import {MenuItem} from 'material-ui/Menu';
import {Manager, Target} from 'react-popper';
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
    actionType: oneOf(['click', 'hover']),
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
  };

  static defaultProps = {
    actionType: 'click',
    color: 'default',
  };

  /**
   * onClick callback
   * @param  {Object} navs - Selected nav buttons
   */
  onClick(...navs) {
    const {
      actionType,
      onClick,
    } = this.props;

    if (actionType !== 'click') return;

    typeof onClick === 'function' && onClick(...navs);
  }

  /**
   * onMouseEnter callback
   * @param  {Object} nav - Selected nav buttons
   */
  onMouseEnter(...navs) {
    const {
      actionType,
      onMouseEnter,
    } = this.props;

    if (actionType !== 'hover') return;

    typeof onMouseEnter === 'function' && onMouseEnter(...navs);
  }

  /**
   * Return MenuItem component
   * @return {Component}
   */
  render() {
    const {
      classes,
      className: classNameProp,
      actionType,
      color,
      nav,
      onClick,
      onMouseEnter,
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

    // return <MenuItem className={className} {...other}>{children}</MenuItem>;
    return (
      <Manager>
        <Target>
          <MenuItem
            className={className}
            onClick={this.onClick.bind(this, nav)}
            onMouseEnter={this.onMouseEnter.bind(this, nav)}
            {...other}
          >{nav.name}</MenuItem>
        </Target>
        {
          nav.navs instanceof Array && <MenuList
            isOpen={nav.isOpen}
            actionType={actionType}
            placement='right'
            navs={nav.navs}
            onClick={this.onClick.bind(this, nav)}
            onMouseEnter={this.onMouseEnter.bind(this, nav)}
          />
        }
      </Manager>
    );
  }
}
