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
  menuList: {
    backgroundColor: 'rgba(0, 2, 5, 0.8)',
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

    this.state = {
      // Defines AppBar navs
      navs: [{
        name: '综合展示',
        isActive: true,
        level: 0,
        navs: [{
          name: '动态展示',
          isActive: true,
          level: 1,
        }, {
          name: '人流迁徙',
          level: 1,
        }, {
          name: '线路和站点详情',
          level: 1,
        }],
      }, {
        name: '统计分析',
        level: 0,
        navs: [{
          name: '行业指标',
          level: 1,
          navs: [{
            name: '行业指标概述',
            level: 2,
            navs: [{
              name: '123',
              level: 3,
              navs: [{
                name: '321',
                level: 4,
              }],
            }],
          }],
        }, {
          name: '高德指标',
          level: 1,
        }, {
          name: '业务分析',
          level: 1,
        }],
      }, {
        name: '行业应用',
        level: 0,
      }, {
        name: '数据发布',
        level: 0,
      }],
    };
  }

  /**
   * Click handler
   * Iterate to select nav buttons
   * @param  {...[Object]} navs - Selected nav buttons
   */
  clickHandler(...navs) {
    this.setState({
      navs: this.state.navs instanceof Array ? this.highlightSingleNav(this.state.navs, ...navs) : void 0,
    });
  }

  /**
   * Iterate to set isActive property to true on matched nav button
   * to false on all other nav buttons
   * @param  {Array} navs - An array contains all nav buttons
   * @param  {Object} target - Selected nav buttons
   * @return {Array}
   */
  highlightSingleNav(navs, ...target) {
    return navs.map((nav) => {
      return {
        ...nav,
        isActive: target[nav.level] !== void 0 && target[nav.level].name === nav.name ? true : false,
        navs: nav.navs instanceof Array ? this.highlightSingleNav(nav.navs, ...target) : void 0,
      };
    });
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
        classes={{
          menuList: classes.menuList,
        }}
        caption={
          <div className={classes.caption}>
            <img src={logo} />杭州公交数据大脑
          </div>
        }
        city='杭州'
        navs={this.state.navs}
        onClick={this.clickHandler.bind(this)}
      >
        <div style={{backgroundColor: 'white'}}>Content</div>
      </AppBar>
    );
  }
}
