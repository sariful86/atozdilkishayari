async function loadTimeShayari() {
    try {
        const now = new Date();
        const hour = now.getHours();

        let file = "";
        let title = "";

        // 🌅 Morning
        if (hour >= 5 && hour < 12) {
            file = "data/morning.json";
            title = "Good Morning Shayari";
            document.body.classList.add("morning");
        } 
        // 🌙 Night
        else if (hour >= 21 || hour < 3) {
            file = "data/night.json";
            title = "Good Night Shayari";
            document.body.classList.add("night");
        } 
        else {
            return; // beech ka time kuch nahi karega
        }

        const res = await fetch(file);
        const data = await res.json();

        let dayIndex = now.getDate();
        if (hour < 3) {
            dayIndex = dayIndex - 1;
        }

        const index = Math.abs(dayIndex) % data.length;

        const titleEl = document.getElementById("shayari-title");
        const textEl = document.getElementById("shayari-text");

        if (titleEl && textEl) {
            titleEl.innerText = title;

            // ✨ Typewriter effect
            typeWriter(data[index], textEl);
        }

    } catch (err) {
        console.log("Error loading shayari:", err);
    }
}

// ✨ Typewriter function
function typeWriter(text, element, speed = 30) {
    let i = 0;
    element.innerHTML = "";

    function typing() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(typing, speed);
        }
    }

    typing();
}

// ❤️ Like button function
function likeShayari() {
    const text = document.getElementById("shayari-text").innerText;
    let fav = JSON.parse(localStorage.getItem("favShayari")) || [];

    if (!fav.includes(text)) {
        fav.push(text);
        localStorage.setItem("favShayari", JSON.stringify(fav));
        alert("Saved to Favorites ❤️");
    } else {
        alert("Already saved 😄");
    }
}


function addCursorEffect() {
    const textEl = document.getElementById("shayari-text");

    setInterval(() => {
        textEl.classList.toggle("cursor");
    }, 500);
}

document.addEventListener("DOMContentLoaded", addCursorEffect);

// Run after page load
document.addEventListener("DOMContentLoaded", loadTimeShayari);