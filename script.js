/* 📋 Copy Shayari */
function copyShayari(id){
    let text = document.getElementById(id).innerText;
    navigator.clipboard.writeText(text);
    alert("Shayari Copied!");
}

/* 📤 WhatsApp Share */
function shareWhatsApp(id){
    let text = document.getElementById(id).innerText;
    let message = text + " \n\nRead more 👉 https://atozdilkishayari.com";
    let url = "https://api.whatsapp.com/send?text=" + encodeURIComponent(message);
    window.open(url, "_blank");
}

/* 🔥 SHARE SITE */
function shareSite(){
    let url = window.location.href;
    let text = "Check this amazing Shayari website ❤️ A to Z Dil Ki Shayari";
    let share = "https://wa.me/?text=" + encodeURIComponent(text + " " + url);
    window.open(share,"_blank");
}

/* 🔎 SEARCH CATEGORY */
function searchShayari(){
    let input = document.getElementById("searchInput").value.toLowerCase();
    let cards = document.querySelectorAll(".card");
    cards.forEach(function(card){
        let text = card.innerText.toLowerCase();
        card.style.display = text.includes(input) ? "flex" : "none";
    });
}

/* 🔥 AUTO SHAYARI SYSTEM */
let allShayari = [];
let shayariLoaded = false;

// List of pages - add only pages that exist
let pages = [
    "Attitude-shayari-1.html","Attitude-shayari-2.html",
    "Breakup-shayari-1.html","Breakup-shayari-2.html",
    "Birthday-wish-shayari-1.html",
    "Diologue-shayari-1.html",
    "Funny-shayari-1.html",
    "Friendship-shayari-1.html",
    "Festival-wishes-shayari-1.html",
    "Love-shayari-1.html","Love-shayari-2.html",
    "Motivational-shayari-1.html","Motivational-shayari-2.html","Motivational-shayari-3.html",
    "Sad-shayari-1.html","Sad-shayari-2.html",
    "Romantic-shayari-1.html",
    "Trending-shayari-1.html"
];

/* Load all shayaris from pages */
async function loadAllShayari() {
    for (let page of pages) {
        try {
            let res = await fetch(page);
            if(!res.ok) continue; // Skip if page not found
            let html = await res.text();
            let parser = new DOMParser();
            let doc = parser.parseFromString(html, "text/html");
            let lis = doc.querySelectorAll("li");
            lis.forEach((li, index)=>{
                allShayari.push({
                    text: li.innerText.trim(),  // Remove spaces/newlines
                    page: page,
                    serial: String.fromCharCode(65+index) // Serial letter for source
                });
            });
        } catch(err){
            console.warn("Skipping unavailable page:", page);
        }
    }
    shayariLoaded = true;
}
loadAllShayari();

/* Random Shayari Generator */
function generateShayari(){
    if(!shayariLoaded){ 
        alert("Shayari loading... please wait!"); 
        return;
    }
    if(allShayari.length===0){ 
        alert("No shayari found!"); 
        return;
    }

    let data = allShayari[Math.floor(Math.random()*allShayari.length)];
    let category = data.page.replace(".html","").replaceAll("-"," ");
    category = category.replace(/\b\w/g, c=>c.toUpperCase());
    let pageNumber = data.page.match(/(\d+)\.html$/)?.[1] || "1";

    document.getElementById("aiShayari").innerText = data.text;
    document.getElementById("shayariInfo").innerText = 
        `Source: ${category}, Shayari  Page  ${pageNumber}  Serial (${data.serial})`;

    let linkElem = document.getElementById("shayariLink");
    linkElem.innerText = "📖 Read Full Page";
    linkElem.href = data.page;
    linkElem.style.display = "inline-block";
}

/* 🎯 Submit Feedback to Google Form */
function submitFeedback() {
    const feedback = document.getElementById("feedbackText").value.trim();

    if(feedback === "") {
        alert("Please type your feedback!");
        return;
    }

    // --- Replace with YOUR Google Form pre-filled URL ---
    const formURL = "https://script.google.com/macros/s/AKfycbyNWs9SflCqLghousoKKmaOeu4-m8sfYmpkuxb1hNF55V22qbg55mUHWHDy-LHSxmty/exec" 
                    + encodeURIComponent(feedback);

    fetch(formURL, {
        method: "POST",
        mode: "no-cors"
    });

    alert("Thank you for your feedback ❤️");
    document.getElementById("feedbackText").value = "";
}