var config = require('../config.js');

var renderMap = function(){
	
	for (var i = 0; i < config.mapSizeX; i++){

		config.map[i] = [];

		for(var j = 0; j < config.mapSizeY; j++){

			config.map[i][j] = 0;
		}
	}
}

var renderResponse = function(){

	var response = '';

	for (var i = 0; i < config.map.length; i++){
		
		response += '<div class="row-' + i + '" data-row="' + i + '">';
		
		for (var j = 0; j < config.mapSizeY; j++){
			
			columnClasses = '';

			if( ( i + j ) % 2 == 0 ){

				columnClasses += 'white-cell'

			}

			var pawn = '';

			if( config.map[i][j] == 'w' ){
				
				pawn = '<div class="pawn white-pawn"></div>';

			}else if( config.map[i][j] == 'b' ){

				pawn = '<div class="pawn black-pawn"></div>';

			}

			response += '<div class="wrapper"><div class="column-' + j + ' ' + columnClasses + '" data-column="' + j + '">' + pawn + '</div></div>';
		}
		response += '</div>';
	}
	response += '</div>';

	return response;
}

var renderContent = function(){
	// rendering algorythm

	renderMap();
	// fillBorders();
	// fillPieceCorners();

	// putTheServer();

	// putTheComputers(config.computersCount, tries);

	// // shuffle map

	// shuffleMap();

	// // turn on connected computers

	// var state = turnComputersOn();

	// prepare response

	return renderResponse();
}

var addPawns = function(color){

	if(color == 'black'){

		for( var i = 0; i < config.mapSizeY; i++ ){

			config.map[1][i] = 'w'; // white

		}

		for( var i = 0; i < config.mapSizeY; i++ ){

			config.map[6][i] = 'b'; // black

		}

	}else{

		for( var i = 0; i < config.mapSizeY; i++ ){

			config.map[1][i] = 'b'; // black

		}

		for( var i = 0; i < config.mapSizeY; i++ ){

			config.map[6][i] = 'w'; // white

		}

	}

	console.log(config.map);
	
}

module.exports = {
	
	'render': function(options){

		return {"html": renderContent()};

	},

	'setColor': function(options){
	
		if(options.color == 'b'){

			addPawns('black');

		}else{

			addPawns('white');

		}

		return {"html": renderResponse()};

	}

}