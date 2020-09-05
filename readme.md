# Proffy

<p align="center">
  <img alt="Sample" src="images/Proffy.gif" />
  <a href="https://opensource.org/licenses/MIT" target="_blank">
    <img alt=“License: MIT” src="https://img.shields.io/badge/License-MIT-yellow.svg" />
  </a>
</p>

## What is Proffy ?

Proffy is a project developed during Next Level Week 2.0, an online event made by Rocketseat

## Why "Proffy 2.0" ?

This repository is called Proffy 2.0 because it is the second version of this project, with a lot of new functionalities, for example, Login/Register system, profile and etc.

## How to run in your machine ?

### Before continuing, be sure that you have:

- [Git](https://git-scm.com/downloads)
- [Node JS LTS](https://nodejs.org/en/download/)
- [Yarn](https://classic.yarnpkg.com/en/docs/install#windows-stable)
- [Docker Desktop](https://www.docker.com/get-started)

### Before following the next steps:

```bash
# Clone this repository
git clone https://github.com/tsuyusk/proffy-two

# Go to "proffy-two" folder
cd proffy-two
```

### How to start running the server

```bash
  # Go to "server" folder
  cd server

  # Install dependencies
  yarn

  # Create a PostgreSQL database instance
  docker run --name name_of_instance -e POSTGRES_PASSWORD=your_password -p 5432:5432 -d postgres

  # Create a database in this instance
  # Create a .env file with the same variables than '.env.example' file, filling the empty variables

  # Start the server
  yarn start:ts / yarn dev:server
```

### How to start running the web version

```bash
  # Go to "web" folder
  cd web

  # Install dependencies
  yarn

  # Start the "web" version
  yarn start

  # Access http://localhost:3000 in your browser
```

<p align="center">
  Made with 💜 by tsuyusk
</p>
