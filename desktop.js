//Desktop object
// var menu;
desktop = {
    background: "#5eade1",
    height: '100%',
    width: "auto",
    bgSize: "cover",
    menu: {
        show: function (event) {
            event.preventDefault();
            var menu = document.querySelector('.menu');
            menu.style.display = 'block';
            menu.style.top = (event.pageY) + 'px';
            menu.style.left = (event.pageX) + 'px';
        },
        hide: function () {
            var menu = document.querySelector('.menu');
            menu.style.display = 'none';
        },
        changebg: function () {
            input = document.querySelector('input[type=file]');
            input.click();
            input.onchange = function () {
                var reader = new FileReader();

                if (input.files[0]) {
                    reader.readAsDataURL(input.files[0]);
                }
                reader.onload = function () {
                    desktop.background = "url(" + reader.result + ")";
                    desktop.render();
                }
            }
        }
    },

    render: function () {
        var desktop = document.querySelector(".desktop");
        desktop.style.height = this.height;
        desktop.style.width = this.width;
        desktop.style.background = this.background;
        desktop.style.backgroundSize = this.bgSize;
        desktop.oncontextmenu = this.menu.show;
        desktop.onclick = this.menu.hide; setInterval(this.save(), 20000);
        document.querySelector('#changeBg').onclick = this.menu.changebg;
        this.menu.hide();
        document.querySelector('#newWindow').addEventListener('click', function () {

            lastWindow = collection.objects.reverse()[0];
            newWindow = new myWindow();
            //    newWindow.render();

            if (!lastWindow) {
                lastWindow = newWindow
            }

            newWindow.model.id = lastWindow.model.id + 1;
            newWindow.model.top = parseInt(lastWindow.model.top) + 12 + 'px';
            newWindow.model.left = parseInt(lastWindow.model.left) + 12 + 'px';
            newWindow.model['z-index'] = lastWindow.model['z-index'] + 1;
            newWindow.render();
            collection.objects.push(newWindow);
            
        })
        // var last_window = collection.object_store.reverse[0];
        // last_window.newWindow.render();
    },
    save: function () {
        var model = {
            background: this.background,
            height: this.height,
            width: this.width,
            bgSize: this.bgSize,
        }
        localStorage.setItem('desktop', JSON.stringify(model));
    }
}

var collection = {
    objects: [],
    save: function () {
        var dataToStore = [];
        this.objects.forEach(function (instance) {
            dataToStore.push(instance.model);
        });
        localStorage.setItem('windows', JSON.stringify(dataToStore))
    }
};

desktopBootLoader = function () {
    storedData = localStorage.getItem('desktop');
    actualData = JSON.parse(storedData);

    if (!!actualData) {
        desktop.background = actualData.background;
        desktop.height = actualData.height;
        desktop.width = actualData.width;
        desktop.backgorundSize = actualData.backgorundSize;
    }
}
desktopBootLoader(); 
setInterval(collection.save(), 2000);
// windowsBootloader();