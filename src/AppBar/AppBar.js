/**
 * @module AppBar
 */
import React from 'react';
import {string, object, array, oneOf} from 'prop-types';
import Button from 'material-ui/Button';
import {withStyles} from 'material-ui/styles';
import {MenuItem, MenuList} from 'material-ui/Menu';
import Grow from 'material-ui/transitions/Grow';
import {Manager, Target, Popper} from 'react-popper';
import ClickAwayListener from 'material-ui/utils/ClickAwayListener';
import classNames from 'classnames';

const styles = (theme) => ({
  root: {
    position: 'relative',
    width: '100%',
    height: '100%',
  },
  appBar: {
    width: '100%',
    height: '50px',
    backgroundColor: '#2E397A',
  },
  absolutePositionAppBar: {
    position: 'absolute',
  },
  relativePositionAppBar: {
    position: 'relative',
  },
  children: {
    width: '100%',
  },
  absolutePositionChildren: {
    height: '100%',
  },
  relativePositionChildren: {
    height: 'calc(100% - 50px)',
  },
  captionBackground: {
    position: 'absolute',
    left: '50%',
    transform: 'translate3d(-50%,0,0)',
    width: '290px',
    height: '0',
    borderTop: '55px solid #3D4CA1',
    borderLeft: '30px solid transparent',
    borderRight: '30px solid transparent',
  },
  captionContent: {
    position: 'absolute',
    left: '50%',
    transform: 'translate3d(-50%,0,0)',
    color: '#FFFFFF',
    textAlign: 'center',
  },
  city: {
    position: 'absolute',
    top: '16px',
    left: '25px',
    fontSize: '12px',
    color: '#FFFFFF',
  },
  leftNavs: {
    position: 'absolute',
    left: '100px',
    display: 'flex',
    justifyContent: 'space-around',
    alignItems: 'center',
    width: 'calc(50% - 275px)',
    height: '100%',
  },
  rightNavs: {
    position: 'absolute',
    right: '100px',
    display: 'flex',
    justifyContent: 'space-around',
    alignItems: 'center',
    width: 'calc(50% - 275px)',
    height: '100%',
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
  popperClose: {
    pointerEvents: 'none',
  },
});

/**
 * Header Component
 * @extends {Component}
 * @param {Object} props
 */
@withStyles(styles)
/**
 * Exports Header component
 */
export default class AppBar extends React.Component {
  static propTypes = {
    classes: object.isRequired,
    caption: object.isRequired,
    /**
     * Absolute: Absolute positioning, does not take space in DOM
     * Relative: Relative positioning, takes space in DOM
     */
    position: oneOf(['absolute', 'relative']),
    city: string,
    /**
     * Nav buttons
     * navs.name - Required. Unique.
     * navs.id - If omitted, equal to nav.name.
     * navs.isActive - Should nav button be highlighted.
     * navs.navs - Subnav buttons.
     */
    navs: array,
    children: object,
  };

  static defaultProps = {
    position: 'relative',
    navs: [],
  };

   /**
   * Constructor
   * @param  {Object} props
   */
  constructor(props) {
    super(props);
    this.props = props;

    this.state = {
      navs: this.initNavs(this.props.navs),
    };
  }

  /**
   * Iterate to initialise nav buttons
   * @param  {[type]} navs - Nav buttons
   * @return {Object}
   */
  initNavs(navs) {
    return navs.map((nav) => {
      return {
        ...nav,
        id: nav.id !== void 0 ? nav.id : nav.name,
        isActive: nav.isActive === true,
        isHover: false,
        navs: nav.navs === Object(nav.navs) ? this.initNavs(nav.navs) : undefined,
      };
    });
  }

  /**
   * Open Popover
   * @param  {Object} nav - Selected nav button
   */
  popoverOpenHandler(nav) {
    this.setState({
      navs: this.hoverSingleNav(this.state.navs, nav),
    });
  }

  /**
   * Iterate to set isHover property to true on matched nav button
   * to false on all other nav buttons
   * @param  {Array} navs - An array contains all nav buttons
   * @param  {Object} target - Selected nav button
   * @return {Array}
   */
  hoverSingleNav(navs, target) {
    return navs.map((nav) => {
      return {
        ...nav,
        isHover: target.id === nav.id ? true : false,
        navs: nav.navs === Object(nav.navs) ? this.hoverSingleNav(nav.navs, target) : undefined,
      };
    });
  }

  /**
   * Close all Popovers
   */
  popoverCloseHandler() {
    this.setState({
      navs: this.unhoverAllNavs(this.state.navs),
    });
  }

  /**
   * Iterate to set isHover property to false for all nav buttons
   * @param  {Array} navs - An array contains all nav buttons
   * @return {Array}
   */
  unhoverAllNavs(navs) {
    return navs.map((nav) => {
      return {
        ...nav,
        isHover: false,
        navs: nav.navs === Object(nav.navs) ? this.unhoverAllNavs(nav.navs) : undefined,
      };
    });
  }

  // popoverCloseHandler() {
  //   this.setState({
  //     navs: this.state.navs.map((nav) => {
  //       return this.closePopover(nav);
  //     }),
  //   });
  // }

  // closePopover(nav) {
  //   return {
  //     ...nav,
  //     isHover: false,
  //     nav: nav.nav === Object(nav.nav) ? this.closePopover(nav.nav) : undefined,
  //   };
  // }

  /**
   * Return Header component
   * @return {Component}
   */
  render() {
    const {
      classes,
      caption,
      position,
      city,
      children,
    } = this.props;

    const {
      navs,
    } = this.state;

    const appBarClassName = classNames(classes.appBar, {
      [classes.absolutePositionAppBar]: position === 'absolute',
      [classes.relativePositionAppBar]: position === 'relative',
    });

    const childrenClassName = classNames(classes.children, {
      [classes.absolutePositionChildren]: position === 'absolute',
      [classes.relativePositionChildren]: position === 'relative',
    });

    return (
      <div className={classes.root}>
        <div className={appBarClassName}>
          <div className={classes.captionBackground}></div>
          <div className={classes.captionContent}>
            {caption}
          </div>
          <div className={classes.city}>{city}</div>
          <div className={classes.leftNavs}>
            {
              navs.slice(0, 2).map((nav) => {
                return (
                  <Manager key={nav.id}>
                    <Target>
                      <Button
                        color={nav.isActive === true ? 'primary' : 'default'}
                        onClick={this.popoverOpenHandler.bind(this, nav)}
                      >{nav.name}</Button>
                    </Target>
                    <Popper
                      placement='bottom'
                      className={classNames({[classes.popperClose]: !nav.isHover})}
                    >
                      <ClickAwayListener onClickAway={this.popoverCloseHandler.bind(this)}>
                        <Grow in={nav.isHover} style={{transformOrigin: '0 0 0'}}>
                          <MenuList role="menu" className={classes.menuList}>
                            {
                              nav.navs && nav.navs.map((nav) => {
                                return (
                                  <MenuItem
                                    key={nav.id}
                                    className={classes.menuItem}
                                    color={nav.isActive === true ? 'primary' : 'default'}
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
                  </Manager>
                );
              })
            }
          </div>
          <div className={classes.rightNavs}>
            {
              navs.slice(2, 4).map((nav) => {
                return <Button key={nav.id} color={nav.isActive === true ? 'primary' : 'default'}>{nav.name}</Button>;
              })
            }
          </div>
        </div>
        <div className={childrenClassName}>
          {children}
        </div>
      </div>
    );
  }
}
