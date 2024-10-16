let buttonDiv = document.createElement("div");
let xButton = document.createElement("button");
xButton.className = "close-button";

xButton.addEventListener("click", closeButton);

function closeButton() {
    fetch("/static/blogData.json")
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json(); 
    }).then(posts => {
        posts.forEach(post => {
            // Assuming each post has a unique id and a 'title' field or some content
            const postId = post.id;
            const postElement = document.querySelector(`#post-${postId}`);

            if (postElement) {
                // Remove the post from the UI
                postElement.remove();
                
                // Optionally, track removed posts or perform other operations
                // removedPosts.add(postId); 
            }
        });
    }).catch(error => {
        console.error('There was a problem with the fetch operation:', error);
    });
}
