<?php
    // GET GLOBALES INFORMATIONS
    require_once "./includes/global.php";
?>

<!DOCTYPE html>
<html lang="fr">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <meta http-equiv="X-UA-Compatible" content="ie=edge">
        <title><?php echo APP_NAME;?></title>
        <script type="text/javascript" src="./js/jquery-3.4.1.min.js" ></script>
        <link rel='icon' href='./images/favicon.ico' type='image/x-icon'/>
        <link rel="stylesheet" href="./css/fontawesome-5.9.0/css/all.min.css">
        <link rel="stylesheet" href="./css/jquery-confirm.min.css">
        <link rel="stylesheet" href="./css/main.css?<?php echo APP_VERSION;?>">
    </head>
    <body>
        <div id="background_container">
            <div id="main_container">
                <div id="form_container">
                    <form>
                        <i class="fas fa-camera"></i>
                        <h1><?php echo APP_NAME;?></h1>
                        <div id="input_container">
                            <input type="file" name="file" class="imputfile" id="fileInput" accept='image/*' />
                            <label for="fileInput">
                                <span>Choisir une image</span>
                            </label>
                        </div>

                        <div id="imageSet_container">
                            <div id="preview_container">
                                <img id="imageToUpload" />
                                <a id="changeImg">Changer d'image</a>
                            </div>

                            <button type="submit" id="btnValid"><span>Envoyer l'image</span></button>
                        </div>

                        <div id="loader"></div>

                        <div id="uploadOk">
                            <i class="fas fa-check-circle"></i>
                            <p>
                                Votre image a bien été envoyée sur le PhotoBox. Veuillez patienter quelques instants et vous pourrez la voir à l'écran.
                            </p>
                            <a id="newImg">Envoyer une nouvelle image</a>
                        </div>
                    </form>
                </div>
            </div>
        </div>

        <script type="text/javascript" src="./js/jquery-confirm.min.js" ></script>
        <script type="text/javascript" src="./js/main.js?<?php echo APP_VERSION;?>" ></script>
    </body>
</html>