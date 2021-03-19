import mongoose from 'mongoose'
const Schema = mongoose.Schema
const ObjectId = Schema.Types.ObjectId

const Note = new Schema({
  body: { type: String, required: true },
  // @ts-ignore
  // eslint-disable-next-line no-undef
  bug: { type: ObjectId, ref: 'Bug', required: true },
  creatorId: { type: String, required: true }
}, { timestamps: true, toJSON: { virtuals: true } })

export default Note
