export interface Post  {
  _id: string;
  title: string;
  desc: string;
  username: string;
  categories: string[];
  createdAt: string;
  updatedAt: string;
  __v: number;
  imgname?: string
}

export interface Category {
  _id: string;
  name: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}
