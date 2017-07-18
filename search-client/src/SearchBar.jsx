import React, { Component } from 'react';
import moment from 'moment';
import DayPickerInput from 'react-day-picker/DayPickerInput';

class SearchBar extends Component {
  
  render() {
      
    return (
      <div className="searchbar">
        <form className="form-inline searchform">
          <div className="form-group">
            <DayPickerInput  
              className="form-control input-lg"         
              placeholder="Start Date"
              format="DD/MM//YYYY"
            />
          </div>&nbsp;&nbsp;&nbsp;
          <div className="form-group">
            <DayPickerInput  
              className="form-control input-lg"         
              placeholder="End Date"
              format="DD/MM/YYYY"
            />
          </div>
        </form>
      </div>
    );
  }
}

export default SearchBar;