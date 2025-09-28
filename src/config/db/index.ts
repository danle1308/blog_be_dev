import mongoose from "mongoose";

const connect = async () => {

    try {
        await mongoose.connect('mongodb://localhost:27017/blog_db_dev')
        console.log('connect success')
    } catch (error) {
        console.log('connect Failed')
        console.error(error)
    }
    
}

export default { connect }