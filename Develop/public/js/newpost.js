const newPostFormHandler = async (event) => {
    event.preventDefault();
    
    const title = document.querySelector('#title').value.trim();
    const description = document.querySelector('#description').value.trim();

    const response = await fetch('/api/posts', {
        method: 'POST',
        body: JSON.stringify({ title, description }),
        headers: { 'Content-Type': 'application/json' },
        });

    if (response.ok) {
        document.location.replace('/homepage');
        } else {
            alert(response.statusText);
            };
};
  
document
.querySelector('#new-post-form')
.addEventListener('submit', newPostFormHandler);

