// Opens an image in the modal
function openModal(imageSrc) {
  const modalImg = document.getElementById('myimage');
  if (modalImg) {
    modalImg.src = imageSrc;
    modalImg.alt = 'Event photo - full size view';
  }
}