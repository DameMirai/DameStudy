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
    runExternalScript("jquery-2.1.4.min.js");
    runExternalScript('killD.js');
    // runExternalScript("http://code.jquery.com/jquery.min.js");
}

window.addEventListener('load', onWindowLoad, false);
