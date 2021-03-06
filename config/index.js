const secret = process.env.APP_SECRET
const env = process.env.NODE_ENV
const pathVersion = '/api/v1/'

const config = env => {
  const dbConfig = {
    dbURL: process.env.POSTGRES_URL,
    dbDialect: {
      dialect: process.env.DB_DIALECT,
      protocol: process.env.DB_DIALECT,
      dialectOptions: {
        ssl: {
          require: true,
          rejectUnauthorized: false
        }
      }
    }
  }
  const cloudinaryConfig = {
    cloud_name: process.env.CLOUDINARY_NAME,
    cloud_api_key: process.env.CLOUDINARY_KEY,
    cloud_api_secret: process.env.CLOUDINARY_SECRET
  }
  const googleConfig = {
    googleProjectId: process.env.PROJECT_ID,
    translateRegion: process.env.GOOGLE_TRANSLATE_REGION,
    parent: `projects/${process.env.PROJECT_ID}/locations/${process.env.GOOGLE_TRANSLATE_REGION}`,
    GOOGLE_APPLICATION_CREDENTIALS: process.env.GOOGLE_APPLICATION_CREDENTIALS
  }
  let configOutput = {
    ...googleConfig,
    ...dbConfig,
    ...cloudinaryConfig
  }
  switch (env) {
    case 'development':
      configOutput = {
        ...configOutput,
        port: process.env.APP_PORT || 5000,
        secret,
        pathVersion
      }
      break
    case 'production':
      configOutput = {
        ...configOutput,
        port: process.env.APP_PORT,
        secret,
        pathVersion

      }
      break
    default:
      configOutput = {
        pathVersion, secret, ...dbConfig
      }
  }
  return configOutput
}

module.exports = config(env)
