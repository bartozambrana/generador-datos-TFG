const { mongoObjectId } = require("../helpers/mongoIdGenerator");
const fs = require("fs");
const dataGenerator = () => {
  const users = [];

  for (i = 0; i < 200; i++) {
    let type = true;
    if (i >= 49) type = false;
    users.push({
      _id: { $oid: mongoObjectId() },
      userName: `user${i + 1}`,
      email: `user${i + 1}@gmail.com`,
      password: "$2a$10$H0MZI..zSU6bzc8mKwPLxOe9rD/pMKCzSyh78gW/N2rOu809Fysta",
      type,
      followServices: [],
      status: true,
      postNotifications: false,
    });
  }
  return users;
};

fs.writeFileSync("./json/users.json", JSON.stringify(dataGenerator()));
