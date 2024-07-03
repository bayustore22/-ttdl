document.addEventListener('DOMContentLoaded', function() {
    const fetchButton = document.getElementById('fetchTikTok');
    const loadingSpinner = document.querySelector('.loading-spinner');

    fetchButton.addEventListener('click', function() {
        const tiktokUrlInput = document.getElementById('tiktokUrl');
        const tiktokContent = document.getElementById('tiktok-content');

        // Menampilkan loading spinner
        loadingSpinner.style.display = 'block';

        fetch('https://api.fgmods.xyz/api/downloader/tiktok?url=' + encodeURIComponent(tiktokUrlInput.value) + '&apikey=zm873dwA')
            .then(response => response.json())
            .then(data => {
                // Menyembunyikan loading spinner setelah data diambil
                loadingSpinner.style.display = 'none';
                if (data.status && data.result) {
                    tiktokContent.innerHTML = `
                        <h1>${data.result.title}</h1>
                        <button id="downloadVideoButton" class="download-btn">Download Video</button>
                        <button id="downloadMusicButton" class="download-btn">Download Music</button>
                    `;
                    
                    // Menambahkan event listener untuk tombol download musik
                    const downloadMusicButton = document.getElementById('downloadMusicButton');
                    downloadMusicButton.addEventListener('click', function() {
                        downloadMusic(data.result.music, 'music.mp3');
                    });
                    const downloadVideoButton = document.getElementById('downloadVideoButton');
                    downloadVideoButton.addEventListener('click', function() {
                    downloadVideo(data.result.play, 'video.mp4');
                    })
                } else {
                    tiktokContent.innerHTML = `<p>Video tidak ditemukan</p>`;
                }
            })
            .catch(error => {
                // Menyembunyikan loading spinner jika terjadi kesalahan
                loadingSpinner.style.display = 'none';
                tiktokContent.innerHTML = `<p>Terjadi kesalahan saat mengambil data</p>`;
                console.error('Error fetching TikTok data:', error);
            });
    });
});

function downloadMusic(url, fileName) {
    fetch(url)
        .then(response => response.blob())
        .then(blob => {
            const url = window.URL.createObjectURL(new Blob([blob]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', fileName);
            document.body.appendChild(link);
            link.click();
            link.parentNode.removeChild(link);
        })
        .catch(error => console.error('Error downloading music:', error));
}

function downloadVideo(url, fileName) {
    fetch(url)
        .then(response => response.blob())
        .then(blob => {
            const url = window.URL.createObjectURL(new Blob([blob]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', fileName);
            document.body.appendChild(link);
            link.click();
            link.parentNode.removeChild(link);
        })
        .catch(error => console.error('Error downloading video:', error));
}
