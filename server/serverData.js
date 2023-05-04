require("dotenv").config();

const express = require("express");
const app = express();
const mysql = require("mysql");
const sanitizeHtml = require("sanitize-html");
const pool = require("./config/database.js");
const { genSaltSync, hashSync, compareSync } = require("bcrypt");
const cors = require("cors");
const { checkToken } = require("./config/checkToken.js");
const {
  sendingGet,
  sendingGetError,
  sendingGetById,
  sendingPost,
  sendingPut,
  sendingDelete,
  sendingInfo,
} = require("./config/sending.js");

//#region Middleware
//json-al kommunikáljon
app.use(express.json());
// mindenkivel enged kommunikálni
app.use(
  cors({
    origin: "*", //http://localhost:8080
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  })
);
//autentikáció
app.use(checkToken);
//#endregion Middleware

//#region Users ---
app.get("/users", (req, res) => {
  let sql = `SELECT * FROM users`;

  pool.getConnection(function (error, connection) {
    if (error) {
      sendingGetError(res, "Server connecting error!");
      return;
    }
    connection.query(sql, async function (error, results, fields) {
      sendingGet(res, error, results);
    });
    connection.release();
  });
});

app.get("/users/:id", (req, res) => {
  const id = req.params.id;
  let sql = `
    SELECT * FROM users
    WHERE id = ?`;

  pool.getConnection(function (error, connection) {
    if (error) {
      sendingGetError(res, "Server connecting error!");
      return;
    }
    connection.query(sql, [id], async function (error, results, fields) {
      sendingGetById(res, error, results, id);
    });
    connection.release();
  });
});

//user létrehozás
app.post("/users", (req, res) => {
  const salt = genSaltSync(10);
  req.body.password = hashSync(req.body.password, salt);
  const newR = {
    firstName: mySanitizeHtml(req.body.firstName),
    lastName: mySanitizeHtml(req.body.lastName),
    gender: mySanitizeHtml(req.body.gender),
    userName: mySanitizeHtml(req.body.userName),
    email: mySanitizeHtml(req.body.email),
    password: req.body.password,
    number: req.body.number,
  };

  //user ellenőrzés
  let sql = `select count(*) countUserEmail from users where userName = ?
    UNION all
    select count(*) countEmail from users where email = ?`;
  pool.getConnection(function (error, connection) {
    if (error) {
      sendingGetError(res, "Server connecting error!");
      return;
    }
    connection.query(
      sql,
      [newR.userName, newR.email],
      function (error, result, fields) {
        if (error) {
          sendingInfo(res, 0, "server error", [], 200);
          return;
        }
        if (result[0].countUserEmail >= 1 && result[1].countUserEmail >= 1) {
          sendingInfo(
            res,
            -3,
            "Username and password are already taken",
            newR,
            200
          );
          return;
        } else if (result[0].countUserEmail >= 1) {
          sendingInfo(res, -2, "Username are already taken", newR, 200);
          return;
        } else if (result[1].countUserEmail >= 1) {
          sendingInfo(res, -1, "Email are already taken", newR, 200);
          return;
        }
        //mehet a regisztráció

        sql = `insert into users
      (firstName, lastName, gender, userName, email, password, number)
      values
      (?,?,?,?,?,?,?)
    `;
        connection.query(
          sql,
          [
            newR.firstName,
            newR.lastName,
            newR.gender,
            newR.userName,
            newR.email,
            newR.password,
            newR.number,
          ],
          function (error, result, fields) {
            sendingPost(res, error, result, newR);
          }
        );
      }
    );
    connection.release();
  });
});

app.delete("/users/:id", (req, res) => {
  const id = req.params.id;
  let sql = `
    DELETE FROM users
    WHERE id = ?`;

  pool.getConnection(function (error, connection) {
    if (error) {
      sendingGetError(res, "Server connecting error!");
      return;
    }
    connection.query(sql, [id], function (error, result, fields) {
      sendingDelete(res, error, result, id);
    });
    connection.release();
  });
});

