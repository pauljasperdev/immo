import { and, eq } from 'drizzle-orm';
import { errAsync, okAsync, ResultAsync } from 'neverthrow';
import { db } from '../drizzle';
import {
  CreateError,
  DeleteError,
  NotFoundError,
  UpdateError,
} from '../errors';
import { type Property, property } from './property.sql';

export const createProperty = ({
  propertyData,
  userId,
}: {
  propertyData: Partial<
    Omit<Property, 'id' | 'createdAt' | 'updatedAt' | 'publicId' | 'userId'>
  >;
  userId: string;
}): ResultAsync<Property, CreateError> => {
  return ResultAsync.fromPromise(
    db
      .insert(property)
      .values({ ...propertyData, userId })
      .returning(),
    (error) =>
      new CreateError(error instanceof Error ? error.message : String(error))
  ).andThen((properties) => {
    const newProperty = properties[0];
    return newProperty
      ? okAsync(newProperty)
      : errAsync(new CreateError('Property not created'));
  });
};

export const readPropertyById = ({
  propertyId,
  userId,
}: {
  propertyId: number;
  userId: string;
}): ResultAsync<Property, NotFoundError> => {
  return ResultAsync.fromPromise(
    db
      .select()
      .from(property)
      .where(and(eq(property.id, propertyId), eq(property.userId, userId))),
    (error) =>
      new NotFoundError(error instanceof Error ? error.message : String(error))
  ).andThen((properties) => {
    const found = properties[0];
    return found
      ? okAsync(found)
      : errAsync(new NotFoundError('Property not found'));
  });
};

export const readPropertiesByUserId = ({
  userId,
}: {
  userId: string;
}): ResultAsync<Property[], NotFoundError> => {
  return ResultAsync.fromPromise(
    db.select().from(property).where(eq(property.userId, userId)),
    (error) =>
      new NotFoundError(error instanceof Error ? error.message : String(error))
  );
};

export const updatePropertyById = ({
  propertyId,
  propertyData,
  userId,
}: {
  propertyId: number;
  propertyData: Partial<Property>;
  userId: string;
}): ResultAsync<Property, UpdateError | NotFoundError> => {
  return ResultAsync.fromPromise(
    db
      .update(property)
      .set(propertyData)
      .where(and(eq(property.id, propertyId), eq(property.userId, userId)))
      .returning(),
    (error) =>
      new UpdateError(error instanceof Error ? error.message : String(error))
  ).andThen((properties) => {
    const updatedProperty = properties[0];
    return updatedProperty
      ? okAsync(updatedProperty)
      : errAsync(new NotFoundError('Property not updated'));
  });
};

export const deletePropertyById = ({
  propertyId,
  userId,
}: {
  propertyId: number;
  userId: string;
}): ResultAsync<Property, DeleteError | NotFoundError> => {
  return ResultAsync.fromPromise(
    db
      .delete(property)
      .where(and(eq(property.id, propertyId), eq(property.userId, userId)))
      .returning(),
    (error) =>
      new DeleteError(error instanceof Error ? error.message : String(error))
  ).andThen((properties) => {
    const deletedProperty = properties[0];
    return deletedProperty
      ? okAsync(deletedProperty)
      : errAsync(new NotFoundError('Property not deleted'));
  });
};
