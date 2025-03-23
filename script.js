// Select DOM elements
const speedDisplay = document.getElementById('speedDisplay');
const animation = document.getElementById('animation');
const comparison = document.getElementById('comparison');
const shareBtn = document.getElementById('shareBtn');

// Share popup & buttons
const popup = document.getElementById('popup');
const closePopup = document.getElementById('closePopup');
const shareWhatsApp = document.getElementById('shareWhatsApp');
const shareTelegram = document.getElementById('shareTelegram');
const shareTwitter = document.getElementById('shareTwitter');
const shareFacebook = document.getElementById('shareFacebook');
const shareSMS = document.getElementById('shareSMS');

let speedResult = "";

// Start Speed Test
document.getElementById('startTest').onclick = async () => {
    speedDisplay.textContent = "Testing...";

    const startTime = new Date().getTime();
    
    // Fetching a sample image for speed test
    const download = await fetch('https://upload.wikimedia.org/wikipedia/commons/3/3a/Cat03.jpg');
    const endTime = new Date().getTime();

    const fileSize = download.headers.get('content-length') / (1024 * 1024); 
    const speed = (fileSize / ((endTime - startTime) / 1000)).toFixed(2);

    speedResult = `${speed} Mbps`;

    speedDisplay.textContent = `Speed: ${speedResult}`;

    // Animation logic based on speed
    if (speed < 5) {
        animation.textContent = "🐢";  // Slow
        animation.style.transform = "translateX(0)";
        comparison.textContent = "Slow speed 😓";
    } else if (speed < 25) {
        animation.textContent = "🚗";  // Medium
        animation.style.transform = "translateX(200px)";
        comparison.textContent = "Average speed ⚖️";
    } else {
        animation.textContent = "🚀";  // Fast
        animation.style.transform = "translateX(400px)";
        comparison.textContent = "Blazing fast! 🚀🔥";
    }

    // Enable "Share" button
    shareBtn.disabled = false;
};

// Show popup when clicking "Share"
shareBtn.onclick = () => {
    popup.classList.remove('hidden');
};

// Close popup
closePopup.onclick = () => {
    popup.classList.add('hidden');
};

// Function to share results with dynamic message
function shareResult(platform) {
    const message = `My internet speed: ${speedResult} 🚀`;

    let url = "";
    switch (platform) {
        case "whatsapp":
            url = `https://wa.me/?text=${encodeURIComponent(message)}`;
            break;
        case "telegram":
            url = `https://t.me/share/url?url=${encodeURIComponent(message)}`;
            break;
        case "twitter":
            url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(message)}`;
            break;
        case "facebook":
            url = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(message)}`;
            break;
        case "sms":
            url = `sms:?&body=${encodeURIComponent(message)}`;
            break;
    }
    window.open(url, "_blank");
}

// Event listeners for sharing buttons
shareWhatsApp.onclick = () => shareResult("whatsapp");
shareTelegram.onclick = () => shareResult("telegram");
shareTwitter.onclick = () => shareResult("twitter");
shareFacebook.onclick = () => shareResult("facebook");
shareSMS.onclick = () => shareResult("sms");
