export type NewsType = {
  id: number;
  title?: string;
  score?: number;
  by?: string;
  time?: number;
  url?: string;
  kids?: number[];
  descendants?: number;
};

export type CommentType = {
  id: number;
  by?: string;
  text?: string;
  time?: number;
  comments?: number[];
};
