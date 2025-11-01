document.querySelector('.button').addEventListener('click', function () {
    const link = document.querySelector('.input').value.trim();
    let video_id = "";

    // Extract Video ID
    if (link.includes("watch?v=")) {
        video_id = link.split("v=")[1].substring(0, 11);
    } else if (link.includes("youtu.be/")) {
        video_id = link.split("be/")[1].substring(0, 11);
    }

    // Remove previous result if exists
    const oldContainer = document.querySelector('.image-container');
    if (oldContainer) oldContainer.remove();

    const container = document.createElement('div');
    container.classList.add('image-container');

    if (video_id && video_id.length === 11) {
        container.innerHTML = `<h2 class="title text-center mt-3">All Image Types</h2>`;

        const images = {
            Medium: {
                size: 'Medium (320x180)',
                src: `https://img.youtube.com/vi/${video_id}/mqdefault.jpg`
            },
            Large: {
                size: 'Large (480x360)',
                src: `https://img.youtube.com/vi/${video_id}/hqdefault.jpg`
            },
            Max: {
                size: 'Max (1280x720)',
                src: `https://img.youtube.com/vi/${video_id}/maxresdefault.jpg`
            },
        };

        const boxes = document.createElement('div');
        const img_box = document.createElement('div');

        boxes.classList.add('item', 'mt-3', 'd-flex', 'justify-content-center', 'flex-wrap', 'gap-3');
        img_box.classList.add('text-center', 'mt-4');

        container.append(boxes, img_box);

        for (const item in images) {
            const { src, size } = images[item];
            const box = document.createElement('div');
            const view = document.createElement('button');

            box.classList.add('box', 'border', 'p-3', 'm-2', 'rounded');

            box.innerHTML = `<span class="size d-block mb-2 font-weight-bold">${size}</span>`;

            view.classList.add('view-btn', 'btn', 'btn-primary', 'btn-sm');
            view.innerText = 'View';

            view.addEventListener('click', function () {
                img_box.innerHTML = `
                    <img src="${src}" alt="${item} Resolution" class="img-fluid mt-3 shadow"><br>
                    <button class="btn btn-success mt-3 download-btn" data-src="${src}" data-name="${item}">Download ${item}</button>
                `;

                // Attach click event to download button
                document.querySelector('.download-btn').addEventListener('click', function () {
                    const url = this.getAttribute('data-src');
                    const name = this.getAttribute('data-name');
                    downloadImage(url, name);
                });
            });

            box.append(view);
            boxes.append(box);
        }

    } else {
        container.classList.add('text-danger', 'mt-3', 'text-center');
        container.innerText = "❌ Invalid YouTube Link! Check and try again.";
    }

    document.body.append(container);
});

function downloadImage(url, name) {
    fetch(url)
        .then(response => response.blob())
        .then(blob => {
            const blobUrl = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = blobUrl;
            a.download = `Youtube_Thumbnail_${name}.jpg`;
            document.body.appendChild(a);
            a.click();
            a.remove();
            URL.revokeObjectURL(blobUrl);
        })
        .catch(err => alert("Error downloading image: " + err));
}
