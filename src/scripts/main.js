const DATA_URL = './data/portfolio.ats.json';

async function fetchPortfolioData() {
    try {
        const response = await fetch(DATA_URL);
        if (!response.ok) throw new Error('Network response was not ok');
        const data = await response.json();
        renderPortfolio(data);
    } catch (error) {
        console.error('Error fetching portfolio data:', error);
    }
}

function renderPortfolio(data) {
    // Name
    document.getElementById('name').textContent = data.name;

    // About
    document.getElementById('about').innerHTML = `
        <h2>About Me</h2>
        <p>${data.summary}</p>
        <ul>
            <li><strong>Location:</strong> ${data.location}</li>
            <li><strong>Email:</strong> <a href="mailto:${data.email}">${data.email}</a></li>
            <li><strong>LinkedIn:</strong> <a href="${data.linkedin}" target="_blank">${data.linkedin}</a></li>
            <li><strong>Phone:</strong> <a href="tel:${data.phone}">${data.phone}</a></li>
        </ul>
    `;

    // Skills
    document.getElementById('skills').innerHTML = `
        <h2>Skills</h2>
        <ul class="skills-list">
            ${data.skills.map(skill => `<li>${skill}</li>`).join('')}
        </ul>
    `;

    // Experience
    document.getElementById('experience').innerHTML = `
        <h2>Experience</h2>
        ${data.experience.map(exp => `
            <div class="experience-item">
                <h3>${exp.title} <span style="font-weight:normal;">@ ${exp.company}</span></h3>
                <p><em>${exp.location} | ${exp.start_date} - ${exp.end_date}</em></p>
                <p>${exp.description}</p>
            </div>
        `).join('')}
    `;

    // Projects
    document.getElementById('projects').innerHTML = `
        <h2>Projects</h2>
        ${data.projects.map(project => `
            <div class="project">
                <h3>${project.title}</h3>
                <p>${project.description}</p>
                <p><strong>Technologies:</strong> ${project.technologies.join(', ')}</p>
                <a href="${project.liveDemo}" target="_blank">Live Demo</a>
                <a href="${project.repository}" target="_blank">Repository</a>
            </div>
        `).join('')}
    `;

    // Education
    document.getElementById('education').innerHTML = `
        <h2>Education</h2>
        ${data.education.map(edu => `
            <div class="education-item">
                <h3>${edu.degree || edu.certificate} ${edu.field ? 'in ' + edu.field : ''}</h3>
                <p><em>${edu.institution}${edu.location ? ', ' + edu.location : ''} ${edu.date ? '| ' + edu.date : ''}</em></p>
                ${edu.platform ? `<p><strong>Platform:</strong> ${edu.platform}</p>` : ''}
            </div>
        `).join('')}
    `;

    // Certifications
    document.getElementById('certifications').innerHTML = `
        <h2>Certifications</h2>
        <ul class="cert-list">
            ${data.certifications.map(cert => `<li>${cert}</li>`).join('')}
        </ul>
    `;

    // Contact
    document.getElementById('contact').innerHTML = `
        <h2>Contact</h2>
        <p>You can reach me at <a href="mailto:${data.email}">${data.email}</a> or via <a href="${data.linkedin}" target="_blank">LinkedIn</a>.</p>
    `;

    // Footer year
    document.getElementById('year').textContent = new Date().getFullYear();
}

document.addEventListener('DOMContentLoaded', fetchPortfolioData);