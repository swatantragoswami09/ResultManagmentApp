module.exports = (sequelize, DataTypes) => {
  const Datas = sequelize.define("Datas", {
    rollno: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    Name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    DOB: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    Score: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });
  return Datas;
};
