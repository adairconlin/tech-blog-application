const router = require("express").Router();
const { Comment, User, Post } = require("../../models");

//GET all comments
router.get("/", (req, res) => {
    Comment.findAll({
        attributes: ["comment_text", "user_id", "post_id"]
    })
        .then(dbCommentData => res.json(dbCommentData))
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

//GET a single comment
router.get("/:id", (req, res) => {
    Comment.findOne({
        attributes: ["comment_text", "user_id", "post_id"],
        where: {
            id: req.params.id
        },
        include: [{
            model: User,
            attributes: ["username"]
        },
        {
            model: Post,
            attributes: ["title"]
        }]
    })
        .then(dbCommentData => {
            if(!dbCommentData) {
                res.status(404).json({ message: "No comment found with this id" });
                return;
            }
            res.json(dbCommentData);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

//POST a comment
router.post("/", (req, res) => {
    Comment.create({
        comment_text: req.body.comment_text,
        user_id: req.body.user_id,
        post_id: req.body.post_id
    })
        .then(dbCommentData => res.json(dbCommentData))
        .catch(err => {
            console.log(err);
            res.status(404).json(err);
        });
});

module.exports = router;