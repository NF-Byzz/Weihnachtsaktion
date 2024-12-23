// server.js
const express = require("express");
const path = require("path");
const app = express();

// 1) Static-Files (HTML, CSS, JS) ausliefern
//    "public" ist nur ein Beispielverzeichnisname.
//    Wenn du deine index.html im Root hast, 
//    kannst du dieses Root-Verzeichnis verwenden.
app.use(express.static(path.join(__dirname, ".")));

// 2) (Optional) JSON-Parsing, falls du POST-Requests entgegennimmst
app.use(express.json());

// 3) Beispiel-Route für Codes
//    Hier könntest du den Code (z. B. "Marian123") prüfen
//    und dann ggf. den Amazon-Gutschein ausgeben.
app.post("/checkCode", (req, res) => {
  const { name, userCode } = req.body;
  // Hier würdest du deinen serverseitig gespeicherten Code prüfen.
  // Nur als Beispiel:
  if (name === "Marian" && userCode === "Marian123") {
    return res.json({ voucher: "AMAZON-CODE-123" });
  } else {
    return res.status(401).json({ error: "Falscher Code" });
  }
});

// 4) Port aus Environment oder Standard
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log("Server is running on port " + port);
});
