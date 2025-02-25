const form = document.getElementById('download-form');
const videoUrlInput = document.getElementById('video-url');
const qualitySelect = document.getElementById('quality');
const downloadBtn = document.getElementById('download-btn');
const downloadLinkDiv = document.getElementById('download-link');

form.addEventListener('submit', (e) => {
  e.preventDefault();

  const videoUrl = videoUrlInput.value.trim();
  const quality = qualitySelect.value.trim();

  if (!videoUrl || !quality) {
    window.alert('Please fill in both video URL and quality fields.');
    return;
  }

  const apiEndpoint = 'https://api-improve-production.up.railway.app/yt/download';
  const params = new URLSearchParams({
    url: videoUrl,
    format: 'mp4',
    quality: quality
  });

  fetch(`${apiEndpoint}?${params}`)
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.json();
    })
    .then((data) => {
      const downloadLink = document.createElement('a');
      downloadLink.href = data.downloadUrl;
      downloadLink.textContent = 'Download MP4';
      downloadLink.setAttribute('aria-label', 'Download MP4 video');

      while (downloadLinkDiv.firstChild) {
        downloadLinkDiv.removeChild(downloadLinkDiv.firstChild);
      }
      downloadLinkDiv.appendChild(downloadLink);
    })
    .catch((error) => console.error('Error:', error));
});
