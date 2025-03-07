import React, { useEffect, useState } from 'react'
import services from '../appwrite/config'
import { Container,PostCard } from '../components'


const Home = () => {
    const [posts, setposts] = useState([])
    useEffect(()=>{
        services.getAllPosts([]).then((posts)=>{
            if(posts){
                setposts(posts.documents)
            }
        })

    },[])
  if(posts.length>0){
    return (
        <div>
            {posts.map((post,index)=>(
                <div key={index}>
                    <PostCard {...post}/>
                </div>
            ))}
        </div>
    )

  }else{
    return (
        <div>
            <h2>No Posts Found</h2>
        </div>
    )

  }
}

export default Home