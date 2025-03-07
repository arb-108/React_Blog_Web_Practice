import conf from "../conf/conf";
import { Client,Account,ID } from "appwrite";

export class Authservices{
    client=new Client()
    Account;
    constructor(){
        this.client
            .setEndpoint(conf.appwriteURl)
            .setProject(conf.appwriteProjectId)
        this.Account=new Account(this.client)
    }  

    async createAccount({email,password,name}){
        try {

            const userAccount=await this.Account.create(ID.unique(),email,password,name)

            if(userAccount){
                return this.login({email,password})
            }else{
                throw new Error("Account not created")
            }
            
        } catch (error) {
            console.log("Authservices -> createAccount -> error", error)
        }
    }
    async login({email,password}){
        try {
            const userAccount=await this.Account.createEmailPasswordSession(email,password)
            if(userAccount){
                return userAccount
            }else{
                throw new Error("Not allow to login")
            }
        } catch (error) {
           console.log("Authservices -> login -> error", error)
        }
    }

    async currentUser(){
        try {
            const userAccount=await this.Account.get()
            if(userAccount){
                return userAccount
            }else{
                throw new Error("No user found")
            }
        } catch (error) {
             console.log("Authservices -> currentUser -> error", error)

        }

    }

    async logout(){
        try {
            const userAccount=await this.Account.deleteSessions()
            if(userAccount){
                return userAccount
            }else{
                throw new Error("Not allow to logout")
            }
        } catch (error) {
            console.log("Authservices -> logout -> error", error)
        }
    }
}

const authservice=new Authservices()

export default authservice