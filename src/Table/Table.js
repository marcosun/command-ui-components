/**
 * @module Table
 */
import React from 'react';
import {
  object,
  string,
  number,
  func,
  bool,
  arrayOf,
  shape,
} from 'prop-types';
import {withStyles} from 'material-ui/styles';
import classNames from 'classnames';

const styles = (theme) => ({
  root: {
    width: '100%',
    height: '100%',
  },
  table: {
    width: '100%',
    height: '100%',
    color: '#a5c9fd',
    fontSize: '12px',
    tableLayout: 'fixed',
    borderSpacing: '0px',
  },
  thead: {
    display: 'block',
    width: '100%',
    height: '38px',
  },
  tbody: {
    display: 'block',
    width: '100%',
    height: 'calc(100% - 38px)',
    color: '#a5c9fd',
  },
  bodyRoot: {
    overflow: 'auto',
  },
  row: {
    width: '100%',
    display: 'table',
    tableLayout: 'fixed',
  },
  cell: {
    padding: '10px 5px',
    textAlign: 'left',
    borderBottom: '1px solid rgba(80,104,176,0.2)',
    overflow: 'hidden',
    whiteSpace: 'nowrap',
    textOverflow: 'ellipsis',
  },
  shouldClick: {
    cursor: 'pointer',
    '&:hover': {
      background: '#06123a',
      color: '#0090ff',
    },
  },
  rowClick: {
    background: '#06123a',
    color: '#0090ff',
  },
  footer: {
    width: '100%',
    lineHeight: '40px',
    padding: '0 10px',
    display: 'flex',
    justifyContent: 'space-between',
    fontSize: '12px',
  },
  pageNum: {
    color: '#a5c9fd',
    whiteSpace: 'nowrap',
  },
  footerIcon: {
    color: '#0090ff',
    '& span': {
      display: 'inline-block',
      marginLeft: '10px',
      cursor: 'pointer',
    },
  },
  hideFooterIcon: {
    opacity: '0.5',
  },
});

@withStyles(styles)
/**
 * Exports Table component
 */
export default class Table extends React.Component {
  static propTypes = {
    classes: object,
    columns: arrayOf(shape({
      label: string.isRequired,
      prop: string.isRequired,
    })).isRequired,
    data: arrayOf(object).isRequired,
    isPaginate: bool.isRequired,
    rowsPerPage: number.isRequired, // Row number every page
    selectRowIndex: number, // Add selected style to the row index
    onRowClick: func,
  };

  static defaultProps = {
    columns: [],
    data: [],
    rowsPerPage: 5,
    isPaginate: false,
  };

  /**
   * Contstructor function
   * @param {Object} props - Props
   */
  constructor(props) {
    super(props);
    this.props = props;

    this.state = {
      currentPageNum: 0,
      rowIndexClick: this.props.selectRowIndex,
    };
  }

  /**
   * Row click callback
   * @param  {Object} row - Row data
   * @param  {number} index - Row number
   */
  onRowClick(row, index) {
    this.setState({
      ...this.state,
      rowIndexClick: index,
    });
    this.props.onRowClick && this.props.onRowClick(row, index);
  }

  /**
   * FirstPage button click callback
   */
  onFirstPageClick() {
    this.state.currentPageNum !== 0
      ? this.setState({
        ...this.state,
        currentPageNum: 0,
      })
      : null;
  }

  /**
   * PrePage button click callback
   */
  onPrePageClick() {
    this.setState({
      ...this.state,
      currentPageNum: this.state.currentPageNum === 0
        ? 0
        : this.state.currentPageNum - 1,
    });
  }

  /**
   * NextPage button click callback
   */
  onNextPageClick() {
    const totalPageNum = Math.ceil(this.props.data.length / this.props.rowsPerPage);
    this.setState({
      ...this.state,
      currentPageNum: this.state.currentPageNum === totalPageNum - 1
        ? totalPageNum -1
        : this.state.currentPageNum + 1,
    });
  }

