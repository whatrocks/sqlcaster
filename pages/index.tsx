import Head from "next/head";
import React, { useState, useEffect, useCallback } from "react";

import Editor from "components/Editor";
import Schema from "components/Schema";
import QueryResults from "components/QueryResults";

import styles from "../styles/Home.module.css";

const CANNED_QUERIES = [
  "select * from casts \n where username = 'whatrocks' and reactions is not null \n order by reactions desc \n limit 3;",
  "SELECT avatar_url, count(*) as deleted_casts from casts \nwhere deleted is not null \n group by 1 \n order by deleted_casts desc \n limit 100;",
  "SELECT \n DATE_TRUNC('month',to_timestamp(published_at*1000000)) AS month, \n COUNT(*) AS count \n FROM casts \n group by DATE_TRUNC('month',to_timestamp(published_at*1000000)) \n ORDER BY 2 DESC",
];

export default function Home({}) {
  const [showSchema, setShowSchema] = useState(false);
  const handleSchemaClick = () => setShowSchema(!showSchema);

  const [sqlQuery, setSqlQuery] = useState("");
  const handleQueryChange = useCallback((newSqlQuery: string) => {
    setSqlQuery(newSqlQuery);
  }, []);

  const [replaceQuery, setReplaceQuery] = useState("");
  const handleReplaceQueryChange = useCallback(() => {
    setReplaceQuery("");
  }, []);

  const [showQueryResults, setShowQueryResults] = useState(false);
  const handleQueryClick = () => {
    const newParams = new URLSearchParams();
    newParams.set("sql", sqlQuery);
    window.history.replaceState({}, "", `${location.pathname}?${newParams}`);
    setShowQueryResults(!showQueryResults);
  };

  const handleFeelingLazyClick = () => {
    const randomIdx = Math.floor(Math.random() * CANNED_QUERIES.length);
    setReplaceQuery(CANNED_QUERIES[randomIdx]);
  };
  useEffect(() => {
    const params = new Proxy(new URLSearchParams(window.location.search), {
      get: (searchParams, prop: string) => searchParams.get(prop),
    });
    if (params.sql) {
      setReplaceQuery(params.sql);
      setShowQueryResults(true);
    }
  }, []);

  return (
    <div>
      <Head>
        <title>SQLcaster</title>
        <meta
          name="description"
          content="Explore Farcaster data with SQL using ROAPI"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <h1 className={styles.title}>SQLcaster</h1>
        <h3>Search Farcaster with SQL</h3>
        <div>
          <button onClick={handleSchemaClick}>
            {showSchema ? "Hide Schema" : "Show Schema"}
          </button>
          <div>{showSchema && <Schema />}</div>
          <div>
            <Editor
              initialQuery={sqlQuery}
              onChange={handleQueryChange}
              replaceQuery={replaceQuery}
              onReplace={handleReplaceQueryChange}
            />
            <div>
              <button onClick={handleQueryClick}>
                {showQueryResults ? "Clear results" : "Submit query"}
              </button>
              <button onClick={handleFeelingLazyClick}>
                I&apos;m Feeling Lazy
              </button>
              <s>Download CSV</s>
              <s>Query History</s>
            </div>
          </div>
          <div>
            {sqlQuery && showQueryResults && <QueryResults query={sqlQuery} />}
          </div>
          <div id="history"></div>
        </div>
      </main>
      <footer>
        <h4>About SQLcaster</h4>
        <p>
          SQLcaster&apos;s frontend is a static, client-side fetching page and
          its backend is an autogenerated REST API accepting SQL queries via
          <a
            href="https://roapi.github.io/docs"
            target="_blank"
            rel="noreferrer"
          >
            ROAPI
          </a>
          hosted on
          <a
            href="https://replit.com/@whatrocks/sqlcaster"
            target="_blank"
            rel="noreferrer"
          >
            Replit
          </a>
          . This site is intended to be fun, experimental way to explore
          messages (casts) on the
          <a href="https://farcaster.xyz" target="_blank" rel="noreferrer">
            Farcaster
          </a>
          protocol. Contributions and ideas would be wonderful - here is the
          open source
          <a
            href="https://github.com/whatrocks/sqlcaster"
            target="_blank"
            rel="noreferrer"
          >
            repo
          </a>
          . SQLcaster was created by
          <a
            href="https://twitter.com/whatrocks"
            target="_blank"
            rel="noreferrer"
          >
            @whatrocks
          </a>
          .
        </p>
      </footer>
    </div>
  );
}
