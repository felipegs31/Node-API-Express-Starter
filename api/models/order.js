import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const orderSchema = Schema({
    _id: Schema.Types.ObjectId,
    product: { type: Schema.Types.ObjectId, ref: 'Product', required: true },
    quantity: { type: Number, default: 1 }
});

export default mongoose.model('Order', orderSchema);