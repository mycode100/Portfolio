// Typing Animation for Job Titles
const jobTitles = ["Full Stack Developer", "UI/UX Graphic Designer", "Prompt Engineering Enthusiast"];
let titleIndex = 0;
let charIndex = 0;
const typingSpeed = 100;
const jobTitleElement = document.querySelector(".job-title");

function type() {
    if (charIndex < jobTitles[titleIndex].length) {
        jobTitleElement.textContent += jobTitles[titleIndex].charAt(charIndex);
        charIndex++;
        setTimeout(type, typingSpeed);
    } else {
        setTimeout(erase, 2000);  // Pause after typing full title
    }
}

function erase() {
    if (charIndex > 0) {
        jobTitleElement.textContent = jobTitleElement.textContent.slice(0, -1);
        charIndex--;
        setTimeout(erase, typingSpeed);
    } else {
        titleIndex = (titleIndex + 1) % jobTitles.length;
        setTimeout(type, 1000);
    }
}

document.addEventListener("DOMContentLoaded", () => {
    setTimeout(type, 1000); // Start typing after a brief delay
});

// Sidebar Content Toggle
document.querySelectorAll('.sidebar ul li a').forEach(link => {
    link.addEventListener('click', function (e) {
        e.preventDefault();
        const contentSections = document.querySelectorAll('.content-section');
        contentSections.forEach(section => section.classList.remove('active'));

        const targetSection = document.getElementById(this.getAttribute('data-content'));
        targetSection.classList.add('active');
    });
});







