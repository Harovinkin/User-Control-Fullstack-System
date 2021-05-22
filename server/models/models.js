const sequelize = require('../db')
const {DataTypes} = require('sequelize')

const User = sequelize.define('user', {
  id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
  email: {type: DataTypes.STRING, unique: true},
  password: {type: DataTypes.STRING}
})

const Profile = sequelize.define('profile', {
  id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
  name: {type: DataTypes.STRING, allowNull: false},
  birhdate: {type: DataTypes.DATE, allowNull: false}, 
  city: {type: DataTypes.STRING, allowNull: false}
})

const Role = sequelize.define('role', {
  id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
  name: {type: DataTypes.STRING, unique: true, defaultValue: "USER"}
})

const Gender = sequelize.define('gender', {
  id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
  name: {type: DataTypes.STRING, unique: true, allowNull: false}
})


User.hasMany(Profile)
Profile.belongsTo(User)

Role.hasMany(User)
User.belongsTo(Role)

Gender.hasMany(Profile)
Profile.belongsTo(Gender)

module.exports = {
  User,
  Profile,
  Role,
  Gender,
}