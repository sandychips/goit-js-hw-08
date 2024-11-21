import images from './data.js';

const gallery = document.querySelector('.gallery');

// Функція очищення URL
function cleanUrl(url) {
  return url.replace(/[<>]/g, '');
}

// Генерація розмітки галереї з очищенням URL
const markup = images.map(({ preview, original, description }) => {
  return `<li class="gallery-item">
    <a class="gallery-link" href="${cleanUrl(original)}">
      <img
        class="gallery-image"
        src="${cleanUrl(preview)}"
        data-source="${cleanUrl(original)}"
        alt="${description}"
      />
    </a>
  </li>`;
}).join('');

gallery.insertAdjacentHTML('beforeend', markup);

// Додавання події для відкриття модального вікна
gallery.addEventListener('click', event => {
  event.preventDefault();

  if (event.target.nodeName === 'IMG') {
    openModal(event.target.dataset.source);
  }
});

function openModal(src) {
  const instance = basicLightbox.create(
    `
      <img src="${src}" width="1112" height="640">
    `,
    {
      className: 'modal',

      onShow: instance => {
        document.addEventListener('keydown', onEscapePress);
      },

      onClose: instance => {
        document.removeEventListener('keydown', onEscapePress);
      },
    }
  );

  instance.show();

  function onEscapePress(event) {
    if (event.code === 'Escape') {
      instance.close();
    }
  }
}
