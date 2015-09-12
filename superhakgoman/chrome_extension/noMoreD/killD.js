String.prototype.replaceAll = function(from, to, caseSensitive){
    var target;
    if (caseSensitive === true) {
        target = new RegExp(from, 'gi');
    }else{
        target = new RegExp(from, 'g');
    }
    return this.replace(target, to);
};

document.body.innerHTML = document.body.innerHTML.replaceAll('됬', '됐', false);
