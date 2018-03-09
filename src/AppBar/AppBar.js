/**
 * @module AppBar
 */
import React from 'react';
import {string, object, array, oneOf} from 'prop-types';
import Button from 'material-ui/Button';
import {withStyles} from 'material-ui/styles';
// import {MenuList} from 'material-ui/Menu';
// import Grow from 'material-ui/transitions/Grow';
import {Manager, Target} from 'react-popper';
// import ClickAwayListener from 'material-ui/utils/ClickAwayListener';
import classNames from 'classnames';

import MenuList from './components/MenuList';
// import MenuItem from './components/MenuItem';

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
  // popperClose: {
  //   pointerEvents: 'none',
  // },
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
  };

   /**
   * Constructor
   * @param  {Object} props
   */
  constructor(props) {
    super(props);
    this.props = props;

    this.state = {
      navs: this.props.navs instanceof Array ? this.initNavs(this.props.navs) : void 0,
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
        isOpen: false,
        navs: nav.navs instanceof Array ? this.initNavs(nav.navs) : void 0,
      };
    });
  }

  /**
   * Open Popover
   * @param  {Object} nav - Selected nav button
   */
  popoverOpenHandler(nav) {
    this.setState({
      navs: this.state.navs instanceof Array ? this.openSingleNav(this.state.navs, nav) : void 0,
    });
  }

  /**
   * Iterate to set isOpen property to true on matched nav button
   * to false on all other nav buttons
   * @param  {Array} navs - An array contains all nav buttons
   * @param  {Object} target - Selected nav button
   * @return {Array}
   */
  openSingleNav(navs, target) {
    return navs.map((nav) => {
      return {
        ...nav,
        isOpen: target.id === nav.id ? true : false,
        navs: nav.navs instanceof Array ? this.openSingleNav(nav.navs, target) : void 0,
      };
    });
  }

  /**
   * Close all Popovers
   * Call react render method only if there are some popover is open
   */
  popoverCloseHandler() {
    if (this.isAllNavsClosed(this.state.navs) === false) {
      this.setState({
        navs: this.closeAllNavs(this.state.navs),
      });
    }
  }

  /**
   * Check whether all navs are closed
   * @param  {Object}  navs - Nav buttons
   * @return {Boolean}
   */
  isAllNavsClosed(navs) {
    let isAllNavsClosed = true;

    for (let i = 0; i < navs.length; i++) {
      if (navs[i].isOpen === true) {
        isAllNavsClosed = false;
      }
      // Check sub navs
      if (isAllNavsClosed === true && navs[i].navs instanceof Array) {
        isAllNavsClosed = this.isAllNavsClosed(navs[i].navs);
      }
    }

    return isAllNavsClosed;
  }

  /**
   * Iterate to set isOpen property to false for all nav buttons
   * @param  {Array} navs - An array contains all nav buttons
   * @return {Array}
   */
  closeAllNavs(navs) {
    return navs.map((nav) => {
      return {
        ...nav,
        isOpen: false,
        navs: nav.navs instanceof Array ? this.closeAllNavs(nav.navs) : void 0,
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
                    <MenuList
                      isOpen={nav.isOpen}
                      onClickAway={this.popoverCloseHandler.bind(this)}
                      navs={nav.navs}
                    />
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
