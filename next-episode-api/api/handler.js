const tvMaze = require("./tvmazeRequests");
const client = require("../mariadb");
var moment = require("moment-timezone");

module.exports = {
  allSeries: async function () {
    let conn;
    try {
      conn = await client.getConnection();
      const rows = await conn.query("SELECT * FROM users");
      delete rows.meta; // delete metadata from response
      console.log("rows:", rows); // [0 for only the json without meta information]
      return rows;
    } catch (err) {
      console.log("err:", err);
    } finally {
      if (conn) conn.release(); //release to pool
    }
  },
  queryDb: async function () {
    let conn;
    try {
      conn = await client.getConnection();
      const rows = await conn.query("SELECT id ,title FROM users;");
      delete rows.meta; // delete metadata from response
      console.log("rows:", rows); // [0 for only the json without meta information]
      return rows;
    } catch (err) {
      console.log("err:", err);
    } finally {
      if (conn) conn.release(); //release to pool
    }
  },

  tommorrow: async function (object) {
    return new Promise(async (resolve, reject) => {
      let titleArray = [];

      let tommorrow_germany = moment()
        .add(1, "days")
        .tz("Europe/Berlin")
        .format("YYYY-MM-DD");

      console.log("Date tommorrow in Germany", tommorrow_germany);

      for (const key in object) {
        if (object.hasOwnProperty(key)) {
          const element = object[key];
          console.log("element:", element.id);

          let response = await tvMaze.nextEpisodeById(element.id);

          if (response._embedded != undefined) {
            let dateparsed = Date.parse(
              response._embedded.nextepisode.airstamp
            );
            let ApIparseddateToDate = new Date(dateparsed);

            let api_date = moment(ApIparseddateToDate)
              .tz("Europe/Berlin")
              .format("YYYY-MM-DD");
            console.log("api date", api_date);

            let airdate_germany = moment(ApIparseddateToDate)
              .tz("Europe/Berlin")
              .format("h:mm:ss a");
            console.log("germany airdate", airdate_germany);

            // nur wenn episode heute rauskommt.
            if (tommorrow_germany == api_date) {
              titleArray.push({
                title: response.name,
                airtime: airdate_germany,
                airdate: api_date,
              });
            }
          }

          console.log(response);
        }
      }
      resolve(titleArray);
    });
  },

  // will also add additional info to each series (id , status)
  addByTitle: async function (title) {
    let data = await tvMaze.allInfoFromTitle(title);
    console.log("allInfoFromTitle:", data);
    let conn;
    try {
      conn = await client.getConnection();
      const result = await client.query("INSERT INTO users value (?, ? , ?)", [
        data.id,
        data.name,
        data.status,
      ]);
      delete result.meta; // delete metadata from response
      console.log("result:", result); // [0 for only the json without meta information]
      return result;
    } catch (err) {
      console.log("err:", err);
    } finally {
      if (conn) conn.release(); //release to pool
    }

    return new Promise(async (resolve, reject) => {
      // GET DATA FROM API
      let data = await tvMaze.allInfoFromTitle(title);

      console.log("data:", data);

      // INSERT INTO DB
      client.query(
        `INSERT INTO users (id, title , status) VALUES ('${data.id}', '${data.name}','${data.status}');`,
        (err, result) => {
          console.log("dataID:", data.id);
          console.log("what happened", result);
          console.log(err);
          resolve(result);
        }
      );
    });
  },

  // looping through episodes lists
  // instead of using next episode
  today: async function (object) {
    return new Promise(async (resolve, reject) => {
      let titleArray = [];
      let today = moment().format("YYYY-MM-DD");

      let today_germany = moment().tz("Europe/Berlin").format("YYYY-MM-DD");

      for (const key in object) {
        console.log("ITEM:", object[key]);
        if (object.hasOwnProperty(key)) {
          const element = object[key];

          // 1. We get the Id from the title of a series in our db
          // 2 [OLD]. We check if there is next episode
          // 2[NEW]. We check the episode list and loop through it

          let response = await tvMaze.EpisodeListFromId(element.id);
          //console.log("response:", response);

          for (const episode of response) {
            let seriesTitle = element.title;
            console.log("seriesTitle:", seriesTitle);
            console.log("element:", episode.number);

            let dateparsed = Date.parse(episode.airstamp);

            let ApIparseddateToDate = new Date(dateparsed);

            let api_date = moment(ApIparseddateToDate)
              .tz("Europe/Berlin")
              .format("YYYY-MM-DD");
            console.log("api date", api_date);

            let airdate_germany = moment(ApIparseddateToDate)
              .tz("Europe/Berlin")
              .format("h:mm:ss a");
            console.log("germany airdate", airdate_germany);

            if (today_germany == api_date) {
              titleArray.push({
                title: seriesTitle,
                airtime: airdate_germany,
                airdate: api_date,
              });
            }
          }
        }
      }
      console.log("THEOBJ:", object);
      resolve(titleArray);
    });
  },
};
