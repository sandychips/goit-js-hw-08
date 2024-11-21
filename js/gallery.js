import images from './data.js';

const gallery = document.querySelector('.gallery');

const markup = images.map(({ preview, original, description }) => {
  return `<li class="gallery-item">
    <a class="gallery-link" href="${original}">
      <img
        class="gallery-image"
        src="${preview}"
        data-source="${original}"
        alt="${description}"
      />
    </a>
  </li>`;
}).join('');

gallery.insertAdjacentHTML('beforeend', markup);

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
