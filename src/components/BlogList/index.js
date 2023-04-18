import {Component} from 'react'
import Loader from 'react-loader-spinner'

import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css'

import BlogItem from '../BlogItem'

import './index.css'

class BlogList extends Component {
  state = {blogList: [], isLoading: true}

  componentDidMount() {
    this.getBlogsData()
  }

  getBlogsData = async () => {
    const response = await fetch('https://apis.ccbp.in/blogs')
    const data = await response.json()
    const modifiedBlogsData = data.map(eachItem => ({
      id: eachItem.id,
      imageUrl: eachItem.image_url,
      topic: eachItem.topic,
      title: eachItem.title,
      avatarUrl: eachItem.avatar_url,
      author: eachItem.author,
    }))
    this.setState({blogList: modifiedBlogsData, isLoading: false})
  }

  render() {
    const {blogList, isLoading} = this.state

    return (
      <div className="blogList-container">
        {isLoading ? (
          <div data-testid="loader">
            <Loader type="TailSpin" color="#00BFFF" height={50} width={50} />
          </div>
        ) : (
          blogList.map(eachItem => (
            <BlogItem key={eachItem.id} blogData={eachItem} />
          ))
        )}
      </div>
    )
  }
}

export default BlogList
