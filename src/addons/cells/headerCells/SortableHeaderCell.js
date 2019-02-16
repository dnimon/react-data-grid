const React              = require('react');
const joinClasses         = require('classnames');
const DEFINE_SORT = {
  ASC: 'ASC',
  DESC: 'DESC',
  NONE: 'NONE'
};

const SortableHeaderCell = React.createClass({
  propTypes: {
    columnKey: React.PropTypes.string.isRequired,
    column: React.PropTypes.shape({ name: React.PropTypes.node }),
    onSort: React.PropTypes.func.isRequired,
    sortDirection: React.PropTypes.oneOf(Object.keys(DEFINE_SORT))
  },

  onClick: function() {
    let direction;
    switch (this.props.sortDirection) {
    default:
    case null:
    case undefined:
    case DEFINE_SORT.NONE:
      direction = DEFINE_SORT.ASC;
      break;
    case DEFINE_SORT.ASC:
      direction = DEFINE_SORT.DESC;
      break;
    case DEFINE_SORT.DESC:
      direction = DEFINE_SORT.NONE;
      break;
    }
    this.props.onSort(
      this.props.columnKey,
      direction);
  },

  getSortByText: function() {
    let unicodeKeys = {
      ASC: '9650',
      DESC: '9660'
    };

    if(this.state && this.state.mouseEnter && this.props.sortDirection === 'NONE') {
      return String.fromCharCode(unicodeKeys['DESC']);
    }

    return this.props.sortDirection === 'NONE' ? '' : String.fromCharCode(unicodeKeys[this.props.sortDirection]);
  },

  onMouseEnter: function() {
    this.setState({mouseEnter: true});
  },

  onMouseLeave: function() {
    this.setState({mouseEnter: false});
  },

  render: function(): ?ReactElement {
    let className = joinClasses({
      'react-grid-HeaderCell-sortable': true,
      'react-grid-HeaderCell-sortable--ascending': this.props.sortDirection === 'ASC',
      'react-grid-HeaderCell-sortable--descending': this.props.sortDirection === 'DESC'
    });

    if(this.state && this.state.mouseEnter && this.props.sortDirection === 'NONE') {
      className = joinClasses({
        'react-grid-HeaderCell-sortable': true,
        'react-grid-HeaderCell-sortable--descending': true
      })
    }

    return (
      <div className={className}
        onClick={this.onClick}
        onMouseEnter={this.onMouseEnter}
        onMouseLeave={this.onMouseLeave}
        style={{cursor: 'pointer'}}>
        {this.props.column.name}
        <span className="pull-right">{this.getSortByText()}</span>
      </div>
    );
  }
});

module.exports = SortableHeaderCell;
module.exports.DEFINE_SORT = DEFINE_SORT;
