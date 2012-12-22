$(function(){
    window.context = new webkitAudioContext()
    
    $(document).on('click', '.drum', function(){
        var sound = $(this).data('sound');
        playSound(sound);
    });

    function playSound(sound){
        var request = new XMLHttpRequest();
        request.open("GET", '/sounds/' + sound + '.wav', true);
        request.responseType = "arraybuffer";
         
        request.onload = function() {
            var audioData = request.response;
            soundSource = context.createBufferSource();
            soundBuffer = context.createBuffer(audioData, true/*make mono*/);
            soundSource.buffer = soundBuffer;
            soundSource.connect(context.destination);
            soundSource.noteOn(context.currentTime);
        };
        request.send();    
    }
    
    
})
