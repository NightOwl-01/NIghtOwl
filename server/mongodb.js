const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const uri = "mongodb+srv://nightowl:nightowl%4001@website.13ibk.mongodb.net/Website?retryWrites=true&w=majority&appName=Website";

mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => {
    console.log('Mongoose connected to MongoDB Atlas');
})
.catch((error) => {
    console.error('Failed to connect to MongoDB:', error);
});

const logInSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: [true, 'Email already exists']
    },
    phone: {
        type: String,
        required: true 
    },
    password: {
        type: String,
        required: true
    },
    resetPasswordToken: String, 
    resetPasswordExpires: Date   
});

logInSchema.pre('save', async function (next) {
    if (this.isModified('password')) {
        this.password = await bcrypt.hash(this.password, 10);
    }
    next();
});

const LogInCollection = mongoose.model('LogInCollection', logInSchema);

module.exports = LogInCollection;