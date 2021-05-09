const router = require('express').Router();
const { User, Post, Comment } = require('../models');
const withAuth = require('../utils/auth');

// app.engine('handlebars', )


// router.get('/', async (req, res) => {
//   // Send the rendered Handlebars.js template back as the response
//   res.render('homepage');
// });      

router.get('/', async (req, res) => {
    try {
      // Get all postss and JOIN with user data
      const postData = await Post.findAll({
        include: [
          {
            model: User,
            attributes: ['name'],
          },
        ],
        order: [
            ['date_created', 'DESC'],
        ],
      });
      // Serialize data so the template can read it
      const posts = postData.map((post) => post.get({ plain: true }));
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
  // GET MY POSTS
  router.get('/myposts', async (req, res) => {
    try {
      // Get all postss and JOIN with user data
      const postData = await Post.findAll({
        where: {
          user_id: req.session.user_id
        },
        include: [
          {
            model: User,
            attributes: ['name'],
          },
        ],
        order: [
            ['date_created', 'DESC'],
        ],
      });
      // Serialize data so the template can read it
      const posts = postData.map((post) => post.get({ plain: true }));
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

  router.get('/post/:id', async (req, res) => {
    try {
      const postData = await Post.findByPk(req.params.id, {
        include: [
          {
            model: User,
            attributes: ['name'],
          },
        ],
      });
      const post = postData.get({ plain: true });
  
      const commentData = await Comment.findAll({
          // include: [
          // {
          //   model: User,
          //   attributes: ['name'],
          // },
          // ],  
          where: {
              post_id: req.params.id
          },
      });
      const comments = commentData.map((comment) => comment.get({ plain: true }));

      if (req.session.user_id == post.user_id) {
          var showDelete = true;
        //   console.log('req.session.user_id: '+ req.session.user_id + 'post.user_id: '+post.user_id+'???: '+showDelete);
      };

      res.render('post', {
        ...post,
        comments,
        logged_in: req.session.logged_in,
        userName: req.session.userName,
        showDelete: showDelete,
      });
    } catch (err) {
      res.status(500).json(err);
    }
  });
  
  // EDIT POST
  router.get('/editpost/:id', async (req, res) => {
    try {
      const postData = await Post.findByPk(req.params.id, {
        include: [
          {
            model: User,
            attributes: ['name'],
          },
        ],
      });
      const post = postData.get({ plain: true });
  
      const commentData = await Comment.findAll({
          where: {
              post_id: req.params.id
          }
      });
      const comments = commentData.map((comment) => comment.get({ plain: true }));

      if (req.session.user_id == post.user_id) {
          var showDelete = true;
        //   console.log('req.session.user_id: '+ req.session.user_id + 'post.user_id: '+post.user_id+'???: '+showDelete);
      };

      res.render('editpost', {
        ...post,
        comments,
        logged_in: req.session.logged_in,
        userName: req.session.userName,
        showDelete: showDelete,
      });
    } catch (err) {
      res.status(500).json(err);
    }
  });



  // Use withAuth middleware to prevent access to route THIS WAS '/profile... but temporarily changed to homepage
  router.get('/homepage', withAuth, async (req, res) => {
    try {
      // Find the logged in user based on the session ID
      const userData = await User.findByPk(req.session.user_id, {
        attributes: { exclude: ['password'] },
        include: [{ model: Post }],
      });
  
      const user = userData.get({ plain: true });
      // was 'profile' below... 
      res.render('homepage', {
        ...user,
        logged_in: true
      });
    } catch (err) {
      res.status(500).json(err);
    }
  });
  
  router.get('/login', (req, res) => {
    // If the user is already logged in, redirect the request to another route
    if (req.session.logged_in) {
      res.redirect('/');
    //   res.render('homepage');
      return;
    }
    res.render('login');
  });
  
  router.get('/newpost', (req, res) => {
    res.render('newpost', {
        logged_in: req.session.logged_in,
        userName: req.session.userName,
      });
    // If the user is already logged in, redirect the request to another route
    // if (req.session.logged_in) {
    //   res.redirect('/');
    //   res.render('homepage');
    //   return;
    // }
  });
  

module.exports = router;
