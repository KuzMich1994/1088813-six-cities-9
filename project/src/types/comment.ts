export type User = {
  avatarUrl: string;
  id: number;
  isPro: boolean;
  name: string;
  email: string;
}

export type Comment = {
  comment: string;
  date: string;
  id: number;
  rating: number;
  user: User;
}

export type PostComment = {
  comment: string;
  rating: number;
  id: number;
}
