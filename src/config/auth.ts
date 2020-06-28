export default {
    jwt: {
        secret: process.env.APP_SECRET || 'keyteste',
        expiresIn: '1d',
    },
};
