// --- Main Application Logic ---

document.addEventListener("DOMContentLoaded", () => {
    // 1. Mobile Menu Toggle
    const menuToggle = document.getElementById("menu-toggle");
    const navLinks = document.querySelector(".nav-links");
    
    if (menuToggle && navLinks) {
        menuToggle.addEventListener("click", () => {
            navLinks.classList.toggle("active");
            const icon = menuToggle.querySelector("i");
            if (icon) {
                if (navLinks.classList.contains("active")) {
                    icon.className = "ri-close-line";
                } else {
                    icon.className = "ri-menu-line";
                }
            }
        });

        // Close menu when link is clicked
        document.querySelectorAll(".nav-link").forEach(link => {
            link.addEventListener("click", () => {
                navLinks.classList.remove("active");
                const icon = menuToggle.querySelector("i");
                if (icon) icon.className = "ri-menu-line";
            });
        });
    }

    // 2. Active Link Highlight & Scroll Header Background
    const sections = document.querySelectorAll("section");
    const navItems = document.querySelectorAll(".nav-link");
    const header = document.querySelector(".header");
    const progressBar = document.getElementById("progress-bar");

    window.addEventListener("scroll", () => {
        // Header background transition
        if (header) {
            if (window.scrollY > 50) {
                header.classList.add("scrolled");
            } else {
                header.classList.remove("scrolled");
            }
        }

        // Active link tracking
        let current = "";
        const scrollPosition = window.scrollY || window.pageYOffset || document.documentElement.scrollTop;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            if (scrollPosition >= (sectionTop - 250)) {
                current = section.getAttribute("id");
            }
        });

        navItems.forEach(item => {
            item.classList.remove("active");
            if (item.getAttribute("href") === `#${current}`) {
                item.classList.add("active");
            }
        });

        // Scroll Progress indicator
        if (progressBar) {
            const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
            const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
            const scrolled = height > 0 ? (winScroll / height) * 100 : 0;
            progressBar.style.width = scrolled + "%";
        }
    });

    // 3. AI Introduction Boot Sequence Typewriter
    const introText = [
        "System initialization...",
        "Accessing profile database: Hitesh...",
        "Academic records loaded. MCA degree confirmed.",
        "Analysis result: Hitesh is an innovative software developer skilled in WebGL 3D designs, full-stack architectures, and intelligent user interfaces. Ready to build something extraordinary."
    ];
    
    const targetElement = document.getElementById("typewriter-target");
    let textIndex = 0;
    let charIndex = 0;

    function typeWriter() {
        if (!targetElement) return;

        if (textIndex < introText.length) {
            const currentLineText = introText[textIndex];
            
            if (charIndex < currentLineText.length) {
                // If it's a new line, add line break first (except for the first line)
                if (charIndex === 0 && textIndex > 0) {
                    targetElement.innerHTML += "<br><span class='line-prefix' style='color:#00f2fe'>> </span>";
                } else if (charIndex === 0 && textIndex === 0) {
                    targetElement.innerHTML += "<span class='line-prefix' style='color:#00f2fe'>> </span>";
                }
                
                targetElement.innerHTML += currentLineText.charAt(charIndex);
                charIndex++;
                setTimeout(typeWriter, 20 + Math.random() * 25);
            } else {
                textIndex++;
                charIndex = 0;
                setTimeout(typeWriter, 500); // pause between lines
            }
        } else {
            targetElement.classList.remove("typing");
        }
    }

    // Start typewriter slightly after load if target exists
    if (targetElement) {
        setTimeout(typeWriter, 1200);
    }

    // 4. Scroll triggered Animations (Viewport Intersection Observer)
    const animateElements = document.querySelectorAll(".scroll-animate-left, .scroll-animate-right");
    const skillFills = document.querySelectorAll(".skill-bar-fill");
    
    if (typeof IntersectionObserver !== 'undefined') {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: "0px 0px -50px 0px"
        };

        const sectionObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("visible");
                    
                    // If entering skills section, animate progress bars
                    if (entry.target.classList.contains("skills-details-container")) {
                        skillFills.forEach(fill => {
                            const targetWidth = fill.getAttribute("data-width");
                            if (targetWidth) {
                                fill.style.width = targetWidth;
                            }
                        });
                    }
                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);

        animateElements.forEach(el => sectionObserver.observe(el));
        
        // Also observe the skills bars container specifically
        const skillsBarContainer = document.querySelector(".skills-details-container");
        if (skillsBarContainer) sectionObserver.observe(skillsBarContainer);
    }

  // 5. Contact Form Submission (EmailJS)
const contactForm = document.getElementById("portfolio-contact-form");

