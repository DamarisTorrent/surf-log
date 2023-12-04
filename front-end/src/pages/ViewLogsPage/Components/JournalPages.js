import Pages from "./Pages"
import { useState, useEffect, useRef } from "react"
import { getUserId } from "../../utilities/users-service"
import { indexPosts } from "../../utilities/posts-api"
import { deletePost } from '../../../api'
import { updatePost } from '../../../api'
import Carousel from "framer-motion-carousel"
// import './carousel.css'

export default function JournalPages() {
  const [posts, setPosts] = useState([])

  useEffect(() => {
    indexPosts(getUserId())
      .then((res) => res.json())
      .then((resData) => setPosts(resData))
  }, [])
  const carouselRef = useRef(0)

  const handleDeletePost = async (postId) => {
    try {
      await deletePost(postId)
      setPosts((prevPosts) => prevPosts.filter((post) => post.post_id !== postId))
    } catch (error) {
      console.error('Error deleting post:', error)
    }
  };

  const handleUpdatePost = async (newText, postId) => {
    // setParentText(newText); // Update the state in the parent component
    console.log('in the update callback ', newText)
    console.log('in the update callback ', postId)
    console.log(posts)
    try {
      await updatePost(postId, newText)
      // setPosts((prevPosts) => prevPosts.filter((post) => post.post_id !== postId))
    } catch (error) {
      console.error('Error deleting post:', error)
    }
  };
 
  let postMap = posts.map((post, index) => (
   <>
      <Pages post={post} key={`${index} + ${post["post_id"]}`} onDeletePost={handleDeletePost} onUpdatePost={handleUpdatePost} />
    </>
  ))

  return (
    <>
      <div
        className="carosuel"
        style={{
          height: 800,
          width: "80vw",
          margin: "0 auto",
          marginTop: "15vh",
          paddingRight: "20px",
          paddingLeft: "20px",
        }}
      >
        <Carousel
          autoPlay={false}
          // renderArrowLeft={() => null}
          // renderArrowRight={() => null}
          // renderDots={() => null}
        >
          {postMap}
        </Carousel>
      </div>
    </>
  )
}