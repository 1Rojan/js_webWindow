var desktop;

var collection = {
    objects: [],
    save: function () {
        var dataToStore = [];
        this.objects.forEach(function (instance) {
            dataToStore.push(instance.model); 
        });
        localStorage.setItem('windows',JSON.stringify(dataToStore));
    }
};

setInterval(() => {
    collection.save();
}, 2000);

windowsBootloader = function() {
    storeddata = localStorage.getItem('windows');
    actualData = JSON.parse(storeddata);
    if (!!actualData) {
        actualData.forEach(function(windowData) {
            var newWindow = new ourWindow();
            newWindow.model = windowData;
            newWindow.render();
            collection.objects.push(newWindow);
        });
    }
}

desktop.render();
windowsBootloader();
// window.render();
