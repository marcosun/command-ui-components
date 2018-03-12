/**
 * @module Table
 */
import React from 'react';

import {Table} from 'command-ui-components';
/**
 * Exports Table component
 */
export default class Component extends React.Component {
  /**
   * Contstructor function
   * @param {Object} props - Props
   */
  constructor(props) {
    super(props);
    this.props = props;

    this.columns = [
      {
        label: '路段名',
        prop: 'name',
      },
      {
        label: '影响线路',
        prop: 'affectBusLines',
      },
    ];

    this.data = [{
      name: <div>凤起路<div>从凤起东路到保俶路</div></div>,
      affectBusLines: '8',
    },
    {
      name: '南三环路四段',
      affectBusLines: '9',
    },
    {
      name: '人民南路四段',
      affectBusLines: '8',
    },
    {
      name: '益新大道',
      affectBusLines: '15',
    },
    {
      name: '犀安路',
      affectBusLines: '6',
    },
    {
      name: '北星大道一段',
      affectBusLines: '8',
    },
    {
      name: '德胜路',
      affectBusLines: '6',
    }];

    this.state = {
      clickRowIndex: 2,
      rowData: JSON.stringify(this.data[2]),
    };
  }

  /**
   * @param  {Object} row
   * @param  {Number} index
   */
  onRowClick(row, index) {
    this.setState({
      ...this.state,
      clickRowIndex: index,
      rowData: JSON.stringify(row),
    });
  }

  /**
   * Render Table component
   * @return {Component} - Table component
   */
  render() {
    const defaultTableStyle = {
      width: '20%',
      height: '200px',
      background: 'rgba(3,6,18,0.70)',
    };

    const canPaginateTableStyle = {
      width: '20%',
      background: 'rgba(3,6,18,0.70)',
    };


    return (
      <div>
        <div>Default scroll table</div>
        <div style={defaultTableStyle}>
          <Table
            columns={this.columns}
            data={this.data}
          />
        </div>
        <div>Paginate table</div>
        <div style={canPaginateTableStyle}>
          <Table
            columns={this.columns}
            data={this.data}
            isPaginate={true}
            selectRowIndex={this.state.clickRowIndex}
            rowsPerPage={4}
            onRowClick={this.onRowClick.bind(this)}
          />
        </div>
        <div>index: {this.state.clickRowIndex}</div>
        <div>row data: {this.state.rowData}</div>
      </div>
    );
  }
}
