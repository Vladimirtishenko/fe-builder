var fs = require('fs');
var source = require('./stucture.json');

(function createTree(tree, folder){

for(var mark in tree){

	if(typeof tree[mark] == 'object'){
		if (!fs.existsSync(folder + mark)){
		    fs.mkdirSync(folder + mark);
		}
		folder += mark + "/";
		createTree(tree[mark], folder);

	} else {
		if(tree[mark] == ""){
			if (!fs.existsSync(folder + mark)){
			    fs.mkdirSync(folder + mark);
			}
		} 
		else if(!isNaN(mark)){
			fs.createReadStream('./source/'+tree[mark]).pipe(fs.createWriteStream(folder+tree[mark]));
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
    	fs.createReadStream('./source/'+listFiles[i]).pipe(fs.createWriteStream(folder+listFiles[i]));	
    }
}

