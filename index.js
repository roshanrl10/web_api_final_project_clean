require("dotenv").config() 
console.log("JWT Secret:", process.env.JWT_SECRET);

const express = require("express")
// 2 new import
const connectDB = require("./config/db")
const userRoutes = require("./routes/userRoute")
// const adminUserRoutes = require("./routes/admin/userRouteAdmin") // Temporarily disabled due to middleware issue
const hotelRoutes = require("./routes/hotelRoute");
const bookingRoutes = require("./routes/bookingRoute");
const equipmentRoutes = require("./routes/equipmentRoute");
const agencyRoutes = require("./routes/agencyRoute");
const weatherRoutes = require("./routes/weatherRoute");
const notificationRoutes = require("./routes/notificationRoute");

const path = require("path") // 
const cors = require("cors")
const app = express()

let corsOptions = {
    origin: "*" // or list of domain to whitelist
}
app.use(cors(corsOptions))

app.use(express.json()) // accept json in request
app.use("/uploads", express.static(path.join(__dirname, "uploads")))
// path.join concats 2 path string,
// __dirname -> current directory path

// 2 new implementation
connectDB()
app.use("/api/auth", userRoutes)
app.use("/api/hotels", hotelRoutes);
app.use("/api/bookings", bookingRoutes);
app.use("/api/equipment", equipmentRoutes);
app.use("/api/agencies", agencyRoutes);
app.use("/api/weather", weatherRoutes);
app.use("/api/notifications", notificationRoutes);


// task
// from student model make admin crud operation
// create, get, getone, udpateone, deleteone
// make a controllers -> admin -> studentcontroller
// make a route routers -> admin -> studentRouteAdmin
// implement the route in index.js and try all route in postman 


app.get("/", 
    (req, res) => {
        // logic
        return res.status(200).send("Hell!!o world 2000")
    }
)

const PORT = process.env.PORT || 3000
app.listen(
    PORT,
    () => {
        console.log(`Server running on port ${PORT}`)
    }
)