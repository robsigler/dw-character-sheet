var fs = require("fs");
var archiver = require("archiver");

const distZipPath: string = "./dist/lambda.zip";
var output = fs.createWriteStream(distZipPath);
var archive = archiver("zip", {
  zlib: { level: 9 } // Sets the compression level.
});

output.on("close", function() {
  console.log(archive.pointer() + " total bytes written.");
  console.log(distZipPath + " has been created.")
});

output.on("end", function() {
  console.log("Data has been drained");
});

// good practice to catch warnings (ie stat failures and other non-blocking errors)
archive.on("warning", function(err: any) {
  if (err.code === "ENOENT") {
    // log warning
  } else {
    // throw error
    throw err;
  }
});

// good practice to catch this error explicitly
archive.on("error", function(err: any) {
  throw err;
});

archive.pipe(output);
var file1 = "./dist/index.js";
archive.append(fs.createReadStream(file1), { name: "index.js" });
archive.directory("node_modules", "node_modules");
archive.finalize();