import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate,useParams,Link } from 'react-router-dom'
import services from '../appwrite/config'
import { Container } from '../components'
import  parse  from 'html-react-parser'



const Post = () => {
    const [post, setpost] = useState(null)
    const { slug }=useParams()
    const  navigate=useNavigate()

    const userData=useSelector((state)=>state.auth.userData)
    const isAuthor=post && userData ? post.userid===userData.$id :false;
    useEffect(()=>{
        if(slug){
            console.log(slug)
            const documentId=slug;
            services.getPost(documentId).then((post)=>{
                if(post){
                    setpost(post);
                }
    
            })
        }else{
            navigate("/")
        }

    },[slug,navigate]);
    const deletepost=()=>{
        services.deletePost(post.$id).then((status)=>{
            if(status){
                services.deleteFile(post.featuredimage);
                navigate("/")
            }

        })
    }
  return post? (
    <div>
        <div>
            <img src={services.getFilePreview(post.featuredimage)} alt={post.title} />

        </div>
        {isAuthor && (
            <div>
                <Link to={`/edit-post/${post.$id}`}>
                    <button>
                        Edit
                    </button>
                </Link>
                <button onClick={deletepost}>
                    Delete
                </button>
            </div>
        )}
        <div>
            <h1>{post.title}</h1>
        </div>
        <div className='browser-css'>
            {parse(post.content)}
        </div>
    </div>
  ):null
}

export default Post