document.addEventListener("DOMContentLoaded", function() {
    let ulElement = document.getElementById("post-list");
    let removedPosts = new Set(); // Set to track removed posts

    // Fetch posts from the backend
    function fetchAndRenderPosts() {
        fetch("/static/blogData.json")
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json(); 
        })
        .then(posts => {
            // Clear existing posts before adding new ones
            ulElement.innerHTML = "";  // Add this line to clear posts

            posts.forEach(post => {
                // Construct a unique post ID
                let postId = `${post['Name']}-${post['Date']}-${post['title-Text']}`.replace(/\s+/g, '-');

                // Skip posts that have been removed by the user
                if (removedPosts.has(postId)) {
                    return; // Skip rendering this post
                }

                // Ensure all required fields are present before proceeding
                if (!post['title-Text'] || !post['Name'] || !post['Date'] || !post['Blog-Text']) {
                    console.error("One or more required fields are missing from the post:", post);
                    return; // Skip this post if any field is missing
                }

                // Avoid duplicate entries
                if (!document.querySelector(`li[data-post-id="${postId}"]`)) {
                    
                    let createLI = document.createElement("li");
                    let createPostBody = document.createElement("div");
                    let divTitle = document.createElement("div");
                    let divInputs = document.createElement("div");
                    let divText = document.createElement("div");
                    let innerTitle = document.createElement("h1");
                    let innerLabel = document.createElement("label");
                    let innerLabelTwo = document.createElement("label");
                    let blogText = document.createElement("p");
                    let buttonDiv = document.createElement("div");  // Define buttonDiv
                    let xButton = document.createElement("button"); // Define xButton

                    // Class Names
                    createLI.className = "post-list";
                    createLI.setAttribute("data-post-id", postId);  // Add a unique post identifier
                    createPostBody.classList.add("hold-body", "hold-body-margin");
                    divTitle.className = "blog-title";
                    divInputs.className = "blog-inputs";
                    buttonDiv.className = "button-div";
                    divText.className = "blog-text";
                    innerTitle.className = "blog-title"; 
                    innerLabel.className = "blog-labels"; 
                    innerLabelTwo.className = "blog-labels";
                    blogText.className = "post-text";
                    xButton.className = "remove-post";  // Add a class to the button for later use

                    // Dynamic texts
                    innerTitle.textContent = post['title-Text'];
                    innerLabel.textContent = "Author: " + post['Name'];
                    innerLabelTwo.textContent = "Date: " + post['Date'];
                    blogText.textContent = post['Blog-Text'];
                    xButton.textContent = "x";

                    // Attach the close button click event
                    xButton.addEventListener('click', function() {
                        removedPosts.add(postId);  // Add post to removed set
                        createLI.remove();  // Remove post from UI
                    });

                    // Appending elements
                    ulElement.appendChild(createLI);
                    createLI.append(createPostBody);
                    createPostBody.append(buttonDiv);
                    createPostBody.append(divTitle);
                    createPostBody.append(divInputs);
                    createPostBody.append(divText);
                    divTitle.appendChild(innerTitle);
                    divInputs.appendChild(innerLabel);
                    divInputs.append(innerLabelTwo);
                    divText.appendChild(blogText);
                    buttonDiv.append(xButton);
                }
            });
        })
        .catch(error => console.error('Error fetching posts:', error));
    }

    // Fetch and render posts on page load
    fetchAndRenderPosts();
});
