const { SequelizeClient } = require('./modules/shared/db/sequelize-client')
const {
    UserModel,
} = require('./modules/user/infrastructure/sequelize.user.model')
const { User } = require('./modules/user/domain/user.model')

const seedDatabase = async () => {
    try {
        const userAdmin = new User({
            name: 'admin',
            email: 'admin@spsgroup.com.br',
            type: 'admin',
            password: '1234',
        })
        await SequelizeClient.instance.getConnection().sync()
        const existingUser = await UserModel.findOne({
            where: { email: userAdmin.email },
        })
        if (!existingUser) {
            const newUser = await UserModel.create(userAdmin.toJSON())
            console.log('Nuevo usuario creado:', newUser.username)
        } else {
            console.log('El usuario ya existe.')
        }
    } catch (err) {
        console.error('Error al ejecutar el seed:', err)
    } finally {
        await SequelizeClient.instance.getConnection().close()
    }
}

seedDatabase()