  /**
   * LastPage button click callback
   */
  onLastPageClick() {
    const totalPageNum = Math.ceil(this.props.data.length / this.props.rowsPerPage);
    this.setState({
      ...this.state,
      currentPageNum: totalPageNum - 1,
    });
  }

  /**
   * To set state rowIndexClick once selectRowIndex prop change
   * @param  {Object} nextProps
   */
  componentWillReceiveProps(nextProps) {
    if (nextProps.selectRowIndex !== this.props.selectRowIndex) {
      this.setState({
        ...this.state,
        rowIndexClick: nextProps.selectRowIndex,
      });
    }
  }

  /**
   * Render PaginationTable component
   * @return {Component} - PaginationTable component
   */
  render() {
    const {
      classes,
      columns,
      data,
      isPaginate,
      rowsPerPage,
      onRowClick,
    } = this.props;

    const {
      currentPageNum,
      rowIndexClick,
    } = this.state;

    const tableHeadElement = (
      <thead className={classes.thead}>
        <tr className={classes.row}>
          {
            columns.map((column) => (
              <th
                key={column.prop}
                className={classes.cell}
              >
                {column.label}
              </th>
            ))
          }
        </tr>
      </thead>
    );

    const tableBodyElement = (() => {
      let rowsData = data;
      let preRowsIndex = 0;
      if (isPaginate === true) {
        preRowsIndex = currentPageNum * rowsPerPage;
        const nextRowsIndex = currentPageNum * rowsPerPage + rowsPerPage;

        rowsData = data.slice(preRowsIndex, nextRowsIndex);
      }

      const bodyRootClassName = classNames(classes.tbody, {
        [classes.bodyRoot]: isPaginate === false,
      });

      return (
        <tbody className={bodyRootClassName}>
          {
            rowsData.map((row, index) => {
              // Row add cursor and selected style if row can click
              const rowClassName = classNames(classes.row, {
                [classes.shouldClick]: onRowClick !== void 0, // Add cursor
                [classes.rowClick]: onRowClick !== void 0 && rowIndexClick === preRowsIndex + index,
              });

              return (
                <tr
                  key={row.id === void 0 ? index : row.id} // RowsData should set unique id to improve performance
                  className={rowClassName}
                  onClick={this.onRowClick.bind(this, row, preRowsIndex + index)}
                >
                  {
                    columns.map((column) => (
                      <td
                        key={column.prop}
                        className={classes.cell}
                      >
                        {row[column.prop]}
                      </td>
                    ))
                  }
                </tr>
              );
            })
          }
        </tbody>
      );
    })();

    const tableFooterElement = (() => {
      if (isPaginate === false) {
        return null;
      }
      const totalPageNum = Math.ceil(data.length / rowsPerPage);

      const firstPageClassName = classNames({
        [classes.hideFooterIcon]: currentPageNum === 0,
      });
      const prePageClassName = classNames({
        [classes.hideFooterIcon]: currentPageNum === 0,
      });
      const nextPageClassName = classNames({
        [classes.hideFooterIcon]: currentPageNum === totalPageNum - 1,
      });
      const lastPageClassName = classNames({
        [classes.hideFooterIcon]: currentPageNum === totalPageNum - 1,
      });

      return (
        <div className={classes.footer}>
          <div className={classes.pageNum}>{currentPageNum + 1} / {totalPageNum}</div>
          <div className={classes.footerIcon}>
            <span
              className={firstPageClassName}
              onClick={this.onFirstPageClick.bind(this)}
            >首页</span>
            <span
              className={prePageClassName}
              onClick={this.onPrePageClick.bind(this)}
            >&lt;上一页</span>
            <span
              className={nextPageClassName}
              onClick={this.onNextPageClick.bind(this)}
            >下一页&gt;</span>
            <span
              className={lastPageClassName}
              onClick={this.onLastPageClick.bind(this)}
            >末页</span>
          </div>
        </div>
      );
    })();

    return (
      <div className={classes.root}>
        <table className={classes.table}>
          {tableHeadElement}
          {tableBodyElement}
        </table>
        {tableFooterElement}
      </div>
    );
  }
}
