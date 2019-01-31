# Installing
For installing Front End Infrastructure that consist of (Stylus, Pug, Webpack + Babel, Gulp), you must do all at an example:

```sh
$ cd /to/project/folder
$ npm i fe-builder
$ echo "require('fe-builder')" >> index.js && node index.js && rm index.js
```

Now you have project tree:
- public
    - img
    - fonts
    - build
    - css
    - js
        - app.js (Entry point for webpack)
    - pug
        - layout
            - layout.pug (Layout for all block with link css to path /build)
        - include (Folder for some included files e.g: header.pug, menu.pug et al.)
        - index.pug (Main html block content)
    - styl
        - vendor
          - bootstrap.styl
        - blocks
        - common
            - \_\_modificators
            - defaults.styls
- webpack.config.js (With architecture for transform stylus to CSS, ES6/ES7/ES8 to ES5 and .pug to .html)
- .babelrc
- .gitignore
- node_modules

# Reqirement

- Node.js >= 8+
- NPM >= 3.10.*
- Webpack 4+


# Tech

Dillinger uses a number of open source projects to work properly:

* [Twitter Bootstrap] - great UI boilerplate for modern web apps
* [node.js] - evented I/O for the backend
* [Express] - fast node.js network app framework [@tjholowaychuk]
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
