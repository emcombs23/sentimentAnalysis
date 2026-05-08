const input = document.getElementById('text-input');
const button = document.getElementById('classify-btn');
const result = document.getElementById('result');

async function classifyText() {
	const text = input.value.trim();
	if (!text) {
		result.textContent = 'Please enter a sentence.';
		return;
	}

	result.textContent = 'Classifying...';
	button.disabled = true;
	try {
		const resp = await fetch(`/classify?text=${encodeURIComponent(text)}`);
		if (!resp.ok) throw new Error(await resp.text());
		const data = await resp.text();
		result.textContent = data;
	} catch (err) {
		result.textContent = 'Error: ' + err.message;
	} finally {
		button.disabled = false;
	}
}

button.addEventListener('click', classifyText);
input.addEventListener('keydown', (e) => {
	if (e.key === 'Enter' && (e.ctrlKey || e.metaKey)) {
		classifyText();
	}
});

// Allow Enter alone to submit when not in multiline context: Ctrl/Cmd+Enter works for textarea
