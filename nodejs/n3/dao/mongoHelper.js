function MongoHelper(Model) {
    this.model = Model;
}

/**
*create
*主要用于批量添加
*/
MongoHelper.prototype.create = function (doc, callback) {
    this.model.create(doc, function (error) {
        if (error) return callback(error);

        return callback(null);
    });
};

/*
 * 更新
 */
MongoHelper.prototype.update = function (conditions, update, options, callback) {
    this.model.update(conditions, update, options, function (error, numAffected) {
        if (error) return callback(error);

        return callback(null);
    });
};

/**
 * 根据Id获取Model
 */
MongoHelper.prototype.getById = function (id, callback) {
    this.model.findOne({ _id: id }, function (error, model) {
        if (error) return callback(error, null);

        return callback(null, model);
    });
};

/**
 * 根据查询条件获取Model
 */
MongoHelper.prototype.getByQuery = function (query, fileds, opt, callback) {
    this.model.find(query, fileds, opt, function (error, models) {
        if (error) return callback(error, null);

        return callback(null, models);
    });
};

/**
 * 获取所有Model
 */
MongoHelper.prototype.getAll = function (callback) {
    this.model.find({}, function (error, model) {
        if (error) return callback(error, null);

        return callback(null, model);
    });
};

/**
 * 根据查询条件获取Model
 */
MongoHelper.prototype.countByQuery = function (query, callback) {
    this.model.count(query, function (error, model) {
        if (error) return callback(error, null);

        return callback(null, model);
    });
};

/**
 * 根据查询条件删除
 */
MongoHelper.prototype.delete = function (query, callback) {
    this.model.remove(query, function (error) {
        if (error) return callback(error);

        return callback(null);
    });
};
module.exports = MongoHelper;