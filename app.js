// DOM Elements
const languageToggle = document.getElementById('languageToggle');
const darkModeToggle = document.getElementById('darkModeToggle');
const resumeContainer = document.getElementById('resume');

// State
let currentLanguage = 'en';
let isDarkMode = false;

// Check for saved user preferences
if (localStorage.getItem('darkMode') === 'true') {
    document.documentElement.classList.add('dark');
    isDarkMode = true;
}

if (localStorage.getItem('language')) {
    currentLanguage = localStorage.getItem('language');
}

// Load resume data
async function loadResumeData() {
    try {
        const response = await fetch(`locales/resume_${currentLanguage}.json`);
        const data = await response.json();
        renderResume(data);
    } catch (error) {
        console.error('Error loading resume data:', error);
    }
}

// Render resume
function renderResume(data) {
    const personalInfo = data['Personal Information'];
    
    resumeContainer.innerHTML = `
        <div class="section personal-info">
            <img src="${personalInfo.Picture}" alt="${personalInfo.Name}" class="profile-image">
            <div class="info-details">
                <h1 class="text-3xl font-bold text-gray-900 dark:text-white mb-2">${personalInfo.Name}</h1>
                <p class="text-xl text-blue-600 dark:text-blue-400 mb-4">${personalInfo.Title}</p>
                <div class="grid grid-cols-1 md:grid-cols-2 gap-2">
                    <p><i class="fas fa-envelope"></i> ${personalInfo.Email}</p>
                    <p><i class="fas fa-phone"></i> ${personalInfo.Phone}</p>
                    <p><i class="fas fa-map-marker-alt"></i> ${personalInfo.Location}</p>
                    <p><i class="fas fa-globe"></i> ${personalInfo.Portfolio}</p>
                </div>
            </div>
        </div>

        <div class="section">
            <h2 class="section-title">Professional Experience</h2>
            ${renderExperience(data['Professional Experience'])}
        </div>

        <div class="section">
            <h2 class="section-title">Projects</h2>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                ${renderProjects(data.Projects)}
            </div>
        </div>

        <div class="section">
            <h2 class="section-title">Skills</h2>
            <div class="skills-grid">
                ${renderSkills(data.Skills)}
            </div>
        </div>

        <div class="section">
            <h2 class="section-title">Education</h2>
            ${renderEducation(data.Education)}
        </div>

        <div class="section">
            <h2 class="section-title">Certificates</h2>
            <ul class="list-disc pl-6 text-gray-600 dark:text-gray-300">
                ${data.Certificates.map(cert => `<li>${cert}</li>`).join('')}
            </ul>
        </div>
    `;
}

function renderExperience(experience) {
    const currentPosition = experience['Current Position'];
    return `
        <div class="experience-item">
            <h3 class="experience-title">${currentPosition.Title}</h3>
            <p class="experience-company">${currentPosition.Company}</p>
            <p class="experience-duration">${currentPosition.Duration} | ${currentPosition.Location}</p>
            <ul class="list-disc pl-6 mt-2 text-gray-600 dark:text-gray-300">
                ${currentPosition.Responsibilities.map(resp => `<li>${resp}</li>`).join('')}
            </ul>
        </div>
    `;
}

function renderProjects(projects) {
    return projects.map(project => `
        <div class="project-card">
            <div class="flex items-center gap-2 mb-2">
                <img src="${project['Project icon']}" alt="${project['Project Name']}" class="w-8 h-8">
                <h3 class="project-title">${project['Project Name']}</h3>
            </div>
            <p class="project-description">${project.Description}</p>
            <div class="project-tech">
                ${project.Technology.map(tech => `<span class="tech-tag">${tech}</span>`).join('')}
            </div>
        </div>
    `).join('');
}

function renderSkills(skills) {
    return Object.entries(skills).map(([category, items]) => `
        <div class="skill-category">
            <h3 class="skill-title">${category}</h3>
            <div class="skill-list">
                ${items.map(item => `<p>${item}</p>`).join('')}
            </div>
        </div>
    `).join('');
}

function renderEducation(education) {
    return education.map(edu => `
        <div class="mb-4 last:mb-0">
            <h3 class="text-lg font-semibold text-gray-800 dark:text-white">${edu.Degree} - ${edu.Field}</h3>
            <p class="text-gray-600 dark:text-gray-300">${edu.Institution}</p>
            <p class="text-gray-500 dark:text-gray-400">${edu.Duration || edu.Year} | ${edu.Location}</p>
        </div>
    `).join('');
}

// Event Listeners
languageToggle.addEventListener('click', () => {
    currentLanguage = currentLanguage === 'en' ? 'fr' : 'en';
    languageToggle.innerHTML = `<i class="fas fa-language"></i> ${currentLanguage.toUpperCase()}`;
    localStorage.setItem('language', currentLanguage);
    loadResumeData();
});

darkModeToggle.addEventListener('click', () => {
    isDarkMode = !isDarkMode;
    document.documentElement.classList.toggle('dark');
    localStorage.setItem('darkMode', isDarkMode);
});

// Initial load
loadResumeData();
