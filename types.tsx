export type RootStackParamList = {
  Root: undefined;
  NotFound: undefined;
  StatusUpdate: undefined;
  Contacts: undefined;
  ShoutOut: undefined;
};

export type BottomTabParamList = {
  Statuses: undefined;
  Settings: undefined;
  ShoutOut: undefined;
};

export type StatusesParamList = {
  StatusesScreen: undefined;
};

export type SettingsParamList = {
  SettingsScreen: undefined;
};

export type ShoutOutParamList = {
  ShoutOutScreen: undefined;
};

export type User = {
  id: String;
  name: String;
  imageUri: String;
  publicMessage: String;
};

export type Tag = {
  id: String;
  content: string;
  user: User;
};

export type Status = {
  id: String;
  content: string;
  createdAt: string;
  user: User;
};

export type StatusItem = {
  id: String;
  users: User[];
  contactTags: Tag[];
  userTags: Tag[];
  contactStatus: Status;
  userStatus: Status;
};
