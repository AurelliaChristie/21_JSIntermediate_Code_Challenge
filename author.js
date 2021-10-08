import { getAuthor, getPostsByAuthor,getRandomPic } from "./helpers.js";

/**
 *
 * @param {String} thumbnail => url yang kita ambil menggunakan Unsplash API
 * @param {Object} post => object post yang kita ambil dari jsonplaceholder API
 */

const elPageTitle = document.querySelector('#page-title');
const elPostList = document.querySelector('#post-list');
const elLoading = document.querySelector('#loading');
const elEmptyPost = document.querySelector('#empty-post');

const createPostElement = (thumbnail, post) => {
  const elCol = document.createElement('div');
  elCol.classList.add('col-12');
  elCol.insertAdjacentHTML(
    'beforeend',
    `<div class="card mb-3 w-100">
      <div class="row g-0">
        <div class="col-md-4">
          <img src="${thumbnail}" class="img-fluid rounded-start" alt="skilvul" />
        </div>
        <div class="col-md-8 d-flex justify-between">
          <div class="card-body">
            <h5 class="card-title">${post.title}</h5>
            <p class="card-text">${post.body}</p>
            <a href="/post.html?post_id=${post.id}" class="btn btn-primary w-100 stretched-link">Read More</a>
          </div>
        </div>
      </div>
    </div>`
  );
  return elCol;
};


const renderPosts = async () => {
  try{
    let URL = document.URL;
    let author_id = URL.split('=')[1];
    let authorDetails = await getAuthor(author_id);
    let authorPosts = await getPostsByAuthor(author_id);
    const getURL = async function(){
      try{
          let thumbnails=[];
          for(let i=0; i<authorPosts.length; i++){
              let url = await getRandomPic();
              thumbnails.push(url);
          }
          return thumbnails;
      } catch(error){
          console.log(error)
      }
    }
    if(authorPosts !== "Empty Post"){
        elPageTitle.innerHTML = `${authorDetails.name} Posts`
        let thumbnails = await getURL();
        for(let i=0; i<authorPosts.length; i++){
          let post = createPostElement(thumbnails[i], authorPosts[i]);
          console.log(post);
          elPostList.appendChild(post);
        }
        elPostList.classList.remove("d-none");
        elLoading.classList.add("d-none");
    } else {
        elLoading.classList.add("d-none")
        elEmptyPost.classList.remove("d-none")
    }
  } catch(error){
      console.log(error)
  }
};

renderPosts();