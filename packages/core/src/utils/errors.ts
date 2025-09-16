export class NotFoundError extends Error {
  constructor(message = 'Not found') {
    super(message);
    this.name = 'NotFoundError';
  }
}
export class CreateError extends Error {
  constructor(message = 'Create error') {
    super(message);
    this.name = 'CreateError';
  }
}
export class UpdateError extends Error {
  constructor(message = 'Update error') {
    super(message);
    this.name = 'UpdateError';
  }
}
export class DeleteError extends Error {
  constructor(message = 'Delete error') {
    super(message);
    this.name = 'DeleteError';
  }
}
