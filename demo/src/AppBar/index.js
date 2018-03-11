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

    this.navs = [{
      name: '综合展示',
      isActive: true,
      navs: [{
        name: '动态展示',
        isActive: true,
      }, {
        name: '人流迁徙',
      }, {
        name: '线路和站点详情',
      }],
    }, {
      name: '统计分析',
      navs: [{
        name: '行业指标',
        navs: [{
          name: '行业指标概述',
          navs: [{
            name: '123',
            navs: [{
              name: '321',
            }],
          }],
        }],
      }, {
        name: '高德指标',
      }, {
        name: '业务分析',
      }],
    }, {
      name: '行业应用',
    }, {
      name: '数据发布',
    }];
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
      <AppBar
        caption={
          <div className={classes.caption}>
            <img src={logo} />杭州公交数据大脑
          </div>
        }
        city='杭州'
        navs={this.navs}
        actionType='hover'
      >
        <div style={{backgroundColor: 'black'}}>Content</div>
      </AppBar>
    );
  }
}
