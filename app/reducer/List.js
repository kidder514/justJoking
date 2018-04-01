const initState = {
    followedList: [
        {
            id: '1',
            type:'image',
            authorName: 'AAA Auther',
            authorPhoto: 'https://d3njjcbhbojbot.cloudfront.net/api/utilities/v1/imageproxy/https://coursera-profile-photos.s3.amazonaws.com/b3/7aafd0d90711e78ded1fd12f488fcc/Page-1-Image-3.png?auto=format%2Ccompress&dpr=1&w=50&h=50',
            textContent: 'What a girl is thinking while taking shower',
            imageUrls:[
                'https://www.w3schools.com/howto/img_fjords.jpg',
                'https://i.pinimg.com/736x/60/79/dd/6079dd260045375064824baf548521af.jpg',
                'https://www.cs.cmu.edu/~chuck/lennapg/len_std.jpg',
                'http://media.moddb.com/images/mods/1/29/28058/6.jpg',
                'https://au.mathworks.com/help/images/pep_crop_cmyk.gif',
                'https://cache.gawkerassets.com/assets/images/gizmodo/2009/07/369234main_lroc_apollo11labeled_256x256.jpg',
                'https://pa1.narvii.com/6338/43d9a4bfb4cfa2634f95454b59fc5d76aee7def0_128.gif',
                'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTBhBuzqh1QszD3T7ZAiZj4mqCS5-uZugTd070k0AozwS9WJHJPog',
                'http://www.diabetes.org/assets/img/promo/puzzle-images/memorial-image-puzzle.jpg'
            ],
            tag:'Funny Picture',
            tagId: '123',
            likes: ['1233','1232','304','494','3','393'],
            likesCount: 1300,
            dislikes: ['12313','11232','49'],
            dislikesCount: 9999,
            commentCount: 32,
            shareCount: 8
        },
        {
            id: '2',
            type:'image',
            authorName: 'BB Jason',
            authorPhoto: 'https://qph.fs.quoracdn.net/main-thumb-427983-50-nyxatfezjsoxyqgrabwcmaoegxpuuoxe.jpeg',
            textContent: 'Next generation jokes',
            imageUrls:[
                'https://www.cs.cmu.edu/~chuck/lennapg/len_std.jpg',
                'http://media.moddb.com/images/mods/1/29/28058/6.jpg',
                'https://au.mathworks.com/help/images/pep_crop_cmyk.gif',
                'https://cache.gawkerassets.com/assets/images/gizmodo/2009/07/369234main_lroc_apollo11labeled_256x256.jpg',
                'https://pa1.narvii.com/6338/43d9a4bfb4cfa2634f95454b59fc5d76aee7def0_128.gif',
                'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTBhBuzqh1QszD3T7ZAiZj4mqCS5-uZugTd070k0AozwS9WJHJPog',
                'http://www.diabetes.org/assets/img/promo/puzzle-images/memorial-image-puzzle.jpg'
            ],
            tag:'Funny Aim',
            tagId: '1233',
            likes: ['1233','1232','304','494','3','393','1233','1233'],
            likesCount: 1234321,
            dislikes: ['12313','11232'],
            dislikesCount: 339201,
            commentCount: 12,
            shareCount: 0
        },
        {
            id: '3',
            type:'image',
            authorName: 'Blake Blabla',
            authorPhoto: 'http://pbs.twimg.com/profile_images/952882519745101824/RmoQseVO_normal.jpg',
            textContent: 'Everybody is talking about jamie',
            imageUrls:[
                'http://media.moddb.com/images/mods/1/29/28058/6.jpg',
                'https://au.mathworks.com/help/images/pep_crop_cmyk.gif',
                'https://cache.gawkerassets.com/assets/images/gizmodo/2009/07/369234main_lroc_apollo11labeled_256x256.jpg',
                'https://pa1.narvii.com/6338/43d9a4bfb4cfa2634f95454b59fc5d76aee7def0_128.gif',
                'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTBhBuzqh1QszD3T7ZAiZj4mqCS5-uZugTd070k0AozwS9WJHJPog',
                'http://www.diabetes.org/assets/img/promo/puzzle-images/memorial-image-puzzle.jpg'
            ],
            tag:'Funny ones',
            tagId: '1232',
            likes: ['1233','304','494','3','393'],
            likesCount: 123,
            dislikesCount: 339201,
            dislikes: ['12313'],
            commentCount: 322,
            shareCount: 81
        },
        {
            id: '4',
            type:'image',
            authorName: 'Brotan',
            authorPhoto: 'http://www.docklandsnews.com.au/images/uploads/columns/thumb.column.its.your.life.jpg',
            textContent: 'What a girl is thinking while taking showeDocklands secrets',
            imageUrls:[
                'https://au.mathworks.com/help/images/pep_crop_cmyk.gif',
                'https://cache.gawkerassets.com/assets/images/gizmodo/2009/07/369234main_lroc_apollo11labeled_256x256.jpg',
                'https://pa1.narvii.com/6338/43d9a4bfb4cfa2634f95454b59fc5d76aee7def0_128.gif',
                'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTBhBuzqh1QszD3T7ZAiZj4mqCS5-uZugTd070k0AozwS9WJHJPog',
                'http://www.diabetes.org/assets/img/promo/puzzle-images/memorial-image-puzzle.jpg'
            ],
            tag:'Funny Picture',
            tagId: '123',
            likesCount: 12341,
            likes: ['1233','1232','304','494','3','393'],
            dislikesCount: 339201,
            dislikes: ['12313','11232','49'],
            commentCount: 32,
            shareCount: 8
        },
        {
            id: '5',
            type:'image',
            authorName: 'AAA Auther',
            authorPhoto: 'https://d3njjcbhbojbot.cloudfront.net/api/utilities/v1/imageproxy/https://coursera-profile-photos.s3.amazonaws.com/b3/7aafd0d90711e78ded1fd12f488fcc/Page-1-Image-3.png?auto=format%2Ccompress&dpr=1&w=50&h=50',
            textContent: 'What a girl is thinking while taking shower',
            imageUrls:[
                'https://i.pinimg.com/736x/60/79/dd/6079dd260045375064824baf548521af.jpg',
                'https://pa1.narvii.com/6338/43d9a4bfb4cfa2634f95454b59fc5d76aee7def0_128.gif',
                'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTBhBuzqh1QszD3T7ZAiZj4mqCS5-uZugTd070k0AozwS9WJHJPog',
                'http://www.diabetes.org/assets/img/promo/puzzle-images/memorial-image-puzzle.jpg'
            ],
            tag:'Funny Picture',
            tagId: '123',
            likesCount: 1234321,
            likes: ['1233','1232','304','494','3','393'],
            dislikesCount: 339201,
            dislikes: ['12313','11232','49'],
            commentCount: 32,
            shareCount: 8
        },
        {
            id: '6',
            type:'image',
            authorName: 'AAA Auther',
            authorPhoto: 'https://d3njjcbhbojbot.cloudfront.net/api/utilities/v1/imageproxy/https://coursera-profile-photos.s3.amazonaws.com/b3/7aafd0d90711e78ded1fd12f488fcc/Page-1-Image-3.png?auto=format%2Ccompress&dpr=1&w=50&h=50',
            textContent: 'What a girl is thinking while taking shower',
            imageUrls:[
                'https://www.w3schools.com/howto/img_fjords.jpg',
                'https://i.pinimg.com/736x/60/79/dd/6079dd260045375064824baf548521af.jpg',
            ],
            tag:'Funny Picture',
            tagId: '123',
            likesCount: 1234321,
            likes: ['1233','1232','304','494','3','393'],
            dislikesCount: 339201,
            dislikes: ['12313','11232','49'],
            commentCount: 32,
            shareCount: 8
        },
        {
            id: '7',
            type:'image',
            authorName: 'AAA Auther',
            authorPhoto: 'https://d3njjcbhbojbot.cloudfront.net/api/utilities/v1/imageproxy/https://coursera-profile-photos.s3.amazonaws.com/b3/7aafd0d90711e78ded1fd12f488fcc/Page-1-Image-3.png?auto=format%2Ccompress&dpr=1&w=50&h=50',
            textContent: 'What a girl is thinking while taking shower  single image',
            imageUrls:[
                'https://www.w3schools.com/howto/img_fjords.jpg',
            ],
            tag:'Funny Picture',
            tagId: '123',
            likesCount: 1234321,
            likes: ['1233','1232','304','494','3','393'],
            dislikesCount: 339201,
            dislikes: ['12313','11232','49'],
            commentCount: 32,
            shareCount: 8
        },
        {
            id: '8',
            type:'image',
            authorName: 'AAA Auther',
            authorPhoto: 'https://d3njjcbhbojbot.cloudfront.net/api/utilities/v1/imageproxy/https://coursera-profile-photos.s3.amazonaws.com/b3/7aafd0d90711e78ded1fd12f488fcc/Page-1-Image-3.png?auto=format%2Ccompress&dpr=1&w=50&h=50',
            textContent: 'What a girl is thinking while taking shower single image long imag',
            imageUrls:[
                'https://ipost.files.wordpress.com/2012/05/long_cat1_2.gif',
            ],
            tag:'Funny Picture',
            tagId: '123',
            likesCount: 1234321,
            likes: ['1233','1232','304','494','3','393'],
            dislikesCount: 339201,
            dislikes: ['12313','11232','49'],
            commentCount: 32,
            shareCount: 8
        },
        {
            id: '9',
            type:'text',
            authorName: 'AAA Auther',
            authorPhoto: 'https://d3njjcbhbojbot.cloudfront.net/api/utilities/v1/imageproxy/https://coursera-profile-photos.s3.amazonaws.com/b3/7aafd0d90711e78ded1fd12f488fcc/Page-1-Image-3.png?auto=format%2Ccompress&dpr=1&w=50&h=50',
            textContent: '讲一个励志的故事吧，十年前，有一个人为了创业把北京的房子卖了，拿着50万房款开始创业，十年后，他拿着创业赚来的400万在北京交了套首付。',
            imageUrls:[],
            tag:'Funny Picture',
            tagId: '123',
            likesCount: 11111111,
            likes: ['1233','1232','304','494','3','393'],
            dislikesCount: 339201,
            dislikes: ['12313','11232','49'],
            commentCount: 32,
            shareCount: 8
        },
        {
            id: '10',
            type:'text',
            authorName: 'AAA Auther',
            authorPhoto: 'https://d3njjcbhbojbot.cloudfront.net/api/utilities/v1/imageproxy/https://coursera-profile-photos.s3.amazonaws.com/b3/7aafd0d90711e78ded1fd12f488fcc/Page-1-Image-3.png?auto=format%2Ccompress&dpr=1&w=50&h=50',
            textContent: "I can't believe I made it anywhere creatively, though, because I was raised by two loving and supportive parents. Nothing squashes creativity more than unconditional love and support from a functional household. If you have kids, sh*t on their dreams a little bit.",
            imageUrls:[],
            tag:'Funny Picture',
            tagId: '123',
            likesCount: 1234321,
            likes: ['1233','1232','304','494','3','393'],
            dislikesCount: 339201,
            dislikes: ['12313','11232','49'],
            commentCount: 32,
            shareCount: 8
        },
    ],
    hotList: [],
    imageList: [],
    textList: [],
    myList:[],
    isPosting: false
}

function List(state = initState, action) {
	switch (action.type) {
        case 'ADD_POST':
            const tempMyList = state.myList;
            tempMyList.unshift(action.payload);
            return {...state, myList: tempMyList, isPosting: false};
        case 'ADD_POST_START':
            return {...state, isPosting: true}
		default:
			return state;
	}
}

export default List;
