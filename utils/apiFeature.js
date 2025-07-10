// class ApiFeatur {
//   constructor(mongooseQuery, searchQuery) {
//     this.mongooseQuery = mongooseQuery;
//     this.searchQuery = searchQuery;
//   }
//   pagination() {
//     if (this.searchQuery.page <= 0) this.searchQuery.page = 1;
//     let pageNumber = this.searchQuery.page * 1 || 1;
//     let pageLimit = 2;
//     let skip = (pageNumber - 1) * pageLimit;
//     this.mongooseQuery.skip(skip).limit(pageLimit);
//     return this;
//   }
//   filteration;
// }


class ApiFeaturs {
  constructor(mongooseQuery, searchQuery) {
    this.mongooseQuery = mongooseQuery;
    this.searchQuery = searchQuery;
  }
  pagination() {
    if (this.searchQuery.page <= 0) this.searchQuery.page = 1;
    let page = this.searchQuery.page * 1 || 1;
    let limit = this.searchQuery.limit * 1 || 10;
    let skip = (page - 1) * limit;
    this.mongooseQuery.limit(limit).skip(skip);
    return this;
  }
  sort() {
    if (this.searchQuery.sort) {
      let sortBy = this.searchQuery.sort.split(",").join(" ");
      this.mongooseQuery.sort(sortBy);
    } else this.mongooseQuery.sort("-__v");
    return this;
  }
  filter() {
    const fieldQuery = ["page", "limit", "sort", "fields", "keyword"];
    let filter = { ...this.searchQuery };
    fieldQuery.forEach((element) => delete filter[element]);
    filter = JSON.stringify(filter);
    filter = filter.replace(/\b(gte|gt|lt|lte)\b/g, (match) => "$" + match);
    filter = JSON.parse(filter);
    this.mongooseQuery.find(filter);
    return this;
  }
  search() {
    if (this.searchQuery.keyword) {
      this.mongooseQuery.find({
        $or: [
          { title: { $regex: this.searchQuery.keyword, $options: "i" } },
          { description: { $regex: this.searchQuery.keyword, $options: "i" } },
          { name: { $regex: this.searchQuery.keyword, $options: "i" } },
        ],
      });
    }
    return this;
  }
  fields() {
    if (this.searchQuery.fields) {
      const fields = this.searchQuery.fields.split(",").join(" ");
      this.mongooseQuery.select(fields);
    }
    return this;
  }
}
export { ApiFeaturs };
