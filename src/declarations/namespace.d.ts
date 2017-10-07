declare interface Article {
  _id: string;
  title: string;
  content: string;
  pubdate: string;
  pubtime: string;
  categorie_id: string;
  updated: string;
}

declare interface Homepage {
  stage: string;
  panelText: string;
}

declare interface News {
  _id: string;
  title: string;
  content: string;
  pubdate: string;
  pubtime: string;
  updated: string;
}

declare interface Section {
  _id: string;
  title: string;
  content: string;
  visible: number;
  articles?: Article[];
}

declare interface Sponsor {
  _id: string;
  title: string;
  link: string;
  logo: string;
}

declare interface User {
  email?: string;
  username: string;
  password: string;
}

declare interface ApiResponse {
  data: any;
}

declare interface ApiError extends Error {
  errmsg: string;
}
