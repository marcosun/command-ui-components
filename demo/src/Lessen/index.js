/**
 * @module Lessen
 */
import React from 'react';
import {object} from 'prop-types';
import {withStyles} from 'material-ui/styles';

import {Lessen} from 'command-ui-components';

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
  roadRank: {
    position: 'absolute',
    top: '10px',
    left: '10px',
    width: '400px',
    height: '200px',
    color: '#a5c9fd',
    background: 'rgba(3,6,18,0.70)',
  },
  coverage: {
    position: 'absolute',
    top: '10px',
    right: '10px',
    width: '400px',
    height: '200px',
    color: '#a5c9fd',
    background: 'rgba(3,6,18,0.70)',
  },
  children: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate3d(-50%, 0, 0)',
    padding: '10px',
    border: '1px solid #a5c9fd',
  },
});

@withStyles(styles)
/**
 * Exports Lessen component
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

    this.data = [
      {
        name: '拥堵路段排行',
        id: 'roadRank',
        classes: this.props.classes.roadRank,
      },
      {
        name: '覆盖率',
        id: 'coverage',
        classes: this.props.classes.coverage,
      },
    ];
  }

  /**
   * Render Lessen component
   * @return {Component} - Lessen component
   */
  render() {
    const {
      classes,
    } = this.props;

    const roadRankElement = (
      <div>拥堵路段排行</div>
    );

    const coverageElemnt = (
      <div>覆盖率</div>
    );

    return (
      <div style={{
        width: '100vw',
        height: '100vh',
      }}>
        <Lessen
          takeSpace={false}
          data={this.data}
          roadRank={roadRankElement}
          coverage={coverageElemnt}
        >
          <div className={classes.children}>
            you can override leseen style by data.classes
          </div>
        </Lessen>
      </div>
    );
  }
}
