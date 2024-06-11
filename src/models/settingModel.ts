import mongoose from 'mongoose';

const settingSchema = new mongoose.Schema({
    proxy: {
        time_rotating_proxy_v4: {
            type: Number,
            required: false
        },
        time_rotating_proxy_v6: {
            type: Number,
            required: false
        },
        status_proxy_v4: {
            type: Boolean,
            required: false
        },
        status_proxy_v6: {
            type: Boolean,
            required: false
        },
        status_changeip_v4: {
            type: Boolean,
            required: false
        },
        status_changeip_v6: {
            type: Boolean,
            required: false
        }
    }
}, { timestamps: true });

export default mongoose.model('Setting', settingSchema);
