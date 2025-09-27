const { test, describe } = require('node:test')
const assert = require('node:assert')
const { dummy, totalLikes, favoriteBlog, mostBlogs, mostLikes } = require('../utils/list_helper')


test('dummy have to return one', () => {
  const blogs = []

  const result = dummy(blogs)
  assert.strictEqual(result, 1)
})

describe('total likes', () => {
  const listWithOneBlog = [
    {
      _id: '5a422aa71b54a676234d17f8',
      title: 'Go To Statement Considered Harmful',
      author: 'Edsger W. Dijkstra',
      url: 'https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf',
      likes: 5,
      __v: 0
    }
  ]

  test('of list with one blog is the likes of that blog', () => {
    const result = totalLikes(listWithOneBlog)
    assert.strictEqual(result, 5)
  })
})

describe('favorite blog', () => {
  const blogs = [
    { _id: '1', title: 'Canonical string reduction', author: 'Edsger W. Dijkstra', url: 'http://example.com/1', likes: 12, __v: 0 },
    { _id: '2', title: 'React patterns', author: 'Michael Chan', url: 'http://example.com/2', likes: 7, __v: 0 },
    { _id: '3', title: 'First class tests', author: 'Robert C. Martin', url: 'http://example.com/3', likes: 10, __v: 0 }
  ]

  test('returns null for empty list', () => {
    assert.strictEqual(favoriteBlog([]), null)
  })

  test('returns only title, author and likes of the most liked blog', () => {
    const result = favoriteBlog(blogs)
    assert.deepStrictEqual(result, {
      title: 'Canonical string reduction',
      author: 'Edsger W. Dijkstra',
      likes: 12
    })
  })
})

describe('most blogs', () => {
  const blogs = [
    { _id: 'a1', title: 'TDD harms architecture', author: 'Robert C. Martin', url: 'http://ex.com/a1', likes: 2, __v: 0 },
    { _id: 'a2', title: 'SOLID principles', author: 'Robert C. Martin', url: 'http://ex.com/a2', likes: 5, __v: 0 },
    { _id: 'b1', title: 'You Dont Know JS', author: 'Kyle Simpson', url: 'http://ex.com/b1', likes: 7, __v: 0 },
    { _id: 'a3', title: 'Clean Code in Practice', author: 'Robert C. Martin', url: 'http://ex.com/a3', likes: 3, __v: 0 },
    { _id: 'c1', title: 'Refactoring Strategies', author: 'Martin Fowler', url: 'http://ex.com/c1', likes: 4, __v: 0 }
  ]

  test('returns null with empty list', () => {
    assert.strictEqual(mostBlogs([]), null)
  })

  test('finds author with most blogs', () => {
    const result = mostBlogs(blogs)
    assert.deepStrictEqual(result, { author: 'Robert C. Martin', blogs: 3 })
  })

  test('works when tie occurs (takes first encountered)', () => {
    const tieBlogs = [
      { _id: '1', title: 'Post 1', author: 'A', url: '', likes: 0, __v: 0 },
      { _id: '2', title: 'Post 2', author: 'B', url: '', likes: 0, __v: 0 },
      { _id: '3', title: 'Post 3', author: 'A', url: '', likes: 0, __v: 0 },
      { _id: '4', title: 'Post 4', author: 'B', url: '', likes: 0, __v: 0 }
    ]
    const result = mostBlogs(tieBlogs)
    // Either A or B with 2; implementation chooses the first author reaching max
    assert.ok(
      (result.author === 'A' && result.blogs === 2) ||
      (result.author === 'B' && result.blogs === 2)
    )
  })
})

describe('most likes', () => {
  const blogs = [
    { _id: 'l1', title: 'Canonical string reduction', author: 'Edsger W. Dijkstra', url: '', likes: 12, __v: 0 },
    { _id: 'l2', title: 'Another alg story', author: 'Edsger W. Dijkstra', url: '', likes: 5, __v: 0 },
    { _id: 'l3', title: 'Functional JS', author: 'Michael Chan', url: '', likes: 7, __v: 0 },
    { _id: 'l4', title: 'Clean Code', author: 'Robert C. Martin', url: '', likes: 10, __v: 0 }
  ]

  test('returns null for empty list', () => {
    assert.strictEqual(mostLikes([]), null)
  })

  test('finds author with highest total likes', () => {
    const result = mostLikes(blogs)
    assert.deepStrictEqual(result, { author: 'Edsger W. Dijkstra', likes: 17 })
  })

  test('works with tie (accepts either)', () => {
    const tieBlogs = [
      { _id: '1', title: 'Post 1', author: 'A', url: '', likes: 5, __v: 0 },
      { _id: '2', title: 'Post 2', author: 'B', url: '', likes: 3, __v: 0 },
      { _id: '3', title: 'Post 3', author: 'B', url: '', likes: 2, __v: 0 }
    ] // A:5, B:5
    const result = mostLikes(tieBlogs)
    assert.ok(
      (result.author === 'A' && result.likes === 5) ||
      (result.author === 'B' && result.likes === 5)
    )
  })
})