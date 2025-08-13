// src/index.ts
import express from "express";
const app = express();
const PORT = 3000;
app.use(express.json());
// Define a typed route handler
app.get("/", (req, res) => {
    res.send("Hello from TypeScript + Express (Strict Mode)!");
});
// Error handling middleware (typed)
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send("Something went wrong!");
});
app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});
