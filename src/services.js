const fs = require("fs");
const users = require("../json/users.json");
const { mongoObjectId } = require("../helpers/mongoIdGenerator");
const { randomNumberINT } = require("../helpers/randomNumber");

const categorias = [
  "eletrónica",
  "mecánica",
  "auditoría-asesoría",
  "aseguradoras",
  "peluquería",
  "dentistas",
  "moda",
];

const localizaciones = [
  {
    cityName: "Madrid",
    street: "Gral Oraá, 38",
    postalCode: 28006,
  },
  {
    cityName: "Sevilla",
    street: "Dos de Mayor, 2",
    postalCode: 41001,
  },
  {
    cityName: "Barcelona",
    street: "Avinguda Diagonal, 640",
    postalCode: 08017,
  },
];

const dataGenerator = () => {
  const services = [];

  for (i = 0; i < users.length / 4; i++) {
    services.push({
      _id: { $oid: mongoObjectId() },
      serviceName: `service${i + 1}`,
      serviceInfo: `descripción del servicio${i + 1}`,
      serviceCategory: categorias[randomNumberINT(0, categorias.length - 1)],
      localization:
        localizaciones[randomNumberINT(0, localizaciones.length - 1)],
      idUser: { $oid: users[i]._id.$oid },
      status: true,
    });
  }

  return services;
};

fs.writeFileSync("./json/services.json", JSON.stringify(dataGenerator()));
