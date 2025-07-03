const express = require("express");
const axios = require("axios");
const router = express.Router();

router.get("/gst-lookup/:gstin", async (req, res) => {
  const { gstin } = req.params;

  try {
    const response = await axios.get(
      `https://blog-backend.mastersindia.co/api/v1/custom/search/name_and_pan/?keyword=${gstin}`,
      {
        headers: {
          accept: "application/json",
          origin: "https://www.mastersindia.co",
          referer: "https://www.mastersindia.co/gst-number-search-by-name-and-pan/",
        },
      }
    );

    const data = response.data?.data?.[0];

    if (!data) {
      return res.status(404).json({ success: false, error: "GST data not found" });
    }

    const addr = data?.pradr?.addr;

    const formattedData = {
      "Person Name": data.lgnm,
      "Company Name": data.tradeNam,
      "GST No.": data.gstin,
      "Address": `${addr?.bno}, ${addr?.st}, ${addr?.loc}`,
      "City": addr?.dst,
      "State": addr?.stcd
    };

    res.json({ success: true, data: formattedData });

  } catch (err) {
    console.error("GST Lookup Error:", err.message);
    res.status(500).json({ success: false, error: "Failed to fetch GST details" });
  }
});

module.exports = router;
