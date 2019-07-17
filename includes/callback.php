<?php

    // GET GLOBALES INFORMATIONS
    require_once "./global.php";

    //var_dump(URL_IMAGES);

    $fi = new FilesystemIterator(URL_IMAGES, FilesystemIterator::SKIP_DOTS);
    
    $number_files = iterator_count($fi);

    if (($_FILES['file']['name']!="")){
        // Where the file is going to be stored
        $file = $_FILES['file']['name'];
        $path = pathinfo($file);
        $filename = $number_files+1;//$path['filename'];
        $ext = $path['extension'];
        $temp_name = $_FILES['file']['tmp_name'];
        $path_filename_ext = URL_IMAGES.$filename.".".$ext;
    
        // Check if file already exists
        if (file_exists($path_filename_ext)) {
            echo "Le fichier existe déjà.";
        }else{
            $uploaded = move_uploaded_file($temp_name,$path_filename_ext);
            if($uploaded){
                echo 1;
            }
            else{
                echo "Le fichier n'a pas pu être créé, sa taille est supérieure à 5Mo.";
            }
        }
    }
    else{
        echo "Aucun fichier envoyé.";
    }


?>