import app from "./app";
import express from "express";

const PORTA = process.env.PORTA;

app.listen(PORTA, () => console.log(`API rodando na porta ${PORTA}`));

app.use(express.json()) // converter req.body em Json
