document.addEventListener('DOMContentLoaded', function() {
    const modal = document.getElementById('videoModal');
    const videoPlayer = document.getElementById('videoPlayer');
    const closeBtn = document.querySelector('.video-modal-close');
    const cards = document.querySelectorAll('.card[data-video-id]');

    // Ouverture modal
    cards.forEach(card => {
        card.addEventListener('click', function() {
            const videoId = this.getAttribute('data-video-id');

            const embedUrl = `https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1&rel=0`;

            videoPlayer.src = embedUrl;

            modal.classList.add('active');
            document.body.style.overflow = 'hidden';
        });
    });

    // Fermeture X
    closeBtn.addEventListener('click', closeModal);

    // Fermeture fond
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            closeModal();
        }
    });

    // Fermeture Esc
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && modal.classList.contains('active')) {
            closeModal();
        }
    });

    // Fermeture
    function closeModal() {
        modal.classList.remove('active');
        videoPlayer.src = '';
        document.body.style.overflow = '';
    }
});