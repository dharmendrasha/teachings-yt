function AddReactionToPost(post){
    return new Promise((res, rej) => {
        console.log('running AddReactionToPost')
        res(post)
    })
}


function AddCommentToPost(post){
    return new Promise((res, rej) => {
        console.log('running AddCommentToPost')
        res(post)
    })
}



function MaintainPostData(...args){
    return new Promise((res, rej) => {
        console.log(`running MaintainPostData`)
        res(args)
    })
}

function StartReactionAndComment({ postObj }) {
    for (const post of postObj) {
        console.log(post)
        setTimeout(() => {
        AddReactionToPost(post).then((res) => { MaintainPostData(res, null, post.postURN) }); // increasing like and comment count
        AddCommentToPost(post).then((res) => { MaintainPostData(null, res, post.postURN) });
        console.log("Reaction and Comment added successfully 🎉");
        }, 15000);
    }
}


async function sleep(msec){
    return new Promise((res, rej) => {
        setTimeout(() => {
            res(true)
        }, msec)
    })
}


async function StartReactionAndComment({postObj}){
    for await (const post of postObj){
        console.log("post", post)
        console.log("sleepng for", 15000)
        await sleep(15000)
        await Promise.allSettled([1, 2].map(async () => {
            await AddReactionToPost(post).then((res) => { MaintainPostData(res, null, post.postURN) });
            await AddCommentToPost(post).then((res) => { MaintainPostData(null, res, post.postURN) });
        })).catch((err) => console.error(err))
        console.log("finished")
    }
}


const obj = {
    postObj: [
        "i am ok 1",
        "i am ok 2",
        "i am ok 3",
        "i am ok 4",
        "i am ok 5",
        "i am ok 6",
    ]
}


StartReactionAndComment(obj)







