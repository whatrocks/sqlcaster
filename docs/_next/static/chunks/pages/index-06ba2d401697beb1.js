(self.webpackChunk_N_E = self.webpackChunk_N_E || []).push([
  [405],
  {
    8312: function (e, t, n) {
      (window.__NEXT_P = window.__NEXT_P || []).push([
        "/",
        function () {
          return n(3230);
        },
      ]);
    },
    3230: function (e, t, n) {
      "use strict";
      n.r(t),
        n.d(t, {
          default: function () {
            return p;
          },
        });
      var r = n(5893),
        s = n(9008),
        a = n.n(s),
        i = n(7294),
        c = n(7779),
        o = n.n(c);
      function l() {
        var e = (0, i.useState)(null),
          t = e[0],
          n = e[1],
          s = (0, i.useState)(!1),
          a = s[0],
          c = s[1];
        return (
          (0, i.useEffect)(function () {
            c(!0),
              fetch(
                "".concat("https://sqlcaster.whatrocks.repl.co/api/", "schema")
              )
                .then(function (e) {
                  return e.json();
                })
                .then(function (e) {
                  n(e), c(!1);
                });
          }, []),
          a
            ? (0, r.jsx)("p", { children: "Loading..." })
            : t
            ? (0, r.jsx)("div", {
                className: o().schema,
                children: t.casts.fields.map(function (e) {
                  return (0,
                  r.jsxs)("div", { children: [e.name, ": ", e.data_type] }, e.name);
                }),
              })
            : (0, r.jsx)("p", { children: "No schema available" })
        );
      }
      var u = n(9873),
        h = n.n(u);
      function d(e) {
        var t = (0, i.useState)(null),
          n = t[0],
          s = t[1],
          a = (0, i.useState)(!1),
          c = a[0],
          o = a[1],
          l = (0, i.useState)(null),
          u = l[0],
          d = l[1];
        return (
          (0, i.useEffect)(function () {
            o(!0),
              d(null),
              fetch("".concat("https://sqlcaster.whatrocks.repl.co/api/sql"), {
                method: "POST",
                headers: { "Content-Type": "text/plain;charset=UTF-8" },
                body: e.query,
              })
                .then(function (e) {
                  return e.ok
                    ? e.json()
                    : e.text().then(function (e) {
                        throw new Error(e);
                      });
                })
                .then(function (e) {
                  s(e), o(!1);
                })
                .catch(function (e) {
                  d(e.message), o(!1);
                });
          }, []),
          c
            ? (0, r.jsx)("p", { children: "Loading..." })
            : u
            ? (0, r.jsx)("p", { children: u })
            : n
            ? n
              ? (0, r.jsx)("div", {
                  className: h().results,
                  children: n.map(function (e, t) {
                    return (0, r.jsx)(
                      "div",
                      {
                        className: h().item,
                        children: Object.keys(e).map(function (t, n) {
                          return (0, r.jsx)("p", { children: e[t] }, n);
                        }),
                      },
                      t
                    );
                  }),
                })
              : void 0
            : (0, r.jsx)("p", { children: "That did not work" })
        );
      }
      var _ = n(214),
        f = n.n(_),
        m = [
          "select * from casts where username = 'whatrocks' and reactions is not null order by reactions desc limit 3;",
          "SELECT username, count(*) from casts where deleted is not null group by 1 order by 2 desc limit 10;",
          "SELECT DATE_TRUNC('month',to_timestamp(published_at*1000000)) AS month, COUNT(*) AS count FROM casts group by DATE_TRUNC('month',to_timestamp(published_at*1000000)) ORDER BY 2 DESC",
        ];
      function p(e) {
        e =
          null !== e
            ? e
            : (function (e) {
                throw e;
              })(new TypeError("Cannot destructure undefined"));
        var t = (0, i.useState)(!1),
          n = t[0],
          s = t[1],
          c = (0, i.useState)(
            "select * from casts where username = 'whatrocks' limit 4"
          ),
          o = c[0],
          u = c[1],
          h = (0, i.useState)(!1),
          _ = h[0],
          p = h[1];
        return (
          (0, i.useEffect)(function () {
            var e = new Proxy(new URLSearchParams(window.location.search), {
              get: function (e, t) {
                return e.get(t);
              },
            });
            e.sql && (u(e.sql), p(!0));
          }, []),
          (0, r.jsxs)("div", {
            children: [
              (0, r.jsxs)(a(), {
                children: [
                  (0, r.jsx)("title", { children: "SQLcaster" }),
                  (0, r.jsx)("meta", {
                    name: "description",
                    content: "Explore Farcaster data with SQL using ROAPI",
                  }),
                  (0, r.jsx)("link", { rel: "icon", href: "/favicon.ico" }),
                ],
              }),
              (0, r.jsxs)("main", {
                children: [
                  (0, r.jsx)("h1", {
                    className: f().title,
                    children: "SQLcaster",
                  }),
                  (0, r.jsx)("h3", { children: "Search Farcaster with SQL" }),
                  (0, r.jsxs)("div", {
                    children: [
                      (0, r.jsx)("button", {
                        onClick: function () {
                          return s(!n);
                        },
                        children: n ? "Hide Schema" : "Show Schema",
                      }),
                      (0, r.jsx)("div", { children: n && (0, r.jsx)(l, {}) }),
                      (0, r.jsxs)("div", {
                        children: [
                          (0, r.jsx)("input", {
                            className: f().queryInput,
                            contentEditable: !0,
                            value: o,
                            onChange: function (e) {
                              return u(e.target.value);
                            },
                          }),
                          (0, r.jsxs)("div", {
                            children: [
                              (0, r.jsx)("button", {
                                onClick: function () {
                                  var e = new URLSearchParams();
                                  e.set("sql", o),
                                    window.history.replaceState(
                                      {},
                                      "",
                                      ""
                                        .concat(location.pathname, "?")
                                        .concat(e)
                                    ),
                                    p(!_);
                                },
                                children: "Submit Query",
                              }),
                              (0, r.jsx)("button", {
                                onClick: function () {
                                  var e = Math.floor(Math.random() * m.length);
                                  u(m[e]);
                                },
                                children: "I'm Feeling Lazy",
                              }),
                              (0, r.jsx)("s", { children: "Download CSV" }),
                              (0, r.jsx)("s", { children: "Query History" }),
                            ],
                          }),
                        ],
                      }),
                      (0, r.jsx)("div", {
                        children: _ && (0, r.jsx)(d, { query: o }),
                      }),
                      (0, r.jsx)("div", { id: "history" }),
                    ],
                  }),
                ],
              }),
              (0, r.jsxs)("footer", {
                children: [
                  (0, r.jsx)("h4", { children: "About SQLcaster" }),
                  (0, r.jsxs)("p", {
                    children: [
                      "SQLcaster's frontend is a static, client-side fetching page and its backend is an autogenerated REST API accepting SQL queries via",
                      (0, r.jsx)("a", {
                        href: "https://roapi.github.io/docs",
                        target: "_blank",
                        rel: "noreferrer",
                        children: "ROAPI",
                      }),
                      "hosted on",
                      (0, r.jsx)("a", {
                        href: "https://replit.com/@whatrocks/sqlcaster",
                        target: "_blank",
                        rel: "noreferrer",
                        children: "Replit",
                      }),
                      ". This site is intended to be fun, experimental way to explore messages (casts) on the",
                      (0, r.jsx)("a", {
                        href: "https://farcaster.xyz",
                        target: "_blank",
                        rel: "noreferrer",
                        children: "Farcaster",
                      }),
                      "protocol. Contributions and ideas would be wonderful - here is the open source",
                      (0, r.jsx)("a", {
                        href: "https://github.com/whatrocks/sqlcaster",
                        target: "_blank",
                        rel: "noreferrer",
                        children: "repo",
                      }),
                      ". SQLcaster was created by",
                      (0, r.jsx)("a", {
                        href: "https://twitter.com/whatrocks",
                        target: "_blank",
                        rel: "noreferrer",
                        children: "@whatrocks",
                      }),
                      ".",
                    ],
                  }),
                ],
              }),
            ],
          })
        );
      }
    },
    214: function (e) {
      e.exports = {
        container: "Home_container__bCOhY",
        main: "Home_main__nLjiQ",
        footer: "Home_footer____T7K",
        title: "Home_title__T09hD",
        description: "Home_description__41Owk",
        code: "Home_code__suPER",
        grid: "Home_grid__GxQ85",
        card: "Home_card___LpL1",
        logo: "Home_logo__27_tb",
        queryInput: "Home_queryInput__aGgrc",
        "library-instructions": "Home_library-instructions__TEM_I",
        btn: "Home_btn__UGRT9",
      };
    },
    9873: function (e) {
      e.exports = {
        avatar: "QueryResults_avatar__uew6j",
        results: "QueryResults_results__NLPbz",
        item: "QueryResults_item__FPL9D",
      };
    },
    7779: function (e) {
      e.exports = { schema: "Schema_schema__zjX_Z" };
    },
    9008: function (e, t, n) {
      e.exports = n(5443);
    },
  },
  function (e) {
    e.O(0, [774, 888, 179], function () {
      return (t = 8312), e((e.s = t));
      var t;
    });
    var t = e.O();
    _N_E = t;
  },
]);
