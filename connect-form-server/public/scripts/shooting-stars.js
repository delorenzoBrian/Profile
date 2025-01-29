document.addEventListener("DOMContentLoaded", () => {
    const canvas = document.getElementById("starfield");
    const ctx = canvas.getContext("2d");

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const stars = [];
    const shootingStars = [];
    const numStars = 200;

    // Initialize background stars
    for (let i = 0; i < numStars; i++) {
        stars.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            radius: Math.random() * 2,
            speed: Math.random() * 0.5 + 0.5,
        });
    }

    // Create a shooting star
    function createShootingStar() {
        shootingStars.push({
            x: Math.random() * canvas.width,
            y: Math.random() * (canvas.height / 2),
            length: Math.random() * 100 + 50,
            angle: Math.PI / 4,
            speed: Math.random() * 5 + 2,
            opacity: 1,
            fadeSpeed: 0.02,
        });
    }

    // Draw background stars
    function drawStars() {
        stars.forEach((star) => {
            ctx.beginPath();
            ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
            ctx.fillStyle = "#fff";
            ctx.fill();
            star.y += star.speed;
            if (star.y > canvas.height) {
                star.y = 0;
                star.x = Math.random() * canvas.width;
            }
        });
    }

    // Draw shooting stars
    function drawShootingStars() {
        for (let i = shootingStars.length - 1; i >= 0; i--) {
            const shootingStar = shootingStars[i];
            const endX = shootingStar.x + shootingStar.length * Math.cos(shootingStar.angle);
            const endY = shootingStar.y + shootingStar.length * Math.sin(shootingStar.angle);

            ctx.beginPath();
            ctx.moveTo(shootingStar.x, shootingStar.y);
            ctx.lineTo(endX, endY);
            ctx.strokeStyle = `rgba(255, 255, 255, ${shootingStar.opacity})`;
            ctx.lineWidth = 2;
            ctx.stroke();

            shootingStar.x += shootingStar.speed * Math.cos(shootingStar.angle);
            shootingStar.y += shootingStar.speed * Math.sin(shootingStar.angle);
            shootingStar.opacity -= shootingStar.fadeSpeed;

            if (shootingStar.opacity <= 0) {
                shootingStars.splice(i, 1);
            }
        }
    }

    // Animate canvas
    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        drawStars();
        drawShootingStars();
        requestAnimationFrame(animate);
    }

    // Periodically create a shooting star
    setInterval(createShootingStar, 20000); // Create one every 20 seconds

    animate();

    window.addEventListener("resize", () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    });
});