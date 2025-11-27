export type Skill = {
  id: number;
  iconUrl: string;
  name: string;
};

export type techSkill = {
  id: number;
  iconUrl: string;
  name: string;
  description: string;
};

export type Tool = {
  id: number;
  iconUrl: string;
  name: string;
};

export type TContact = {
  email: string;
  name: string;
  tel: string;
  company: string;
  message: string;
};

export type TProfile = {
  profilePicUrl: string
  name: string
  nickName: string
  age: number
  description: string
};