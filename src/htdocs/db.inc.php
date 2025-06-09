<?php

include_once '../conf/config.inc.php';

// Pass $DATA_DIR as an argument
function data_file_exists($result, $extension, $dataDir) {
    // Prevent path traversal
    $filename = basename($result['sounding']);
    $file = $dataDir . '/' . $extension . '/' . $filename . '.' . $extension;
    return file_exists($file);
}

try {
    $allowed = '/^[\w\-.]$/';
    $region = param('region', '');

    if ($region == 'table') {
        $region = '';
    }

    if (!preg_match($allowed, $region)) {
        $region = '';
        $db_filter = '%';
    } else {
        $db_filter = strtolower($region);
    }

    $statement = $db->prepare('
        SELECT
            *
        FROM
            nca_cptdata
        WHERE
            map
        LIKE
            :filter
        ORDER BY
            date
    ');

    $statement->bindValue(':filter', $db_filter, PDO::PARAM_STR);
    $statement->execute();

    $results = array_map(function ($result) use ($DATA_DIR) { // Pass $DATA_DIR
        $result['hasPdf'] = data_file_exists($result, 'pdf', $DATA_DIR);
        $result['hasTxt'] = data_file_exists($result, 'txt', $DATA_DIR);
        return $result;
    }, $statement->fetchAll(PDO::FETCH_ASSOC));

    $statement->closeCursor();

} catch (Exception $e) {
    // Log the error
    error_log("Database error: " . $e->getMessage());

    // Display a user-friendly error message
    echo "An error occurred. Please try again later.";
    // Or redirect to an error page:
    // header("Location: error.php");
    exit;
}
?>