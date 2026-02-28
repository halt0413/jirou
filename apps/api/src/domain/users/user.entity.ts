export type User = {
  id: string;
  name: string;
  email: string;
  password: string;
  store: string  | null;
  review: number | null;
  createdAt: Date;
};