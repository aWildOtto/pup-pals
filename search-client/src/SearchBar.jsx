import React, { Component } from 'react';

class SearchBar extends Component {
  render() {
    return (
      <div className="searchbar">
        <form className="searchform">
          <div className="container">
            <div className="row">
              <div className="col-sm-4 col-xs-12">
                <div className="form-group">
                  <div className="input-group">
                    <div className="input-group-addon">Location</div>
                    <input type="text" className="form-control" id="findItem" placeholder="What are you looking for?" />
                    <div className="input-group-addon addon-right"></div>
                  </div>
                </div>
              </div>
              <div className="col-sm-4 col-xs-12">
                <div className="form-group">
                  <div className="input-group">
                    <div className="input-group-addon">Something</div>
                    <input type="text" className="form-control" id="nearLocation" placeholder="Location" />
                    <div className="input-group-addon addon-right"><i className="icon-listy icon-target" aria-hidden="true"></i></div>
                  </div>
                </div>
              </div>
              <div className="col-sm-4 col-xs-12">
                <div className="form-group">
                  <div className="input-group">
                    <div className="input-group-addon">Something else</div>
                    <input type="text" className="form-control" id="nearLocation" placeholder="Location" />
                    <div className="input-group-addon addon-right"><i className="icon-listy icon-target" aria-hidden="true"></i></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    );
  }
}

export default SearchBar;