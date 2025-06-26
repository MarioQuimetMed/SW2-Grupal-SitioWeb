const express = require("express");
const path = require("path");
const app = express();

// Ruta del build Angular
const distPath = path.join(__dirname, "dist/monee-landing/browser");
app.use(express.static(distPath));

// Soporte para rutas Angular (SPA)
app.get("*", (req, res) => {
  res.sendFile(path.join(distPath, "index.html"));
});

// Puerto por defecto para DigitalOcean App Platform
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Servidor Angular escuchando en http://localhost:${PORT}`);
});
