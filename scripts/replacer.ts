const replace = require("replace-in-file");
const options = {
  //you may need to modify the file address to suite your project
  files: "./out/index.html",
  from: [/src="\//g, /href="\//g],
  to: ['src="', 'href="'],
};
(async function () {
  try {
    const results = await replace(options);
    console.log("Replacement results:", results);
  } catch (error) {
    console.error("Error occurred:", error);
  }
})();
