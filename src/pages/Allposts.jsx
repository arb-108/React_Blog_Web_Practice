import React, { useEffect, useState } from 'react'
import { Container,PostCard } from '../components'
import services from '../appwrite/config'

const Allposts = () => {
    const [posts, setposts] = useState([])
    
    useEffect(()=>{
        services.getAllPosts([]).then((posts)=>{
            if(posts){
                console.log(posts)
                setposts(posts.documents)
            }
        })
    },[])
  return (
        <div>
            {posts.map((post,index)=>(
                <div key={post.$id}>
                    <PostCard {...post}/>
                </div>
            ))}
        </div>
    
  )
}

export default Allposts