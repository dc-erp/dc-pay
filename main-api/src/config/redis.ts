const redis = require('redis')

const client = redis.createClient({
    port: 6379,
    host: '0.0.0.0'
})

client.connect();

client.on('connect', () => {
    console.log('Client connected to redis')
})

client.on('ready', () => {
    console.log('Client connected to redis and ready to use')
})

client.on('error', (err: Error) => {
    console.log(err.message)
})

client.on('end', () => {
    console.log('Client disconnected from redis')
})

process.on('SIGNINT', () => {
    client.quit()
})

export default client