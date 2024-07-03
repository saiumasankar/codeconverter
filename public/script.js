const button = document.getElementById('convertButton');
button.addEventListener('click', async () => {
  const code = document.getElementById('codeFrom').value;
  const targetLanguage = document.getElementById('languageTo').value;

  try {
    const response = await fetch('/api/convert', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ code, targetLanguage })
    });

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    const data = await response.json();
    document.getElementById('codeTo').value = data.convertedCode;
  } catch (error) {
    console.error("Error converting code:", error);
  }
});
