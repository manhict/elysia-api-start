import mongoose from 'mongoose';

const proxySchema = new mongoose.Schema(
    {
        note: String,
        type: String,
        url: String,
        url_backup: String,
        url_changeip: String,
        time_changeip: {
            type: Number,
            default: 1250000
        },
        time_sleep: {
            type: Number,
            default: 1250000
        },
        cron: {
            type: Boolean,
            default: true
        },
        status_proxy: {
            type: Boolean,
            default: true
        },
        status_changeip: {
            type: Boolean,
            default: true
        },
        status_all: {
            type: Boolean,
            default: true
        }
    },
    { timestamps: true }
);

export default mongoose.model('Proxy', proxySchema);