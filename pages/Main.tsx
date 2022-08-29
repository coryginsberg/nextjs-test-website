import React, { Component, useEffect, useState } from "react";
import { PostInfo } from "./HackerNewsApi";
import * as HackerNewsApi from "./HackerNewsApi";

type Props = {}


export default function Main({}: Props) {
  const [topResults, setTopResults] = useState<PostInfo[]>([]);
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    (async () => {
      const temp = await HackerNewsApi.genTopStories(10);
      setTopResults(temp);
      setLoading(false);
    })();
  }, []);

  if (isLoading) return <p>Loading...</p>;
  if (!topResults) return <p>No data</p>;

  const subhead = (result: PostInfo) => {
    const time = calculateHowLongAgo(result.time);
    return (
      <h4>
        {result.score} points by {result.by} {time} ago | {result.descendants}{" "}
        comments
      </h4>
    );
  };

  const calculateHowLongAgo = (time: number) => {
    const date = new Date(time * 1000);
    const currentTime = new Date();
    console.warn(date);
    if (currentTime.getDay() - date.getDay() > 0) {
      return Math.floor(currentTime.getDay() - date.getDay()) + " days";
    } else if (currentTime.getHours() - date.getHours() > 0) {
      return Math.floor(currentTime.getHours() - date.getHours()) + " hours";
    } else if (currentTime.getMinutes() - date.getMinutes() > 0) {
      return (
        Math.floor(currentTime.getMinutes() - date.getMinutes()) + " minutes"
      );
    } else {
      return (
        Math.floor(currentTime.getSeconds() - date.getSeconds()) + " seconds"
      );
    }
  };

  return (
    <div className="root">
      {topResults.map((result, key) => (
        <div key={result.id}>
          <h2 className="title">
            {key + 1}. {result.title}
          </h2>
          {subhead(result)}
        </div>
      ))}
    </div>
  );
}