app.put("/users/:id", (req, res) => {
  const id = req.params.id;
  const salt = genSaltSync(10);
  let password = req.body.password;
  password = hashSync(password, salt);

  const newR = {
    firstName: mySanitizeHtml(req.body.firstName),
    lastName: mySanitizeHtml(req.body.lastName),
    gender: mySanitizeHtml(req.body.gender),
    userName: mySanitizeHtml(req.body.userName),
    email: mySanitizeHtml(req.body.email),
    password: password,
    number: req.body.number,
  };
  let sql = `
    UPDATE users SET
    firstName = ?,
    lastName = ?,
    gender = ?,
    userName = ?,
    email = ?,
    password = ?,
    number = ?
    WHERE id = ?
      `;

  pool.getConnection(function (error, connection) {
    if (error) {
      sendingGetError(res, "Server connecting error!");
      return;
    }
    connection.query(
      sql,
      [
        newR.firstName,
        newR.lastName,
        newR.gender,
        newR.userName,
        newR.email,
        newR.password,
        newR.number,
        id,
      ],
      function (error, result, fields) {
        sendingPut(res, error, result, id, newR);
      }
    );
    connection.release();
  });
});

//#endregion Users


//#region countries
//A függvény egy promisszal tér vissza
function getEvents(res, countryId) {
  return new Promise((resolve, reject) => {
    let sql = `
    select * from events 
  where countryId = ?
  order by dateFrom`;

    pool.getConnection(function (error, connection) {
      if (error) {
        sendingGetError(res, "Server connecting error!");
        return;
      }
      connection.query(sql, [countryId], async function (error, results, fields) {
        if (error) {
          const message = "Trips sql error";
          sendingGetError(res, message);
        }
        //Az await miatt a car.trips a results-ot kapja értékül
        resolve(results);
      });
      connection.release();
    });
  });
}

//get countries
app.get("/countries", (req, res) => {
  let sql = `SELECT * FROM countries`;

  pool.getConnection(function (error, connection) {
    if (error) {
      sendingGetError(res, "Server connecting error!");
      return;
    }
    connection.query(sql, async function (error, results, fields) {
      if (error) {
        message = "Countries sql error";
        sendingGetError(res, message);
        return;
      }
      sendingGet(res, null, results);
    });
    connection.release();
  });
});

// országok és események tábla inner join
app.get("/countryEvents", (req, res) => {
  let sql = `
  select * from countries c
    inner join events e on c.id = e.countryId;
  `;

  pool.getConnection(function (error, connection) {
    if (error) {
      sendingGetError(res, "Server connecting error!");
      return;
    }
    connection.query(sql, async function (error, results, fields) {
      if (error) {
        message = "Country sql error";
        sendingGetError(res, message);
        return;
      }
      sendingGet(res, null, results);
    });
    connection.release();
  });
});


//Country a hozzátartozó eseményeivel
app.get("/countriesWithEvents", (req, res) => {
  let sql = `select * from countries`;

  pool.getConnection(function (error, connection) {
    if (error) {
      sendingGetError(res, "Server connecting error!");
      return;
    }
    connection.query(sql, async function (error, results, fields) {
      if (error) {
        message = "Country sql error";
        sendingGetError(res, message);
        return;
      }

      //Végigmegyünk a kocsikon, és berakjuk a trips-eket
      for (const country of results) {
        //A promise a results-ot ada vissza
        country.events = await getEvents(res, country.id);
      }
      sendingGet(res, null, results);
    });
    connection.release();
  });
});


app.get("/countriesWithEvents/:id", (req, res) => {
  const id = req.params.id;
  let sql = `select * from countries where id = ? `;

  pool.getConnection(function (error, connection) {
    if (error) {
      sendingGetError(res, "Server connecting error!");
      return;
    }
    connection.query(sql, [id], async function (error, results, fields) {

      if (error) {
        const message = "Countries sql error";
        sendingGetError(res, message);
        return;
      }
      if (results.length == 0) {
        const message = `Not found id: ${id}`;
        sendingGetError(res, message);
        return;
      }


      //Végigmegyünk a kocsikon, és berakjuk a trips-eket
      for (const country of results) {
        //A promise a results-ot ada vissza
        country.events = await getEvents(res, country.id);
      }
      sendingGetById(res, null, results[0], id);

    });
    connection.release();
  });
});

