// public/js/script.js

const button = document.getElementById('convertButton');
button.addEventListener('click', async () => {
  const code = document.getElementById('codeFrom').value;
  const targetLanguage = document.getElementById('languageTo').value;

  try {
    const apiUrl = 'https://66858d799cd4656559766b91--umacodeconverter.netlify.app/.netlify/functions/convert'; // Update with your Netlify function endpoint

    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ code, targetLanguage })
    });

    if (!response.ok) {
      throw new Error(`Error converting code: ${response.statusText}`);
    }

    const data = await response.json();
    document.getElementById('codeTo').value = data.convertedCode;
  } catch (error) {
    console.error("Error converting code:", error);
    alert(`Error converting code: ${error.message}`);
  }
});
