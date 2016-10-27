$.ajax({
    'url': '/render',
    'method': 'post',
    'success': function(response){

        $('#map').html(response.html);
    }
});

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
            }
        });

        $('.selectColorWrapper').animate({'left': '-10000px'}, 1000);

    });

});