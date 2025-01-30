// server.js
import express from "express";
import cors from "cors";
import { PrismaClient } from "@prisma/client";

const PORT = process.env.PORT || 3001;
const app = express();
const prisma = new PrismaClient();

app.use(cors());
app.use(express.json());

// Root endpoint
app.get("/", (req, res) => {
  res.send("Port is running");
});

// Get all users
app.get("/users", async (req, res) => {
  try {
    const users = await prisma.user.findMany();
    res.status(200).json(users);
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// Create a user
app.post("/create-user", async (req, res) => {
  const { name, email, password, mobile, education } = req.body;

  try {
    const newUser = await prisma.user.create({
      data: { name, email, password, mobile, education },
    });
    res.status(201).json({ message: "User created", user: newUser });
  } catch (error) {
    console.error("Error creating user:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// Update a user
app.put("/update-user/:id", async (req, res) => {
  const { id } = req.params;
  const { name, email, password, mobile, education } = req.body;

  try {
    const updatedUser = await prisma.user.update({
      where: { id: String(id) },
      data: { name, email, password, mobile, education },
    });
    res.status(200).json({ message: "User updated", user: updatedUser });
  } catch (error) {
    console.error("Error updating user:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// Delete a user
app.delete("/delete-user/:id", async (req, res) => {
  const { id } = req.params;

  try {
    await prisma.user.delete({
      where: { id: String(id) },
    });
    res.status(200).json({ message: "User deleted" });
  } catch (error) {
    console.error("Error deleting user:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
