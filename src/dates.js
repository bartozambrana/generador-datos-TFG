const servicios = require("../json/services.json");
const users = require("../json/users.json");

const { mongoObjectId } = require("../helpers/mongoIdGenerator");
const { randomNumberINT } = require("../helpers/randomNumber");
const fs = require("fs");

const dataGenerator = () => {
  let dates = [];

  users.map((user, idx) => {
    //Grupo de valoraciones.
    let valoration = 1;
    if (idx < 50) valoration = randomNumberINT(1, 2);
    else if (idx < 150) valoration = randomNumberINT(2, 4);
    else if (idx < 200) valoration = randomNumberINT(4, 5);

    const initHour = randomNumberINT(480, 1000);
    const endHour = randomNumberINT(initHour + 10, 1440);
    //Añadimos la cita.
    for (let i = 0; i < 5; i++) {
      let date = new Date();
      date.setHours(0, 0, 0, 0);
      date.setDate(date.getDate() - i);

      //Grupo de valoraciones.
      let valoration = 1;
      if (i === 1) valoration = randomNumberINT(1, 2.4);
      else if (i === 2 || i === 3) valoration = randomNumberINT(2.5, 4.4);
      else valoration = randomNumberINT(4.5, 5);

      dates.push({
        _id: { $oid: mongoObjectId() },
        idUser: { $oid: user._id.$oid },
        idService: {
          $oid: servicios[randomNumberINT(0, servicios.length - 1)]._id.$oid,
        },
        initHour,
        endHour,
        date: {
          $date: date.toISOString(),
        },
        status: false,
        valoration,
      });
    }
  });

  return dates;
};

fs.writeFileSync("./json/dates.json", JSON.stringify(dataGenerator()));
