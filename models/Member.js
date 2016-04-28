var Sequelize = require('sequelize');

module.exports = function(sequelize) {
  //sequelize.define('name', {attributes}, {options});
  var Member = sequelize.define('Member', {
    name : {
      type: Sequelize.STRING,
    },
    account : {
      type: Sequelize.STRING,
    },
    password : {
      type : Sequelize.STRING,
    }
  },
  {
    classMethods : {
      associate : function(models) {
        Member.hasMany(models.Article, {as : 'MemberArticles'});
      }
    },
    instanceMethods : {
      getArticles : function() {
        return this.getMemberArticles();
      }
    }
  });
};
