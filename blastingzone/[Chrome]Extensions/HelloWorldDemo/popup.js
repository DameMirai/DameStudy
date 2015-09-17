var gameBoard = [];

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
        for (var col = 0; col < width; ++col)
        {
            blankTileHtml += "<div class='gameTile'></div>";
        }
    }

    $('#game_board').append(blankTileHtml);
}