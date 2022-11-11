const mongoose = require("mongoose");

module.exports = () => {
  mongoose.connect("mongodb+srv://admin:3UqGVAiymSBVgpqS@cluster0.c6mptbg.mongodb.net/?retryWrites=true&w=majority", {
    useNewUrlParser: true,
  });
  const db = mongoose.connection;
  db.on("error", console.error.bind(console, "connection error:"));
  db.once("open", () => {
    console.log("Connected to MongoDB");
  });
};
