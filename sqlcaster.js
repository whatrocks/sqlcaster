// SQLcaster
let CURRENT_RESULTS = [];
document.addEventListener("DOMContentLoaded", function () {
  const BASE_URL = "https://sqlcaster.whatrocks.repl.co/api/";

  function printBooks(books) {
    const booklist = document.getElementById("booklist");
    booklist.innerHTML = "";
    if (Array.isArray(books)) {
      for (let book of books) {
        prettyPrintBook(book);
      }
    } else {
      for (let field of books.casts.fields) {
        printSchema(field);
      }
    }
  }

  function printSchema(field) {
    const booklist = document.getElementById("booklist");
    const bookElement = document.createElement("div");
    bookElement.classList = ["card"];
    const p = document.createElement("p");
    p.innerText = `${field.name}: ${field.data_type}`;
    bookElement.appendChild(p);
    booklist.appendChild(bookElement);
  }

  function prettyPrintBook(book) {
    const booklist = document.getElementById("booklist");
    const bookElement = document.createElement("div");
    bookElement.classList = ["card"];
    Object.keys(book).forEach((key) => {
      switch (key) {
        case "avatar_url":
          const cover = document.createElement("img");
          cover.classList = ["avatar"];
          cover.alt = `${book.username}`;
          cover.src = `${book.avatar_url}`;
          bookElement.appendChild(cover);
          break;
        case "searchcaster_url":
          const href = book.searchcaster_url;
          if (!href) break;
          const a = document.createElement("a");
          a.href = href;
          a.innerText = "View on Searchcaster";
          a.target = "_blank";
          bookElement.appendChild(a);
          break;
        default:
          const p = document.createElement("p");
          if (key.startsWith("COUNT")) {
            p.innerText = `Count: ${book[key]}`;
          } else {
            p.innerText = `${key}: ${book[key]}`;
          }
          bookElement.appendChild(p);
      }
    });
    booklist.appendChild(bookElement);
  }

  function fetchBooks(query, cb, query_type = "sql") {
    const xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function () {
      if (xmlhttp.readyState === XMLHttpRequest.DONE) {
        const status = xmlhttp.status;
        if (status === 0 || (status >= 200 && status < 400)) {
          const results = JSON.parse(xmlhttp.responseText);
          CURRENT_RESULTS = results;
          cb(results);
        } else {
          const booklist = document.getElementById("booklist");
          booklist.innerHTML = "That didn't work";
        }
      }
    };
    const http_verb = query_type === "sql" ? "POST" : "GET";
    xmlhttp.open(http_verb, `${BASE_URL}${query_type}`, true);
    xmlhttp.send(query);
  }
  const library = document.getElementById("the-library");
  const QUERIES = [
    "select * from casts where username = 'whatrocks' and reactions is not null order by reactions desc limit 3;",
    "SELECT username, count(*) from casts where deleted is not null group by 1 order by 2 desc limit 10;",
    "SELECT DATE_TRUNC('month',to_timestamp(published_at*1000000)) AS month, COUNT(*) AS count FROM casts group by DATE_TRUNC('month',to_timestamp(published_at*1000000)) ORDER BY 2 DESC",
  ];
  if (library) {
    // get existing query
    const params = new Proxy(new URLSearchParams(window.location.search), {
      get: (searchParams, prop) => searchParams.get(prop),
    });
    if (params.sql) {
      const queryInput = document.getElementById("library-input");
      queryInput.innerText = params.sql;
      fetchBooks(params.sql, printBooks);
    }

    // to set new query
    const newParams = new URLSearchParams();

    const libraryButton = document.getElementById("library-button");
    libraryButton.addEventListener("click", (e) => {
      e.preventDefault();
      const queryInput = document.getElementById("library-input");
      const query = queryInput.innerText.trim();
      newParams.set("sql", query);
      window.history.replaceState({}, "", `${location.pathname}?${newParams}`);
      fetchBooks(query, printBooks);
    });
    const lazyButton = document.getElementById("library-lazy");
    lazyButton.addEventListener("click", (e) => {
      e.preventDefault();
      const queryInput = document.getElementById("library-input");
      const randomIdx = Math.floor(Math.random() * QUERIES.length);
      queryInput.innerText = QUERIES[randomIdx];
      const query = queryInput.innerText.trim();
      newParams.set("sql", query);
      window.history.replaceState({}, "", `${location.pathname}?${newParams}`);
      fetchBooks(query, printBooks);
    });
    const schemaButton = document.getElementById("library-schema");
    schemaButton.addEventListener("click", (e) => {
      fetchBooks("", printBooks, "schema");
    });
    const downloadButton = document.getElementById("download");

    downloadButton.addEventListener("click", (e) => {
      let csvContent =
        "data:text/csv;charset=utf-8,\n" +
        Object.keys(CURRENT_RESULTS[0]).join(",") +
        "\n";
      for (let row of CURRENT_RESULTS) {
        csvContent += Object.values(row).join(",") + "\n";
      }
      const encodedUri = encodeURI(csvContent);
      window.open(encodedUri);
    });
  }
});
