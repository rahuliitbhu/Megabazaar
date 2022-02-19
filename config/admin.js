module.exports = ({ env }) => ({
  auth: {
    secret: env('ADMIN_JWT_SECRET', '38ab8750d6c02dffb5ac0a3203b3840a'),
  },
});
