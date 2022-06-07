{
    console.log('helloo');
    let createPost = function () {
        let newPostForm = $('#new-post-form');
        console.log(newPostForm);
        newPostForm.submit(function (e) {
            e.preventDefault();
            // console.log('i am here')
            $.ajax({
                type: 'post',
                url: '/posts/create-post',
                data: newPostForm.serialize(),
                success: function (data) {
                    // console.log(data)
                    let newPost = newPostDom(data.data.post);
                    // console.log(newPost);
                    $('#posts-list-container > ul').prepend(newPost);
                },
                error: function (error) {
                    console.log(error)
                }
            })
        })
    }


    let newPostDom = function (post) {
        return $(`<li id="post-${post._id}">
        ${post.user.username}
            <br>
            ${post.content}
    </li>
    <div class="posts-comments-list">
        <ul class="post-comments-${post._id}">
            
                <a class="delete" href="/posts/delete/${post._id}">delete</a>
                        
        </ul>
    </div>
    <h5>Add comment</h5>
    <form id="new-post-form" action="/comments/comment/?id=${post._id}" method="post">
        <textarea name="comment" placeholder="comment here..." cols="30" rows="1"></textarea>
        <input type="submit" value="Post">
    </form>
    <%}%>`)
    }

    //writting the function is good but dont forget calling the function.
    createPost();
}