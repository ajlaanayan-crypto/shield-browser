/**
 * ShieldBrowser — Interactive 3D Canvas
 * 3D Particle Lattice & Holographic Shield with Mouse & Scroll Parallax
 */

(function () {
  const canvas = document.getElementById('hero-3d-canvas');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  let width, height, dpr;
  let mouse = { x: 0, y: 0, targetX: 0, targetY: 0 };
  let scrollY = 0;

  // Particle System
  const PARTICLE_COUNT = 75;
  const particles = [];

  class Particle3D {
    constructor() {
      this.reset();
    }

    reset() {
      this.x = (Math.random() - 0.5) * 1200;
      this.y = (Math.random() - 0.5) * 800;
      this.z = Math.random() * 800 + 100;
      this.baseZ = this.z;
      this.size = Math.random() * 2 + 1;
      this.color = Math.random() > 0.3 ? 'rgba(34, 197, 94, ' : 'rgba(6, 182, 212, ';
      this.speed = Math.random() * 0.4 + 0.2;
    }

    update(rotX, rotY) {
      this.z -= this.speed;
      if (this.z < 50) this.reset();

      // Project 3D to 2D screen coordinates
      const fov = 400;
      const factor = fov / (fov + this.z);
      
      // Apply mouse rotation tilt
      const tiltedX = this.x * Math.cos(rotY) - this.z * Math.sin(rotY);
      const tiltedZ = this.x * Math.sin(rotY) + this.z * Math.cos(rotY);
      const tiltedY = this.y * Math.cos(rotX) - tiltedZ * Math.sin(rotX);

      this.screenX = width / 2 + tiltedX * factor;
      this.screenY = height / 2 + tiltedY * factor;
      this.screenSize = this.size * factor * 2;
      this.alpha = Math.min(1, (1 - this.z / 900) * 0.8);
    }

    draw() {
      if (this.screenX < 0 || this.screenX > width || this.screenY < 0 || this.screenY > height) return;
      ctx.beginPath();
      ctx.arc(this.screenX, this.screenY, this.screenSize, 0, Math.PI * 2);
      ctx.fillStyle = `${this.color}${this.alpha})`;
      ctx.fill();
    }
  }

  function resize() {
    dpr = window.devicePixelRatio || 1;
    width = canvas.parentElement.clientWidth;
    height = canvas.parentElement.clientHeight;
    canvas.width = width * dpr;
    canvas.height = height * dpr;
    ctx.scale(dpr, dpr);
  }

  function init() {
    resize();
    window.addEventListener('resize', resize);

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      particles.push(new Particle3D());
    }

    window.addEventListener('mousemove', (e) => {
      const rect = canvas.getBoundingClientRect();
      mouse.targetX = ((e.clientX - rect.left) / width - 0.5) * 2;
      mouse.targetY = ((e.clientY - rect.top) / height - 0.5) * 2;
    });

    window.addEventListener('scroll', () => {
      scrollY = window.scrollY;
    }, { passive: true });

    requestAnimationFrame(render);
  }

  // Draw 3D Shield Rings & Core in the Canvas center
  function drawHolographicShield(rotX, rotY) {
    const cx = width / 2;
    const cy = height / 2 + 10;
    const scrollFactor = scrollY * 0.001;

    ctx.save();
    ctx.translate(cx, cy);

    // Orbital Ellipse 1
    ctx.beginPath();
    ctx.ellipse(0, 0, 180 + Math.sin(Date.now() * 0.002) * 10, 70, rotY * 0.5 + scrollFactor, 0, Math.PI * 2);
    ctx.strokeStyle = 'rgba(34, 197, 94, 0.2)';
    ctx.lineWidth = 1.5;
    ctx.setLineDash([8, 12]);
    ctx.stroke();

    // Orbital Ellipse 2
    ctx.beginPath();
    ctx.ellipse(0, 0, 140, 190, -rotX * 0.5 - scrollFactor * 0.8, 0, Math.PI * 2);
    ctx.strokeStyle = 'rgba(6, 182, 212, 0.15)';
    ctx.lineWidth = 1.2;
    ctx.setLineDash([4, 8]);
    ctx.stroke();

    ctx.restore();
  }

  function render() {
    // Smooth lerp mouse
    mouse.x += (mouse.targetX - mouse.x) * 0.05;
    mouse.y += (mouse.targetY - mouse.y) * 0.05;

    ctx.clearRect(0, 0, width, height);

    const rotY = mouse.x * 0.3;
    const rotX = -mouse.y * 0.3;

    // Draw connecting lattice lines between nearby particles
    ctx.setLineDash([]);
    for (let i = 0; i < particles.length; i++) {
      particles[i].update(rotX, rotY);
      particles[i].draw();

      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].screenX - particles[j].screenX;
        const dy = particles[i].screenY - particles[j].screenY;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < 110) {
          ctx.beginPath();
          ctx.moveTo(particles[i].screenX, particles[i].screenY);
          ctx.lineTo(particles[j].screenX, particles[j].screenY);
          const alpha = (1 - dist / 110) * 0.12;
          ctx.strokeStyle = `rgba(34, 197, 94, ${alpha})`;
          ctx.lineWidth = 0.8;
          ctx.stroke();
        }
      }
    }

    drawHolographicShield(rotX, rotY);

    requestAnimationFrame(render);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
