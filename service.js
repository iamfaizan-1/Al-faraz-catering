function openModal(imageSrc) {
    // Pehle element ko pakrein
    const modalImg = document.getElementById('myimage');
    
    if (modalImg) {
        modalImg.src = ''; // Purani image clear karein
        modalImg.src = imageSrc; // Nayi image set karein
        
    } else {
        console.error("Error: 'myimage' ID wala element nahi mila.");
    }
}