<p align="center">
  <img alt="PhotoBox Logo" src="https://github.com/alexisgauvrit/PhotoBox/blob/master/Dist/images/favicon.ico">
</p>

<h1 align="center">PhotoBox</h1>

One Paragraph of project description goes here.

This project is set for french users.

## :clipboard: Features

### :house: Home Page

<p align="center">
  <img alt="Home screen capture" src="https://github.com/alexisgauvrit/PhotoBox/blob/Version-2.0-NodeJS/Dist/images/Features/home.png">
</p>

On the home page, you can upload an image file (.jpeg, .jpg, .png, gif, .svg, .bmp) by clicking on "Choisir une image" (Choose an image file).

You can also, go to the add comment page by clicking on "Envoyer un message" (send a comment).

### :clapper: SlideShow Page

You can access to this page with the URL : "/slideshow".

<p align="center">
  <img alt="Slideshow screen capture" src="https://github.com/alexisgauvrit/PhotoBox/blob/Version-2.0-NodeJS/Dist/images/Features/slideshow1.png">
</p>

On this page, you can see a slideshow with all image uploaded. You can see also user's comments at the bottom of this page (image 2).

<p align="center">
  <img alt="Slideshow screen capture" src="https://github.com/alexisgauvrit/PhotoBox/blob/Version-2.0-NodeJS/Dist/images/Features/slideshow2.png">
</p>

### :speech_balloon: Add comment Page

You can access to this page with the URL : "/addComment" or with the home page.

<p align="center">
  <img alt="Slideshow screen capture" src="https://github.com/alexisgauvrit/PhotoBox/blob/Version-2.0-NodeJS/Dist/images/Features/addComment.png">
</p>

On this page, you can send a comment. You have to write your username ("pseudo") and your message. To send it click on "Envoyer le commentaire" (send the comment).

### :lock: Admin Page

<p align="center">
  <img alt="Slideshow screen capture" src="https://github.com/alexisgauvrit/PhotoBox/blob/Version-2.0-NodeJS/Dist/images/Features/admin1.png">
</p>

You can access to this page with the URL : "/admin". You have to write the admin key to access to this page.

<p align="center">
  <img alt="Slideshow screen capture" src="https://github.com/alexisgauvrit/PhotoBox/blob/Version-2.0-NodeJS/Dist/images/Features/admin2.png">
</p>

On this page, you can see many data, number of users connected ("Nombre de personnes total"), the list of comments sent ("Liste des commentaires envoyées"), the list of file remove from the slideshow ("Liste des fichiers upload et supprimé du diaporama") and the list of file visible in the slideshow ("Liste des fichiers upload et visible dans le diaporama").

Foreach file upload, you can remove it from the slideshow by clicking on "Supprimer du diapo" (remove from slideshow), it will be not visible after.
Foreach file remove from the slideshow, you can add it in the slideshow by clicking "Ajouter au diapo" (add to slideshow), it will be visible after.


## :rocket: Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.

### :triangular_ruler: Prerequisites

You need to download [NodeJS](https://nodejs.org/) if you don't have it.

You need to clone this repo, run :

```
git clone "https://github.com/alexisgauvrit/PhotoBox.git"
```

### :wrench: Installing

Run command :

```
npm install
```

After that, you need to create a config.json file (./PhotoBox/config.json) like that (you have to complete with your data) :

```
{
    "port" : "CUSTOM_PORT",
    "upload_path" : "FAKE/PATH/",
    "deleted_path" : "FAKE/PATH/2/",
    "application_name" : "PhotoBox",
    "admin_key" : "CUSTOM_ADMIN_KEY"
}
```

* "port" : is the port witch listen nodeJS for this application.
* "upload_path" : is the path which is use to store upload files (need "/" at the end (linux) / need "\\" at the end (Windows)).
* "deleted_path" : is the path which is use to store deleted files (need "/" at the end (linux) / need "\\" at the end (Windows)).
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