<html lang='en'>
<head>
    <meta charset='UTF-8'>
    <meta name='viewport' content='width=device-width, initial-scale=1.0'>
    <title>Docker Compose App</title>
</head>
<body style="background:#eee;">
    <ul>
        <?php

            // get users from the backend service
            $json = file_get_contents('http://backend/users');
            $users = json_decode( $json );

            // print each user
            foreach( $users as $user ) {
                ?>
                    <li><?php echo $user->name?></li>
                <?php
            }
        ?>
    </ul>
</body>
</html>