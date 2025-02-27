// Firebase configuration (You need to replace this with your own Firebase config)
const firebaseConfig = {
        apiKey: "AIzaSyCrOoKZ4qaUrg4ea0GibvxbLmsCc4oKDXk",
        authDomain: "prochat-d4664.firebaseapp.com",
        databaseURL: "https://prochat-d4664-default-rtdb.firebaseio.com/",
        projectId: "prochat-d4664",
        storageBucket: "prochat-d4664.appspot.com",
        messagingSenderId: "589981004345",
        appId: "1:589981004345:web:6692ebf36d164c1a4e53e8"
    };

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const db = firebase.database();
const messagesRef = db.ref('messages');

let username = '';

// Join chat
function joinChat() {
    const userNameInput = document.getElementById('userName').value.trim();
    if (userNameInput) {
        username = userNameInput;
        document.getElementById('nameContainer').style.display = 'none';
        document.getElementById('chatContainer').style.display = 'flex';
        document.getElementById('currentUser').textContent = username;
        loadMessages();
    } else {
        alert('Please enter a name!');
    }
}

// Send message
function sendMessage() {
    const messageInput = document.getElementById('messageInput');
    const message = messageInput.value.trim();
    
    if (message && username) {
        const timestamp = new Date().toLocaleTimeString();
        messagesRef.push({
            user: username,
            text: message,
            timestamp: timestamp
        });
        messageInput.value = '';
    }
}

// Load and display messages
function loadMessages() {
    const messagesDiv = document.getElementById('messages');
    
    messagesRef.on('child_added', (snapshot) => {
        const data = snapshot.val();
        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${data.user === username ? 'sent' : 'received'}`;
        
        messageDiv.innerHTML = `
            <div class="user">${data.user}</div>
            <div class="content">${data.text}</div>
            <div class="time">${data.timestamp}</div>
        `;
        
        messagesDiv.appendChild(messageDiv);
        messagesDiv.scrollTop = messagesDiv.scrollHeight;
    });
}

// Clear chat
function clearChat() {
    if (confirm('Are you sure you want to clear the chat history?')) {
        messagesRef.remove();
        document.getElementById('messages').innerHTML = '';
    }
}

// Send message on Enter key
document.getElementById('messageInput').addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        sendMessage();
    }
});