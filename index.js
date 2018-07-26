var fs = require('fs');
var source = require('./stucture.json');
var package = require('./package.json').dependencies;

module.exports = (function() {


    (function basicInit() {

        require('child_process').exec('npm init --yes', function(error, out) {
            var pathToPackage = __dirname + '/package.json',
                gitignore = __dirname + '/source/.gitignore',
                npmignore = __dirname + '/source/.npmignore',
                read,
                json;

            if (!error) {
            	try {
            		read = fs.readFileSync("package.json", 'utf8');
	                json = JSON.parse(read);
	                json.dependencies = package;
	                fs.writeFileSync("package.json", JSON.stringify(json, null, 4))
                    if (fs.existsSync(__dirname + '/source/.npmignore')) {
                        fs.renameSync(__dirname + '/source/.npmignore', __dirname + '/source/.gitignore')
                    }
            	} catch(e){
            		console.log(e);
            	}
            }
            createTree(source, "")
        });

    }())

    function createTree(tree, folder) {

        for (var mark in tree) {

            if (typeof tree[mark] == 'object') {
                if (!fs.existsSync(folder + mark)) {
                    fs.mkdirSync(folder + mark);
                }
                folder += mark + "/";
                createTree(tree[mark], folder);
                folder = "public/";

            } else {
                if (tree[mark] == "") {
                    if (!fs.existsSync(folder + mark)) {
                        fs.mkdirSync(folder + mark);
                    }
                } else if (!isNaN(mark)) {
                    fs.createReadStream(__dirname + '/source/' + tree[mark]).pipe(fs.createWriteStream(folder + tree[mark]));
                } else if (mark == "$") {
                    cycleCopy(tree[mark], "")
                } else {
                    if (!fs.existsSync(folder + mark)) {
                        fs.mkdirSync(folder + mark);

                        cycleCopy(tree[mark], folder + mark + "/")

                    }
                }
            }

        }

    }

    function cycleCopy(tree, folder) {
        var listFiles = tree.split(', ');
        for (var i = listFiles.length - 1; i >= 0; i--) {

            if (listFiles[i].indexOf('http') > -1) {
                require('child_process').exec('git clone https://github.com/Vladimirtishenko/core-ui-framework.git ' + folder);
            } else {
                fs.createReadStream(__dirname + '/source/' + listFiles[i]).pipe(fs.createWriteStream(folder + listFiles[i]));
            }
        }
    }

})();
