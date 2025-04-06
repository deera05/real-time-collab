const express = require("express");
const Document = require("../models/Document");

const router = express.Router();

router.get("/:id", async (req, res) => {
    const id = req.params.id;
    const document = await Document.findById(id);
    if (document) res.status(200).json(document);
    else res.status(404).json({ message: "Document not found" });
});

router.post("/", async (req, res) => {
    const newDoc = new Document({ content: {} });
    await newDoc.save();
    res.status(201).json(newDoc);
});

module.exports = router;
