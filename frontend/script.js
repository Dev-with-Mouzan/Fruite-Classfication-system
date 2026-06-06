document.addEventListener('DOMContentLoaded', () => {
    const dropZone = document.getElementById('drop-zone');
    const fileInput = document.getElementById('file-input');
    const previewSection = document.getElementById('preview-section');
    const imagePreview = document.getElementById('image-preview');
    const imageWrapper = document.querySelector('.image-wrapper');
    const classifyBtn = document.getElementById('classify-btn');
    const resetBtn = document.getElementById('reset-btn');
    const loadingSection = document.getElementById('loading-section');
    const resultSection = document.getElementById('result-section');
    const tiltCard = document.getElementById('tilt-card');
    
    let selectedFile = null;

    // Optional 3D Tilt Effect on mousemove
    document.body.addEventListener('mousemove', (e) => {
        if (!tiltCard) return;
        const xAxis = (window.innerWidth / 2 - e.pageX) / 50;
        const yAxis = (window.innerHeight / 2 - e.pageY) / 50;
        tiltCard.style.transform = `rotateY(${xAxis}deg) rotateX(${yAxis}deg)`;
    });
    
    document.body.addEventListener('mouseenter', () => {
        if (tiltCard) tiltCard.style.transition = "none";
    });

    document.body.addEventListener('mouseleave', () => {
        if (tiltCard) {
            tiltCard.style.transition = "transform 0.5s ease";
            tiltCard.style.transform = `rotateY(0deg) rotateX(0deg)`;
        }
    });

    // Handle Drag & Drop
    dropZone.addEventListener('dragover', (e) => {
        e.preventDefault();
        dropZone.classList.add('dragover');
    });

    dropZone.addEventListener('dragleave', () => {
        dropZone.classList.remove('dragover');
    });

    dropZone.addEventListener('drop', (e) => {
        e.preventDefault();
        dropZone.classList.remove('dragover');
        
        if (e.dataTransfer.files.length > 0) {
            handleFile(e.dataTransfer.files[0]);
        }
    });

    // Handle Click to Upload
    dropZone.addEventListener('click', () => {
        fileInput.click();
    });

    fileInput.addEventListener('change', (e) => {
        if (e.target.files.length > 0) {
            handleFile(e.target.files[0]);
        }
    });

    // Handle File Processing
    function handleFile(file) {
        if (!file.type.startsWith('image/')) {
            alert('Please select a valid image file.');
            return;
        }

        selectedFile = file;
        const reader = new FileReader();
        
        reader.onload = (e) => {
            imagePreview.src = e.target.result;
            dropZone.parentElement.classList.add('hidden');
            previewSection.classList.remove('hidden');
            resultSection.classList.add('hidden');
            
            // Reset state
            imageWrapper.classList.remove('scanning');
            document.getElementById('metrics-fill').style.width = '0%';
        };
        
        reader.readAsDataURL(file);
    }

    // Handle Reset
    resetBtn.addEventListener('click', () => {
        selectedFile = null;
        fileInput.value = '';
        dropZone.parentElement.classList.remove('hidden');
        previewSection.classList.add('hidden');
        resultSection.classList.add('hidden');
        imageWrapper.classList.remove('scanning');
    });

    // Handle Classification
    classifyBtn.addEventListener('click', async () => {
        if (!selectedFile) return;

        // UI updates for loading state
        classifyBtn.disabled = true;
        resetBtn.disabled = true;
        
        // Change button text to indicate processing
        const originalBtnText = classifyBtn.innerHTML;
        classifyBtn.innerHTML = 'Processing... <span class="spinner-modern" style="width:16px; height:16px; border-width:2px; display:inline-block; vertical-align:middle; margin-left:8px;"></span>';
        
        loadingSection.classList.remove('hidden');
        resultSection.classList.add('hidden');

        const formData = new FormData();
        formData.append('file', selectedFile);

        try {
            const response = await fetch('/predict', {
                method: 'POST',
                body: formData
            });

            if (!response.ok) {
                throw new Error('Classification failed');
            }

            const data = await response.json();
            
            // Artificial delay for effect
            await new Promise(r => setTimeout(r, 800));
            
            // Update UI with results
            document.getElementById('result-class').textContent = data.class;
            const percentage = (data.confidence * 100).toFixed(1);
            document.getElementById('result-confidence').textContent = `${percentage}%`;
            
            // Populate Nutrition Grid
            const nutritionContainer = document.getElementById('nutrition-container');
            nutritionContainer.innerHTML = ''; // clear previous
            
            if (data.nutrition) {
                for (const [key, value] of Object.entries(data.nutrition)) {
                    const item = document.createElement('div');
                    item.className = 'nutrition-item';
                    item.innerHTML = `
                        <span class="nutrition-label">${key}</span>
                        <span class="nutrition-value">${value}</span>
                    `;
                    nutritionContainer.appendChild(item);
                }
            }
            
            loadingSection.classList.add('hidden');
            resultSection.classList.remove('hidden');
            
            // Animate progress bar with slight delay for impact
            setTimeout(() => {
                document.getElementById('metrics-fill').style.width = `${percentage}%`;
            }, 100);

        } catch (error) {
            console.error('Error:', error);
            alert('An error occurred during classification. Please try again.');
            loadingSection.classList.add('hidden');
        } finally {
            classifyBtn.disabled = false;
            resetBtn.disabled = false;
            classifyBtn.innerHTML = originalBtnText;
        }
    });
});
