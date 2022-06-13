import { atom } from "recoil";

export const modalState = atom({
  key: "modalState",
  default: false,
});

export const modalcState = atom({
  key: "modalcState",
  default: false,
});

export const postIdState = atom({
  key: "postIdState",
  default: "",
});

export const commentIdState = atom({
  key: "commentIdState",
  default: "",
});

export const comIdState = atom({
  key: "comIdState",
  default: "",
});

export const replyIdState = atom({
  key: "replyIdState",
  default: "",
});

export const profileIdState = atom({
  key: "profileIdState",
  default: "",
});

export const editState = atom({
  key: "editState",
  default: false,
});
