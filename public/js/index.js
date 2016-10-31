$.ajax({
    'url': '/render',
    'method': 'post',
    'success': function(response){

        $('#map').html(response.html);
    }
});

function mapReady(){

    $('.pawn').draggable({
        'revert': "invalid",
        'start': function(){
            $(this).addClass('selectedPawn');
            $('.pawn').draggable('destroy');
        },
        'stop': function(){
            $(this).removeClass('selectedPawn');

            var verticalPosition = parseInt($(this).css("top"));
            var horizontalPosition = parseInt($(this).css("left"));

            $(this).css('top', 0);
            $(this).css('left', 0);

            var cellsMovedVertically = Math.abs(Math.round(verticalPosition/54));
            var cellsMovedHorizontally = Math.round(horizontalPosition/54);

            var currentRow = $(this).parent().parent().parent().attr("data-row");
            var currentColumn = $(this).parent().attr("data-column");

            console.log(horizontalPosition, cellsMovedHorizontally);

            // console.log(".column-" + (parseInt(currentColumn) + parseInt(cellsMovedHorizontally)));

            $(".row-" + parseInt(currentRow - cellsMovedVertically)).find(".column-" + (parseInt(currentColumn) + parseInt(cellsMovedHorizontally))).html($(this).parent().html());

            $(this).parent().html('');
        }
    });

    $('.pawn').on('mousedown', function(){

        $.ajax({
            'url': '/getAvailableMovements',
            'method': 'post',
            'data': {
                'row': $(this).parent().parent().parent().attr('data-row'),
                'column': $(this).parent().attr('data-column')
            },
            'success': function(response){

                if(response != []){

                    $.each(response, function(index, element){

                        $('.row-' + element[0] + ' ' + '.column-' + element[1]).addClass('availableMovement');
                        
                        $( ".availableMovement" ).droppable({
                            accept: ".selectedPawn",
                            classes: {
                                "ui-droppable-active": "ui-state-active",
                                "ui-droppable-hover": "ui-state-hover"
                            },
                            drop: function( event, ui ) {
                                
                            }
                        });

                    });

                }

            }

        });

    });

    $('body').on('mouseup', function(){

        $('div[class^=column-]').removeClass('availableMovement');

    });
}

$(document).ready(function(){

    $('.selectColorWrapper').animate({'top': '100px'}, 1500);

    $('.pawnsColor').click(function(){
        
        $('.pawnsColor').off('click');

        var color = $(this).data('color');

        $.ajax({
            'url': '/setColor',
            'method': 'post',
            'data': {
                'color': color
            },
            'success': function(response){
                
                $('#map').html(response.html);

                mapReady();
            }
        });

        $('.selectColorWrapper').animate({'left': '-10000px'}, 1000);

    });

});