document.addEventListener('DOMContentLoaded', (event) => {
    loadPrompts();
});

function addPrompt() {
    const promptInput = document.getElementById('promptInput');
    const promptText = promptInput.value.trim();
    
    if (promptText === "") return;

    const timestamp = new Date().toLocaleString();
    const prompt = {
        text: promptText,
        timestamp: timestamp
    };

    // Save the prompt to local storage
    savePrompt(prompt);

    // Add the prompt to the list
    displayPrompt(prompt);

    // Clear the input
    promptInput.value = "";
}

function displayPrompt(prompt, appendToEnd = false) {
    const promptsDiv = document.getElementById('prompts');

    const promptDiv = document.createElement('div');
    promptDiv.classList.add('prompt');

    const promptTextDiv = document.createElement('div');
    promptTextDiv.textContent = prompt.text;

    const timestampDiv = document.createElement('div');
    timestampDiv.classList.add('timestamp');
    timestampDiv.textContent = prompt.timestamp;

    promptDiv.appendChild(promptTextDiv);
    promptDiv.appendChild(timestampDiv);

    if (appendToEnd) {
        promptsDiv.appendChild(promptDiv);
    } else {
        promptsDiv.insertBefore(promptDiv, promptsDiv.firstChild);
    }
}

function savePrompt(prompt) {
    let prompts = JSON.parse(localStorage.getItem('prompts')) || [];
    prompts.unshift(prompt);
    localStorage.setItem('prompts', JSON.stringify(prompts));
}

function loadPrompts() {
    const prompts = JSON.parse(localStorage.getItem('prompts')) || [];
    prompts.forEach(prompt => displayPrompt(prompt, true));
}

function clearPrompts() {
    if (confirm("Are you sure you want to clear all prompts?")) {
        if (confirm("Are you really really sure?")) {
            if (confirm("Are you 200% completely sure you want to clear ALL of your prompts?")) {
                localStorage.removeItem('prompts');
                document.getElementById('prompts').innerHTML = "";
            }
        }
    }
}