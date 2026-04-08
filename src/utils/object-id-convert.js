const ObjectIdConvert = (obj) => {
  if (!obj || !obj._id) return obj;

  const { _id, ...rest } = obj;
  return {
    id: _id,
    ...rest,
  };
};

export { ObjectIdConvert };
