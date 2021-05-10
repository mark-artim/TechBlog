// const { post } = require("../../controllers");


const postCommentFormHandler = async (event) => {
    event.preventDefault();
    const url = window.location.pathname;
    const id = url.substring(url.lastIndexOf('/') + 1)
  
    const comment_text = document.querySelector('#comment').value.trim();
    const post_id = id;

    const response = await fetch('/api/comments', {
        method: 'POST',
        body: JSON.stringify({ comment_text, post_id }),
        headers: { 'Content-Type': 'application/json' },
        });

    if (response.ok) {
        document.location.replace(`/post/${id}`);
        } else {
            alert(response.statusText);
            };
};

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
        document.location.replace('homepage');
        } else {
            alert(response.statusText);
            };
};

  
const deletePostFormHandler = async (event) => {
    event.preventDefault();
    console.log("Delete Post was clicked!");
    const url = window.location.pathname;
    const id = url.substring(url.lastIndexOf('/') + 1)
    const post_id = id;

    const response = await fetch(`/api/posts/${id}`, {
        method: 'DELETE',
        // body: JSON.stringify({ comment_text, post_id }),
        // headers: { 'Content-Type': 'application/json' },
        });

    if (response.ok) {
        console.log(`I just deleted post #${id}`);
        document.location.replace('/');
        } else {
            alert(response.statusText);
            };
};



document
.querySelector('#new-comment-form')
.addEventListener('submit', postCommentFormHandler);
document
.querySelector('#deletePost')
.addEventListener('click', deletePostFormHandler);
document
.querySelector('#edit-post-form')
.addEventListener('submit', editPostFormHandler);

