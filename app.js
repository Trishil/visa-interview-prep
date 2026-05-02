// NAVIGATION
function nav(event, targetId) {
    if(event) {
        document.querySelectorAll('.nav-item').forEach(el => el.classList.remove('active'));
        event.currentTarget.classList.add('active');
    }
    
    document.querySelectorAll('.section-block').forEach(el => el.classList.remove('active'));
    document.getElementById(targetId).classList.add('active');
    
    if(window.innerWidth <= 768) document.getElementById('sidebar').classList.remove('active');
    window.scrollTo(0,0);
}

// COUNTDOWN TIMER
window.onload = function() {
    const interviewDate = new Date('2025-05-13T13:00:00');
    
    setInterval(() => {
        const now = new Date().getTime();
        const distance = interviewDate - now;
        if(distance < 0) return;
        
        document.getElementById("cd-days").innerText = Math.floor(distance / (1000 * 60 * 60 * 24));
        document.getElementById("cd-hours").innerText = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        document.getElementById("cd-mins").innerText = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    }, 1000);
};


// LOAD QUESTIONS FROM JSON
async function loadQuestions() {
    try {
        const response = await fetch('../data/questions.json');
        const data = await response.json();
        const container = document.getElementById('questionSections');
        
        Object.entries(data.categories).forEach(([key, category]) => {
            const section = document.createElement('section');
            section.id = key + '-qs';
            section.className = 'section-block';
            
            let html = `<h2>${category.title}</h2>`;
            category.questions.forEach((q, i) => {
                html += `
                    <div class="qa-card" id="qa-${key}-${i}">
                        <div class="qa-header" onclick="this.parentElement.classList.toggle('active')">
                            Q${i + 1}: ${q}
                        </div>
                        <div class="qa-answer">Write your answer here...</div>
                    </div>`;
            });
            
            section.innerHTML = html;
            container.appendChild(section);
        });
    } catch (error) {
        console.error('Error loading questions:', error);
    }
}

// Load questions when page loads
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', loadQuestions);
} else {
    loadQuestions();
}