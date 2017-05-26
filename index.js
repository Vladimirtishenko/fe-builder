var fs = require('fs');
var source = require('./stucture.json');
var package = require('./package_old.json').dependencies;

require('child_process').exec('npm init --yes', function (error, out) {
	var pathToPackage =  __dirname + '/package.json';
	if(!error){
		fs.readFile(pathToPackage, 'utf8', function(err, contents) {
			let json = JSON.parse(contents);
		    json.dependencies = package;
		    fs.writeFile (pathToPackage, JSON.stringify(json), function(err) {
                if (err) console.log('File package.json not created!');
                console.log('package.json created');
            });
		});
	}
});

module.exports = (function () {

(function createTree(tree, folder){

for(var mark in tree){

	if(typeof tree[mark] == 'object'){
		if (!fs.existsSync(folder + mark)){
		    fs.mkdirSync(folder + mark);
		}
		folder += mark + "/";
		createTree(tree[mark], folder);
		folder = "public/";

	} else {
		if(tree[mark] == ""){
			if (!fs.existsSync(folder + mark)){
			    fs.mkdirSync(folder + mark);
			}
		} 
		else if(!isNaN(mark)){
			fs.createReadStream(__dirname + '/source/'+tree[mark]).pipe(fs.createWriteStream(folder+tree[mark]));
		}
		else if(mark == "$"){
			cycleCopy(tree[mark], "")
		}
		else {
			if (!fs.existsSync(folder + mark)){
			    fs.mkdirSync(folder + mark);

			    cycleCopy(tree[mark], folder + mark+"/")  

			}
		}
	}

}

})(source, "")


function cycleCopy(tree, folder) {
	var listFiles = tree.split(', ');
    for (var i = listFiles.length - 1; i >= 0; i--) {

    	if(listFiles[i].indexOf('http') > -1){
    		require('child_process').exec('git clone https://github.com/Vladimirtishenko/core-ui-framework.git ' + folder);
    	} else {
    		fs.createReadStream(__dirname +  '/source/'+listFiles[i]).pipe(fs.createWriteStream(folder+listFiles[i]));	
    	}	
    }
}

})();




