const video = document.getElementById('video');
const canvas = document.getElementById('canvas');
const snap = document.getElementById('snap');
const resultContainer = document.getElementById('result-container');
const pibbleName = document.getElementById('pibble-name');
const pibbleImg = document.getElementById('pibble-img');

const BACKEND_URL = "https://elelimios-pibble-classifier.hf.space/classify";

navigator.mediaDevices.getUserMedia({ video: true })
    .then(stream => { video.srcObject = stream; })
    .catch(err => alert("Please enable your camera to continue!"));

snap.addEventListener('click', async () => {
    const context = canvas.getContext('2d');
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    context.drawImage(video, 0, 0);

    const imageData = canvas.toDataURL('image/jpeg');
    snap.innerText = "SCANNING YOUR INNER PIBBLE SOUL..."
    snap.disabled = true;

    try{
        const response = await fetch(BACKEND_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ image: imageData })
        });
        
        const data = await response.json();

        resultContainer.classList.remove('hidden');
        pibbleName.innerText = `YOU ARE A ${data.pibble_type.replace('_', ' ').toUpperCase()}!`;
        pibbleImg.src = `${data.pibble_type}.jpg`;

        snap.innerText = "REVEAL MY PIBBLE!"
        snap.disabled = false;
    } catch (e) {
        console.error(e);
        snap.innerText = "❌ SERVER ERROR";
        snap.disabled = false;
    }
});