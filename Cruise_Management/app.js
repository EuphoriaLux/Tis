// Function to read data from Firebase
function readUserData(userId) {
    console.log('Attempting to read user data for:', userId);
    const userRef = firebase.database().ref('users/' + userId);
    userRef.once('value')
        .then((snapshot) => {
            const data = snapshot.val();
            console.log('Raw snapshot data:', data);
            console.log('Snapshot exists:', snapshot.exists());
            console.log('Snapshot key:', snapshot.key);
            if (data) {
                console.log('User data found:', data);
                console.log('Data type:', typeof data);
                console.log('Data keys:', Object.keys(data));
                if (typeof data === 'object') {
                    console.log('Is array?', Array.isArray(data));
                    if (Array.isArray(data)) {
                        console.log('Array length:', data.length);
                        console.log('First element:', data[0]);
                        console.log('Second element:', data[1]);
                    }
                }
                updateUserInfo(data);
            } else {
                console.log('No data found for user ID:', userId);
                updateUserInfo(null);
            }
        })
        .catch((error) => {
            console.error('Error reading data:', error);
        });
}

// Function to update the UI with user data
function updateUserInfo(userData) {
    const userInfo = document.getElementById('user-info');
    console.log('Updating UI with userData:', userData);
    if (userData) {
        let username = 'Not set';
        let email = 'Not set';
        if (typeof userData === 'object') {
            if (Array.isArray(userData)) {
                // If it's an array, use the second element (index 1)
                username = userData[1]?.username || 'Not set';
                email = userData[1]?.email || 'Not set';
            } else {
                // If it's an object, use it directly
                username = userData.username || 'Not set';
                email = userData.email || 'Not set';
            }
        }
        userInfo.innerHTML = `
        <p>Username: ${username}</p>
        <p>Email: ${email}</p>
      `;
    } else {
        userInfo.innerHTML = '<p>No user data found</p>';
    }
}

// Function to write data to Firebase
function writeUserData(userId, name, email) {
    console.log('Attempting to write user data:', { userId, name, email });
    return firebase.database().ref('users/' + userId).set({
        username: name,
        email: email
    })
    .then(() => {
        console.log('Data written successfully for user:', userId);
        // Immediately read back the data to verify
        return firebase.database().ref('users/' + userId).once('value');
    })
    .then((snapshot) => {
        const data = snapshot.val();
        console.log('Verification read:', data);
        updateUserInfo(data);
    })
    .catch((error) => {
        console.error('Error writing or verifying data:', error);
    });
}

// Example usage
document.addEventListener('DOMContentLoaded', (event) => {
    // Write user data when form is submitted
    const userForm = document.getElementById('user-form');
    userForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const userId = document.getElementById('user-id').value;
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        writeUserData(userId, name, email);
    });

    // Read and display user data when button is clicked
    const readButton = document.getElementById('read-button');
    readButton.addEventListener('click', () => {
        const userId = document.getElementById('user-id').value;
        readUserData(userId);
    });
});