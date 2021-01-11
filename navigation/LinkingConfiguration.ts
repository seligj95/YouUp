import * as Linking from 'expo-linking';

export default {
  prefixes: [Linking.makeUrl('/')],
  config: {
    screens: {
      Root: {
        screens: {
          Statuses: {
            screens: {
              StatusesScreen: 'statuses',
            },
          },
          ShoutOuts: {
            screens: {
              ShoutOutScreen: 'shoutOuts',
            },
          },
          Settings: {
            screens: {
              SettingsScreen: 'settings',
            },
          },
        },
      },
      NotFound: '*',
    },
  },
};
