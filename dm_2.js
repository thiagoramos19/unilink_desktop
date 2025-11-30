document.addEventListener('DOMContentLoaded', () => {
    const messageInput = document.querySelector('.message-input');
    const sendButton = document.querySelector('.send-button');
    const chatMessages = document.querySelector('.chat-messages');
    const conversationItems = document.querySelectorAll('.conversation-item');
    
    const getCurrentTime = () => {
        const now = new Date();
        const hours = String(now.getHours()).padStart(2, '0');
        const minutes = String(now.getMinutes()).padStart(2, '0');
        return `${hours}:${minutes}`;
    };

    const sendMessage = () => {
        const messageText = messageInput.value.trim();

        if (messageText !== '') {
            const time = getCurrentTime();

            const messageDiv = document.createElement('div');
            messageDiv.classList.add('message', 'sent'); 

            messageDiv.innerHTML = `
                <div class="message-content">${messageText}</div>
                <div class="message-time-status">${time} <i class="icon-checked"></i></div>
            `;

            chatMessages.appendChild(messageDiv);

            chatMessages.scrollTop = chatMessages.scrollHeight;

            messageInput.value = '';
        }
    };

    if (sendButton) {
        sendButton.addEventListener('click', sendMessage);
    }

    if (messageInput) {
        messageInput.addEventListener('keypress', (event) => {
            if (event.key === 'Enter') {
                sendMessage();
                event.preventDefault(); 
            }
        });
    }

    if (conversationItems.length > 0) {
        conversationItems.forEach(item => {
            item.addEventListener('click', () => {
               
                conversationItems.forEach(i => i.classList.remove('active'));
                
                item.classList.add('active');
                
                console.log('Conversa trocada para:', item.querySelector('.conversation-user').textContent);
            });
        });
    }
});
