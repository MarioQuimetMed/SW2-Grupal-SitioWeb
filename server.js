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

// Digital Ocean espera que la app escuche en el puerto 8080 (predeterminado) o en el puerto proporcionado por variable de entorno
const PORT = process.env.PORT || 8080;
app.listen(PORT, "0.0.0.0", () => {
  console.log(`Servidor Angular escuchando en http://localhost:${PORT}`);
});
