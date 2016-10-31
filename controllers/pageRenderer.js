var config = require('../config.js');

var renderMap = function(){
	
	for (var i = 0; i < config.mapSizeX; i++){

		config.pawnsMap[i] = [];

		for(var j = 0; j < config.mapSizeY; j++){

			config.pawnsMap[i][j] = 0;
		}
	}
}

var renderResponse = function(){

	var response = '';

	for (var i = 0; i < config.pawnsMap.length; i++){
		
		response += '<div class="row-' + i + '" data-row="' + i + '">';
		
		for (var j = 0; j < config.mapSizeY; j++){
			
			columnClasses = '';

			if( ( i + j ) % 2 == 0 ){

				columnClasses += 'white-cell'

			}

			var pawn = '';

			if( config.pawnsMap[i][j] == 'w' ){
				
				pawn = '<div class="pawn white-pawn"></div>';

			}else if( config.pawnsMap[i][j] == 'b' ){

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

			config.pawnsMap[1][i] = 'w'; // white

		}

		for( var i = 0; i < config.mapSizeY; i++ ){

			config.pawnsMap[6][i] = 'b'; // black

		}

	}else{

		for( var i = 0; i < config.mapSizeY; i++ ){

			config.pawnsMap[1][i] = 'b'; // black

		}

		for( var i = 0; i < config.mapSizeY; i++ ){

			config.pawnsMap[6][i] = 'w'; // white

		}

	}
	
}

module.exports = {
	
	'render': function(options){

		return {"html": renderContent()};

	},

	'setColor': function(options){
	
		if(options.color == 'b'){

			config.userSelectedColor = 'b';
			config.computerSelectedColor = 'w';

			addPawns('black');

		}else{

			config.userSelectedColor = 'w';
			config.computerSelectedColor = 'b';

			addPawns('white');

		}

		return {"html": renderResponse()};

	}

}