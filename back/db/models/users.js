module.exports = (sequelize, DataTypes) => {
  const users = sequelize.define(
    'users',
    {
      user_id: DataTypes.STRING,
      nickname: DataTypes.STRING,
    },
    {
      underscored:true
    },
  );
  users.associate = function(models) {
    users.hasOne(models.scores);
    users.hasMany(models.before_friends);
    users.hasMany(models.friends);
    //friends 테이블의 s_friend_id와 p_friend_id가 user테이블의 id를 N(friends테이블):1(user테이블)로 참조하기 때문에
    //여기에 hasMany와 users.js에 belongsTo를 넣었습니다.
    //hasMany를 하니까 sequelize에서 자동으로 friends table에 UserId를 만듭니다. hasMany를 없애야할까요?
  
  };
  return users;
};
