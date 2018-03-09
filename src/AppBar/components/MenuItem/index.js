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
    color: oneOf(['default', 'inherit', 'primary', 'secondary']),
    nav: shape({
      name: string,
      id: string,
      isActive: bool,
      isHover: bool,
      navs: array,
    }),
    onClick: func,
  };

  static defaultProps = {
    color: 'default',
  };

  /**
   * onClick callback
   * @param  {Object} nav - Nav button
   */
  onClick(...navs) {
    const {
      onClick,
    } = this.props;

    typeof onClick === 'function' && onClick(...navs);
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
            {...other}
          >{nav.name}</MenuItem>
        </Target>
        {
          nav.navs instanceof Array && <MenuList
            isOpen={nav.isOpen}
            placement='right'
            onClick={this.onClick.bind(this, nav)}
            navs={nav.navs}
          />
        }
      </Manager>
    );
  }
}
