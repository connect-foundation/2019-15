module.exports = (sequelize, DataTypes) => {
  const friends = sequelize.define('friends', {}, {
    underscored:true
  });
  friends.associate = function(models) {
    friends.belongsTo(models.users, { as: "p_friend", foreignkey: 'id' });
    //as 그대로를 쿼리문으로 요청하는 법은 없나요?
    //자동으로 camelcase로 바뀌고 뒤에 id를 붙여서 pFriendId로 쿼리를 날립니다.ㅜ
    friends.belongsTo(models.users, { as: "s_friend", foreignkey: 'id' });
    friends.hasMany(models.invitations);
  };
  return friends;
};
