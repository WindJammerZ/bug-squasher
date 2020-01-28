const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        unique: true,
        required: true,
        trim: true,
        lowercase: true,
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error('Email is invalid')
            }
        }
    },
    password: {
        type: String,
        required: true,
        minlength: 7,
        validate(value) {
            if (value.toLowerCase().includes('password')) {
                throw new Error(`Password may not contain "password".`)
            }
        }
    },
    role: {
        type: String,
        required: true,
        default: 'general'
    },
    avatar: {
        type: Buffer
    },
    tokens: [{
        token: {
            type: String,
            required: true
        }
    }]
}, {
    timestamps: true
})

userSchema.statics.findByCredentials = async (email, password) => {
    const user = await User.findOne({
        email
    })

    if (!user) {
        throw new Error(`Unable to login.`)
    }

    const isMatch = await bcrypt.compare(password, user.password)

    if (!isMatch) {
        throw new Error(`Email or password incorrect.`)
    }

    return user
}

userSchema.statics.findByRole = async (userRoles) => {

    const users = await User.find({
        role: {
            $in: userRoles
        }
    })

    if (!users) {
        throw new Error(`No user with that role exists.`)
    }

    return users

}

//Hash the plain text password before saving
userSchema.pre('save', async function (next) {
    const user = this

    if (user.isModified('password')) {
        user.password = await bcrypt.hash(user.password, 8)
    }

    next()
})



userSchema.methods.generateAuthToken = async function () {
    const user = this
    const token = jwt.sign({
            _id: user._id.toString()
        }, process.env.JWT_SECRET
        // {
        //     expiresIn: '1h'
        // }
    )

    user.tokens = user.tokens.concat({
        token
    })

    await user.save()

    return token
}

userSchema.methods.toJSON = function () {
    const user = this
    const userObject = user.toObject()

    delete userObject.password
    delete userObject.tokens
    delete userObject.avatar
    delete userObject.createdAt
    delete userObject.updatedAt
    delete userObject.__v

    return userObject
}

userSchema.virtual('owner', {
    ref: 'Report',
    localField: '_id',
    foreignField: 'owner.id'
})

userSchema.virtual('creator', {
    ref: 'Report',
    localField: '_id',
    foreignField: 'creator.id'
})

const User = mongoose.model('User', userSchema)

module.exports = User