// ország keresés ID alapján
app.get("/countries/:id", (req, res) => {
  const id = req.params.id;
  let sql = `
    SELECT * FROM countries
    WHERE id = ?`;

  pool.getConnection(function (error, connection) {
    if (error) {
      sendingGetError(res, "Server connecting error!");
      return;
    }
    connection.query(sql, [id], async function (error, results, fields) {
      if (error) {
        const message = "Countries sql error";
        sendingGetError(res, message);
        return;
      }
      if (results.length == 0) {
        const message = `Not found id: ${id}`;
        sendingGetError(res, message);
        return;
      }
      sendingGetById(res, null, results[0], id);
    });
    connection.release();
  });
});

// Egy countries rekord eventsjeivel
app.get("/countriesEvents/:id", (req, res) => {
  const id = req.params.id;
  let sql = `select c.id, c.name, c.region, e.id, e.description, e.dateFrom, e.dateTo, e.countryId from countries c
  inner join events e on c.id = e.countryId
  where c.id = ?`;

  pool.getConnection(function (error, connection) {
    if (error) {
      sendingGetError(res, "Server connecting error!");
      return;
    }
    connection.query(sql, [id], async function (error, results, fields) {
      if (error) {
        const message = "Countries sql error";
        sendingGetError(res, message);
        return;
      }
      if (results.length == 0) {
        const message = `Not found id: ${id}`;
        sendingGetError(res, message);
        return;
      }
      sendingGetById(res, null, results, id);
    });
    connection.release();
  });
});

//countries delete
app.delete("/countries/:id", (req, res) => {
  const id = req.params.id;

  let sql = `
    DELETE FROM countries
    WHERE id = ?`;

  pool.getConnection(function (error, connection) {
    if (error) {
      sendingGetError(res, "Server connecting error!");
      return;
    }
    connection.query(sql, [id], function (error, result, fields) {
      sendingDelete(res, error, result, id);
    });
    connection.release();
  });
});

//countries post
app.post("/countries", (req, res) => {
  const newR = {
    name: mySanitizeHtml(req.body.name),
    region: mySanitizeHtml(req.body.region),
  };
  let sql = `
  insert countries
  (name, region)
  VALUES
  (?, ?)
    `;
  pool.getConnection(function (error, connection) {
    if (error) {
      sendingGetError(res, "Server connecting error!");
      return;
    }
    connection.query(
      sql,
      [newR.name, newR.region],
      function (error, result, fields) {
        sendingPost(res, error, result, newR);
      }
    );
    connection.release();
  });
});

//countries put
app.put("/countries/:id", (req, res) => {
  const id = req.params.id;
  const newR = {
    name: mySanitizeHtml(req.body.name),
    region: mySanitizeHtml(req.body.region),
  };
  let sql = `
    UPDATE countries SET
    name = ?,
    region = ?
    WHERE id = ?
      `;

  pool.getConnection(function (error, connection) {
    if (error) {
      sendingGetError(res, "Server connecting error!");
      return;
    }
    connection.query(
      sql,
      [newR.name, newR.region, id],
      function (error, result, fields) {
        sendingPut(res, error, result, id, newR);
      }
    );
    connection.release();
  });
});
//#endregion countries


//#region events

//get events
app.get("/events", (req, res) => {
  let sql = `SELECT * FROM events`;

  pool.getConnection(function (error, connection) {
    if (error) {
      sendingGetError(res, "Server connecting error!");
      return;
    }
    connection.query(sql, async function (error, results, fields) {
      if (error) {
        message = "Events sql error";
        sendingGetError(res, message);
        return;
      }
      sendingGet(res, null, results);
    });
    connection.release();
  });
});

//get events by ID
app.get("/events/:id", (req, res) => {
  const id = req.params.id;
  let sql = `
  SELECT * from events
  where id = ?
   `;

  pool.getConnection(function (error, connection) {
    if (error) {
      sendingGetError(res, "Server connecting error!");
      return;
    }
    connection.query(sql, [id], function (error, results, fields) {
      sendingGetById(res, error, results, id);
    });
    connection.release();
  });
});

