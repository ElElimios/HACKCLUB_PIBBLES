const video = document.getElementById('video');
const canvas = document.getElementById('canvas');
const snap = document.getElementById('snap');
const resultContainer = document.getElementById('result-container');
const pibbleName = document.getElementById('pibble-name');
const pibbleImg = document.getElementById('pibble-img');

const BACKEND_URL = "https://elelimios-pibble-classifier.hf.space/classify";

navigator.mediaDevices.getUserMedia({ video: true })
    .then(stream => video.srcObject = stream)
    .catch(() => alert("Camera access denied!"));

snap.addEventListener('click', async () => {
    const context = canvas.getContext('2d');
    canvas.width = video.videoWidth; canvas.height = video.videoHeight;
    context.drawImage(video, 0, 0);
    
    const imageData = canvas.toDataURL('image/jpeg');
    snap.innerText = "🌀 ANALYZING...";
    snap.disabled = true;

    try {
        const res = await fetch(BACKEND_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ image: imageData })
        });
        const data = await res.json();
        
        resultContainer.classList.remove('hidden');
        pibbleName.innerText = `YOU ARE A ${data.pibble_type.replace('_', ' ').toUpperCase()}!`;
        
        
        let ext = (data.pibble_type === "fat_pibble") ? ".png" : ".jpg";
        pibbleImg.src = data.pibble_type + ext;
        
        snap.innerText = " REVEAL MY PIBBLE ";
        snap.disabled = false;
    } catch (e) {
        snap.innerText = "❌ SERVER ERROR";
        snap.disabled = false;
    }
});