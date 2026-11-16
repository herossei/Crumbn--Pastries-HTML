var brandPicture = document.getElementById("brand-picture");
var GRAVITY = 1800;

// Press effect
brandPicture.addEventListener("pointerdown", function () {
    brandPicture.style.transition = "transform 0.06s ease-out"; // fast squish down
    brandPicture.style.transform = "scale(0.9)";
});

function release() {
    brandPicture.style.transition = ""; // fall back to the springy CSS transition
    brandPicture.style.transform = "";  // back to normal size
}
brandPicture.addEventListener("pointerup", release);
brandPicture.addEventListener("pointerleave", release); // if the cursor slides off while held

brandPicture.addEventListener("click", function (e) {
    var size = 60;

    var clone = brandPicture.cloneNode(true);
    clone.removeAttribute("id"); // avoid duplicate IDs
    clone.style.cssText = `
        position: fixed;
        left: 0;
        top: 0;
        width: ${size}px;
        height: auto;
        pointer-events: none;
        user-select: none;
        z-index: 9999;
        will-change: transform;
    `;
    document.body.appendChild(clone);

    // Start at the cursor, like Cookie Clicker
    var x = e.clientX - size / 2;
    var y = e.clientY - size / 2;

    // Random launch: a bit sideways, mostly upward
    var vx = (Math.random() - 0.5) * 300;      // px/s
    var vy = -(500 + Math.random() * 300);     // negative = up
    var rotation = 0;
    var spin = (Math.random() - 0.5) * 360;    // deg/s

    var last = performance.now();

    function step(now) {
        var dt = Math.min((now - last) / 1000, 0.05); // seconds, capped for tab switches
        last = now;

        vy += GRAVITY * dt;   // gravity changes velocity
        x += vx * dt;         // velocity changes position
        y += vy * dt;
        rotation += spin * dt;

        clone.style.transform = `translate(${x}px, ${y}px) rotate(${rotation}deg)`;

        if (y < window.innerHeight + size) {
            requestAnimationFrame(step);
        } else {
            clone.remove(); // fell off screen, clean up
        }
    }

    requestAnimationFrame(step);
});


var currentPage = document.getElementById("main");

function goMenu() {
    currentPage.style.display = 'none';
    
    currentPage = document.getElementById("menu");

    currentPage.style.display = 'flex';
}

function goMain() {
    currentPage.style.display = 'none';

    currentPage = document.getElementById("main");

    currentPage.style.display = 'flex';
}


document.querySelectorAll('.menu-card').forEach(card => {
    card.addEventListener('click', () => card.classList.toggle('flipped'));
});
