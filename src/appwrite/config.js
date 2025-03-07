import conf from "../conf/conf";
import { Client,Databases,Storage,ID, Query } from "appwrite";

export class Services{
    client = new Client()
    database;
    storage;
    constructor(){
        this.client
            .setEndpoint(conf.appwriteURl)
            .setProject(conf.appwriteProjectId)
        this.database=new Databases(this.client)
        this.storage=new Storage(this.client)
    }

    async createPost({title,slug,content,status,featuredimage,userid}){
        try {
            return await this.database.createDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                ID.unique(),
                {
                    title,
                    content,
                    status,
                    featuredimage,
                    userid
                }
            )
        } catch (error) {
            console.log("Services -> createPost -> error", error)
        }
    }

    async updatePost(documentId,{title,content,status,featuredimage,userid}){
        try {
            return await this.database.updateDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                documentId,
                {
                    title,
                    content,
                    status,
                    featuredimage,
                    userid
                }
            )
            
        } catch (error) {
            console.log("Services -> updatePost -> error", error)
            
        }
    }

    async getPost(documentId){
        try {
            return await this.database.getDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                documentId
            )
        } catch (error) {
            console.log("Services -> getPost -> error", error)
        }
    }

    async getAllPosts(){
        try {
            return await this.database.listDocuments(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                [Query.equal("status",["active"])]

            )
        } catch (error) {
            console.log("Services -> getPosts -> error", error)
        }
    }

    async deletePost({documentId}){
        try {
             await this.database.deleteDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                documentId
            )
            return true
        } catch (error) {
            console.log("Services -> deletePost -> error", error)
            return false
        }
        
    }

    async uploadFile(file){
        try {
            return await this.storage.createFile(
                conf.appwriteBucketId,
                ID.unique(),
                file
            )
        } catch (error) {
            console.log("Services -> uploadFile -> error", error)
            return false
        }
    }

    async deleteFile(fileId){
        try {
             await this.storage.deleteFile(
                conf.appwriteBucketId,
                fileId
            )
            return true
        } catch (error) {
            console.log("Services -> deleteFile -> error", error)
            return false
        }
    }
     
    getFilePreview(fileId){
        try {
            return  this.storage.getFilePreview(
                conf.appwriteBucketId,
                fileId
            )
        } catch (error) {
            console.log("Services -> getFilePreview -> error", error)
            return false
        }
    }



}

const services=new Services()

export default services