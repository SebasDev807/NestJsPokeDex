export const EnvConfiguration = () => ({
    enviroment: process.env.NODE_ENVIROMENT || 'dev',
    mongodb: process.env.MONGODDB,
    port: process.env.PORT || 3002,
    defaultLimit: +process.env.DEFAULT_LIMIT || 7
})