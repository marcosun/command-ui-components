/**
 * @module MenuItem
 * HOC for material-ui MenuItem
 * Features:
 * Accept color property to config primary or secondary text colour
 */
import React from 'react';
import {string, object, node, oneOf} from 'prop-types';
import {withStyles} from 'material-ui/styles';
import {MenuItem} from 'material-ui/Menu';
import classNames from 'classnames';

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
    children: node,
  };

  static defaultProps = {
    color: 'default',
  };

  /**
   * Return MenuItem component
   * @return {Component}
   */
  render() {
    const {
      classes,
      className,
      color,
      children,
      ...other
    } = this.props;

    const menuItemClassName = classNames(
      {
        [classes.colorInherit]: color === 'inherit',
        [classes.flatPrimary]: color === 'primary',
        [classes.flatSecondary]: color === 'secondary',
      },
      className,
    );

    return <MenuItem className={menuItemClassName} {...other}>{children}</MenuItem>;
  }
}
