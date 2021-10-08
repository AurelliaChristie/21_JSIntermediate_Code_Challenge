export const getPosts = async () => {
    try{
        const fetchPostData = await fetch('https://jsonplaceholder.typicode.com/posts');
        const postData = await fetchPostData.json();
        return postData;
    } catch(error){
        console.log('getPosts',error);
    }
  };
  
  export const getPost = async (post_id) => {
    try{
        const fetchPostData = await fetch(`https://jsonplaceholder.typicode.com/posts/${post_id}`)
        const postData = await fetchPostData.json();
        const randomPic = await getRandomPic();
        const randomPicProfile = await getRandomProfile();
        const postComments = await getPostComments(post_id);
        const author = await getAuthor(postData.userId);
        return [postData, randomPic, randomPicProfile, postComments, author];
    } catch(error) {
        return "Not Found";
    }
  };
  
  export const getPostComments = async (post_id) => {
    try{
        const fetchPostCommentsData = await fetch(`https://jsonplaceholder.typicode.com/posts/${post_id}/comments`)
        const postCommentsData = await fetchPostCommentsData.json();
        return postCommentsData;
    } catch(error) {
        console.log('getPostComments', error);
    }
  };
  
  export const getAuthor = async (user_id) => {
    try{
        const fetchAuthorData = await fetch(`https://jsonplaceholder.typicode.com/users/${user_id}`)
        const authorData = await fetchAuthorData.json();
        return authorData;
    } catch(error) {
        console.log('getAuthor', error);
    }
  };
  
  export const getPostsByAuthor = async (author_id) => {
    // EDIT HERE
  };
  
  export const getRandomPic = async () => {
    try {
      const image = await fetch('https://source.unsplash.com/random/720x480');
      return image.url;
    } catch (error) {
      console.log('getRandomPic', error);
      throw error;
    }
  };
  
  export const getRandomProfile = async () => {
    try {
      const image = await fetch('https://source.unsplash.com/480x480/?profile');
      return image.url;
    } catch (error) {
      console.log('getRandomProfile', error);
      throw error;
    }
  };