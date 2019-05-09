class Router {
    static routes = {
        main: {
            path: new RegExp('^/$'),
            controller: 'home'
        }
    }

    static getController(fullPath){
        let Controller = null;

        for (let key in Router.routes) {
            let {path, controller} = Router.routes[key];
            if(path instanceof RegExp && path.test(fullPath)){
                Controller = controller;
                break;
            }
        }

        return Controller;
    }
}

export default Router;
