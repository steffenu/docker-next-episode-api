![Docker](https://img.shields.io/badge/docker-%230db7ed.svg?style=for-the-badge&logo=docker&logoColor=white)

# Next Episode Api

Add Tv series to a list. See what Tv series have a episode airing today / tomorrow.

Useful for creating Notifications.

### Docker Container including :

- TvMaze Api
- NodeJs
- MariaDb

# Inhalte

- [How to use](#how-to-use)
- [Endpoints](#endpoints)

# How to use

build container

```docker
docker-compose build
```

Run container

```docker
docker-compose up -d
```

Add a Tv series via the /add Endpoint:

Example

`http://localhost/add/The Witcher`

It will look up the series name via the Tvmaze api and add the following entry to database:

| id  | name        | status  |
| --- | ----------- | ------- |
| 123 | The Witcher | Running |

# Endpoints ![](https://img.shields.io/badge/NextEpisodeApi-blue.svg?logo=Docker&color=fff)

`http://localhost/all` all series you added \
`http://localhost/add/:seriesName` add series by name (closest match) \
`http://localhost/remove/:id` - remove series by id \
`http://localhost/today/` all series that air a episode today \
`http://localhost/tomorrow` all series that air a episode tomorrow
