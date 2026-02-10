document.addEventListener('DOMContentLoaded', function() {
    const modal = document.getElementById('videoModal');
    const videoContainer = document.querySelector('.video-wrapper');
    const closeBtn = document.querySelector('.video-modal-close');
    const cards = document.querySelectorAll('.card[data-video-mp4]');

    let plyrInstance = null;

    // Ouvrir le modal
    cards.forEach(card => {
        card.addEventListener('click', function() {
            const baseName = this.getAttribute('data-video-mp4'); 
            const poster = this.getAttribute('data-poster') || '';
            const qualities = this.getAttribute('data-quality')?.split(',') || ['1080'];
            
            const lastSlashIndex = baseName.lastIndexOf('/');
            const videoPath = baseName.substring(0, lastSlashIndex);
            const videoFile = baseName.substring(lastSlashIndex + 1);
            
            const sources = qualities.map(q => {
                const videoSrc = `${videoPath}/${q}p/${videoFile}`;
                return `<source src="${videoSrc}" type="video/mp4" size="${q}">`;
            }).join('');
            
            videoContainer.innerHTML = `
                <video class="plyr-player" 
                    playsinline controls preload="metadata" 
                    poster="${poster}">
                    ${sources}
                </video>
            `;
            
            setTimeout(() => {
                if (typeof Plyr !== 'undefined') {
                    plyrInstance = new Plyr('.plyr-player', {
                        controls: ['play-large', 'play', 'progress', 'current-time', 'duration', 'mute', 'volume', 'fullscreen', 'settings'],

                        settings: ['quality'], 
                        
                        quality: {
                            default: 1080,
                            options: qualities.map(q => parseInt(q)),
                            forced: true,
                            selector: true
                        },
                        
                        tooltips: { controls: true, seek: true }
                    });
                    
                    plyrInstance.play().catch(e => console.log('Autoplay:', e));
                }
            }, 150);
            
            modal.classList.add('active');
            document.body.style.overflow = 'hidden';
        });
    });

    // Fermer le modal
    function closeModal() {
        modal.classList.remove('active');
        document.body.style.overflow = '';

        // Fermer Plyr proprement
        if (plyrInstance && typeof plyrInstance.destroy === 'function') {
            plyrInstance.destroy();
            plyrInstance = null;
        }
        videoContainer.innerHTML = '';
    }

    // Événements de fermeture sécurisés
    closeBtn.addEventListener('click', closeModal);
    modal.addEventListener('click', function(e) {
        if (e.target === modal) closeModal();
    });

    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && modal.classList.contains('active')) {
            closeModal();
        }
    });
});