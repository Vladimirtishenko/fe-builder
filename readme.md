# New version of JavaScript environment

Last development logs:

    * Structure has been slightly changed;
    * New version of Babel has been installed;
    * New function for extends bootstrap were added;
    * All dependencies were updated;
    * .eslint rules were changed

# Installing
For create Front End Infrastructure that consist of (Yarn, Stylus, Pug, Webpack + Babel, BEM):

- Intall yarn https://yarnpkg.com/lang/en/docs/install/#mac-stable

```sh
cd /to/project/folder
yarn i fe-builder
echo "require('fe-builder')" >> index.js && node index.js && rm index.js
```

Now you have project tree:
- public
    - img
    - fonts
    - build
    - css
    - js
        - controllers
            - home.ctrl.js ( First controller for main page /)
        - router.js (Router for resolving path and async load JS modules)
        - app.js (Js entry point)
        - index.js (Entry point for webpack)
    - pug
        - layout
            - layout.pug (Layout for all block with link css to path /build)
        - include (Folder for some included files e.g: header.pug, menu.pug et al.)
        - index.pug (Main html block content)
    - styl
        - vendor
          - bootstrap
            - bootstrap.styl ( Main bootstrap file that include just Bootstrap layout)
            - variables.styl ( Grid sizes for bootstrap )
            - function.styl ( Creating own cols- for bootstrap )
          - bem
            - \_\_modificators
                - \_\_\*.styl - (Static  bem modificators)
        - blocks
        - common
            - \_\_modificators
            - defaults.styls
- webpack.config.js (With architecture for transform stylus to CSS, ES6/ES7/ES8 to ES5 and .pug to .html)
- .babelrc
- .gitignore
- node_modules

# Launch

- Development

This command immediately open the browser on the http://localhost:8080, will make the build and will watches your changes!

```sh
yarn run dev
```

- Production

```sh
yarn run build
```

# Reqirement

- Node.js >= 8+
- Webpack 4+


# Tech

Dillinger uses a number of open source projects to work properly:

* [Twitter Bootstrap] - great UI boilerplate for modern web apps
* [node.js] - evented I/O for the backend
* [Webpack] - Module bundler
* [Pug] - The general rendering process of Pug is simple.
* [Stylus] - Expressive, dynamic, robust css

[//]: # (These are reference links used in the body of this note and get stripped out when the markdown processor does its job. There is no need to format nicely because it shouldn't be seen. Thanks SO - http://stackoverflow.com/questions/4823468/store-comments-in-markdown-syntax)


   [dill]: <https://github.com/joemccann/dillinger>
   [git-repo-url]: <https://github.com/joemccann/dillinger.git>
   [john gruber]: <http://daringfireball.net>
   [df1]: <http://daringfireball.net/projects/markdown/>
   [markdown-it]: <https://github.com/markdown-it/markdown-it>
   [Ace Editor]: <http://ace.ajax.org>
   [node.js]: <http://nodejs.org>
   [Twitter Bootstrap]: <http://twitter.github.com/bootstrap/>
   [jQuery]: <http://jquery.com>
   [@tjholowaychuk]: <http://twitter.com/tjholowaychuk>
   [express]: <http://expressjs.com>
   [AngularJS]: <http://angularjs.org>
   [Webpack]: <https://webpack.github.io/>
   [Pug]: <https://pugjs.org/api/getting-started.html>
   [Stylus]: <http://stylus-lang.com/>
