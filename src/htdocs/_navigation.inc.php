<?php
  include_once '../conf/config.inc.php';

  print navGroup('Cone Penetration Testing',
      navItem($MOUNT_PATH . '/index.php', 'Overview') .
      navItem($MOUNT_PATH . '/data/', 'Data') .
      navItem($MOUNT_PATH . '/pubs.php', 'Publications')
    );
