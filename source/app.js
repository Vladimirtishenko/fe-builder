import Router from './router.js';

class App {
    constructor() {
        this.getRoute();
    }

    getRoute(){
        let ctrl = Router.getController(window.location.pathname);

        this.launchController(ctrl);
    }

    async launchController(ctrl){
        if(!ctrl) return;

        const file = await import('./controllers/' + ctrl + '.ctrl.js'),
              controller = file.default;

        if(controller){
            new controller();
        }
    }
}

window.addEventListener('DOMContentLoaded', function(){
    new App();
});
