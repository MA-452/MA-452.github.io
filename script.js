// Project Data
const projectData = {
    'foodflow': {
        title: 'FoodFlow',
        category: 'Mobile Application • Non-Profit',
        type: 'phone',
        description: [
            'FoodFlow is a custom mobile solution designed for Food Link Society to streamline their massive donation pipeline.',
            'The application handles intake logistics, allowing volunteers to log inventory with speed and precision.',
            'Engineered with a focus on accessibility and rapid processing.'
        ],
        images: [
            'images/foodflow/create_account.png',
            'images/foodflow/dashboard.png',
            'images/foodflow/intake_form.png',
            'images/foodflow/email_summary.png'
        ]
    },
    'portal': {
        title: 'Pilotfish Portal',
        category: 'Enterprise Web Platform',
        type: 'laptop',
        description: [
            'The Pilotfish Customer Portal is a centralized dashboard built to manage multi-tenant IT infrastructure.',
            'Leveraging the Microsoft 365 API, it aggregates complex security scores, licensing data, and ticketing into a single view.',
            'Features automation workflows for asset lifecycle tracking and client-tier device classification.'
        ],
        images: [
            'images/portal/dashboard.png',
            'images/portal/assets.png',
            'images/portal/asset_details.png',
            'images/portal/ticket.png',
        ]
    }
};

// Initialize Icons
lucide.createIcons();

// Modal Logic
const modal = document.getElementById('project-modal');
const modalClose = document.getElementById('modal-close');
const slideshow = document.getElementById('modal-slideshow');
const modalTitle = document.getElementById('modal-title');
const modalCategory = document.getElementById('modal-category');
const modalDescription = document.getElementById('modal-description');
const modalDots = document.getElementById('modal-dots');

let currentSlide = 0;
let activeImages = [];

function updateSlideshow() {
    const slides = slideshow.querySelectorAll('.modal-slide');
    const dots = modalDots.querySelectorAll('.dot');
    slides.forEach((s, i) => s.classList.toggle('active', i === currentSlide));
    dots.forEach((d, i) => {
        d.classList.toggle('bg-black', i === currentSlide);
        d.classList.toggle('w-10', i === currentSlide);
        d.classList.toggle('bg-black/10', i !== currentSlide);
        d.classList.toggle('w-4', i !== currentSlide);
    });
}

document.querySelectorAll('.project-trigger').forEach(trigger => {
    trigger.addEventListener('click', () => {
        const id = trigger.getAttribute('data-project');
        const data = projectData[id];
        
        modalTitle.textContent = data.title;
        modalCategory.textContent = data.category;
        modalDescription.innerHTML = data.description.map(d => `<p>${d}</p>`).join('');
        
        activeImages = data.images;
        currentSlide = 0;
        
        // Set aspect ratio class based on project type
        slideshow.className = `relative w-full h-full flex items-center justify-center ${data.type === 'phone' ? 'aspect-phone' : 'aspect-laptop'}`;
        
        slideshow.innerHTML = data.images.map((img, i) => `
            <img src="${img}" class="modal-slide ${i === 0 ? 'active' : ''}">
        `).join('');

        modalDots.innerHTML = data.images.map((_, i) => `
            <div class="dot h-2 rounded-full transition-all duration-500 cursor-pointer ${i === 0 ? 'bg-black w-10' : 'bg-black/10 w-4'}" onclick="setSlide(${i})"></div>
        `).join('');

        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    });
});

window.setSlide = (index) => {
    currentSlide = index;
    updateSlideshow();
};

document.getElementById('modal-next').addEventListener('click', (e) => {
    e.stopPropagation();
    currentSlide = (currentSlide + 1) % activeImages.length;
    updateSlideshow();
});

document.getElementById('modal-prev').addEventListener('click', (e) => {
    e.stopPropagation();
    currentSlide = (currentSlide - 1 + activeImages.length) % activeImages.length;
    updateSlideshow();
});

modalClose.addEventListener('click', () => {
    modal.classList.remove('active');
    document.body.style.overflow = 'auto';
});

modal.addEventListener('click', (e) => {
    if (e.target === modal) modalClose.click();
});

window.addEventListener('keydown', (e) => {
    if (!modal.classList.contains('active')) return;
    if (e.key === 'Escape') modalClose.click();
    if (e.key === 'ArrowRight') document.getElementById('modal-next').click();
    if (e.key === 'ArrowLeft') document.getElementById('modal-prev').click();
});