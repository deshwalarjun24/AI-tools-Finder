// Sample data for AI tools (you can replace this with your actual data)
const tools = [
    {
        id: "chatgpt",
        name: "ChatGPT",
        description: "Powerful AI chatbot for natural conversations",
        category: "language",
        website: "https://chat.openai.com",
        features: ["Natural language processing", "Code generation", "Content creation"],
        price: "Free with limitations",
        last_updated: "2025-06-05"
    },
    {
        id: "dalle",
        name: "DALL-E",
        description: "AI image generation tool",
        category: "visual",
        website: "https://labs.openai.com",
        features: ["Image generation", "Art creation", "Photo editing"],
        price: "Subscription-based",
        last_updated: "2025-06-05"
    },
    {
        id: "midjourney",
        name: "Midjourney",
        description: "Creative AI art generator",
        category: "visual",
        website: "https://www.midjourney.com",
        features: ["Art generation", "Image enhancement", "Style transfer"],
        price: "Subscription-based",
        last_updated: "2025-06-05"
    },
    {
        id: "stable-diffusion",
        name: "Stable Diffusion",
        description: "Open-source AI image generation",
        category: "visual",
        website: "https://stability.ai/stable-diffusion",
        features: ["Image synthesis", "Text-to-image", "AI art"],
        price: "Open-source",
        last_updated: "2025-06-05"
    },
    {
        id: "adobe-firefly",
        name: "Adobe Firefly",
        description: "AI-powered image editing and generation",
        category: "editing",
        website: "https://www.adobe.com/ai",
        features: ["Image editing", "Style transfer", "Photo enhancement"],
        price: "Adobe Creative Cloud subscription",
        last_updated: "2025-06-05"
    },
    {
        id: "claude",
        name: "Claude",
        description: "AI assistant with advanced reasoning",
        category: "language",
        website: "https://www.anthropic.com",
        features: ["Content creation", "Code assistance", "Research"],
        price: "Subscription-based",
        last_updated: "2025-06-05"
    },
    {
        id: "deepseek",
        name: "DeepSeek",
        description: "AI-powered search and analytics platform",
        category: "analytics",
        website: "https://deepseek.com",
        features: ["Data analysis", "Insights generation", "Pattern recognition"],
        price: "Enterprise pricing",
        last_updated: "2025-06-05"
    },
    {
        id: "github-copilot",
        name: "GitHub Copilot",
        description: "AI pair programmer that helps write code",
        category: "coding",
        website: "https://github.com/copilot",
        features: ["Code completion", "Documentation", "Debugging assistance"],
        price: "Subscription-based",
        last_updated: "2025-06-05"
    },
    {
        id: "music-generator",
        name: "MusicLM",
        description: "AI music generation tool",
        category: "music",
        website: "https://musiclm-demo.glitch.me/",
        features: ["Music creation", "Audio processing", "Sound generation"],
        price: "Free",
        last_updated: "2025-06-05"
    }
];

// Function to filter tools by category
function filterToolsByCategory(category) {
    if (category === 'all') {
        return tools;
    }
    return tools.filter(tool => tool.category === category);
}

// Function to search tools
function searchTools(searchTerm, category) {
    const filteredTools = filterToolsByCategory(category);
    if (!searchTerm) return filteredTools;
    
    return filteredTools.filter(tool => 
        tool.name.toLowerCase().includes(searchTerm) || 
        tool.description.toLowerCase().includes(searchTerm) || 
        tool.features.some(feature => feature.toLowerCase().includes(searchTerm))
    );
}

// Function to display tools
function displayTools(toolsArray = tools) {
    const toolsGrid = document.getElementById('toolsGrid');
    toolsGrid.innerHTML = '';

    toolsArray.forEach(tool => {
        const toolCard = document.createElement('div');
        toolCard.className = 'tool-card';
        toolCard.innerHTML = `
            <div class="tool-header">
                <h3>${tool.name}</h3>
                <a href="${tool.website}" target="_blank" rel="noopener noreferrer" class="tool-website">Visit Website</a>
            </div>
            <p class="tool-description">${tool.description}</p>
            <div class="tool-details">
                <div class="tool-category">
                    <span class="category-badge">${tool.category}</span>
                </div>
                <div class="tool-price">
                    <span class="price-label">Price:</span>
                    <span class="price-value">${tool.price}</span>
                </div>
            </div>
            <div class="tool-features">
                <h4>Features:</h4>
                <ul>
                    ${tool.features.map(feature => `<li>${feature}</li>`).join('')}
                </ul>
            </div>
            <div class="tool-meta">
                <span class="last-updated">Last Updated: ${tool.last_updated}</span>
            </div>
        `;
        toolsGrid.appendChild(toolCard);
    });
}

