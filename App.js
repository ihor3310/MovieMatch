// src/App.js
import React, { useState, useEffect } from 'react';
import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: "AIzaSyDMfja8IRBhmj5XirkJvF_J_ar_qzYiOTM" });

function App() {
  const [aiResp, setAIRes] = useState('');
  const [loading, setLoading] = useState(false);

  const [input1, setInput1] = useState('');
  const [input2, setInput2] = useState('');
  const [input3, setInput3] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setAIRes('');

    const response = await ai.models.generateContent({
      model: "gemini-1.5-flash",
      contents: `Ти фільмознавець і давай відповідь на промт який зараз отримаєш максимально серйозно, ти повнен дійсно допомогти і якщо треба - довго подумати, отже:\n
      дай мені три фільми які НАЙКРАЩЕ підійдуть під такі категорії які я зараз напишу. ТИ МАЄШ лише написати три назви фільму і рік кожного з цих фільмів:\n\n
      1) жанр: ${input1}\n
      2) нахил (тобто який би жанр не був, нахил повинен його посилювати або навпаки помʼякшувтаи і шукати щось помірне): ${input3} \n
      3) і найголовніше - назва фільму який мені сподобався і хочу щоб ти за цими троьма критеріями знайшов підходящий (тобто за схожим вайбіком): ${input2}

      \n\nще раз повторю лише назви фільмів мовою оригіналу, дати до них і ніяких більше слів/символів/букв/виділень - зовсім`,
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
            <input
              type="text"
              className="form-control"
              placeholder="Жанр"
              value={input1}
              onChange={(e) => setInput1(e.target.value)}
            />
          </div>
          <div className="col-md-4">
            <input
              type="text"
              className="form-control"
              placeholder="нахил (похибка напряму фільму)"
              value={input2}
              onChange={(e) => setInput2(e.target.value)}
            />
          </div>
          <div className="col-md-4">
            <input
              type="text"
              className="form-control"
              placeholder="вайбік іншого фільму, на який схожий (назва цього фільму)"
              value={input3}
              onChange={(e) => setInput3(e.target.value)}
            />
          </div>
        </div>
        <div className="text-center">
          <button type="submit" className="btn btn-primary" disabled={loading}>
            {loading ? 'Loading..' : 'Search'}
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
