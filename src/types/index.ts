export interface IUser {
  name: string;
  email: string;
  exp: number;
  iat: number;
}

export interface TBlog {
  _id: string;
  title: string;
  short_description: string;
  long_description: string;
  image: string;
}
export interface TProject {
  _id: string;
  title: string;
  live_link: string;
  client_link: string;
  server_link: string;
  short_description: string;
  long_description: string;
  technology: string;
  image: string;
}
export interface Blog {
  _id: string;
  title: string;
  content: string;
  image: string;
}
