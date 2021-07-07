declare namespace Express {
  export interface Response {
    locals: {
      userId?: string;
      userType?: string;
    };
  }
}
