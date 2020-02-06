# ephemeris
  Ephemeris is a meditation journal that predicts optimal meditation habits.

## Table of Contents

1. [Usage](#Usage)
2. [Requirements](#requirements)
3. [Development](#development)

## Usage

### Start app in Xcode Simulator

```sh
npm run start
```

### start script

```sh
npm run server-dev
```

## Requirements

With Node 10 LTS or greater installed, use npm to install the Expo CLI command line utility:

```sh
npm install -g expo-cli
```

## Development

### CRUD API

Create/POST:
```
app.post('/statsBefore')
app.post('/statsAfter')
```

Read/GET:
```
app.get('/')
```