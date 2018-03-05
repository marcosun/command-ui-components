/**
 * @module OdometerBoard
 */
import React from 'react';
import {object, string, number, shape, arrayOf} from 'prop-types';
import {withStyles} from 'material-ui/styles';
import OdometerAnimate from 'react-odometerjs';

const styles = (theme) => ({
  root: {
    position: 'relative',
    display: 'flex',
    border: '1px solid rgba(103,140,192,0.38)',
    whiteSpace: 'nowrap',
    backgroundColor: '#07091c',
    boxShadow: '0 9px 11px rgba(2,8,20,0.74),inset 0 0 16px rgba(76,136,255,0.46)',
    '&:before': {
      position: 'absolute',
      top: '-1px',
      left: '-1px',
      width: '17px',
      height: '17px',
      content: '""',
      borderLeft: '2px solid #3f86da',
      borderTop: '2px solid #3f86da',
    },
    '&:after': {
      position: 'absolute',
      bottom: '-1px',
      right: '-1px',
      width: '17px',
      height: '17px',
      content: '""',
      borderRight: '2px solid #3f86da',
      borderBottom: '2px solid #3f86da',
    },
  },
  container: {
    minWidth: '160px',
    padding: '17px 30px 15px 30px',
    color: '#3D84FD',
  },
  name: {
    paddingBottom: '6px',
    color: '#FFFFFF',
    fontSize: '12px',
    textAlign: 'center',
  },
  value: {
    fontSize: '26px',
    textAlign: 'center',
  },
});

@withStyles(styles)
/**
 * Exports OdometerBoard component
 */
export default class OdometerBoard extends React.Component {
  static propTypes = {
    classes: object.isRequired,
    data: arrayOf(shape({
      name: string.isRequired,
      value: number.isRequired,
    })).isRequired,
  };

  static defaultProps = {
    data: [{
      name: '行驶总里程（公里）',
      value: 485512,
    }],
  };

  /**
   * Contstructor function
   * @param {Object} props - Props
   */
  constructor(props) {
    super(props);
    this.props = props;
  }

  /**
   * Render OdometerBoard component
   * @return {Component}
   */
  render() {
    const {
      classes,
      data,
    } = this.props;

    return (
      <div className={classes.root}>
        {(
          data.map((item, index) => (
            <div className={classes.container} key={index}>
              <div className={classes.name}>{item.name}</div>
                <div className={classes.value}>
                <OdometerAnimate value={item.value}></OdometerAnimate>
                </div>
            </div>
          ))
        )}
      </div>
    );
  }
}
