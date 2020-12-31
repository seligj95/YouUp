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
	tags: [{
		id: 't1',
		content: 'Family',
		createdAt: '2020-10-10T12:48:00.000Z',
		user: {
			id: 'u1',
      name: 'Vadim',
      imageUri: 'https://notjustdev-dummy.s3.us-east-2.amazonaws.com/avatars/1.jpg',
		},
	}, {
		id: 't2',
		content: 'Family',
		createdAt: '2020-10-03T14:49:00.000Z',
		user: {
			id: 'u2',
      name: 'Lukas',
      imageUri: 'https://notjustdev-dummy.s3.us-east-2.amazonaws.com/avatars/2.jpg',
		},
	}, {
		id: 't3',
		content: 'Friend',
		createdAt: '2020-10-03T14:49:00.000Z',
		user: {
			id: 'u2',
			name: 'Lukas',
			imageUri: 'https://notjustdev-dummy.s3.us-east-2.amazonaws.com/avatars/2.jpg',
		},
	}]
}

