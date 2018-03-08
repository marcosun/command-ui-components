/**
 * @module Demo/AppBar
 */
import React from 'react';
import {object} from 'prop-types';
import {withStyles} from 'material-ui/styles';
import {AppBar} from 'command-ui-components';

import logo from './favicon.png';

const styles = (theme) => ({
  caption: {
    display: 'flex',
    alignItems: 'center',
    height: '55px',
    lineHeight: '55px',
    fontSize: '22px',
  },
});

@withStyles(styles)
/**
 * Exports AppBar component
 */
export default class Component extends React.Component {
  static propTypes = {
    classes: object.isRequired,
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
   * Render AppBar component
   * @return {Component} - AppBar component
   */
  render() {
    const {
      classes,
    } = this.props;

    return (
      <AppBar caption={<div className={classes.caption}><img src={logo} />杭州公交数据大脑</div>} city='杭州'>
        <div style={{backgroundColor: 'black'}}>Content</div>
      </AppBar>
    );
  }
}
