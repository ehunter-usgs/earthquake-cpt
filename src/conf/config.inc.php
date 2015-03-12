<?php

$CONFIG = parse_ini_file('config.ini');

$MOUNT_PATH = $CONFIG['MOUNT_PATH'];
$DATA_DIR = $CONFIG['DATA_DIR'];

$db = new PDO($CONFIG['DB_DSN'], $CONFIG['DB_USER'], $CONFIG['DB_PASSWORD']);
$db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
