// File: src/scripts/scrollspy.js

// Fungsi untuk menginisialisasi scroll spy
function initScrollSpy() {
  // Ambil semua link navigasi
  const navLinks = document.querySelectorAll('nav a[href^="#"]');

  // Ambil semua section yang memiliki id
  const sections = document.querySelectorAll("section[id]");

  // Options untuk IntersectionObserver
  const observerOptions = {
    root: null, // viewport browser
    rootMargin: "-50% 0px -50% 0px", // trigger ketika section di tengah viewport
    threshold: 0, // 0 = trigger segera ketika section terlihat
  };

  // Fungsi untuk mengubah active state
  function setActiveLink(id) {
    // Hapus class active dari semua link
    navLinks.forEach((link) => {
      link.classList.remove("active");
    });

    // Tambahkan class active ke link yang sesuai
    const activeLink = document.querySelector(`nav a[href="#${id}"]`);
    if (activeLink) {
      activeLink.classList.add("active");
    }
  }

  // Buat IntersectionObserver
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      // Jika section terlihat (intersecting)
      if (entry.isIntersecting) {
        setActiveLink(entry.target.id);
      }
    });
  }, observerOptions);

  // Observe semua section
  sections.forEach((section) => {
    observer.observe(section);
  });

  // Smooth scroll ketika klik link navigasi
  navLinks.forEach((link) => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      const targetId = link.getAttribute("href").substring(1);
      const targetSection = document.getElementById(targetId);

      if (targetSection) {
        targetSection.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
    });
  });
}

// Jalankan ketika DOM sudah siap
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initScrollSpy);
} else {
  initScrollSpy();
}
