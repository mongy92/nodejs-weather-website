const path = require("path");
const express = require("express");
const hbs = require("hbs");
const geocode = require("./utils/geocode");
const forecast = require("./utils/forecast");




// Define Paths for Express Config
const rootPath = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");



// Set handlebars engine and views location
const app = express();
app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialsPath)


// set static directory to serve
app.use(express.static(rootPath));



app.get("", (req, res) => {
    res.render("index", {
        title: "Weather",
        name: "Ahmed Mongy"
    })
});

app.get('/about', (req, res) => {
    res.render("about", {
        title: "About Me",
        name: "Ahmed Mongy"
    });
});

app.get("/help", (req, res) => {
    res.render("help", {
        title: "Help",
        name: "Ahmed Mongy"
    })
});

app.get("/help/*", (req, res) => {
    res.render("404", {
        title: "404",
        errorMessage: "Help Article not found",
        name: "Ahmed Mongy"
    });
});


app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: "You must provide address term"
        });
    }

    geocode(req.query.address, (error, {latitude,longitude,location} = {}) => {
        if (error) {
            return res.send({ error })
        }
        forecast(latitude, longitude, (error, forecast) => {
            if (error) {
                return res.send({ error });
            }
            res.send({
                location,
                forecast,
                address: req.query.address
            });
        })

    })




});

app.get("*", (req, res) => {
    res.render("404", {
        title: "404",
        name: "Ahmed Mongy",
        errorMessage: "Page not found"
    });
});

app.listen(3000, () => {
    console.log("Server is Running on port : 3000")
})