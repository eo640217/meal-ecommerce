import bcrypt from 'bcryptjs'

const users = [
    {
        name:'Admin User',
        email:'admin1@testing.ca',
        password: bcrypt.hashSync('12345',10),
        isAdmin:true,
        number:'6470000000'
    },
    {
        name:'Admin User 2',
        email:'admin2@testing.ca',
        password: bcrypt.hashSync('12345',10),
        isAdmin:true,
        number:'6470000001'
    },
    {
        name:'Regular User',
        email:'regular1@testing.ca',
        password: bcrypt.hashSync('12345',10),
        isAdmin:false,
        number:'6470000002'
    },
]
export default users;