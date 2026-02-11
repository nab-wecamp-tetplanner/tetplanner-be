export default () => ({
  DB_DATABASE: process.env.DB_DATABASE || 'tetplanner-db',
  DB_USERNAME: process.env.DB_USERNAME || 'postgres',
  DB_PORT: parseInt(process.env.DB_PORT || '5432', 10),
  DB_PASSWORD: process.env.DB_PASSWORD || '135792468',
  DB_HOST: process.env.DB_HOST || 'localhost',
});
