import React, { Component } from 'react';
import moment from 'moment';

import DayPickerInput from 'react-day-picker/DayPickerInput';

class SearchBar extends Component {
  state = {
    startDay: undefined,
    endDay : undefined
  };

  handleDayChangeStart = () => {
    this.setState({ startDay });
  };

  handleDayChangeEnd = () => {
    this.setState({ endDay });
  };

  render() {

    const value = this.state.selectedDay
      ? this.state.selectedDay.format('DD/MM/YYYY')
      : '';
      
    return (
      <div className="searchbar">
        <form className="form-inline searchform">
          <div className="form-group">
            <input type="text" className="form-control input-lg" id="location" placeholder="Location" />
          </div>
          <div className="form-group">
            <DayPickerInput  
              className="form-control input-lg"         
              name="birthday"
              placeholder="Start Date"
              format="DD/MM/YYYY"
              value={value}
              onDayChange={this.handleDayChangeStart}
            />
          </div>
          <div className="form-group">
            <DayPickerInput  
              className="form-control input-lg"         
              name="birthday"
              placeholder="End Date"
              format="DD/MM/YYYY"
              value={value}
              onDayChange={this.handleDayChangeEnd}
            />
          </div>
        </form>
      </div>
    );
  }
}

export default SearchBar;