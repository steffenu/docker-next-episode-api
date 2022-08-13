// 1. Api Requests to tv maze api

const axios = require("axios");

// 1. From Series  Get ID
// 2. From ID get  next episode.

module.exports = {
  allInfoFromTitle: function (title) {
    return axios
      .get(`http://api.tvmaze.com/singlesearch/shows?q=${title}`)
      .then((result) => result.data)
      .catch((err) =>
        console.log("ERROR - nextEpisodeByTitle : " + err.message)
      );
  },

  idfromTitle: function (title) {
    return axios
      .get(`http://api.tvmaze.com/singlesearch/shows?q=${title}`)
      .then((result) => result.data.id)
      .catch((err) =>
        console.log("ERROR - nextEpisodeByTitle : " + err.message)
      );
  },

  nextEpisodeById: function (id) {
    return axios
      .get(`http://api.tvmaze.com/shows/${id}?embed=nextepisode`)
      .then((result) => result.data)
      .catch((err) =>
        console.log("ERROR - nextEpisodeByTitle : " + err.message)
      );
  },

  EpisodeListFromId: function (id) {
    return axios
      .get(`http://api.tvmaze.com/shows/${id}/episodes`)
      .then((result) => result.data)
      .catch((err) =>
        console.log("ERROR - nextEpisodeByTitle : " + err.message)
      );
  },
};
