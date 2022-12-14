let CURRENT_RESULTS = [];
const BASE_URL = "https://sqlcaster.whatrocks.repl.co/api/";

function printResults(books) {
  const booklist = document.getElementById("booklist");
  booklist.innerHTML = "";
  if (Array.isArray(books)) {
    for (let book of books) {
      prettyPrint(book);
    }
  } else {
    // BUG: this is hardcoded to `casts` table name
    for (let field of books.casts.fields) {
      printSchema(field);
    }
  }
}

function prettyPrint(book) {
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

document.addEventListener("DOMContentLoaded", function () {
  const library = document.getElementById("the-library");

  if (library) {
    // fetch any existing queries
    const savedQueries = window.localStorage.getItem("queries")
      ? JSON.parse(window.localStorage.getItem("queries"))
      : [];

    // get existing query
    const params = new Proxy(new URLSearchParams(window.location.search), {
      get: (searchParams, prop) => searchParams.get(prop),
    });
    if (params.sql) {
      const queryInput = document.getElementById("library-input");
      queryInput.innerText = params.sql;
      fetchBooks(params.sql, printResults);
    }
    // to set new query
    const newParams = new URLSearchParams();
    const libraryButton = document.getElementById("library-button");
    libraryButton.addEventListener("click", (e) => {
      e.preventDefault();
      const queryInput = document.getElementById("library-input");
      const query = queryInput.innerText.trim();
      newParams.set("sql", query);
      savedQueries.unshift(query);
      window.localStorage.setItem("queries", JSON.stringify(savedQueries));
      window.history.replaceState({}, "", `${location.pathname}?${newParams}`);
      fetchBooks(query, printResults);
    });
    const lazyButton = document.getElementById("library-lazy");
    lazyButton.addEventListener("click", (e) => {
      e.preventDefault();
      const queryInput = document.getElementById("library-input");

      queryInput.innerText = QUERIES[randomIdx];
      const query = queryInput.innerText.trim();
      newParams.set("sql", query);
      window.history.replaceState({}, "", `${location.pathname}?${newParams}`);
      fetchBooks(query, printResults);
    });

    const downloadButton = document.getElementById("download");
    downloadButton.addEventListener("click", (evt) => {
      window.open(
        encodeURI(
          `data:text/csv;charset=utf-8,\n${new TreeNode(
            CURRENT_RESULTS
          ).toCsv()}`
        )
      );
    });
    const historyButton = document.getElementById("btn-history");
    historyButton.addEventListener("click", (evt) => {
      const history = document.getElementById("history");
      history.innerHTML = "";
      const savedQueries = window.localStorage.getItem("queries")
        ? JSON.parse(window.localStorage.getItem("queries"))
        : [];
      for (let q of savedQueries) {
        const query = document.createElement("div");
        const p = document.createElement("p");
        p.innerText = q;
        query.appendChild(p);
        history.appendChild(query);
      }
    });
  }
});
