var fs = require('fs');
var source = require('./stucture.json');
var package = require('./package.json');

module.exports = (function() {


    (function basicInit() {

        require('child_process').exec('npm init --yes', function(error, out) {
            var pathToPackage = __dirname + '/package.json',
                read,
                json;

            if (!error) {
            	try {
            		read = fs.readFileSync("package.json", 'utf8');
	                json = JSON.parse(read);
                    json.dependencies = package.dependencies;
	                json.dependencies = package.scripts;
	                fs.writeFileSync("package.json", JSON.stringify(json, null, 4))
                    
                    if (fs.existsSync(__dirname + '/source/gitignore')) {
                        fs.renameSync(__dirname + '/source/gitignore', __dirname + '/source/.gitignore')
                    }

                    if (fs.existsSync(__dirname + '/source/babelrc')) {
                        fs.renameSync(__dirname + '/source/babelrc', __dirname + '/source/.babelrc')
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
            fs.createReadStream(__dirname + '/source/' + listFiles[i]).pipe(fs.createWriteStream(folder + listFiles[i]));
            
        }
    }

})();
