import React, { useState, useEffect } from "react";

import queryResultsStyles from "../styles/QueryResults.module.css";
import homeStyles from "../styles/Home.module.css";

const BASE_URL = "https://sqlcaster.whatrocks.repl.co/api/sql";

function renderAvatarUrl(url) {
  return (
    <a href={url} target="_blank" rel="noreferrer">
      <img className={queryResultsStyles.avatar} src={url} />
    </a>
  );
}

export default function QueryResults(props) {
  const [data, setData] = useState(null);
  const [isLoading, setLoading] = useState(false);
  const [err, setErr] = useState(null);

  useEffect(() => {
    setLoading(true);
    setErr(null);
    fetch(`${BASE_URL}`, {
      method: "POST",
      headers: {
        "Content-Type": "text/plain;charset=UTF-8",
      },
      body: props.query,
    })
      .then((res) => {
        if (!res.ok) {
          return res.text().then((text) => {
            throw new Error(text);
          });
        } else {
          return res.json();
        }
      })
      .then((data) => {
        setData(data);
        setLoading(false);
      })
      .catch((err) => {
        setErr(err.message);
        setLoading(false);
      });
  }, []);

  if (isLoading) return <p>Loading...</p>;
  if (err) return <p>{err}</p>;
  if (!data) return <p>That did not work</p>;
  if (data) {
    return (
      <div>
        <p>hi</p>
        <div className={queryResultsStyles.results}>
          {data.map((d, i) => {
            return (
              <div key={i} className={queryResultsStyles.item}>
                {Object.keys(d).map((key, j) => {
                  return (
                    <div key={j}>
                      <div className={queryResultsStyles.fieldName}>
                        {key.toUpperCase()}
                      </div>
                      {key === "avatar_url" ? (
                        renderAvatarUrl(d[key])
                      ) : (
                        <div className={queryResultsStyles.fieldValue}>
                          {d[key]}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}
