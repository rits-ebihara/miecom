jest.mock('nanoid', () => ({
  nanoid: jest.fn().mockImplementation(() => '012345678901234567890'),
}));

export {};
