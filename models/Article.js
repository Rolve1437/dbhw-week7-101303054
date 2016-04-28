var Sequelize = require('sequelize');

module.exports = function(sequelize) {
  //sequelize.define('name', {attributes}, {options});
  var Article = sequelize.define('Article', {
    title : {
      type: Sequelize.STRING,
    },
    content : {
      type : Sequelize.TEXT,
    }
  },
  {
    classMethods : {
      associate : function(models) {
        Article.belongsTo(models.Member);
      }
    }
  });
};
