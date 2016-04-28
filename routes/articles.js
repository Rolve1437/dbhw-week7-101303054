var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  if (!req.session.who) {
		res.redirect("../");
		res.end();
		return;
	}

  res.render('articles', {
    title: '新增文章',
    articleTitle : req.query.articleTitle,
		content : req.query.content,
    author : req.session.who
  });
});

router.post('/send', function(req, res, next) {
  if (!req.session.who) {
		res.redirect("../");
		res.end();
		return;
	}

	res.render('articles', {
		title : '已發佈文章',
		articleTitle : req.body.articleTitle + ' by ' + req.session.who,
		content: req.body.content,
    author : req.session.who
	});
});

module.exports = router;
