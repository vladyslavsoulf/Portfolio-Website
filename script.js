document.addEventListener('DOMContentLoaded', () => {
    
    const glow = document.querySelector('.mouse-glow');
    if (glow) {
        document.addEventListener('mousemove', (e) => {
            requestAnimationFrame(() => {
                glow.style.left = `${e.clientX}px`;
                glow.style.top = `${e.clientY}px`;
            });
        });
    }

    document.addEventListener('mousemove', (e) => {
        const magnets = document.querySelectorAll('.menu-btn, .back-home');
        
        magnets.forEach((btn) => {
            if (btn) {
                const box = btn.getBoundingClientRect();
                const btnX = box.left + box.width / 2;
                const btnY = box.top + box.height / 2;
                
                const distX = e.clientX - btnX;
                const distY = e.clientY - btnY;
                const distance = Math.sqrt(distX * distX + distY * distY);
                const magnetRadius = 80;
                const magnetStrength = 15;

                if (distance < magnetRadius) {
                    const moveX = (distX / magnetRadius) * magnetStrength;
                    const moveY = (distY / magnetRadius) * magnetStrength;
                    btn.style.transform = `translate(${moveX}px, ${moveY}px)`;
                } else {
                    btn.style.transform = `translate(0px, 0px)`;
                }
            }
        });
    });

    const lightbox = document.getElementById('lightbox');
    const photoItems = document.querySelectorAll('.photo-item');

    if (lightbox && photoItems.length > 0) {
        const lightboxImg = document.getElementById('lightbox-img');
        const lightboxCaption = document.getElementById('lightbox-caption');

        photoItems.forEach(item => {
            item.addEventListener('click', () => {
                const img = item.querySelector('img');
                const caption = item.querySelector('.photo-overlay span');
                
                lightbox.style.display = 'flex';
                setTimeout(() => lightbox.classList.add('active'), 10);
                
                if (img) lightboxImg.src = img.src;
                if (caption) lightboxCaption.textContent = caption.textContent;
                document.body.style.overflow = 'hidden';
            });
        });

        lightbox.addEventListener('click', (e) => {
            if (e.target !== lightboxImg) {
                lightbox.classList.remove('active');
                setTimeout(() => {
                    lightbox.style.display = 'none';
                    document.body.style.overflow = 'auto';
                }, 300);
            }
        });
    }
});

const avImgs = document.querySelectorAll('.avatar-img');
const prevBtn = document.getElementById('prevAv');
const nextBtn = document.getElementById('nextAv');
const counter = document.getElementById('avCounter');

if (avImgs.length > 0) {
    let currentAv = 0;

    function updateAv(index) {
        avImgs.forEach(img => img.classList.remove('active'));
        avImgs[index].classList.add('active');
        counter.textContent = `${index + 1} / ${avImgs.length}`;
    }

    nextBtn.addEventListener('click', () => {
        currentAv = (currentAv + 1) % avImgs.length;
        updateAv(currentAv);
    });

    prevBtn.addEventListener('click', () => {
        currentAv = (currentAv - 1 + avImgs.length) % avImgs.length;
        updateAv(currentAv);
    });
}