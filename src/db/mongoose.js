const mongoose = require('mongoose')

mongoose.connect(process.env.MONGODB,{
    useNewUrlParser:true,
    useFindAndModify:true,
    useUnifiedTopology:true,
    useCreateIndex:true
})