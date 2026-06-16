import express from "express";
import cors from "cors";

const app = express();

app.use(cors());
app.use(express.json());

// 🔽 AQUÍ van tus rutas
// app.use("/login", loginRoutes);
// app.use("/clientes", clientesRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log("API corriendo en puerto " + PORT);
});