if (contactForm) {

    contactForm.addEventListener("submit", function (e) {

        e.preventDefault();

        const submitBtn = contactForm.querySelector("button[type='submit']");
        const originalText = submitBtn.innerHTML;

        submitBtn.innerHTML = "<i class='ri-loader-4-line spin-anim'></i> Sending...";
        submitBtn.disabled = true;

        emailjs.sendForm(
            "service_2bvac8d",      // Service ID
            "template_9fuquva",     // Template ID
            contactForm             // Form
        )

        .then(function () {

            alert("✅ Message Sent Successfully!");

            submitBtn.innerHTML = "<i class='ri-checkbox-circle-fill'></i> Sent";
            contactForm.reset();

            setTimeout(() => {
                submitBtn.innerHTML = originalText;
                submitBtn.disabled = false;
            },2000);

        })

        .catch(function(error){

            console.log("EmailJS Error :",error);

            alert("❌ Sending Failed\n\n"+JSON.stringify(error));

            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;

        });

    });

}
}); // <-- Correctly closed DOMContentLoaded Event Listener Here

/* =========================================================================
   3D Space Background Scene (Three.js)
   ========================================================================= */
(function initBackground3D() {
    const canvas = document.getElementById("bg-canvas");
    if (!canvas) return;

    if (typeof THREE === 'undefined') {
        console.warn("Three.js library is not loaded. 3D Background disabled.");
        return;
    }

    const scene = new THREE.Scene();
    
    // Camera
    const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 80;

    // Renderer
    const renderer = new THREE.WebGLRenderer({ canvas: canvas, alpha: true, antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    // Particle Starfield
    const starsGeometry = new THREE.BufferGeometry();
    const starsCount = 2500;
    const posArray = new Float32Array(starsCount * 3);
    const colorArray = new Float32Array(starsCount * 3);

    for (let i = 0; i < starsCount * 3; i += 3) {
        const radius = 100 + Math.random() * 200;
        const u = Math.random();
        const v = Math.random();
        const theta = u * 2.0 * Math.PI;
        const phi = Math.acos(2.0 * v - 1.0);
        
        posArray[i] = radius * Math.sin(phi) * Math.cos(theta);     // X
        posArray[i+1] = radius * Math.sin(phi) * Math.sin(theta);   // Y
        posArray[i+2] = radius * Math.cos(phi);                     // Z

        const mix = Math.random();
        if (mix < 0.3) {
            colorArray[i] = 0.0;     // R
            colorArray[i+1] = 0.95;  // G
            colorArray[i+2] = 1.0;   // B (Cyan)
        } else if (mix < 0.6) {
            colorArray[i] = 0.6;     // R
            colorArray[i+1] = 0.3;   // G
            colorArray[i+2] = 0.9;   // B (Purple)
        } else {
            colorArray[i] = 1.0;     // R
            colorArray[i+1] = 1.0;   // G
            colorArray[i+2] = 1.0;   // B (White/soft)
        }
    }

    starsGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
    starsGeometry.setAttribute('color', new THREE.BufferAttribute(colorArray, 3));

    // Material
    const starsMaterial = new THREE.PointsMaterial({
        size: 0.8,
        vertexColors: true,
        transparent: true,
        opacity: 0.8,
        blending: THREE.AdditiveBlending
    });

    // Points Mesh
    const starField = new THREE.Points(starsGeometry, starsMaterial);
    scene.add(starField);

    // Dynamic mouse parallax vectors
    let mouseX = 0;
    let mouseY = 0;
    let targetX = 0;
    let targetY = 0;

    window.addEventListener("mousemove", (e) => {
        mouseX = (e.clientX - window.innerWidth / 2) * 0.05;
        mouseY = (e.clientY - window.innerHeight / 2) * 0.05;
    });

    // Handle Resize
    window.addEventListener("resize", () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    });

    // Animation Loop
    const clock = new THREE.Clock();

    function animate() {
        requestAnimationFrame(animate);

        const elapsedTime = clock.getElapsedTime();

        // Slow automatic rotation
        starField.rotation.y = elapsedTime * 0.02;
        starField.rotation.x = elapsedTime * 0.01;

        // Smooth camera drift based on mouse
        targetX += (mouseX - targetX) * 0.05;
        targetY += (mouseY - targetY) * 0.05;
        
        camera.position.x = targetX;
        camera.position.y = -targetY;

        // Warp effect on scroll
        const scrollY = window.scrollY || window.pageYOffset || document.documentElement.scrollTop;
        starField.position.z = scrollY * 0.05;

        renderer.render(scene, camera);
    }
    
    animate();
})();

/* =========================================================================
   3D Skills Sphere (Three.js with Canvas Text Textures)
   ========================================================================= */
(function initSkillsSphere3D() {
    const canvas = document.getElementById("skills-3d-canvas");
    if (!canvas) return; // Safely check if canvas exists first

    const container = canvas.parentElement;
    if (!container) return;

    if (typeof THREE === 'undefined') {
        console.warn("Three.js library is not loaded. 3D Skills Sphere disabled.");
        return;
    }

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, container.clientWidth / container.clientHeight, 0.1, 100);
    camera.position.z = 15;

    const renderer = new THREE.WebGLRenderer({ canvas: canvas, alpha: true, antialias: true });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    // List of skills to display
    const skillsList = [
        "C++", "JavaScript", "React.js", "Node.js", 
        "Python", "HTML5", "CSS3", "WebGL", "GSAP", 
        "Git", "SQL", "Machine Learning", "FastAPI"
    ];

    const sphereGroup = new THREE.Group();
    scene.add(sphereGroup);

    // Create Text Texture Helper
    function createTextTexture(text, color, glowColor) {
        const offCanvas = document.createElement('canvas');
        const ctx = offCanvas.getContext('2d');
        offCanvas.width = 256;
        offCanvas.height = 64;

        // Transparent background
        ctx.fillStyle = 'rgba(0, 0, 0, 0)';
        ctx.fillRect(0, 0, offCanvas.width, offCanvas.height);

        // Draw shadow/glow
        ctx.shadowColor = glowColor;
        ctx.shadowBlur = 10;
        ctx.fillStyle = color;
        ctx.font = 'bold 24px Space Grotesk, sans-serif';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(text, offCanvas.width / 2, offCanvas.height / 2);

        const texture = new THREE.CanvasTexture(offCanvas);
        return texture;
    }

    const sprites = [];
    const radius = 6;
    const colors = ["#00f2fe", "#9b51e0", "#ff007f", "#00f5d4"];

    // Distribute skills evenly on a sphere
    const count = skillsList.length;
    for (let i = 0; i < count; i++) {
        const phi = Math.acos(-1 + (2 * i) / count);
        const theta = Math.sqrt(count * Math.PI) * phi;

        const x = radius * Math.sin(phi) * Math.cos(theta);
        const y = radius * Math.sin(phi) * Math.sin(theta);
        const z = radius * Math.cos(phi);

        // Choose color
        const color = colors[i % colors.length];
        const texture = createTextTexture(skillsList[i], color, color + "aa");
        
        const spriteMaterial = new THREE.SpriteMaterial({ 
            map: texture, 
            transparent: true,
            opacity: 0.95
        });
        
        const sprite = new THREE.Sprite(spriteMaterial);
        sprite.position.set(x, y, z);
        sprite.scale.set(4, 1, 1);
        
        sprite.userData = {
            baseScale: new THREE.Vector3(4, 1, 1),
            originalColor: color,
            name: skillsList[i]
        };

        sphereGroup.add(sprite);
        sprites.push(sprite);
    }

    // Add glowing wireframe sphere in center
    const sphereGeo = new THREE.SphereGeometry(radius * 0.9, 16, 16);
    const sphereMat = new THREE.MeshBasicMaterial({
        color: 0x9b51e0,
        wireframe: true,
        transparent: true,
        opacity: 0.08
    });
    const centralSphere = new THREE.Mesh(sphereGeo, sphereMat);
    sphereGroup.add(centralSphere);

    // Interactive dragging / Rotation controls
    let isDragging = false;
    let previousMousePosition = { x: 0, y: 0 };
    let rotationVelocity = { x: 0.005, y: 0.005 };

    const handleStart = (clientX, clientY) => {
        isDragging = true;
        previousMousePosition = { x: clientX, y: clientY };
    };

    const handleMove = (clientX, clientY) => {
        if (!isDragging) return;

        const deltaMove = {
            x: clientX - previousMousePosition.x,
            y: clientY - previousMousePosition.y
        };

        rotationVelocity.y = deltaMove.x * 0.005;
        rotationVelocity.x = deltaMove.y * 0.005;

        sphereGroup.rotation.y += rotationVelocity.y;
        sphereGroup.rotation.x += rotationVelocity.x;

        previousMousePosition = { x: clientX, y: clientY };
    };

    const handleEnd = () => {
        isDragging = false;
    };

    // Desktop mouse events
    canvas.addEventListener('mousedown', (e) => handleStart(e.clientX, e.clientY));
    window.addEventListener('mousemove', (e) => handleMove(e.clientX, e.clientY));
    window.addEventListener('mouseup', handleEnd);

    // Mobile touch events
    canvas.addEventListener('touchstart', (e) => {
        if (e.touches.length === 1) {
            handleStart(e.touches[0].clientX, e.touches[0].clientY);
        }
    });
    window.addEventListener('touchmove', (e) => {
        if (e.touches.length === 1) {
            handleMove(e.touches[0].clientX, e.touches[0].clientY);
        }
    });
    window.addEventListener('touchend', handleEnd);

    // Handle Resize
    window.addEventListener("resize", () => {
        if (container.clientWidth === 0 || container.clientHeight === 0) return;
        camera.aspect = container.clientWidth / container.clientHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(container.clientWidth, container.clientHeight);
    });

    // Animation Loop
    function animate() {
        requestAnimationFrame(animate);

        // Constant minor rotation (inertia decay)
        if (!isDragging) {
            rotationVelocity.x *= 0.95;
            rotationVelocity.y *= 0.95;
            
            // Reapply constant low drift speed
            sphereGroup.rotation.y += rotationVelocity.y + 0.003;
            sphereGroup.rotation.x += rotationVelocity.x + 0.001;
        }

        renderer.render(scene, camera);
    }

    animate();
})();