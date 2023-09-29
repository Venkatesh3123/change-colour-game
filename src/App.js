import React, { useState, useEffect } from "react";

import "./App.css";

function App() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [difficulty, setDifficulty] = useState("Easy");
  const [gameStarted, setGameStarted] = useState(false);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(40);
  const [boxColor, setBoxColor] = useState("red");
  const [gameComplete, setGameComplete] = useState(false);
  const [error, setErrors] = useState({});
  const [timeLeft1, setTimeLeft1] = useState("");
  let pattern1 = /[0-9]/;
  let pattern2 = /[A-za-z]/;
  let emailex = ".+@gmail.com";
  let nme = false;
  let emal = false;
  let mble = false;
  const startGame = (e) => {
    e.preventDefault();
    const nameHandle = () => {
      if (name === "") {
        return "please enter your name";
      } else if (name.match(pattern1)) {
        return "please enter the name in alphabtes only";
      } else if (name.length <= 3) {
        return "please enter your name properly";
      }
      return (nme = true);
    };
    var error1 = nameHandle();
    setErrors((prevError) => ({
      ...prevError,
      name: error1,
    }));
    const emailHandle = () => {
      if (email === "") {
        return "please enter your email";
      } else if (!email.match(emailex)) {
        return "please enter the name in email format only";
      }
      return (emal = true);
    };
    var error2 = emailHandle();
    setErrors((prevError) => ({
      ...prevError,
      email: error2,
    }));
    const phoneHandle = () => {
      if (mobile === "") {
        return "please enter your number";
      } else if (mobile.match(pattern2)) {
        return "please enter the numbers only";
      } else if (mobile.length !== 10) {
        return "please enter 10 digits of your mobile number";
      }
      return (mble = true);
    };
    var error3 = phoneHandle();
    setErrors((prevError) => ({
      ...prevError,
      mobile: error3,
    }));

    if (nme & emal & mble) {
      setGameStarted(true);
      setEmail("");
      setName("");
      setMobile("");
    } else {
      // alert("please enter valid form");
    }
  };

  useEffect(() => {
    if (gameStarted) {
      const timer = setInterval(() => {
        if (timeLeft > 0) {
          if (boxColor === "red") {
            setBoxColor("green");
          } else {
            setBoxColor("red");
          }

          if (timeLeft >= 0) {
            setTimeLeft(timeLeft - 1);
          }
        }
      }, 1000);

      return () => clearInterval(timer);
    } // Cleanup the timer when component unmounts
  }, [boxColor, timeLeft, gameStarted]);

  const handleClick = () => {
    if (boxColor === "green") {
      setScore(score + 1);
      if ((difficulty === "Easy") & (score === 9)) {
        setGameComplete(true);
        setTimeLeft1(timeLeft);
        setTimeLeft(40);
        console.log(score);
      } else if ((difficulty === "Medium") & (score === 14)) {
        setGameComplete(true);
        setTimeLeft1(timeLeft);
        setTimeLeft(40);
      } else if ((difficulty === "Hard") & (score === 24)) {
        // setGameStarted(true);
        setTimeLeft1(timeLeft);
        setTimeLeft(40);
        setGameComplete(true);
      } else if (timeLeft === 0) {
        setGameComplete(true);
        setTimeLeft(40);
      }
      console.log(difficulty);
    } else {
      setGameComplete(true);
      setTimeLeft(40);
      setScore(0);
      setBoxColor(null);
    }
  };
  const tryAgain = () => {
    setGameComplete(false);
    setTimeLeft(40);
  };
  const first = () => {
    setGameComplete(false);
    setGameStarted(false);
    setScore(0);
    setTimeLeft(40);
  };
  return (
    <div className="App">
      <div className="App2">
        {gameComplete ? <h1>Result</h1> : <h1>Colour pickup game</h1>}
        {!gameStarted ? (
          <div>
            <form>
              <label>Name:</label>
              <br></br>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="input1"
              />
              <p>{error.name}</p>
              <label>Email:</label>
              <br></br>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="input2"
              />
              <p>{error.email}</p>
              <label>Mobile Number:</label>
              <br></br>
              <input
                type="tel"
                value={mobile}
                onChange={(e) => setMobile(e.target.value)}
                className="input3"
              />
              <p>{error.mobile}</p>
              <label>Difficulty Level:</label>
              <br></br>
              <select
                value={difficulty}
                onChange={(e) => setDifficulty(e.target.value)}
                className="input4"
              >
                <option value="Easy">Easy</option>
                <option value="Medium">Medium</option>
                <option value="Hard">Hard</option>
              </select>
              <br></br>
              <button onClick={startGame} className="start">
                Start Game
              </button>
              {error.name || error.email || error.mobile ? (
                <p>Please enter form properly</p>
              ) : (
                ""
              )}
            </form>
          </div>
        ) : (
          <>
            {gameComplete ? (
              <div className={`box`} style={{ backgroundColor: "blue" }}>
                {(score === 10) &
                (difficulty === "Easy") &
                (boxColor === "green") ? (
                  <>
                    {" "}
                    <h3>Your score{score}</h3>
                    <h3>Time taken {timeLeft1}</h3>
                    <h3>You are the winner in Easy level</h3>
                    <button onClick={first} className="register">
                      back to register
                    </button>
                  </>
                ) : (
                  <>
                    {score < 10 ? (
                      <>
                        <h3>You lost the game</h3>
                        <button onClick={tryAgain} className="tryagain1">
                          tryagain
                        </button>
                      </>
                    ) : (
                      ""
                    )}
                  </>
                )}
                {(score === 15) &
                (difficulty === "Medium") &
                (boxColor === "green") ? (
                  <>
                    {" "}
                    <h3>Your score {score}</h3>
                    <h3>Time taken {timeLeft1}</h3>
                    <h3>You are the winner in Medium level</h3>
                  </>
                ) : (
                  <>
                    {(score > 10) & (score < 14) ? (
                      <>
                        <h3>You lost the game</h3>
                        <button onClick={tryAgain} className="tryagain1">
                          tryagain
                        </button>
                      </>
                    ) : (
                      ""
                    )}
                  </>
                )}
                {(score === 25) &
                (difficulty === "Hard") &
                (boxColor === "green") ? (
                  <>
                    {" "}
                    <h3>Your score {score}</h3>
                    <h3>Time taken {timeLeft1}</h3>
                    <h3>You are the winner in hard level</h3>
                  </>
                ) : (
                  <>
                    {(score > 15) & (score < 25) ? (
                      <>
                        <h3>You lost the game</h3>
                        <button onClick={tryAgain} className="tryagain1">
                          tryagain
                        </button>
                      </>
                    ) : (
                      ""
                    )}
                  </>
                )}
              </div>
            ) : (
              <div>
                <div>Score: {score}</div>
                <div>Time Left: {timeLeft} seconds</div>
                <div
                  className={`box`}
                  style={{ backgroundColor: `${boxColor}` }}
                  onClick={handleClick}
                ></div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}

export default App;
