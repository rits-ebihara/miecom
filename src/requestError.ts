export class RequestError extends Error {
  type = 'RequestError' as const;
  constructor(public readonly sourceError: unknown, message: string) {
    super(message);
  }
}
