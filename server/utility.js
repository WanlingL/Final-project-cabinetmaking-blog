//Receives new blog post
export const makeNewBlogObject = (text) => {
    
    const result = {}
    result._id = Date.now()
    result.text = text;
    date_posted = new Date,
    comments = []
    return result
}