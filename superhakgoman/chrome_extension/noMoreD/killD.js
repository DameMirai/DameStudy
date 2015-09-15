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

document.body.innerHTML = document.body.innerHTML.replaceAll('됬', '됐', false);
