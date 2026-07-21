import { useState, useEffect } from "react";
import "./App.css";
import regroupIcon from "./assets/regroup.svg";
import linkIcon from "./assets/link.svg";

export default function App() {
  const [quote, setQuote] = useState("");
  const [author, setAuthor] = useState("");
  const [tags, setTags] = useState([]);

  function fetchQuote() {
    fetch(
      "https://raw.githubusercontent.com/devchallenges-io/curriculum/refs/heads/main/3-javascript/challenges/group_1/data/random-quotes.json",
    )
      .then((response) => response.json())
      .then((data) => {
        const randomIndex = Math.floor(Math.random() * data.length);

        const randomQuote = data[randomIndex];

        setQuote(randomQuote.quote);
        setAuthor(randomQuote.author);
        setTags(randomQuote.tags);
      })

      .catch((error) => {
        console.error(error);
      });
  }
  useEffect(() => {
    fetchQuote();
  }, []);
  function handleRandom() {
    fetchQuote();
  }

  function handleShare() {
    navigator.share({
      title: "Check out this quote!",
      text: `"${quote}" - ${author}`,
    });
  }

  return (
    <div className="App">
      <Container author={author} quote={quote} tags={tags} />
      <div className="buttons">
        <Random onRandom={handleRandom} />
        <Share onShare={handleShare} />
      </div>
    </div>
  );
}

function Container({ author, quote, tags }) {
  return (
    <div className="container">
      <Author author={author} />
      <Tag tags={tags} />
      <Quote quote={quote} />
    </div>
  );
}

function Author({ author }) {
  return <h1>{author}</h1>;
}

function Tag({ tags = [] }) {
  return (
    <div className="tags">
      {tags.map((tag) => (
        <span key={tag}>{tag}</span>
      ))}
    </div>
  );
}

function Quote({ quote }) {
  return <p>"{quote}"</p>;
}

function Random({ onRandom }) {
  return (
    <button onClick={onRandom}>
      Random
      <img src={regroupIcon} alt="random" />
    </button>
  );
}

function Share({ onShare }) {
  return (
    <button onClick={onShare}>
      Share
      <img src={linkIcon} alt="share" />
    </button>
  );
}
