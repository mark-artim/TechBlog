const router = require('express').Router();
const { Comment } = require('../../models');
const withAuth = require('../../utils/auth');

router.get('/', async (req, res) => {
    try {
      // Get all comments for a post and JOIN with user data
      //TO-DO figure out how in the hell to do that.
      const postData = await Post.findAll({
        include: [
          {
            model: User,
            attributes: ['name'],
          },
        ],
      });
      // Serialize data so the template can read it
      const posts = postData.map((post) => post.get({ plain: true }));
      console.log('>>>>>> postData: ', posts);
      // Pass serialized data and session flag into template
      res.render('homepage', { 
        posts, 
        logged_in: req.session.logged_in,
        userName: req.session.userName,
      });
    } catch (err) {
      res.status(500).json(err);
    }
  });

router.post('/', async (req, res) => {
  try {
    const newComment = await Comment.create({
      post_id: req.body.post_id,
      comment_text: req.body.comment_text,
      // ...req.body,
      user_id: req.session.user_id,
    });
    res.status(200).json(newComment);
  } catch (err) {
    res.status(400).json(req.body);
  }
});

router.put('/:id', withAuth, async (req, res) => {
    // update a comment by its `id` value
    try {
      const commentData = await Comment.update(req.body, {
        where: {
          id: req.params.id,
        }
      })
      if (!commentData) {
        res.status(400).json({message: 'No comment found with that id!'})
      }
      res.status(200).json(commentData);
    } catch (err) {
      res.status(400).json(err);
    }
  });

router.delete('/:id', withAuth, async (req, res) => {
  try {
    const commentData = await Comment.destroy({
      where: {
        id: req.params.id,
        user_id: req.session.user_id,
      },
    });

    if (!commentData) {
      res.status(404).json({ message: 'No comment found with this id!' });
      return;
    }

    res.status(200).json(postData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
