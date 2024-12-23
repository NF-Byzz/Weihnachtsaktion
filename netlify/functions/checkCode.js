// netlify/functions/checkCode.js

exports.handler = async (event) => {
  // Daten vom Client lesen:
  const { name, userInput } = JSON.parse(event.body || "{}");

  // Beispiel: Hinterlegte Codes (im Klartext hier oder per process.env)
  const codes = {
    "Marian": {
      code: "Marian123",
      voucher: "AMAZON-Gutschein-Marian-XYZ"
    },
    "David": {
      code: "David2023",
      voucher: "AMAZON-Gutschein-David-ABC"
    }
    // etc.
  };

  const gift = codes[name];
  if (!gift) {
    return {
      statusCode: 404,
      body: JSON.stringify({ error: "Person nicht gefunden." })
    };
  }

  // Prüfen, ob Code korrekt
  if (userInput === gift.code) {
    return {
      statusCode: 200,
      body: JSON.stringify({ voucher: gift.voucher })
    };
  } else {
    return {
      statusCode: 401,
      body: JSON.stringify({ error: "Falscher Code!" })
    };
  }
};
