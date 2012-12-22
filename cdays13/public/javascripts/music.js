$(function(){
    window.context = new webkitAudioContext()
    window.oscillator = null;

    $(document).on('click', '.play', function(){
        var frequency = $(this).data('frequency');

        oscillator = context.createOscillator();
        oscillator.type = 3; // sine wave
        oscillator.frequency.value = frequency;
        oscillator.connect(context.destination);

        oscillator.noteOn(0);
        oscillator.noteOff(200);
        setInterval(function(){oscillator.noteOff(0)}, 1000);
    });

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
