// src/App.js
import React from 'react';

function App() {
  return (
    <div className="container mt-5">
      <h1 className="text-center mb-4 head-font">AI-movies secret club</h1>
      <p className="text-center head-font2">Explore films — with AI-generated offers</p>
      <p className="text-center head-font3">Suggestions are created based on your preferences and desires at the moment</p>

      <form className="mt-4">
        <div className="row mb-3 search-form">
          <div className="col-md-4">
            <input type="text" className="form-control" placeholder="xxx" />
          </div>
          <div className="col-md-4">
            <input type="text" className="form-control" placeholder="xxx" />
          </div>
          <div className="col-md-4">
            <input type="text" className="form-control" placeholder="xxx" />
          </div>
        </div>
        <div className="text-center">
          <button type="submit" className="btn btn-primary">Search</button>
        </div>
      </form>
    </div>
  );
}

export default App;
