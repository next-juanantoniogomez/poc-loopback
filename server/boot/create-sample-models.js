'use strict';

const async = require('async');
const {log} = console;

const SEEDS_MOVIES = require('./seeds/movies')();
const SEEDS_ARTISTS = require('./seeds/artists')();
const SEEDS_COUNTRIES = require('./seeds/countries')();
const SEEDS_USERS = require('./seeds/users')();

module.exports = function(app) {
  const models = app.models;

  async.parallel({
    movies: async.apply(createMovies),
    artists: async.apply(createArtists),
    countries: async.apply(createCountries),
    users: async.apply(createUsers),
  }, function(err, results) {
    if (err) throw err;

    log(`Created ${results.movies.length} movies`);
    log(`Created ${results.artists.length} artists`);
    log(`Created ${results.countries.length} countries`);
    log(`Created ${results.users.length} users`);
  });

  function createMovies(cb) {
    models.Movie.create(SEEDS_MOVIES, cb);
  }

  function createArtists(cb) {
    models.Artist.create(SEEDS_ARTISTS, cb);
  }

  function createCountries(cb) {
    models.Country.create(SEEDS_COUNTRIES, cb);
  }

  function createUsers(cb) {
    models.User.create(SEEDS_USERS, cb);
  }
};
