var map;
var layer;

function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition);
    } else {
        console.log("Geolocation is not supported by this browser.");
    }
}

function showPosition(position) {
    console.log("Latitude: " + position.coords.latitude + " Longitude: " + position.coords.longitude);
    map = new ol.Map({
        target: 'map',
        layers: [
            new ol.layer.Tile({
                source: new ol.source.OSM()
            })
        ],
        view: new ol.View({
            center: ol.proj.fromLonLat([position.coords.longitude, position.coords.latitude]),
            zoom: 13
        })
    });

    layer = new ol.layer.Vector({
        source: new ol.source.Vector({
            features: [
                new ol.Feature({
                    geometry: new ol.geom.Point(ol.proj.fromLonLat([position.coords.longitude, position.coords.latitude]))
                })
            ]
        })
    });
    map.addLayer(layer);
}

// getLocation()
window.onload= function(){
const startRecording = document.querySelector('#startRecording');
const stopRecording = document.querySelector('#stopRecording');
const playRecorded = document.querySelector('#playRecorded');
const stopRecorded = document.querySelector('#stopRecorded');
const pitchInput = document.querySelector('#pitch');
const pitchLabel = document.querySelector('#pitchLabel');
const phaserInput = document.querySelector('#phaser');
const phaserLabel = document.querySelector('#phaserLabel');
const constraints = { audio: true };

console.log(pitchInput)
let pitchShift;
let phaser;
let player;
let chunks = [];

pitchInput.addEventListener('input', function () {
    pitchLabel.innerHTML = pitchInput.value;
    if (pitchShift) {
        pitchShift.pitch = parseFloat(pitchInput.value);
    }
}, false);

phaserInput.addEventListener('input', function () {
    phaserLabel.innerHTML = phaserInput.value;
    if (phaser) {
        phaser.octaves = parseFloat(phaserInput.value)
    }
}, false);

if (navigator.mediaDevices.getUserMedia) {

    let onSuccess = function (stream) {
        const mediaRecorder = new MediaRecorder(stream);

        startRecording.addEventListener('click', async () => {
            await Tone.start();
            startRecording.disabled = true;
            stopRecording.disabled = false;
            mediaRecorder.start();
        });

        stopRecording.addEventListener('click', function () {
            stopRecording.disabled = true;
            playRecorded.disabled = false;
            mediaRecorder.stop();
        });

        playRecorded.addEventListener('click', function () {
            playRecorded.disabled = true;
            stopRecorded.disabled = false;
            player.loop = true;
            player.start();
        });

        stopRecorded.addEventListener('click', function () {
            stopRecorded.disabled = true;
            startRecording.disabled = false;
            player.stop();
        });

        mediaRecorder.onstop = function (e) {
            const blob = new Blob(chunks, { 'type': 'audio/ogg; codecs=opus' });
            chunks = [];
            const audioURL = window.URL.createObjectURL(blob);
            pitchShift = new Tone.PitchShift().toDestination();
            pitchShift.pitch = parseFloat(pitchInput.value);
            phaser = new Tone.Phaser({
                frequency: 15,
                octaves: phaserInput.value,
                baseFrequency: 1000
            }).toDestination();
            phaser.octaves = parseFloat(phaserInput.value)
            player = new Tone.Player(audioURL).connect(pitchShift);
            player.connect(phaser);
        }

        mediaRecorder.ondataavailable = function (e) {
            chunks.push(e.data);
        }
    }

    let onError = function (err) {
        console.log('The following error occured: ' + err);
    }

    navigator.mediaDevices.getUserMedia(constraints).then(onSuccess, onError);

} else {
    console.log('getUserMedia not supported on your browser!');
}
}