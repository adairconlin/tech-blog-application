const router = require("express").Router();
const sequelize = require("../config/connection");
const { User, Post, Comment } = require("../models");
const withAuth = require("../utils/auth");

router.get("/", withAuth, (req, res) => {
    Post.findAll({
        where: {
            user_id: req.session.user_id
        },
        attributes: ["id", "title", "created_at"],
        incude: {
            model: User,
            attributes: ["username"]
        }
    })
        .then(dbPostData => {
            const posts = dbPostData.map(post => post.get({ plain: true }));
            res.render("dashboard", { posts, loggedIn: true });
        })
});

module.exports = router;

