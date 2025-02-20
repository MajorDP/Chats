export interface IPosts {
  id: string;
  datePosted: string;
  username: string;
  userImg: string;
  message?: string;
  img?: string;
  video?: string;
  likes: number;
  comments: IComment[];
}

export interface IComment {
  userId: string;
  username: string;
  userImg: string;
  datePosted: string;
  comment: string;
  likes: number;
}
