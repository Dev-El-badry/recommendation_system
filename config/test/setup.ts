beforeAll(
  async() => {
    process.env.JWT_KEY = 'my-secret-key';
    process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
  }
)