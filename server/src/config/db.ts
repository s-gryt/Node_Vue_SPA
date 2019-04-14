import * as mongoose from 'mongoose';
import CONFIG from './config';
import logger from '../helpers/logger'

mongoose.set('useCreateIndex', true);

// Connecting to the database
export default (async () => {
    try {
        await mongoose.connect(
            CONFIG.DB_HOST,
            {useNewUrlParser: true}
        );
        console.log('The Connection is Successful');
    } catch (err) {
        logger.error(err.message, err);
        console.log(`${err} Could not Connect to the Database. Exiting Now...`);
        process.exit();
    }
})();
