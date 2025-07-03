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
          referer:
            "https://www.mastersindia.co/gst-number-search-by-name-and-pan/",
        },
      }
    );
    res.json(response.data);
  } catch (err) {
    console.error("GST Lookup Error:", err.message);
    res.status(500).json({ success: false, error: "Failed to fetch GST details" });
  }
});

module.exports = router;
