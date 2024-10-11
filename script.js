const qr_form = document.getElementById("qr_form");

qr_form.addEventListener('submit', function (e) {
    e.preventDefault();
    const qrImage = document.querySelector("img[alt='QR Code']");
    if (qrImage) {
        qrImage.src = '';
    }
    qr_form.reset();
});
