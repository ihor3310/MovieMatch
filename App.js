// src/App.js
import React, { useState } from 'react';
import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: "AIzaSyDMfja8IRBhmj5XirkJvF_J_ar_qzYiOTM" });

function App() {
  const [aiResp, setAIRes] = useState('');
  const [loading, setLoading] = useState(false);


  const [input] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setAIRes('');

    const response = await ai.models.generateContent({
      model: "gemini-1.5-flash",
      contents: input,
    });
    console.log(response);
    setAIRes(response.text || JSON.stringify(response));

    setLoading(false);
  };


  return (
    <div className="container mt-5">
      <h1 className="text-center mb-4 head-font">AI-movies secret club</h1>
      <p className="text-center head-font2">Explore films — with AI-generated offers</p>
      <p className="text-center head-font3">Suggestions are created based on your preferences and desires at the moment</p>

      <form className="mt-4" onSubmit={handleSubmit}>
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
          <button type="submit" className="btn btn-primary" disabled={loading}>
            {loading ? 'Loading...' : 'Search'}
          </button>
        </div>
      </form>

      {aiResp && (
        <div className="mt-4 p-3 border rounded bg-light">
          <p>AI Response:</p>
          <h4>{aiResp}</h4>
        </div>
      )}
    </div>
  );
}

export default App;