//get events by country ID
app.get("/eventsByCountryId/:id", (req, res) => {
  const id = req.params.id;
  let sql = `
  select * from events
    where countryId = ?
    order by dateFrom
  `;

  pool.getConnection(function (error, connection) {
    if (error) {
      sendingGetError(res, "Server connecting error!");
      return;
    }
    connection.query(sql, [id], function (error, results, fields) {
      sendingGetById(res, error, results, id);
    });
    connection.release();
  });
});

//delete events
app.delete("/events/:id", (req, res) => {
  const id = req.params.id;

  let sql = `
    DELETE FROM events
    WHERE id = ?`;

  pool.getConnection(function (error, connection) {
    if (error) {
      sendingGetError(res, "Server connecting error!");
      return;
    }
    connection.query(sql, [id], function (error, result, fields) {
      sendingDelete(res, error, result, id);
    });
    connection.release();
  });
});

//post events
app.post("/events", (req, res) => {
  const newR = {
    eventName: mySanitizeHtml(req.body.eventName),
    description: myEventsSanitize(req.body.description),
    dateFrom: req.body.dateFrom,
    dateTo: req.body.dateTo,
    countryId: req.body.countryId,
  };

  let sql = `
  insert events
  (eventName, description, dateFrom, dateTo, countryId)
  VALUES
  (?, ?, ?, ?, ?);
  `;

  pool.getConnection(function (error, connection) {
    if (error) {
      sendingGetError(res, "Server connecting error!");
      return;
    }
    connection.query(
      sql,
      [newR.eventName, newR.description, newR.dateFrom, newR.dateTo, newR.countryId],
      function (error, result, fields) {
        sendingPost(res, error, result, newR);
      }
    );
    connection.release();
  });
});

//put events
app.put("/events/:id", (req, res) => {
  const id = req.params.id;
  const newR = {
    eventName: mySanitizeHtml(req.body.eventName),
    description: myEventsSanitize(req.body.description),
    link: mySanitizeHtml(req.body.link),
    dateFrom: req.body.dateFrom,
    dateTo: req.body.dateTo,
    countryId: req.body.countryId,
  };
  let sql = `
  update events set
  eventName = ?,
  description = ?,
  link = ?,
  dateFrom = ?,
  dateTo = ?,
  countryId = ?
  where id = ?
  `;

  pool.getConnection(function (error, connection) {
    if (error) {
      sendingGetError(res, "Server connecting error!");
      return;
    }
    connection.query(
      sql,
      [newR.eventName, newR.description, newR.link, newR.dateFrom, newR.dateTo, newR.countryId, id],
      function (error, result, fields) {
        sendingPut(res, error, result, id, newR);
      }
    );
    connection.release();
  });
});

//#endregion events



//#endregion


function mySanitizeHtml(data) {
  return sanitizeHtml(data, {
    allowedTags: [],
    allowedAttributes: {},
  });
}

function myEventsSanitize(data) {
  return sanitizeHtml(data, {
    allowedTags: ["address", "article", "aside", "footer", "header", "h1", "h2", "h3", "h4",
      "h5", "h6", "hgroup", "main", "nav", "section", "blockquote", "dd", "div",
      "dl", "dt", "figcaption", "figure", "hr", "li", "main", "ol", "p", "pre",
      "ul", "a", "abbr", "b", "bdi", "bdo", "br", "cite", "code", "data", "dfn",
      "em", "i", "kbd", "mark", "q", "rb", "rp", "rt", "rtc", "ruby", "s", "samp",
      "small", "span", "strong", "sub", "sup", "time", "u", "var", "wbr", "caption",
      "col", "colgroup", "table", "tbody", "td", "tfoot", "th", "thead", "tr", "img"],
    allowedAttributes: {
      a: ['href', 'name', 'target'],
      img: ['src', 'srcset', 'alt', 'title', 'width', 'height', 'loading']
    },
  });
}


app.listen(process.env.APP_PORT, () => {
  console.log(
    `Data server, listen port: ${process.env.APP_PORT} (Auth: ${process.env.AUTH_ON == 1 ? "on" : "off"
    })`
  );
});

module.exports = { genSaltSync, hashSync, compareSync };
