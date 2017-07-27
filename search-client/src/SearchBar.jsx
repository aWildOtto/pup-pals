import React, { Component } from 'react';
import moment from 'moment';
import DayPickerInput from 'react-day-picker/DayPickerInput';

class SearchBar extends Component {

  handleStartDayChange = (selectedDay, modifiers) => {
    let startDate;
    if(selectedDay){
      startDate = selectedDay.format("DD/MM/YYYY");
    }else{
      startDate = "";
    }
    console.log(startDate);
    this.props.handleStartDayChange(startDate);
  }
  handleEndDayChange = (selectedDay, modifiers) => {
    let endDate;
    if(selectedDay){
      endDate = selectedDay.format("DD/MM/YYYY");
    }else{
      endDate = "";
    }
    console.log(endDate);
    this.props.handleEndDayChange(endDate);
  }


  render() {
    return (
      <div className="searchbar">
        <form className="form-inline searchform">
          <div className="form-group">
            <DayPickerInput  
              className="form-control input-lg"         
              placeholder="Start Date"
              format="DD/MM/YYYY"
              value={this.props.startDate}
              onDayChange={this.handleStartDayChange} 
            />
          </div>&nbsp;&nbsp;&nbsp;
          <div className="form-group">
            <DayPickerInput         
              className="form-control input-lg"         
              placeholder="End Date"
              format="DD/MM/YYYY"
              value={this.props.endDate}                       
              onDayChange={this.handleEndDayChange} 
            />
          </div>
        </form>
      </div>
    );
  }
}

export default SearchBar;