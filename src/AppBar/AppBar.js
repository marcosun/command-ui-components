/**
 * @module AppBar
 */
import React from 'react';
import {string, object, array, oneOf} from 'prop-types';
import {withStyles} from 'material-ui/styles';
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
    top: '14px',
    left: '25px',
    fontSize: '12px',
    color: '#FFFFFF',
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
    /**
     * Absolute: Absolute positioning, does not take space in DOM
     * Relative: Relative positioning, takes space in DOM
     */
    caption: object.isRequired,
    position: oneOf(['absolute', 'relative']),
    city: string,
    children: array,
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
        </div>
        <div className={childrenClassName}>
          {children}
        </div>
      </div>
    );
  }
}
