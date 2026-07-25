import { Model, Document, FilterQuery, UpdateQuery, QueryOptions, PipelineStage } from 'mongoose';
import { buildPaginationMeta, PaginationMeta } from '../../utils/pagination.js';

export interface PaginatedResult<T> {
  data: T[];
  meta: PaginationMeta;
}

export abstract class BaseRepository<T extends Document> {
  protected constructor(protected readonly model: Model<T>) {}

  async create(item: Partial<T>): Promise<T> {
    const doc = new this.model(item);
    return doc.save();
  }

  async findById(id: string): Promise<T | null> {
    return this.model.findById(id).lean<T>().exec();
  }

  async findOne(filter: FilterQuery<T>): Promise<T | null> {
    return this.model.findOne(filter).lean<T>().exec();
  }

  async findMany(filter: FilterQuery<T> = {}, limit = 50, skip = 0): Promise<T[]> {
    const data = await this.model.find(filter).skip(skip).limit(limit).lean().exec();
    return data as unknown as T[];
  }

  async update(id: string, updateData: UpdateQuery<T>, options: QueryOptions = { new: true }): Promise<T | null> {
    return this.model.findByIdAndUpdate(id, updateData, options).exec();
  }

  async delete(id: string): Promise<boolean> {
    const res = await this.model.findByIdAndDelete(id).exec();
    return res !== null;
  }

  async paginate(filter: FilterQuery<T> = {}, page = 1, limit = 20): Promise<PaginatedResult<T>> {
    const skip = (page - 1) * limit;
    const total = await this.model.countDocuments(filter).exec();
    const data = await this.model.find(filter).skip(skip).limit(limit).lean().exec();

    return {
      data: data as unknown as T[],
      meta: buildPaginationMeta(total, page, limit),
    };
  }


  async aggregate<R = unknown>(pipeline: PipelineStage[]): Promise<R[]> {
    return this.model.aggregate<R>(pipeline).exec();
  }
}
