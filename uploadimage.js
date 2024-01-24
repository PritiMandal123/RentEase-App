function uploadImage() {
    const fileInput = document.getElementById('image');
    const descriptionInput = document.getElementById('description');
    const contactInput = document.getElementById('contact');

    const file = fileInput.files[0];

    if (file && descriptionInput.value && contactInput.value) {
        
        const docId = Date.now().toString();

        const storageRef = firebase.storage().ref(`images/${docId}`);

        const uploadTask = storageRef.put(file);

        uploadTask.on('state_changed',
            (snapshot) => {
                
            },
            (error) => {
                console.error('Error uploading image:', error);
            },
            () => {
                
                uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
                    
                    db.collection('images').doc(docId).set({
                        description: descriptionInput.value,
                        contact: contactInput.value,
                        imageUrl: downloadURL,
                        timestamp: firebase.firestore.FieldValue.serverTimestamp()
                    })
                        .then(() => {
                            alert('Image uploaded successfully!');
                            
                            fileInput.value = '';
                            descriptionInput.value = '';
                            contactInput.value = '';
                        })
                        .catch((error) => {
                            console.error('Error adding document:', error);
                        });
                });

            }
        );
    } else {
        alert('Please fill out all fields and choose an image.');
    }
}

function fetchAndDisplayImages() {
    const imageListDiv = document.getElementById('imageList');

    if (imageListDiv) {
        
        imageListDiv.innerHTML = '';

        db.collection('images').get()
            .then((querySnapshot) => {
                querySnapshot.forEach((doc) => {
                    const imageData = doc.data();
                    const imageUrl = imageData.imageUrl;
                    const description = imageData.description;
                    const contact = imageData.contact;

                    const imageContainer = document.createElement('div');
                    imageContainer.classList.add('image-container');

                    const imageElement = document.createElement('img');
                    imageElement.src = imageUrl;

                    const descriptionElement = document.createElement('p');
                    descriptionElement.textContent = `Description: ${description}`;

                    
                    const contactButton = document.createElement('button');
                    contactButton.textContent = `Contact: ${contact}`;
                    contactButton.classList.add('contact-button'); 
                    contactButton.onclick = function () {
                        alert(`Contact: ${contact}`);
                    };

                    imageContainer.appendChild(imageElement);
                    imageContainer.appendChild(descriptionElement);
                    imageContainer.appendChild(contactButton);

                    
                    imageListDiv.appendChild(imageContainer);
                });
            })
            .catch((error) => {
                console.error('Error fetching images:', error);
            });
    } else {
        console.error('Element with id "imageList" not found.');
    }
}

document.addEventListener('DOMContentLoaded', () => {
    fetchAndDisplayImages();
});