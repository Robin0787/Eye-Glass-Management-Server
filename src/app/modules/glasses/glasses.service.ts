import httpStatus from "http-status";
import QueryBuilder from "../../builder/QueryBuilder";
import { TJwtPayload } from "../../interface/loginUser.interface";
import { AppError } from "../../utils/AppError";
import { glassSearchableFields } from "./glass.constant";
import { TGlass } from "./glasses.interface";
import { Glass } from "./glasses.model";

const addGlassToDB = async (payload: TGlass, user: TJwtPayload) => {
  if (await Glass.isGlassExists(payload)) {
    throw new AppError(httpStatus.BAD_REQUEST, "Product already exists");
  } else if (
    await Glass.findOne({
      name: payload.name,
      brand: payload.brand,
      frame: payload.frame,
      color: payload.color,
    })
  ) {
    throw new AppError(httpStatus.BAD_REQUEST, "Product already exists");
  } else if (payload.addedBy) {
    throw new AppError(
      httpStatus.FORBIDDEN,
      "addedBy can't be passed with the body data"
    );
  }

  payload.addedBy = user.email;

  const result = await Glass.create(payload);
  return result;
};

const getAllGlassFromDB = async (
  payload: TJwtPayload,
  query: Record<string, unknown>
) => {
  let result = [];
  if (payload.role === "manager") {
    const defaultQuery = Glass.find({ quantity: { $gt: 0 } });

    const glassQuery = new QueryBuilder(defaultQuery, query)
      .search(glassSearchableFields)
      .sort()
      .filter()
      .sort();

    result = await glassQuery.modelQuery;
  } else {
    const defaultQuery = Glass.find({
      addedBy: payload.email,
      quantity: { $gt: 0 },
    });

    const glassQuery = new QueryBuilder(defaultQuery, query)
      .search(glassSearchableFields)
      .sort()
      .filter()
      .sort();

    result = await glassQuery.modelQuery;
  }
  return result;
};

const getSingleGlassFromDB = async (id: string, user: TJwtPayload) => {
  let result: TGlass | null = null;
  if (user.role === "manager") {
    result = await Glass.findById(id);
  } else {
    result = await Glass.findOne({ _id: id, addedBy: user.email });
  }
  if (!result) {
    throw new AppError(httpStatus.NOT_FOUND, "This glass doesn't exist");
  }
  return result;
};

const updateSingleGlassIntoDB = async (
  id: string,
  payload: Partial<TGlass>,
  user: TJwtPayload
) => {
  if (!(await Glass.getGlassById(id))) {
    throw new AppError(httpStatus.NOT_FOUND, "This glass doesn't exist");
  }
  let result: TGlass | null = null;
  if (user.role === "manager") {
    result = await Glass.findByIdAndUpdate(id, { ...payload }, { new: true });
  } else {
    // throw error if the glass were not added by this user
    if (!(await Glass.findOne({ _id: id, addedBy: user.email }))) {
      throw new AppError(
        httpStatus.BAD_REQUEST,
        "You are not authorized to update this glass"
      );
    }
    result = await Glass.findByIdAndUpdate(id, { ...payload }, { new: true });
  }

  return result;
};

const deleteSingleGlassFromDB = async (id: string, user: TJwtPayload) => {
  if (!(await Glass.getGlassById(id))) {
    throw new AppError(httpStatus.NOT_FOUND, "This glass doesn't exist");
  }
  if (user.role === "manager") {
    const result = await Glass.findByIdAndDelete(id);
    return result;
  } else {
    if (!(await Glass.findOne({ _id: id, addedBy: user.email }))) {
      throw new AppError(
        httpStatus.BAD_REQUEST,
        "You are not authorized to delete this glass"
      );
    }
    const result = await Glass.findByIdAndDelete(id);
    return result;
  }
};

const deleteMultipleGlassFromDB = async ({
  products,
}: {
  products: string[];
}) => {
  if (products.length > 0) {
    // Use Promise.all to await all async operations concurrently
    const result = await Promise.all(
      products.map(async (id) => {
        const glass = await Glass.findById(id);
        if (glass) {
          await Glass.findByIdAndDelete(id);
        }
      })
    );
    return result;
  } else {
    throw new AppError(httpStatus.BAD_REQUEST, "Products can't be empty!");
  }
};

export const GlassServices = {
  addGlassToDB,
  getAllGlassFromDB,
  getSingleGlassFromDB,
  deleteSingleGlassFromDB,
  updateSingleGlassIntoDB,
  deleteMultipleGlassFromDB,
};
