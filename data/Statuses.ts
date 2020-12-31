export default {
	id: '1',
	users: [{
		id: 'u1',
		name: 'Vadim',
		imageUri: 'https://notjustdev-dummy.s3.us-east-2.amazonaws.com/avatars/1.jpg',
	}, {
		id: 'u2',
		name: 'Lukas',
		imageUri: 'https://notjustdev-dummy.s3.us-east-2.amazonaws.com/avatars/2.jpg',
	}],
	statuses: [{
		id: 's1',
		content: 'Busy',
		createdAt: '2020-10-10T12:48:00.000Z',
		user: {
			id: 'u1',
      name: 'Vadim',
      imageUri: 'https://notjustdev-dummy.s3.us-east-2.amazonaws.com/avatars/1.jpg',
		},
	}, {
		id: 's2',
		content: 'Away',
		createdAt: '2020-10-03T14:49:00.000Z',
		user: {
			id: 'u2',
      name: 'Lukas',
      imageUri: 'https://notjustdev-dummy.s3.us-east-2.amazonaws.com/avatars/2.jpg',
		},
	}]
}

