// netlify/functions/checkCode.js

exports.handler = async (event) => {
  try {
    // Body vom Request auslesen
    const { name, userInput } = JSON.parse(event.body || "{}");

    // Mapping: Personenname -> Environment Variables
    const userMap = {
      "Marian": {
        code: process.env.MARIAN_CODE,     // z. B. "Marian123"
        voucher: process.env.MARIAN_VOUCHER  // z. B. "ABC123-XYZ789"
      },
      "David": {
        code: process.env.DAVID_CODE,
        voucher: process.env.DAVID_VOUCHER
      },
      "Tanja": {
        code: process.env.TANJA_CODE,
        voucher: process.env.TANJA_VOUCHER
      },
      "Julia": {
        code: process.env.JULIA_CODE,
        voucher: process.env.JULIA_VOUCHER
      },
      "CHRISTOPH": {
        code: process.env.CHRISTOPH_CODE,
        voucher: process.env.CHRISTOPH_VOUCHER
      },
      "Patrick": {
        code: process.env.PATRICK_CODE,
        voucher: process.env.PATRICK_VOUCHER
      }
    };

    // 1) Überprüfen, ob der Name existiert
    if (!userMap[name]) {
      return {
        statusCode: 404,
        body: JSON.stringify({ error: `Person '${name}' nicht gefunden.` })
      };
    }

    // 2) Prüfen, ob der eingegebene Code zum code in Env Variables passt
    if (userInput !== userMap[name].code) {
      return {
        statusCode: 401,
        body: JSON.stringify({ error: "Falscher Code!" })
      };
    }

    // 3) Code stimmt -> Amazon-Gutschein zurückgeben
    return {
      statusCode: 200,
      body: JSON.stringify({ voucher: userMap[name].voucher })
    };
  } catch (err) {
    // Fehlerbehandlung
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Serverfehler: " + err.message })
    };
  }
};
