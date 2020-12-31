export type RootStackParamList = {
  Root: undefined;
  NotFound: undefined;
  StatusUpdate: undefined;
};

export type BottomTabParamList = {
  Statuses: undefined;
  Settings: undefined;
};

export type StatusesParamList = {
  StatusesScreen: undefined;
};

export type SettingsParamList = {
  SettingsScreen: undefined;
};

export type User = {
  id: String;
  name: String;
  imageUri: String;
};

export type Tag = {
  id: String;
  content: string;
};

export type Status = {
  id: String;
  content: string;
  createdAt: string;
};

export type StatusItem = {
  id: String;
  users: [User];
  contactTags: [Tag];
  userTags: [Tag];
  contactStatus: Status;
  userStatus: Status;
};
