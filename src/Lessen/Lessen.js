/**
 * @module Lessen
 */
import React from 'react';
import {object, string, bool, node, arrayOf, shape} from 'prop-types';
import {withStyles} from 'material-ui/styles';
import classNames from 'classnames';
import Icon from 'material-ui/Icon';

const styles = (theme) => ({
  root: {
    width: '100%',
    height: '100%',
  },
  children: {
    width: '100%',
    height: '100%',
  },
  takeSpaceChildren: {
    height: 'calc(100% - 34px)',
  },
  lessen: {
    position: 'absolute',
    top: '10px',
    right: '10px',
    zIndex: '2',
    width: '20px',
    height: '20px',
  },
  lessenIcon: {
    display: 'inline-block',
    marginTop: '3px',
    width: '20px',
    height: '20px',
    fontSize: '20px',
    cursor: 'pointer',
  },
  wrap: {
    width: '100%',
    height: '100%',
  },
  tabsWrapper: {
    position: 'absolute',
    bottom: '0',
    zIndex: '20',
    width: '100%',
    height: '34px',
    paddingLeft: '100px',
    background: 'rgba(70,77,107,0.25)',
  },
  tab: {
    float: 'left',
    width: '140px',
    height: '100%',
    marginRight: '5px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    background: 'rgba(78,91,255,0.15)',
    color: '#a5c9fd',
    fontSize: '12px',
    border: '1px solid rgba(110,120,255,0.35)',
    cursor: 'pointer',
  },
  hide: {
    display: 'none',
  },
  takeSpaceTabs: {
    height: '34px',
  },
});

@withStyles(styles)
/**
 * Exports Lessen component
 */
export default class Lessen extends React.Component {
  static propTypes = {
    classes: object.isRequired,
    children: node,
    data: arrayOf(shape({
      name: string.isRequired,
      id: string.isRequired,
      classes: string, // CSS API
      isShowLessen: bool,
    })).isRequired,
    takeSpace: bool.isRequired,
  };

  static defaultProps = {
    takeSpace: true, // Tabs take up space in dom
  };

  /**
   * Contstructor function
   * @param {Object} props - Props
   */
  constructor(props) {
    super(props);
    this.props = props;

    this.initState();
  }

  /**
   * Init state
   */
  initState() {
    this.state = {
      data: this.props.data.map((item, index) => {
        return {
          name: item.name,
          id: item.id,
          isShowLessen: item.isShowLessen === void 0 ? true : item.isShowLessen,
          classes: item.classes,
        };
      }),
      tabs: (() => {
        let tabs = [];
        this.props.data.forEach((item, index) => {
          if (item.isShowLessen === false) {
            tabs.push({
              name: item.name,
              id: item.id,
            });
          }
        });
        return tabs;
      })(),
    };
  }

  /**
   * Lessen click callback
   * @param {Object} item
   * @param {Number} index
   * @param {Event} event - React event
   */
  onLessenClick(item, index, event) {
    this.setState({
      data: this.state.data.map((lessen, lessenIndex) => {
        return {
          ...lessen,
          isShowLessen: index === lessenIndex ? false : lessen.isShowLessen,
        };
      }),
      tabs: this.state.tabs.concat([{
        name: item.name,
        id: item.id,
      }]),
    });
  }

  /**
   * Tab click callback
   * @param  {Object} tab - Tab data
   * @param  {Number} index - Tab index
   * @param  {Event} event - React event
   */
  onTabClick({id}, index, event) {
    this.setState({
      data: this.state.data.map((lessen, lessenIndex) => {
        return {
          ...lessen,
          isShowLessen: lessen.id === id ? true : lessen.isShowLessen,
        };
      }),
      tabs: [...this.state.tabs.slice(0, index), ...this.state.tabs.slice(index + 1, this.state.tabs.length)],
    });
  }

  /**
   * Render Lessen component
   * @return {Component} - Lessen component
   */
  render() {
    const {
      classes,
      children,
      takeSpace,
    } = this.props;

    const {
      data,
      tabs,
    } = this.state;

    const lessenLayerElement = (
      data.map((item, index) => {
        const lessenLayerClassName = classNames([item.classes], {
          [classes.hide]: item.isShowLessen === false,
        });
        return (
          <div
            key={item.id}
            className={lessenLayerClassName}
          >
            <div className={classes.lessen} onClick={this.onLessenClick.bind(this, item, index)}>
              <Icon className={classes.lessenIcon} color="secondary">
                indeterminate_check_box
              </Icon>
            </div>
            <div className={classes.wrap}>
              {this.props[item.id]}
            </div>
          </div>
        );
      })
    );

    const tabsElement = (() => {
      const tabsWrapperClassName = classNames(classes.tabsWrapper, {
        [classes.takeSpaceTabs]: takeSpace === true,
        [classes.hide]: tabs.length === 0,
      });
      return (
        <div className={tabsWrapperClassName}>
          {(
            tabs.map((tab, index) => {
              return (
                <div
                  key={tab.id}
                  className={classes.tab}
                  onClick={this.onTabClick.bind(this, tab, index)}
                >{tab.name}</div>
              );
            })
          )}
        </div>
      );
    })();

    const childrenClassName = classNames(classes.children, {
      [classes.takeSpaceChildren]: takeSpace === true && tabs.length !== 0,
    });

    return (
      <div className={classes.root}>
        <div className={childrenClassName}>
          {lessenLayerElement}
          {children}
        </div>
        {tabsElement}
      </div>
    );
  }
}
