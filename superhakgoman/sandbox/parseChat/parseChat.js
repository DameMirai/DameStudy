DEV_MODE = true;

var ChatWindow = function(){
    function ChatWindow(){
        var wHead = document.querySelector("#chatBoard > thead");
        var wBody = document.querySelector("#chatBoard > tbody");
        this.addRow = function addRow(row){
            if(row.tagName != 'TR' && row.tagName != 'tr'){
                console.error("this is not table row");
                return;
            }
            wBody.appendChild(row);
        };
    }
    return new ChatWindow();
}();

function makeElement(name, attributes){
    var element = document.createElement(name);
    if(attributes !== undefined){
        for (var key in attributes) {
            if (attributes.hasOwnProperty(key)) {
                element[key] = attributes[key];
            }
        }
    }
    return element;
}

function getMissedProperty(obj, propArr){
    if(propArr.constructor.name !== 'Array'){
        throw new TypeError();
    }
    for (var i in propArr) {
        if (obj.hasOwnProperty(propArr[i]) !== true) {
            return propArr[i];
        }
    }
    return null;
}

function ChatRow(rowData){
    if(DEV_MODE === false){
        var missedProp = getMissedProperty(rowData, ['objectId', 'userName', 'comment', 'createdAt']);
        if( missedProp !== null) throw new Error('Property ' + missedProp  + ' is missing');
    }
    var objectId = rowData.objectId;
    var userName = rowData.userName;
    var comment = rowData.comment;
    var createdAt = rowData.createdAt;
    this.getObjectId = function getObjectId(){
        return objectId;
    };
    this.getUserName = function getUserName(){
        return userName;
    };
    this.getComment = function getComment(){
        return comment;
    };
    this.getCreatedAt = function getCreatedAt(){
        return createdAt;
    };
}

ChatRow.prototype.toDOMElement = function(){
    var trElement = makeElement('tr', {id : this.getObjectId()});
    trElement.appendChild(makeElement('td', {innerText : this.getUserName()}));
    trElement.appendChild(makeElement('td', {innerText : this.getComment()}));
    trElement.appendChild(makeElement('td', {innerText : this.getCreatedAt()}));
    return trElement;
};

var ChatTable = (function makeTable(){
    var instance = {
        recentLoaded : undefined,
    };
    var timeTable = {
        recentLoaded : undefined,
        lastRecordedDate : undefined,
    };
    var added = {};
    var loaded = [];
    instance.getRow = function(objectId){
        if(added.hasOwnProperty(objectId)){
            return added[objectId];
        }
    };
    instance.addRow = function(row){
        if(row instanceof ChatRow !== true){
            throw new TypeError('need ChatRow instance');
        }
        var oId = row.getObjectId();
        if (added.hasOwnProperty(oId)) {
            console.error("exist row id : " + oId);
        }else {
            loaded.push(row);
        }
    };
    instance.loadNewRow = function(){
        if(loaded.length > 0){
            var row = loaded.shift();
            var oId = row.getObjectId();
            if (added.hasOwnProperty(oId)) {
                return undefined;
            }
            added[oId] = row;
            return row;
        }
    };
    return instance;
})();
