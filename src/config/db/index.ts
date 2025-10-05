import mongoose from "mongoose";

const connect = async () => {

    try {
        await mongoose.connect('mongodb://localhost:27017/trello_db_dev')
        // await mongoose.connect('mongodb://localhost:27017/blog_be')
        console.log('connect success')
    } catch (error) {
        console.log('connect Failed')
        console.error(error)
    }
    
}

export default { connect }