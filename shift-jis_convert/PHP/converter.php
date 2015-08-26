<?php
$origPath = "../strings.txt";
$resultPath = "result.txt";
$origFile = fopen($origPath, 'r+') or die('Failed to open file : ' . $origPath);
$resultFile = fopen($resultPath, 'a+') or die('Failed to open file : ' . $resultPath);

while (!feof($origFile)) {
    $convertedStr = mb_convert_encoding(stripcslashes(fgets($origFile)), "UTF-8", "Shift-JIS");
    fwrite($resultFile, $convertedStr);
    // $newPath = "../" . str_replace("\n", "", $convertedStr);
    // echo $newPath;
    // $newFile = fopen($newPath . '.zip', 'a+') or die('Failed to open file : ' . $newPath);
    // fclose($newFile);
}
fclose($origFile);
fclose($resultFile);
?>
