// const { Model } = require("mongoose");
const Book = require("../models/bookModel");

exports.createOne = (Model) => {
  return async (req, res, next) => {
    try {
      console.log(req.body);
      const newModel = await Model.create(req.body);

      res.status(200).json({
        status: "success",
        data: newModel,
      });
    } catch (error) {
      console.log(error);
      res.status(404).json({
        status: "error",
        error: error.message,
      });
    }
  };
};

exports.getOne = (Model) => {
  return async (req, res, next) => {
    try {
      newModel = await Model.find();

      console.log(Model, newModel);

      res.status(200).json({
        status: "success",
        length: newModel.length,
        data: newModel,
      });
    } catch (error) {
      console.log(error);
      res.status(404).json({
        status: "error",
        error: error.message,
      });
    }
  };
};

exports.updateOne = (Model) => {
  return async (req, res, next) => {
    try {
      console.log(req.body);
      const newModel = await Model.findByIdAndUpdate(req.params.id, req.body);

      res.status(200).json({
        status: "success",
        data: newModel,
      });
    } catch (error) {
      console.log(error);
      res.status(404).json({
        status: "error",
        error: error.message,
      });
    }
  };
};

exports.deleteOne = (Model) => {
  return async (req, res, next) => {
    try {
      console.log(req.body);

      const newModel = await Model.findByIdAndDelete(req.params.id, req.body);

      res.status(200).json({
        status: "success",
        message: "deleted",
        data: newModel,
      });
    } catch (error) {
      console.log(error);
      res.status(404).json({
        status: "error",
        error: error.message,
      });
    }
  };
};
