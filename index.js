function fetchPostById(postId) {
    return new Promise((resolve, reject) => {
        fetch(`https://jsonplaceholder.typicode.com/posts/${postId}`)
            .then(response => {
                if (!response.ok) {
                    reject(new Error("Не вдалося знайти пост"))
                    return
                }
                return response.json()
            })
            .then(data => {
                resolve(data)
            })
            .catch(error => {
                reject(error)
            })
    })
}

function fetchCommentsForPost(postId) {
    return new Promise((resolve, reject) => {
        fetch(`https://jsonplaceholder.typicode.com/posts/${postId}/comments`)
            .then(response => {
                if (!response.ok) {
                    reject(new Error("Не вдалося отримати коментарі"))
                    return
                }
                return response.json()
            })
            .then(data => {
                resolve(data)
            })
            .catch(error => {
                reject(error)
            })
    })
}

let commentsData = []

function displayPost(post) {
    const postContainer = document.getElementById("post-container")
    postContainer.innerHTML = `
        <div class="post">
            <h2>${post.title}</h2>
            <p>${post.body}</p>
            <button id="comments-button">Завантажити коментарі</button>
        </div>
    `
    const commentsButton = document.getElementById("comments-button")
    commentsButton.addEventListener("click", () => {
        fetchCommentsForPost(post.id)
            .then(comments => {
                commentsData = comments
                console.log(commentsData)
            })
            .catch(error => {
                console.error("Помилка при отриманні коментарів:", error.message)
            })
    })
}

function handleSearch() {
    const postIdInput = document.getElementById("post-id")
    const postId = parseInt(postIdInput.value)

    if (isNaN(postId) || postId < 1 || postId > 100) {
        alert("Будь ласка, введіть дійсний ідентифікатор від 1 до 100.")
        return
    }

    fetchPostById(postId)
        .then(post => {
            displayPost(post)
        })
        .catch(error => {
            console.error("Помилка при отриманні поста:", error.message)
        })
}

const searchButton = document.getElementById("search-button")
searchButton.addEventListener("click", handleSearch)
