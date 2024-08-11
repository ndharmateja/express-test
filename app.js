const express = require("express");
const app = express();
const cors = require("cors");
const morgan = require("morgan")

// Middleware
app.use(cors());
app.use(express.json());
app.use(morgan("tiny"));


// Base route
app.get("/", (req, res) => {
    res.send("hello")
});

// Blogs router
blogsRouter = express.Router()
blogsRouter.route("/").get((req, res ) => res.send("/blogs"))
blogsRouter.route("/:blogId").get((req, res ) => res.send(`/blogs/${req.params.blogId}`))

// Comments router
commentsRouter = express.Router({mergeParams: true})
commentsRouter.route("/")
    .get((req, res ) => res.send(`/blogs/${req.params.blogId}/comments`))
commentsRouter.route("/:commentId")
    .get((req, res ) => res.send(`/blogs/${req.params.blogId}/comments/${req.params.commentId}`))
blogsRouter.use("/:blogId/comments", commentsRouter)

app.use("/blogs", blogsRouter)

module.exports = app;