import Config from 'config-lite';
import mongoose from 'mongoose';
import Promise from 'bluebird';

mongoose.Promise = Promise;
let config = Config(__dirname);

/**
 * 连接
 */
mongoose.connect(config.dbUrl);

/**
  * 连接成功
  */
mongoose.connection.on('connected', () => {    
    console.log('Mongoose connection open to ' + config.dbUrl);  
});

/**
 * 连接异常
 */
mongoose.connection.on('error', (err) => {    
    console.log('Mongoose connection error: ' + err);  
});
 
/**
 * 连接断开
 */
mongoose.connection.on('disconnected', () => {    
    console.log('Mongoose connection disconnected');  
});

export default mongoose;