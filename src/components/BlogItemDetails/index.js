import {Component} from 'react'
import Loader from 'react-loader-spinner'

import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css'

import './index.css'

class BlogItemDetails extends Component {
  state = {blogData: [], isLoading: true}

  componentDidMount() {
    this.getBlogData()
  }

  getBlogData = async () => {
    const {match} = this.props
    const {params} = match
    const {id} = params
    const response = await fetch(`https://apis.ccbp.in/blogs/${id}`)
    const data = await response.json()
    const modifiedBlogData = {
      id: data.id,
      imageUrl: data.image_url,
      content: data.content,
      title: data.title,
      avatarUrl: data.avatar_url,
      author: data.author,
    }
    this.setState({blogData: modifiedBlogData, isLoading: false})
  }

  render() {
    const {blogData, isLoading} = this.state
    const {imageUrl, content, title, avatarUrl, author} = blogData
    const blogInformation = (
      <div className="blog-info">
        <h2 className="blog-details-title">{title}</h2>

        <div className="author-details">
          <img className="author-pic" src={avatarUrl} alt={author} />
          <p className="details-author-name">{author}</p>
        </div>

        <img className="blog-image" src={imageUrl} alt={title} />
        <p className="blog-content">{content}</p>
      </div>
    )
    return (
      <div className="blog-container">
        {isLoading ? (
          <Loader type="TailSpin" color="#00BFFF" height={50} width={50} />
        ) : (
          blogInformation
        )}
      </div>
    )
  }
}

export default BlogItemDetails
