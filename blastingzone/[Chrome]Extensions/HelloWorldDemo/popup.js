var gameBoard = [];
var rawWordList = ['apple', 'banana', 'pineapple', 'mango'];

$(document).ready(function () {
    createGameBoard();
    $('#game_board').html("<h2>Change</h2>");

    $('#board_create_btn').click(function () {
        createGameBoard();
    });
});

function createGameBoard()
{
    var width = $('input[name=board_width_len]').val();
    if (width === "") width = 5;
    else width = parseInt(width);

    var height = $('input[name=board_height_len]').val();
    if (height === "") height = 5;
    else height = parseInt(height);

    var blankTileHtml = "";

    // create blank board
    for (var row = 0; row < height; ++row)
    {
        blankTileHtml += "<div style='width:"+ width * 64 +"px;'>";
        for (var col = 0; col < width; ++col)
        {
            blankTileHtml += "<div class='gameTile'" + "data-x='" + row + "' data-y='" + col + "' ></div>";
        }
        blankTileHtml += "</div>";
    }

    $('#game_board').append(blankTileHtml);
}

function getTileObj(x, y)
{
    console.debug($('.gameTile[data-x=' + x + '][data-y=' + y + ']'));
    return $('.gameTile[data-x=' + x + '][data-y=' + y + ']');
}

function setPuzzleWord(wordList)
{
    // randomly select word
    var maxIdx = wordList.length - 1;
    console.debug(wordList.length);
    console.debug(Math.floor(Math.random()));
}