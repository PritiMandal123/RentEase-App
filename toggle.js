const availabilityRef = firebase.database().ref('availability');
const availabilityToggle = document.getElementById('availabilityToggle');


const saveStateToLocalStorage = (isAvailable) => {
  localStorage.setItem('availabilityState', JSON.stringify(isAvailable));
};

if (availabilityToggle && typeof availabilityToggle.addEventListener === 'function') {
  const savedState = localStorage.getItem('availabilityState');
  if (savedState !== null) {
    availabilityToggle.checked = JSON.parse(savedState);
  } else {
    availabilityRef.once('value').then(snapshot => {
      const isAvailable = snapshot.val();
      availabilityToggle.checked = isAvailable;

    
      saveStateToLocalStorage(isAvailable);
    });
  }

  availabilityToggle.addEventListener('change', (event) => {
    const isChecked = event.target.checked;

    
    availabilityRef.set(isChecked);

    saveStateToLocalStorage(isChecked);
  });
} else {
  console.error('Error: availabilityToggle is not a valid HTML element.');
}
