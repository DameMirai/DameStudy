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
    $('#game_board').append("AA");
}