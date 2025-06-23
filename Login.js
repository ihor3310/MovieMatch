import React, { useState, useEffect } from 'react';

function Login() {

  const emojis = ["🎬", "🎥", "🍿", "💡", "🎞️", "✨", "🧠", "📽️"];
  const [idea, setIdea] = useState('')


  useEffect(() => {
    setIdea(emojis[Math.floor(Math.random() * emojis.length)]);
    const interval = setInterval(() => {
      const randomEmoji = emojis[Math.floor(Math.random() * emojis.length)];
      setIdea(randomEmoji);
    }, 800);

    return () => clearInterval(interval);
  }, []);

  const submitUs = (e) =>{
    e.preventDefault();
    window.location.href = "/app";
  }


  return (
    <div className="container mt-5">
      <h1 className="text-center mb-4 head-font">Log in to</h1>
      <h2 className="text-center">AI-movies secret club {idea}</h2>
      
      <form className="mt-4" onSubmit={submitUs}>
        <div className="row mb-3 search-form">
          <div className="col-md-4">
            <input
              type="text"
              className="form-control"
              placeholder="username"
            />
          </div>
          <div className="col-md-4">
            <input
              type="text"
              className="form-control"
              placeholder="password"
            />
          </div>
        </div>
        <div className="text-center">
          <button type="submit" className="btn btn-primary">Login</button>
        </div>
      </form>
    </div>
  );
}

export default Login;
