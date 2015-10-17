String.prototype.replaceAll = function(from, to, caseSensitive){
    var target;
    if (caseSensitive === true) {
        target = new RegExp(from, 'g');
    }else{
        target = new RegExp(from, 'gi');
    }
    return this.replace(target, to);
};

String.prototype.searchAll = function (str, caseSensitive) {
    var target;
    if (caseSensitive === true) {
        target = new RegExp(str, 'g');
    }else{
        target = new RegExp(str, 'gi');
    }
    var results = [];
    while (target.exec(this)) {
        results.push(target.lastIndex - str.length);
    }
    return results;
};

function findElementByText(ele, text){
    var target = $(ele + ":contains(" + text + ")").filter(function(){ return $(this).childElementCount === 0;});
    return target;
}

console.log(findElementByText('a', '됬'));
console.log(findElementByText('div', '됬'));
console.log(findElementByText('p', '됬'));
console.log(findElementByText('b', '됬'));
// document.body.innerHTML = document.body.innerHTML.replaceAll('됬', '됐', false);
// console.log($("p:contains('됬')"));
