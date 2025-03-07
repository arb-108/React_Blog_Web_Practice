import React from 'react';
import { Link } from 'react-router-dom';
import services from '../appwrite/config';

const PostCard = ({ $id, title, featuredimage }) => {
  return (
    <Link to={`/post/${$id}`} className="block">
      <div className="w-[200px] h-[200px]">
        <img
          src={services.getFilePreview(featuredimage)}
          alt={title}
          className="w-full  object-cover"
        />
        <h2 className="text-lg font-bold">{title}</h2>
      </div>
    </Link>
  );
};

export default PostCard;
