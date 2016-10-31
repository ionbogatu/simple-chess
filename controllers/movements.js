var config = require('../config.js');

var getAvailableMovements = function(row, column){
    
    var response = [];

    if(config.pawnsMap[row][column] == config.userSelectedColor){

        if(config.pawnsMap[row-1][column] == 0){ // single step is available

            response.push([row-1, parseInt(column)]);

        }

        if(
            row == 6 &&
            config.pawnsMap[row-2][column] == 0
        ){ // double step is available

            response.push([row-2, parseInt(column)]);

        }

        if(
            config.pawnsMap[row-1][column-1] == config.computerSelectedColor
        ){
            response.push([row-1, column-1]);
        }

        if(
            config.pawnsMap[row-1][column+1] == config.computerSelectedColor
        ){
            response.push([row-1, column+1]);
        }

    }

    return response;

}

module.exports = {

    'getAvailableMovements': function(options){

        return getAvailableMovements(options.row, options.column);

    }

}
