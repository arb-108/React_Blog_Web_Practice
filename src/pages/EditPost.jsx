import React, { useEffect, useState } from 'react'
import services from '../appwrite/config'
import { useNavigate,useParams } from 'react-router-dom'
import { Container,PostForm } from '../components'

const EditPost = () => {
    const [post, setpost] = useState()
    const {slug}=useParams()
    const navigate=useNavigate()

    useEffect(()=>{
        if(slug){
            const documentId=slug;
            services.getPost(documentId).then((post)=>{
                if(post){
                    console.log(post)
                    setpost(post);
                }
    
            })
        }else{
            navigate("/")
        }

    },[slug,navigate])
  return post?(
    <div>
        <div>
            <PostForm post={post}/>
        </div>

    </div>
  ):null
}

export default EditPost