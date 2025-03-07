import React, { useCallback, useEffect, useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { RTE,Input } from '../index'
import { useSelector } from 'react-redux' 
import { useNavigate } from 'react-router-dom'
import services from '../../appwrite/config'
import Select from '../Select'

const PostForm = ({post}) => {
    const [postContent, setContent] = useState("")
    const {
        control,
        watch,
        setValue,
        getValues,
        handleSubmit,
        formState: { errors },
    } = useForm({
        defaultValues: {
            title: post?.title || '',
            content: post?.content || '',
            featuredimage: post?.featuredimage || '',
            status: post?.status || '',
            slug: post?.slug || '',
        },
    });
    const navigate = useNavigate()
    const userData = useSelector(state => state.auth.userData)

    const onSubmit = async (data) => {
        console.log(data)
        try {
            if (post) {
                // Update existing post
                console.log(post)
                let fileId = post.featuredimage;
                if (data.featuredimage[0]) {
                    const file = await services.uploadFile(data.featuredimage[0]);
                    if (file) {
                        await services.deleteFile(post.featuredimage); // Delete previous file
                        fileId = file.$id;
                    }
                }

                const updatedPost = await services.updatePost(post.$id, {
                    ...data,
                    featuredimage: fileId,
                });

                if (updatedPost) {
                    navigate(`/post/${post.$id}`);
                }
            } else {
                // Create new post
                console.log("1st done ho gya")
                
                const file = await services.uploadFile(data.featuredimage[0]);
                if (file) {
                    console.log(file.$id)
                    const newPost = await services.createPost({
                        ...data,
                        featuredimage: file.$id,
                        userid: userData.$id,
                    });

                    if (newPost) {
                        console.log("done ho gya")
                        navigate(`/post/${newPost.$id}`);
                    }
                }
            }
        } catch (error) {
            console.error('Error submitting post:', error);
        }
    };
     const slugTransform=useCallback((value)=>{
        if( value && typeof value ==='string'){
            return value.trim().toLowerCase()
            .replace(/[^a-zA-Z\d\s]/g, "-")
            .replace(/\s+/g, "-");
        }
        return ""
     },[])

     useEffect(() => {
        const subscription = watch((value, { name }) => {
          if (name === "title" && value?.title) {
            setValue("slug", slugTransform(value.title), { shouldValidate: true });
          }
        });
    
        return () => subscription.unsubscribe();
      }, [watch, setValue, slugTransform]);
     

  return (
    <div>
        <h2>hello</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="w-screen mx-auto p-6 bg-white shadow-md rounded-lg">
        <Controller
            name="title"
            control={control}
            defaultValue=""
            rules={{
                required: 'Title is required',
            }}
            render={({ field }) => (
        <Input
            type="text"
            name="title"
            placeholder="Enter Title"
            value={field.value}
            onChange={field.onChange}
            errors={errors}
            label="Title"
        />
    )}
/>

<Controller
        name="slug"
        control={control}
        defaultValue=""
        rules={{
          required: "Slug is required",
        }}
        render={({ field }) => (
          <Input
            type="text"
            name="slug"
            placeholder="Slug"
            value={field.value}
            onChange={field.onChange} 
            errors={errors}
            label="Slug"
            readOnly
          />
        )}
      />
        <RTE
            name='content'
            errors={errors}
            control={control}
            label="Content :"
        />

<Controller
    name="featuredimage"
    control={control}
    rules={{ required: !post }}
    render={({ field }) => (
        <Input
            type="file"
            name="featuredimage"
            accept="image/png, image/jpg, image/jpeg, image/gif"
            onChange={(e) => field.onChange(e.target.files)} // Fix file handling
            errors={errors}
            label="Image :"
        />
    )}
/>

<Controller
    name="status"
    control={control}
    defaultValue={post ? post.status : ''}
    rules={{
        required: !post,
    }}
    render={({ field }) => (
        <Select
            value={field.value}
            onChange={field.onChange}
            options={['active', 'inactive']}
            label="Status"
        />
    )}
/>

            
            <button type="submit" className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">{post?"Update":"Add Post"}</button>
            
        </form>
    </div>
  )
}

export default PostForm