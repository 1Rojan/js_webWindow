

// var desktop;

var myWindow = function () {
    win = document.querySelector('.mywindow');
    this.model = {        //object variable
        height: '300px',
        width: "500px",
        top: "20px",
        left: "20px",
        'z-index': "0",
        state: "normal"
    }
    

    this.minimize = function () {
        win.classList.remove('maximize');
        win.classList.add('minimize');
        document.querySelector('.title-bar').style.height = 'auto';
        document.querySelector('.fa-square').style.display = 'none';
        document.querySelector('.fa-window-restore').style.display = 'inline';

    }

    this.maximize = function () {
        win.classList.add('maximize');
        console.log('hello');
        document.querySelector('.fa-square').style.display = 'none';
        document.querySelector('.fa-window-restore').style.display = 'inline';
    }


    this.restore = function () {
        win.classList.remove('maximize');
        win.classList.remove('minimize');
        document.querySelector('.fa-square').style.display = 'inline';
        document.querySelector('.fa-window-restore').style.display = 'none';

    }
    this.close = function () {

    }

    this.render = function () {
       
            var originalWindow = document.querySelector('.mywindow');;
            var cloneWindow = originalWindow.cloneNode(true);
            cloneWindow.style.height = this.model.height;
            cloneWindow.style.width = this.model.width;
            cloneWindow.style.top = this.model.top;
            cloneWindow.style.left = this.model.left;
            cloneWindow.style.zIndex = this.model['z-index'];
            cloneWindow.id = "random";
            document.querySelector('.desktop').appendChild(cloneWindow);
         newthis = this;
     
        document.querySelector('.fa-square').addEventListener('click', function () {
            newthis.maximize();
        })
        document.querySelector('.fa-minus').addEventListener('click', function () {
            newthis.minimize();
            document.querySelector('.fa-window-restore').addEventListener('click', function () {
                newthis.restore();
            })
        })

        //     var cloneWindow = originalWindow.cloneNode(true);
        //     cloneWindow.style.height = this.model.height;
        //     cloneWindow.style.width = this.model.width;
        //     cloneWindow.style.top = this.model.top;
        //     cloneWindow.style.left = this.model.left;
        //     cloneWindow.style.zIndex = this.model.['z-index'];
        //     desktop.appendChild(cloneWindow);
        // }
    }
}
newWindow = new myWindow();
newWindow.render();
collection.objects.push(newWindow);
