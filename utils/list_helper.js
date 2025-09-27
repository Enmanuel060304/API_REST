const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  return blogs.reduce((sum, blog) => sum + blog.likes, 0)
}

const favoriteBlog = (blogs) => {
  if (blogs.length === 0) {
    return null
  }

  const fav = blogs.reduce((prev, curr) => {
    return (prev.likes > curr.likes) ? prev : curr
  })

  // Return only the desired shape
  return {
    title: fav.title,
    author: fav.author,
    likes: fav.likes
  }
}

// Returns the author with the highest number of blog posts
// If blogs is empty returns null
const mostBlogs = (blogs) => {
  if (blogs.length === 0) return null

  // Build a frequency map { author: count }
  const counts = blogs.reduce((acc, blog) => {
    acc[blog.author] = (acc[blog.author] || 0) + 1
    return acc
  }, {})

  // Find max
  let topAuthor = null
  let maxBlogs = -1
  for (const [author, count] of Object.entries(counts)) {
    if (count > maxBlogs) {
      topAuthor = author
      maxBlogs = count
    }
  }

  return { author: topAuthor, blogs: maxBlogs }
}

// Returns the author whose blogs have the highest total likes
// If blogs is empty returns null
const mostLikes = (blogs) => {
  if (blogs.length === 0) return null

  // Aggregate likes per author
  const likesPerAuthor = blogs.reduce((acc, blog) => {
    acc[blog.author] = (acc[blog.author] || 0) + (blog.likes || 0)
    return acc
  }, {})

  let topAuthor = null
  let maxLikes = -1
  for (const [author, likes] of Object.entries(likesPerAuthor)) {
    if (likes > maxLikes) {
      topAuthor = author
      maxLikes = likes
    }
  }

  return { author: topAuthor, likes: maxLikes }
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes
}