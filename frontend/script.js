document.addEventListener('DOMContentLoaded', () => {
    // ── DOM refs ──

    const dropZone = document.getElementById('drop-zone');
    const fileInput = document.getElementById('file-input');
    const uploadCard = document.getElementById('upload-card');
    const previewCard = document.getElementById('preview-card');
    const imagePreview = document.getElementById('image-preview');
    const classifyBtn = document.getElementById('classify-btn');
    const resetBtn = document.getElementById('reset-btn');
    const loadingCard = document.getElementById('loading-card');
    const resultCard = document.getElementById('result-card');
    const loadingStep = document.getElementById('loading-step');
    const galleryContainer = document.getElementById('gallery-container');
    const galleryEmpty = document.getElementById('gallery-empty');
    const clearBtn = document.getElementById('clear-gallery-btn');
    const steps = [
        'Loading VGG16 model &hellip;',
        'Preprocessing image &hellip;',
        'Running inference &hellip;',
        'Generating results &hellip;'
    ];

    let selectedFile = null;

    // ── Navigation ──

    document.querySelectorAll('.topbar-link').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            document.querySelectorAll('.topbar-link').forEach(l => l.classList.remove('active'));
            link.classList.add('active');

            const page = link.dataset.page;
            document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
            document.getElementById(`page-${page}`).classList.add('active');

            if (page === 'gallery') renderGallery();
        });
    });

    // ── Theme ──

    const themeToggle = document.getElementById('theme-toggle');

    function setTheme(theme) {
        document.documentElement.setAttribute('data-theme', theme);
        localStorage.setItem('fl-theme', theme);
    }

    const saved = localStorage.getItem('fl-theme');
    if (saved) setTheme(saved);

    themeToggle.addEventListener('click', () => {
        const cur = document.documentElement.getAttribute('data-theme');
        setTheme(cur === 'dark' ? 'light' : 'dark');
    });

    // ── Upload ──

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
        if (e.dataTransfer.files.length > 0) handleFile(e.dataTransfer.files[0]);
    });

    const browseBtn = document.getElementById('browse-btn');

    dropZone.addEventListener('click', (e) => {
        if (e.target.closest('.btn-browse')) return;
        fileInput.click();
    });

    browseBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        fileInput.click();
    });

    fileInput.addEventListener('change', (e) => {
        if (e.target.files.length > 0) handleFile(e.target.files[0]);
    });

    function handleFile(file) {
        if (!file.type.startsWith('image/')) {
            alert('Please select a valid image file.');
            return;
        }

        selectedFile = file;
        const reader = new FileReader();

        reader.onload = (e) => {
            imagePreview.src = e.target.result;
            uploadCard.classList.add('hidden');
            previewCard.classList.remove('hidden');
            resultCard.classList.add('hidden');
        };

        reader.readAsDataURL(file);
    }

    // ── Reset ──

    resetBtn.addEventListener('click', resetToUpload);

    document.getElementById('classify-new-btn').addEventListener('click', resetToUpload);

    function resetToUpload() {
        selectedFile = null;
        fileInput.value = '';
        uploadCard.classList.remove('hidden');
        previewCard.classList.add('hidden');
        resultCard.classList.add('hidden');
    }

    // ── Gallery ──

    function getGallery() {
        try { return JSON.parse(localStorage.getItem('fl-gallery') || '[]'); }
        catch { return []; }
    }

    function saveToGallery(entry) {
        const items = getGallery();
        items.unshift(entry);
        localStorage.setItem('fl-gallery', JSON.stringify(items));
    }

    function deleteFromGallery(id) {
        const items = getGallery().filter(i => i.id !== id);
        localStorage.setItem('fl-gallery', JSON.stringify(items));
        renderGallery();
    }

    function clearGallery() {
        localStorage.removeItem('fl-gallery');
        renderGallery();
    }

    function renderGallery() {
        const items = getGallery();

        if (items.length === 0) {
            galleryContainer.innerHTML = '';
            galleryEmpty.classList.remove('hidden');
            clearBtn.classList.add('hidden');
            return;
        }

        galleryEmpty.classList.add('hidden');
        clearBtn.classList.remove('hidden');

        galleryContainer.innerHTML = items.map(item => `
            <div class="gallery-item">
                <div class="gallery-thumb">
                    <img src="${item.image}" alt="${item.className}">
                </div>
                <div class="gallery-info">
                    <div class="gallery-info-top">
                        <span class="gallery-name">${item.className}</span>
                        <span class="gallery-conf">${item.confidence}%</span>
                    </div>
                    <div class="gallery-date">${item.date}</div>
                </div>
                <button class="gallery-del" data-id="${item.id}" aria-label="Delete">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
                </button>
            </div>
        `).join('');

        galleryContainer.querySelectorAll('.gallery-del').forEach(btn => {
            btn.addEventListener('click', () => deleteFromGallery(Number(btn.dataset.id)));
        });
    }

    clearBtn.addEventListener('click', clearGallery);

    // ── Classify ──

    classifyBtn.addEventListener('click', async () => {
        if (!selectedFile) return;

        classifyBtn.disabled = true;
        resetBtn.disabled = true;

        const orig = classifyBtn.innerHTML;
        classifyBtn.innerHTML = `<span class="btn-spinner"></span> Processing`;

        previewCard.classList.add('hidden');
        loadingCard.classList.remove('hidden');
        resultCard.classList.add('hidden');

        const formData = new FormData();
        formData.append('file', selectedFile);

        let stepIdx = 0;
        const stepTimer = setInterval(() => {
            stepIdx = Math.min(stepIdx + 1, steps.length - 1);
            loadingStep.innerHTML = steps[stepIdx];
        }, 600);

        try {
            const response = await fetch('/predict', {
                method: 'POST',
                body: formData
            });

            if (!response.ok) throw new Error('Classification failed');

            const data = await response.json();
            await new Promise(r => setTimeout(r, 400));

            clearInterval(stepTimer);
            loadingStep.innerHTML = 'Complete';

            document.getElementById('result-class').textContent = data.class;
            const pct = (data.confidence * 100).toFixed(1);

            // Ring gauge
            const ring = document.getElementById('ring-fill');
            const ringPct = document.getElementById('ring-pct');
            const circ = 2 * Math.PI * 50;
            ring.style.strokeDasharray = circ;
            ringPct.textContent = '0%';
            requestAnimationFrame(() => {
                ring.style.strokeDashoffset = circ * (1 - pct / 100);
                ringPct.textContent = `${pct}%`;
            });

            // Fruit emoji
            const icons = {
                apple: '🍎', banana: '🍌', orange: '🍊', grape: '🍇',
                strawberry: '🍓', blueberry: '🫐', cherry: '🍒', peach: '🍑',
                pear: '🍐', watermelon: '🍉', lemon: '🍋', mango: '🥭',
                pineapple: '🍍', kiwi: '🥝', coconut: '🥥', pomegranate: '🫑',
                avocado: '🥑', tomato: '🍅', plum: '🫐', raspberry: '🍓'
            };
            const key = data.class.toLowerCase();
            document.getElementById('result-icon').textContent = icons[key] || '🍎';

            const container = document.getElementById('nutrition-container');
            container.innerHTML = '';

            if (data.nutrition) {
                for (const [key, value] of Object.entries(data.nutrition)) {
                    const el = document.createElement('div');
                    el.className = 'nutri-item';
                    el.innerHTML = `<span class="nutri-label">${key}</span><span class="nutri-value">${value}</span>`;
                    container.appendChild(el);
                }
            }

            // Save to gallery
            const reader = new FileReader();
            reader.onload = (e) => {
                saveToGallery({
                    id: Date.now(),
                    date: new Date().toLocaleDateString('en-US', {
                        month: 'short', day: 'numeric', year: 'numeric',
                        hour: '2-digit', minute: '2-digit'
                    }),
                    image: e.target.result,
                    className: data.class,
                    confidence: pct,
                    nutrition: data.nutrition
                });
            };
            reader.readAsDataURL(selectedFile);

            loadingCard.classList.add('hidden');
            resultCard.classList.remove('hidden');

        } catch (error) {
            clearInterval(stepTimer);
            console.error(error);
            alert('Classification failed. Please try again.');
            loadingCard.classList.add('hidden');
            previewCard.classList.remove('hidden');
        } finally {
            classifyBtn.disabled = false;
            resetBtn.disabled = false;
            classifyBtn.innerHTML = orig;
        }
    });
});
