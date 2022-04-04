const required = (type) => ({ type, required: true });

const toObject = {
  flattenMaps: true,
  versionKey: false,
  virtuals: true,
  transform: (_, ret) => {
    delete ret._id;
  },
};

const documentsToObject = (docs) => docs.map(d => d.toObject())

module.exports = { required, toObject, documentsToObject };
