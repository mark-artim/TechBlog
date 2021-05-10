// UPDATE POST or PUT a POST (funny huh?)
const editPostFormHandler = async (event) => {
    console.log("I am supposed to update a fucking post.")
    event.preventDefault();
    const url = window.location.pathname;
    const id = url.substring(url.lastIndexOf('/') + 1)
  
    const title = document.querySelector('#title').value.trim();
    const description = document.querySelector('#description').value.trim();
    const post_id = id;

    const response = await fetch(`/api/posts/${id}`, {
        method: 'PUT',
        body: JSON.stringify({ title, description }),
        headers: { 'Content-Type': 'application/json' },
        });

    if (response.ok) {
        // document.location.replace('homepage');
        document.location.replace('/');
        } else {
            alert(response.statusText);
            };
};

document
.querySelector('#edit-post-form')
.addEventListener('submit', editPostFormHandler);
