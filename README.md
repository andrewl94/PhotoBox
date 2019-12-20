<p align="center">
  <img alt="PhotoBox Logo" src="https://github.com/alexisgauvrit/PhotoBox/blob/Road-to-version-2.0/Dist/images/favicon.ico">
</p>

<h1 align="center">PhotoBox</h1>

One Paragraph of project description goes here

## :rocket: Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.

### :triangular_ruler: Prerequisites

You need to download [NodeJS](https://nodejs.org/) if you don't have it.

You need to clone this repo, run :

```
git clone "https://github.com/alexisgauvrit/PhotoBox.git"
```

### :wrench: Installing

Open CMD, go to the folder witch contain's the application code and run command :

```
npm install
```

After that, you need to create a config.json (./PhotoBox/config.json) file like that (you have to complete with your data) :

```
{
    "port" : "CUSTOM_PORT",
    "upload_path" : "FAKE/PATH/",
    "deleted_path" : "FAKE/PATH/2",
    "application_name" : "PhotoBox",
    "admin_key" : "CUSTOM_ADMIN_KEY"
}
```

* "port" : is the port witch listen nodeJS for this application.
* "upload_path" : is that path which is use to store upload files.
* "application_name" : is the name of the application which is use by all pages of the application.
* "admin_key" : is the key use to access to admin panel.

## :metal: Deployment

### If you want to use your server :

You have to create a reverse proxy to redirect your 80 port to your custom port.

I recommand you this tutorial : [How To Serve Node.js Applications with Nginx](https://morioh.com/p/fe738bbd2664).

Now you can enjoy it.

### if you want to use a new server :

You can download an ISO image of raspbian : [here](https://google.com/)

## :hammer: Built With

* [NodeJS](https://nodejs.org/)
* [NPM](https://www.npmjs.com/)
* [Express](https://expressjs.com/)

## :open_file_folder: Versioning

We use [SemVer](http://semver.org/) for versioning. For the versions available, see the [tags on this repository](https://github.com/alexisgauvrit/PhotoBox/tags). 

## :handshake: Authors

* :bust_in_silhouette: **Alexis Gauvrit** - *Initial work* - [alexisgauvrit](https://github.com/alexisgauvrit)

See also the list of [contributors](https://github.com/alexisgauvrit/PhotoBox/graphs/contributors) who participated in this project.

## :trophy: License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details