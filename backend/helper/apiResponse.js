const successResponse = (res, statsCode, message, data, count) => {
  return res
    .status(statsCode)
    .json({ message: message, data: data, count: count });
};

const errorResponse = (res, statsCode, message, data, count) => {
  return res
    .status(statsCode)
    .json({ error: true, message: message, data: data });
};

const validateResponse = (res, error) => {
  var obj = { message: "error" };
  error?.details?.map((item, key) => {
    const { path, message } = item;
    obj = { ...obj, [path]: message };
  });
  return res.status(400).json(obj);
};

export { successResponse, errorResponse, validateResponse };