// Initialize sidebar toggle functionality
const menuToggle = document.querySelector('.menu-toggle');
const sidebar = document.querySelector('.sidebar');
const closeSidebar = document.querySelector('.close-sidebar');

menuToggle.addEventListener('click', () => {
    sidebar.classList.add('active');
});

closeSidebar.addEventListener('click', () => {
    sidebar.classList.remove('active');
});

// Close sidebar when clicking outside
window.addEventListener('click', (e) => {
    if (!sidebar.contains(e.target) && !menuToggle.contains(e.target)) {
        sidebar.classList.remove('active');
    }
});

// Initialize search functionality
const categoryFilter = document.getElementById('categoryFilter');
const searchButton = document.getElementById('searchButton');
const searchInput = document.getElementById('searchInput');

// Update display when category changes
categoryFilter.addEventListener('change', () => {
    const searchTerm = searchInput.value.toLowerCase();
    const selectedCategory = categoryFilter.value;
    const filteredTools = searchTools(searchTerm, selectedCategory);
    displayTools(filteredTools);
});

// Update display when search is performed
searchButton.addEventListener('click', () => {
    const searchTerm = searchInput.value.toLowerCase();
    const selectedCategory = categoryFilter.value;
    const filteredTools = searchTools(searchTerm, selectedCategory);
    displayTools(filteredTools);
});

// Update display when search input changes
searchInput.addEventListener('input', (e) => {
    const searchTerm = e.target.value.toLowerCase();
    const selectedCategory = categoryFilter.value;
    const filteredTools = searchTools(searchTerm, selectedCategory);
    displayTools(filteredTools);
});

// Initialize form submission
const contactForm = document.getElementById('contactForm');
const formStatus = contactForm.querySelector('.form-status');
const spinner = formStatus.querySelector('.spinner');
const statusMessage = formStatus.querySelector('.status-message');
const submitBtn = contactForm.querySelector('.submit-btn');

// Form validation
function validateForm() {
    let isValid = true;
    const formGroups = contactForm.querySelectorAll('.form-group');
    
    formGroups.forEach(group => {
        const input = group.querySelector('input, textarea');
        const errorSpan = group.querySelector('.error-message');
        
        if (input.required && !input.value.trim()) {
            errorSpan.textContent = `${input.getAttribute('placeholder') || input.name} is required`;
            group.classList.add('error');
            isValid = false;
        } else {
            group.classList.remove('error');
            errorSpan.textContent = '';
        }
    });
    
    return isValid;
}

// Form submission
contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    try {
        submitBtn.disabled = true;
        spinner.style.display = 'block';
        statusMessage.textContent = '';
        
        // Simulate form submission
        const formData = new FormData(contactForm);
        const data = Object.fromEntries(formData);
        
        // In a real application, you would send this data to your server
        // Here we'll just simulate a successful submission
        await new Promise(resolve => setTimeout(resolve, 1500));
        
        statusMessage.textContent = 'Message sent successfully!';
        statusMessage.style.color = '#27ae60';
        
        // Clear the form
        contactForm.reset();
        
    } catch (error) {
        statusMessage.textContent = 'An error occurred. Please try again.';
        statusMessage.style.color = '#e74c3c';
    } finally {
        submitBtn.disabled = false;
        spinner.style.display = 'none';
    }
});

// Clear error messages when input changes
contactForm.querySelectorAll('input, textarea').forEach(input => {
    input.addEventListener('input', () => {
        const group = input.closest('.form-group');
        group.classList.remove('error');
        group.querySelector('.error-message').textContent = '';
    });
});

// Add smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});
document.getElementById('contactForm').addEventListener('submit', (e) => {
    e.preventDefault();
    alert('Thank you for your message! We will get back to you soon.');
    e.target.reset();
});

// Initialize smooth scrolling for navigation links
document.querySelectorAll('nav a').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href').substring(1);
        const targetElement = document.getElementById(targetId);
        
        if (targetElement) {
            targetElement.scrollIntoView({ behavior: 'smooth' });
            document.querySelectorAll('.nav-links a').forEach(link => 
                link.classList.remove('active')
            );
            this.classList.add('active');
        }
    });
});

// Initialize smooth scrolling for sidebar links
document.querySelectorAll('.sidebar-nav a').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        sidebar.classList.remove('active');
        const targetId = this.getAttribute('href').substring(1);
        const targetElement = document.getElementById(targetId);
        
        if (targetElement) {
            targetElement.scrollIntoView({ behavior: 'smooth' });
        }
    });
});

// Initial display of tools
displayTools();
