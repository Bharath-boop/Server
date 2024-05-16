import express from 'express'
import cors from 'cors'
import AppRoutes from './Routes/index.js'
import dotenv from 'dotenv'
dotenv.config()


const PORT=process.env.PORT
const app=express()
app.use(cors())
app.use(express.json())
app.use(AppRoutes)

app.listen(PORT,()=>{console.log(`APP LISTEING IN ${PORT}`)})