$(document).ready(function() {
    const $chatbox = $('#chatbox');
    const $messageForm = $('#message-form');
    const $messageInput = $('#message-input');

    function displayMessage(sender, text) {
        const messageClass = sender === 'user' ? 'user-message' : 'bot-message';
        const name = sender === 'user' ? 'User' : 'ChatBot';
        const messageHtml = `
            <div class="message ${messageClass}">
                <div class="avatar"></div>
                <div class="message-text">
                    <strong>${name}:</strong> ${text}
                </div>
            </div>
        `;
        $chatbox.append(messageHtml);
        $chatbox.scrollTop($chatbox[0].scrollHeight);
    }

    function escapeHTML(unsafeText) {
        const div = document.createElement('div');
        div.textContent = unsafeText;
        return div.innerHTML;
    }

    function handleUserMessage(text) {
        const escapedText = escapeHTML(text);
        displayMessage('user', escapedText);
        processUserMessage(escapedText);
    }

    function processUserMessage(text) {
        // Simply repeat what the user said
        const botResponse = `You said: ${text}`;
        displayMessage('bot', botResponse);
    }

    $messageForm.on('submit', function(event) {
        event.preventDefault();
        const userMessage = $messageInput.val().trim();

        if (userMessage.length > 0) {
            handleUserMessage(userMessage);
            $messageInput.val('');
        }
    });
});
