const React              = require('react');
const ExcelColumn        = require('../../../PropTypeShapes/ExcelColumn');

const FilterableHeaderCell = React.createClass({

  propTypes: {
    onChange: React.PropTypes.func.isRequired,
    column: React.PropTypes.shape(ExcelColumn)
  },

  getInitialState(): {filterTerm: string} {
    return {filterTerm: ''};
  },

  handleChange(e: Event) {
    let val = e.target.value;
    this.setState({filterTerm: val });
    this.props.onChange({filterTerm: val, column: this.props.column});
  },

  handleMouseEvent(mouseEnter) {
    if(this.state.isDragging) return;
    this.setState({mouseEnter: mouseEnter});
  },

  handleDraggingEvent(isDragging) {
    if(this.state.isDragging && isDragging) return;
    this.setState({isDragging: isDragging});
  },

  renderExpand() {
    if(this.state.mouseEnter && !this.state.isDragging) {
      return (<img src={'/images/table-expand.svg'} className="tableExpandShow" />);
    }
  },

  renderInput: function(): ?ReactElement {
    if (this.props.column.filterable === false) {
      return <span/>;
    }

    const renderStyle = {};
    let tmpClassName = 'form-control input-sm';

    if(this.state.mouseEnter && !this.state.isDragging) {
      renderStyle["width"] = "calc(100% - 10px)";
      renderStyle["display"] = "inline-block";
    }

    let inputKey = 'header-filter-' + this.props.column.key;

    return (<input style={renderStyle} key={inputKey} type="text" className={tmpClassName} placeholder="Search" value={this.state.filterTerm} onChange={this.handleChange}/>);
  },

  render: function(): ?ReactElement {
    return (
      <div>
        <div className="form-group">
          {this.renderInput()}
          {this.renderExpand()}
        </div>
      </div>
    );
  }
});

module.exports = FilterableHeaderCell;
