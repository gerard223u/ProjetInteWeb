// Installed modules
const gulp = require("gulp")
const sass = require("gulp-sass")
const uglify = require("gulp-uglify")
const pug = require("gulp-pug")
const reload = require("gulp-livereload")
const connect = require("gulp-connect")
const open = require("gulp-open")
// Constants
const outputFolder = "../dist"

// DEFAULT
gulp.task("default", ["htmlOutput", "cssOutput", "jsOutput", "imgOutput", "launchWatchers", "launchServer"])

// Primary tasks
gulp.task("htmlOutput", ["buildPug"])
gulp.task("cssOutput", ["buildSass"])
gulp.task("jsOutput", ["copyJS"])
gulp.task("imgOutput", ["copyImg"])
gulp.task("launchWatchers", ["pug:watch", "sass:watch", "js:watch", "img:watch"])
gulp.task("launchServer", ["start-server", "open-navigator"])

// Secondary tasks
gulp.task("importVendors", ["importBootstrap", "importJQuery", "importPopper"])

// Watch tasks
gulp.task("pug:watch", () => {
    reload.listen()
    gulp.watch("views/**/*.pug", ["buildPug"])
})
gulp.task("sass:watch", () => {
    reload.listen()
    gulp.watch("sass/**/*.scss", ["buildSass"])
})
gulp.task("js:watch", () => {
    reload.listen()
    gulp.watch("js/**/*.js", ["copyJS"])
})
gulp.task("img:watch", () => {
    reload.listen()
    gulp.watch("img/*", ["copyImg"])
})
gulp.task("start-server", () => {
    connect.server({
        root: outputFolder,
        port: 8001,
        livereload: true,
        debug: true
    })
})
gulp.task("open-navigator", () => {
    gulp.src(outputFolder + "/index.html")
    .pipe(open({uri: "http://localhost:8001", app:"firefox"}))
})

// HTML task
gulp.task("buildPug", () => {
    gulp.src("views/*.pug")
    .pipe(pug())
    .on("error", (error) => {
        console.log(error)
    })
    .pipe(gulp.dest(outputFolder))
    .pipe(reload())
})

// CSS task
gulp.task("buildSass", () => {
    gulp.src("sass/app.scss")
    .pipe(sass({outputStyle: "compressed"}))
    .on("error", (error) => {
        console.log(error)
    })
    .pipe(gulp.dest(outputFolder + "/css"))
    .pipe(reload())
})

// JS task
gulp.task("copyJS", () => {
    gulp.src("js/**/*.js")
    .pipe(uglify())
    .on("error", (error) => {
        console.log(error)
    })
    .pipe(gulp.dest(outputFolder + "/js"))
    .pipe(reload())
})

// IMG Task
gulp.task("copyImg", () => {
    gulp.src("img/*")
    .pipe(gulp.dest(outputFolder + "/img"))
    .pipe(reload())
})

// Vendors tasks
// Bootstrap
gulp.task("importBootstrap", () => {
    gulp.src([
        "node_modules/bootstrap/dist/css/bootstrap.min.css",
        "node_modules/bootstrap/dist/js/bootstrap.min.js",
        "node_modules/bootstrap/dist/js/bootstrap.min.js.map",
        "node_modules/bootstrap/dist/css/bootstrap.min.css.map"
    ])
    .pipe(gulp.dest(outputFolder + "/lib/bootstrap"))
})
// JQuery
gulp.task("importJQuery", () => {
    gulp.src("node_modules/jquery/dist/jquery.min.js")
    .pipe(gulp.dest(outputFolder + "/lib/jquery"))
})
// Popper.js
gulp.task("importPopper", () => {
    gulp.src("node_modules/popper.js/dist/popper.min.js")
    .pipe(gulp.dest(outputFolder + "/lib/popper.js"))
})