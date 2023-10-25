const Element = require("../models/Element");

exports.create = async (elementData) => Element.create(elementData);

exports.getAll = async () => Element.find().lean();

exports.getOne = async (id) => Element.findById(id).populate("owner").lean();

exports.delete = (id) => Element.findByIdAndDelete(id);

exports.update = (id, data) => Element.findByIdAndUpdate(id, data);
