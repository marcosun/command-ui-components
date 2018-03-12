/**
 * @module AppBar
 */
import React from 'react';
import {string, object, array, func, oneOf} from 'prop-types';
import Button from 'material-ui/Button';
import {withStyles} from 'material-ui/styles';
import {Manager, Target} from 'react-popper';
import ClickAwayListener from 'material-ui/utils/ClickAwayListener';
import classNames from 'classnames';

import MenuList from './components/MenuList';

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
    onClick: func,
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
   * Update state when new props
   * @param  {Object} nextProps - New props
   */
  componentWillReceiveProps(nextProps) {
    this.setState({
      navs: nextProps.navs instanceof Array ? this.initNavs(nextProps.navs) : void 0,
    });
  }

  /**
   * Iterate to initialise nav buttons
   * @param  {Object} navs - Nav buttons
   * @param  {Number} level - How deep is the iteration
   * @return {objectect}
   */
  initNavs(navs, level = 0) {
    return navs.map((nav) => {
      return {
        ...nav,
        id: nav.id !== void 0 ? nav.id : nav.name,
        isActive: nav.isActive === true,
        isOpen: false,
        navs: nav.navs instanceof Array ? this.initNavs(nav.navs, level + 1) : void 0,
        level: level,
      };
    });
  }

  /**
   * Nav button click handler
   * @param  {Array} navs - Selected nav buttons
   */
  clickHandler(...navs) {
    typeof this.props.onClick === 'function' && this.props.onClick(...navs);
  }

  /**
   * Nav button hover handler
   * Open sub navs
   * @param  {Array} navs - Selected nav buttons
   */
  hoverHandler(...navs) {
    this.popoverOpenHandler(...navs);
  }

  /**
   * Open Popover
   * @param  {Object} navs - Selected nav buttons
   */
  popoverOpenHandler(...navs) {
    this.setState({
      navs: this.state.navs instanceof Array ? this.openSingleNav(this.state.navs, ...navs) : void 0,
    });
  }

  /**
   * Iterate to set isOpen property to true on matched nav button
   * to false on all other nav buttons
   * @param  {Array} navs - An array contains all nav buttons
   * @param  {Object} target - Selected nav buttons
   * @return {Array}
   */
  openSingleNav(navs, ...target) {
    return navs.map((nav) => {
      return {
        ...nav,
        isOpen: target[nav.level] !== void 0 && target[nav.level].id === nav.id ? true : false,
        navs: nav.navs instanceof Array ? this.openSingleNav(nav.navs, ...target) : void 0,
      };
    });
  }

  /**
   * Close all Popovers when hover away from navs
   * Call react render method only if there are some popover is open
   */
  hoverAwayHandler(...navs) {
    if (this.isAllNavsClosed(this.state.navs) === false) {
      this.setState({
        navs: this.closeAllNavs(this.state.navs),
      });
    }
  }

  /**
   * Close all Popovers when click away from navs
   * Call react render method only if there are some popover is open
   */
  clickAwayHandler() {
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

    const firstOrderMenuListElement = (nav) => {
      return (
        <Manager key={nav.id}>
          <Target>
            <Button
              color={nav.isActive === true ? 'primary' : 'default'}
              onClick={this.clickHandler.bind(this, nav)}
              onMouseEnter={this.hoverHandler.bind(this, nav)}
            >{nav.name}</Button>
          </Target>
          <MenuList
            isOpen={nav.isOpen}
            placement='bottom'
            onClick={this.clickHandler.bind(this, nav)}
            onMouseEnter={this.hoverHandler.bind(this, nav)}
            navs={nav.navs}
          />
        </Manager>
      );
    };

    return (
      <div className={classes.root}>
        <div className={appBarClassName}>
          <div className={classes.captionBackground}></div>
          <div className={classes.captionContent}>
            {caption}
          </div>
          <div className={classes.city}>{city}</div>
          <ClickAwayListener onClickAway={this.clickAwayHandler.bind(this)}>
            <div className={classes.leftNavs}>
              {
                navs.slice(0, 2).map((nav) => {
                  return firstOrderMenuListElement(nav);
                })
              }
            </div>
            <div className={classes.rightNavs}>
              {
                navs.slice(2, 4).map((nav) => {
                  return firstOrderMenuListElement(nav);
                })
              }
            </div>
          </ClickAwayListener>
        </div>
        <div className={childrenClassName}>
          {children}
        </div>
      </div>
    );
  }
}
