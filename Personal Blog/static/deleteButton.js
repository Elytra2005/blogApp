
document.addEventListener("DOMContentLoaded", () => {
    let buttonDiv = document.createElement("div");  // Define buttonDiv
    let xButton = document.createElement("button");


    // class names
    buttonDiv.className = "button-div";
    xButton.className = "remove-post";  // Add a class to the button for later use


    if (xButton) {
        xButton.addEventListener("click", closeButton);
    } else {
        console.error("Button with class 'remove-post' not found.");
    }

    function closeButton() {
        fetch("/static/blogData.json")
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                return response.json(); 
        }).then(posts => {
            posts.forEach(post => {
                let uniqueId = post['removal-id'];
                console.log(uniqueId);
            });
        }).catch(error => {
            console.error('There was a problem with the fetch operation:', error);
        });
    }
});
