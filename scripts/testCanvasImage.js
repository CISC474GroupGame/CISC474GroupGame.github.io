window.onload = function(){
    let canvas = document.getElementById('canvas');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    let context = canvas.getContext('2d');
    // context.fillStyle = '#000000';
    // context.fillRect(100, 100, 100, 100);

    let img = new Image();
    img.src="./images/coin.png";
    img.onload = function(){
        context.drawImage(img, 100, 100, 100, 100);
    }
}