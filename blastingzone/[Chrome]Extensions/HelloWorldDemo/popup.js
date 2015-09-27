var gameBoard = [];
var rawWordList = ['apple', 'banana', 'pineapple', 'mango', 'blueberry', 'guava', 'cherry', 'grape'];
var width = "";
var height = "";
var wordMap2D = [[]];

$(document).ready(function () {
    $('#game_board').html("<h2>Change</h2>");

    $('#board_create_btn').click(function () {
        createGameBoard();
    });
});

function clearGameBoard()
{
    $('#game_board').empty();
}

function createGameBoard()
{
    clearGameBoard();

    width = $('input[name=board_width_len]').val();
    if (width === "") width = 5;
    else width = parseInt(width);

    height = $('input[name=board_height_len]').val();
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

function setPuzzleWord(wordList, maxWord)
{
    for (var i = 0; i < maxWord; ++i)
    {
        // randomly select word idx
        var selectedIdx = Math.floor(Math.random() * wordList.length);

        // extract word by idx
        var selectedWord = wordList[selectedIdx].substr(0);

        // remove word from row array
        wordList.splice(selectedIdx, 1);

        console.debug(selectedWord);

        // if words run out, escape loop
        if (wordList.length === 0) break;
    }
}

function addWordToWordManager(word)
{
    if (typeof width === "number" && typeof height === "number")
    {
        // if word length is longer than puzzle board width
        var isHorizon = false;
        if (word.length >= width) isHorizon = true;

        // if word length is longer than puzzle board height
        var isVertical = false;
        if (word.length >= height) isVertical = true;

        // if puzzle map is too small, escape loop
        if (isHorizon === false && isVertical === false) return; 


    }
    else
    {
        console.debug("Map Size Error");
        return;
    }
}

function findCrossIdxBetweenWords(firstWord, secondWord)
{
    var result = {};

    for(var i = 0; i < firstWord.length; ++i)
    {
        var indexOfSecond = secondWord.indexOf(firstWord[i]);

        if(indexOfSecond !== -1)
        {
            if (result[i] === undefined) result[i] = [];

            result[i].push(indexOfSecond);
        }
    }

    return result;
}