import React, { Component, useEffect, useState } from "react";
// import { PostInfo } from "./HackerNewsApi";
// import * as HackerNewsApi from './HackerNewsApi';

const BASE_URL = "https://hacker-news.firebaseio.com/v0";

export default function Main() {
  // const [topResultIds, setTopResultIds] = useState<Array<number>>([]);
  const [topResults, setTopResults] = useState(null);
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);

    fetch(new URL(`${BASE_URL}/topstories.json`))
      .then((response) => response.json())
      .then((data) => 
        fetch(`${BASE_URL}/item/${data[1]}.json`)
      )
      .then((res) => res.json())
      .then((res) => {
        setTopResults(res);
        setLoading(false);
      })
      .catch((err) => console.error("Request failed", err));
  }, []);

  if (isLoading) return <p>Loading...</p>;
  if (!topResults) return <p>No data</p>;

  return (
    <>
      <div>{topResults.title}</div>
      <style jsx>
        {`
          a {
            color: inherit;
            text-decoration: none;
          }

          .title a {
            color: #0070f3;
            text-decoration: none;
          }

          .title a:hover,
          .title a:focus,
          .title a:active {
            text-decoration: underline;
          }

          .title {
            margin: 0;
            line-height: 1.15;
            font-size: 4rem;
          }

          .title {
            text-align: center;
          }
        `}
      </style>
    </>
  );
}
