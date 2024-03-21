'use strict';

$(function(){
    console.log("ready")

    $("#submit").on('submit', function(ev){
        ev.preventDefault()
        const self = $(this)
        const serialize = self.serialize()
        console.log(serialize)
    })
})