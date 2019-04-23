$(document).ready(function(){
    // var socket = io.connect("http://localhost:3000")
    var socket = io.connect("http://socketserver.ootz.com.br")
    var ready = false

    $("#submit").submit(function(e){
        e.preventDefault()
        $('#nick').fadeOut()
        $('#chat').fadeIn()
        var name = $('#nickname').val()
        var time = new Date()
        $("#name").html(name)
        $("#time").html('First login: ' + time.getHours() + ":" + time.getMinutes())

        ready = true
        socket.emit("join", name)
    })

    socket.on("update", function(msg){
        if(ready){
            $('.chat').append('<li class="info">' + msg + '</li>')
        }
    })

    $("#textarea").keypress(function(e){
        if(e.which == 13){
            var text = $("#textarea").val()
            $('#textarea').val('')
            var time = new Date()
            $('.chat').append('<li class="self"><div class="msg"><span>' +
                $('#nickname').val() + ':</span><p>' + text + '</p><time>' +
                time.getHours() + ":" + time.getMinutes() + '</time></div></li>')
            var $target = $('html,body'); 
            $target.animate({scrollBottom: $target.height()}, 1000);
            socket.emit("send", text)
        }
    })

    socket.on('chat', function(client, msg){
        if(ready){
            var time = new Date()
            $(".chat").append(
                '<li class="other"><div class="msg"><span>' +
                client + ':</span><p>' + msg + '</p><time>' +
                time.getHours() + ":" + time.getMinutes() + '</time></div></li>'
            )
        }
    })
})