import React, { useState, useEffect } from "react";

import styles from "../styles/Schema.module.css";

const BASE_URL = "https://sqlcaster.whatrocks.repl.co/api/";

export default function Schema() {
  const [data, setData] = useState(null);
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    fetch(`${BASE_URL}schema`)
      .then((res) => res.json())
      .then((data) => {
        setData(data);
        setLoading(false);
      });
  }, []);

  if (isLoading) return <p>Loading...</p>;
  if (!data) return <p>No schema available</p>;

  return (
    <div className={styles.schema}>
      {data.casts.fields.map((d) => {
        return (
          <div key={d.name}>
            {d.name}: {d.data_type}
          </div>
        );
      })}
    </div>
  );
}
