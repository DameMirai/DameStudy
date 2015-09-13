function runExternalScript(fileName){
    chrome.tabs.executeScript(null, {
        file: fileName,
    }, function() {
        if (chrome.extension.lastError) {
            document.body.innerText = ('There was an error injecting script : \n' + chrome.extension.lastError.message);
        }
    });
}

function onWindowLoad(){
    runExternalScript('killD.js');
}

window.addEventListener('load', onWindowLoad, false);
