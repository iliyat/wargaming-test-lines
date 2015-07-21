$ = require('jquery')
Lines = require('./Lines')

$(function() {

    var game = new Lines('#field')
    game.init();

    $(document).on('click', '.field-element:not(:empty, .destination)', function() {
        var source = $(this).index()
        game.select(source)


        $('.field-element').addClass('closed')
        $(this).addClass('selected')

        var availableFields = game.check()
        for(var key in availableFields) {
            $('.field-element').eq(availableFields[key]).removeClass('closed').addClass('destination')
        }
    })

    $(document).on('click', '.field-element.destination:empty', function() {
        var destination = $(this).index()
        game.move(destination)
        $('.field-element').removeClass('closed').removeClass('destination')
        $('.selected').removeClass('selected')
    })

    $(document).on('click', '.field-element.closed:not(:empty)', function() {
        game.resetChecks()
        $('.field-element').removeClass('closed').removeClass('destination')
        $('.selected').removeClass('selected')
    })

})