import React, { useState, useEffect } from "react";

import styles from "../styles/QueryResults.module.css";

const BASE_URL = "https://sqlcaster.whatrocks.repl.co/api/sql";

export default function QueryResults(props) {
  const [data, setData] = useState(null);
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    fetch(`${BASE_URL}`, {
      method: "POST",
      headers: {
        "Content-Type": "text/plain;charset=UTF-8",
      },
      body: props.query,
    })
      .then((res) => res.json())
      .then((data) => {
        setData(data);
        setLoading(false);
      });
  }, []);

  if (isLoading) return <p>Loading...</p>;
  if (!data) return <p>that didn't work</p>;

  return (
    <div className={styles.avatar}>
      {data.map((d, i) => {
        return <div key={i}>{d.username}</div>;
      })}
    </div>
  );
}
