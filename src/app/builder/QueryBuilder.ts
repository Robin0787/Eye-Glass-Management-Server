import { FilterQuery, Query } from "mongoose";
import { TMeta } from "../utils/sendResponse";

class QueryBuilder<T> {
  public modelQuery: Query<T[], T>;
  public query: Record<string, unknown>;

  constructor(modelQuery: Query<T[], T>, query: Record<string, unknown>) {
    this.modelQuery = modelQuery;
    this.query = query;
  }

  search(searchableFields: string[]) {
    const searchTerm = this?.query?.searchTerm;
    if (searchTerm) {
      this.modelQuery = this.modelQuery.find({
        $or: searchableFields.map(
          (field) =>
            ({
              [field]: { $regex: searchTerm, $options: "im" },
            } as FilterQuery<T>)
        ),
      });
    }
    return this;
  }

  filter() {
    const copyQueryObj = { ...this.query }; // copy of query object;
    // Filtering fields
    const excludeFields = ["searchTerm", "sort", "limit", "page", "fields"];
    excludeFields.forEach((el) => delete copyQueryObj[el]);

    this.modelQuery = this.modelQuery.find(copyQueryObj as FilterQuery<T>);

    return this;
  }

  sort() {
    const sort =
      (this?.query?.sort as string)?.split(",")?.join(" ") || "-createdAt";
    this.modelQuery = this.modelQuery.sort(sort as string);
    return this;
  }

  paginate() {
    const page = Number(this?.query?.page) || 1;
    const limit = Number(this?.query?.limit) || 10;
    const skip = (page - 1) * limit;
    this.modelQuery = this.modelQuery.skip(skip).limit(limit);
    return this;
  }

  filterFields() {
    const fields =
      (this?.query?.fields as string)?.split(",")?.join(" ") || "-__v";

    this.modelQuery = this?.modelQuery.select(fields as string);
    return this;
  }
  async countTotal() {
    const totalQueries = this.modelQuery.getFilter();
    const page = Number(this.query.page) || 1;
    const limit = Number(this.query.limit) || 10;
    const totalData = await this.modelQuery.model.countDocuments(totalQueries);
    const totalPage = Math.ceil(totalData / limit);
    const returnData: TMeta = {
      page,
      limit,
      totalPage,
      totalData,
    };
    return returnData;
  }
}

export default QueryBuilder;
