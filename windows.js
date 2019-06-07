var elemnt;

function dragMouseDown(thisWindow, e) {
    e = e || window.event;
    elemnt = thisWindow.Clonewindow;
    thisDraggedWindow = thisWindow;

    e.preventDefault();
    //mouse position at startup
    pos3 = e.clientX;
    pos4 = e.clientY;
    document.onmouseup = closeDragElement;
    // call function when mouse moves
    document.onmousemove = elementDrag;
}

function elementDrag(e) {
    e = e || window.event;
    e.preventDefault();
    // calculate new cursor position
    pos1 = pos3 - e.clientX;
    pos2 = pos4 - e.clientY;
    pos3 = e.clientX;
    pos4 = e.clientY;
    // set the element to the new calculated
    elemnt.style.top = elemnt.offsetTop - pos2 + "px";
    elemnt.style.left = elemnt.offsetLeft - pos1 + "px";
    thisDraggedWindow.model.top = elemnt.style.top;
    thisDraggedWindow.model.left = elemnt.style.left;
}

function closeDragElement() {
    // stop moving when the mouse button is released
    document.onmouseup = null;
    document.onmousemove = null;
}
// }

var myWindow = function () {

    // this.Clonewindow = null;
    this.model = {
        id: 0,
        height: '400px',
        width: '500px',
        top: '20px',
        left: '100px',
        'z-index': 0,
        state: 'normal'
    }

    
    this.restore = function () {
        this.Clonewindow.classList.remove('minimize');
        this.Clonewindow.classList.remove('maximize');
        this.Clonewindow.querySelector('.fa-minus').style.display = "inline";
        this.Clonewindow.querySelector('.fa-square').style.display = "inline";
        this.Clonewindow.querySelector('.fa-window-restore').style.display = "none";
        this.model.state = "normal";
    }

    this.minimize = function () {

        this.Clonewindow.classList.add('minimize');
        // this.Clonewindow.classList.remove('maximize');
        this.Clonewindow.querySelector('.fa-minus').style.display = "none";
        this.Clonewindow.querySelector('.fa-window-restore').style.display = "inline";
        this.Clonewindow.querySelector('.fa-square').style.display = "inline";
        this.model.state = "minimized";
    }

    this.maximize = function () {
        this.Clonewindow.classList.add('maximize');
        this.Clonewindow.classList.remove('restore');
        this.Clonewindow.querySelector('.fa-square').style.display = "none";
        this.Clonewindow.querySelector('.fa-minus').style.display = "inline";
        this.Clonewindow.querySelector('.fa-window-restore').style.display = "inline";
        this.model.state = "maximized";
    }


    this.close = function () {
        var newThis = this;
        this.Clonewindow.remove();
        collection.objects = collection.objects.filter(function (item) {
            return (item.model.id != newThis.model.id)
        })
        delete (this);
    }

    this.reRender = function () {
        this.Clonewindow.style.top = this.model.top;
        this.Clonewindow.style.height = this.model.height;
        this.Clonewindow.style.width = this.model.width;
        this.Clonewindow.style.left = this.model.left;
        this.Clonewindow.style.zIndex = this.model['z-index'];
        var desktop = document.querySelector('.desktop');
        desktop.append(this.Clonewindow);
    }

    this.render = function () {
        var thisWindow = this;
        var originalWindow = document.querySelector('#originalWindow');
        this.Clonewindow = originalWindow.cloneNode(true);
        this.Clonewindow.style.top = this.model.top;
        this.Clonewindow.style.height = this.model.height;
        this.Clonewindow.style.width = this.model.width;
        this.Clonewindow.style.left = this.model.left;
        this.Clonewindow.style.zIndex = this.model['z-index'];
        this.Clonewindow.id = "random" + this.model.id;
        this.Clonewindow.classList.remove('hidden');
        var desktop = document.querySelector('.desktop');
        this.Clonewindow.querySelector('.fa-times').addEventListener('click', function (e) {
            e.stopPropagation();
            thisWindow.close();
        });
        this.Clonewindow.querySelector('.fa-square').addEventListener('click', function () {
            thisWindow.maximize();
        });
        this.Clonewindow.querySelector('.fa-window-restore').addEventListener('click', function () {
            thisWindow.restore();
        });
        this.Clonewindow.querySelector('.fa-minus').addEventListener('click', function () {
            thisWindow.minimize();
        });
        this.Clonewindow.addEventListener('click', function () {
            collection.objects.forEach(function (obj) {
                obj.model["z-index"] = 0;
            })
            thisWindow.model["z-index"] = 999;
            thisWindow.reRender();
        });

        if (this.model.state == "normal") {

            this.Clonewindow.onmousedown = function () {
                dragMouseDown(thisWindow, event);
            };
        }
        if (this.model.state == "maximized") {

            this.Clonewindow.onmousedown = function () {
                dragMouseDown(thisWindow, event);
            };
        }
        if (this.model.state == "minimized") {

            this.Clonewindow.onmousedown = function () {
                return null;
            };
        }

        desktop.append(this.Clonewindow);
        
        console.log(thisWindow);
    }
}

