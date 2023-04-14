export default {
    origin: function (origin: string, callback: any) {
        // this is allowing all cors this is bad
        return callback(null, true)
    },
    credentials: true,
}