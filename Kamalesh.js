// Canvas star background
const canvas = document.getElementById('space');
const ctx = canvas.getContext('2d');
let w, h;
function resize() {
    w = window.innerWidth;
    h = window.innerHeight;
    canvas.width = w;
    canvas.height = h;
}
window.addEventListener('resize', resize);
resize();
const stars = [];
const numStars = 300;
for (let i = 0; i < numStars; i++) {
    stars.push({
        x: Math.random() * w,
        y: Math.random() * h,
        r: Math.random() * 1.5 + 0.2,
        speed: Math.random() * 0.3 + 0.05,
        alpha: Math.random() * 0.5 + 0.5
    });
}
function drawStars() {
    ctx.clearRect(0, 0, w, h);
    for (let star of stars) {
        ctx.save();
        ctx.globalAlpha = star.alpha;
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.r, 0, 2 * Math.PI);
        ctx.fillStyle = '#fff';
        ctx.shadowColor = '#fff';
        ctx.shadowBlur = 8;
        ctx.fill();
        ctx.restore();
        star.y += star.speed;
        if (star.y > h) {
            star.x = Math.random() * w;
            star.y = 0;
        }
    }
}
function animate() {
    drawStars();
    requestAnimationFrame(animate);
}
animate();

// Certificate modal controls
function showCertificate(id) {
    document.getElementById(id).classList.add('active');
}
function closeCertificate(id) {
    document.getElementById(id).classList.remove('active');
}

// Contact form email sending (using EmailJS)
function sendemail(event) {
    event.preventDefault();
    var email = document.getElementById("email").value;
    var from_name = document.getElementById("name").value;
    var message = document.getElementById("message").value;
    var subject = document.getElementById("subject").value;
    var templateParams = {
        email: email,
        name: from_name,
        message: message,
        subject: subject
    };
    emailjs.send('service_uesbju4', 'template_4jg0toj', templateParams)
        .then(function(response) {
            alert('Message sent successfully!');
            document.getElementById("contactForm").reset();
        }, function(error) {
            alert('Failed to send message. Please try again later.');
            console.error('Failed to send email:', error);
        });
}

// Navbar scroll effect
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Mobile menu toggle
const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');
menuToggle.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    menuToggle.innerHTML = navLinks.classList.contains('active') ? 
        '<i class="fas fa-times"></i>' : '<i class="fas fa-bars"></i>';
});
// Close mobile menu when clicking a link
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
        menuToggle.innerHTML = '<i class="fas fa-bars"></i>';
    });
});
// Smooth scrolling for navigation
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
        // Update active nav link
        document.querySelectorAll('.nav-link').forEach(link => {
            link.classList.remove('active');
        });
        this.classList.add('active');
    });
});
// Update active nav link on scroll
window.addEventListener('scroll', () => {
    const scrollPosition = window.scrollY;
    document.querySelectorAll('section').forEach(section => {
        const sectionTop = section.offsetTop - 100;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');
        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            document.querySelectorAll('.nav-link').forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${sectionId}`) {
                    link.classList.add('active');
                }
            });
        }
    });
});
// Get the current year
const year = new Date().getFullYear();
// Insert it into the HTML element
document.getElementById('current-year').textContent = year;