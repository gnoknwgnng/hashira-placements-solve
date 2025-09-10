const fs = require("fs");

function solvePolynomial(filename) {
  const data = JSON.parse(fs.readFileSync(filename, "utf-8"));

  let product = 1n; // BigInt
  let count = 0;

  for (let key in data) {
    if (key === "keys") continue; // skip metadata

    let base = BigInt(data[key].base);
    let value = data[key].value;

    // Convert value string in given base to BigInt
    let num = BigInt(parseInt(value, parseInt(base.toString())));

    product *= num;
    count++;
  }

  // Apply (-1)^n
  let constant = (count % 2 === 0) ? product : -product;
  return { constant: constant.toString() }; // stringify for JSON
}

// If file given in command line → run only that file
if (process.argv[2]) {
  let result = solvePolynomial(process.argv[2]);
  console.log(JSON.stringify(result, null, 2));
} else {
  let files = fs.readdirSync("testcases");
  files.forEach(file => {
    let result = solvePolynomial("testcases/" + file);
    console.log(file + " => " + JSON.stringify(result));
  });
}
