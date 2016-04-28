var Sequelize = require('sequelize');
var fs = require('fs');
var _ = require('lodash');
var DB_PATH = process.env.DB_PATH || 'mysql://root@localhost:3306/sequelize_blog';

// Check Config
if (!DB_PATH) {
  console.error('Please set db connection string');
  process.exit();
}

// Initial DB
var sequelize = new Sequelize(DB_PATH, {
  sync: {
    force: DB_PATH,
  },
  define: {
    charset: 'utf8',
    collate: 'utf8_general_ci',
  },
  timezone: '+08:00',
});

// Models
var models = fs.readdirSync(__dirname + '/../models');
models.forEach(function(modelName) {
  console.log('Load Model: ', modelName);
  require(__dirname + '/../models/'+ modelName)(sequelize);
});

_.forEach(sequelize.models, function(model) {
  model.associate(sequelize.models);
});

// Migrate
sequelize.sync({force: true}).then(function() {
  var Member = sequelize.models.Member;
  var Article = sequelize.models.Article;
  Member.create(
    { name: 'foo',
      account: 'myaccount',
      password: "mymassword"
    })
    .then(function(member) {

        Article.create(
          { title: 'HEEEEELLLO',
            content: "CONETEWTWETWE",
            MemberId: member.get().id
          })
          .then(function(article) {
              console.log(article.get());
          });
    });

});
