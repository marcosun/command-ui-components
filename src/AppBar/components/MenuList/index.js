/**
 * @module MenuList
 * HOC for material-ui MenuList
 */
import React from 'react';
import {bool, string, func, object, array, arrayOf, shape} from 'prop-types';
import {withStyles} from 'material-ui/styles';
import {MenuList} from 'material-ui/Menu';
import Grow from 'material-ui/transitions/Grow';
import {Popper} from 'react-popper';
import ClickAwayListener from 'material-ui/utils/ClickAwayListener';
import classNames from 'classnames';

import MenuItem from '../MenuItem';

const styles = (theme) => ({
  popperClose: {
    pointerEvents: 'none',
  },
  menuList: {
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
    navs: arrayOf(shape({
      name: string,
      id: string,
      isActive: bool,
      isHover: bool,
      navs: array,
    })),
    onClickAway: func,
  };

  static defaultProps = {
    isOpen: false,
    navs: [],
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
   * Return MenuList component
   * @return {Component}
   */
  render() {
    const {
      classes,
      isOpen,
      navs,
      onClickAway,
      ...other
    } = this.props;
console.log(navs);
    return (
      <Popper
        placement='bottom'
        className={classNames({[classes.popperClose]: !isOpen})}
      >
        <ClickAwayListener onClickAway={onClickAway}>
          <Grow in={isOpen} style={{transformOrigin: '0 0 0'}}>
            <MenuList role="menu" className={classes.menuList} {...other}>
              {
                navs instanceof Array && navs.map((nav) => {
                  return (
                    <MenuItem
                      key={nav.id}
                      className={classes.menuItem}
                      color={nav.isActive === true ? 'primary' : 'default'}
                      navs={nav.navs}
                    >
                      {nav.name}
                    </MenuItem>
                  );
                })
              }
            </MenuList>
          </Grow>
        </ClickAwayListener>
      </Popper>
    );
  }
}
