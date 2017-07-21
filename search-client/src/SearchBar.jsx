import React, { Component } from 'react';
import moment from 'moment';
import DayPickerInput from 'react-day-picker/DayPickerInput';

class SearchBar extends Component {

  handleDayChange = (e) => {
    const startDate = this.refs.startDate.state.value;
    const endDate = this.refs.endDate.state.value;
    this.props.handleDayChange(startDate, endDate);
  }


  render() {
    return (
      <div className="searchbar">
        <form className="form-inline searchform">
          <div className="form-group">
            <DayPickerInput  
              ref="startDate"
              className="form-control input-lg"         
              placeholder="Start Date"
              format="DD/MM/YYYY"
              value={this.props.dates.startDate}
            />
          </div>&nbsp;&nbsp;&nbsp;
          <div className="form-group">
            <DayPickerInput  
              ref="endDate"            
              className="form-control input-lg"         
              placeholder="End Date"
              format="DD/MM/YYYY"
              value={this.props.dates.endDate}                       
              onDayChange={this.handleDayChange} 
            />
          </div>
        </form>
      </div>
    );
  }
}

export default SearchBar;