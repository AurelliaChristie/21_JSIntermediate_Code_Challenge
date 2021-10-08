import { getPost } from './helpers.js';

/**
 *
 * @param {Object} comment 
 */

const elPageTitle = document.querySelector('#page-title');
const elDetailBerita = document.querySelector('#detail-berita');
const elLoading = document.querySelector('#loading');
const elNotFound = document.querySelector('#not-found');
const elCardImg = document.querySelector('.card-img-top');
const elCardText = document.querySelector('.card-text');
const elCardAuthorImg = document.querySelector('#author-img');
const elCardAuthorName = document.querySelector('#author-name');
const elCardAuthorEmail = document.querySelector('#author-email');
const elListGroup = document.querySelector('#list-group');

const createListElement = (comment) => {
  const elListItem = document.createElement('div');
  const elListItemContainer = document.createElement('div');
  const elListItemTitle = document.createElement('div');
  const elListItemText = document.createElement('span');

  elListItem.classList.add('list-group-item');
  elListItemContainer.classList.add('ms-2', 'me-auto');
  elListItemTitle.classList.add('fw-bold');

  elListItemTitle.innerHTML = comment.email;
  elListItemText.innerHTML = comment.body;

  elListItemContainer.appendChild(elListItemTitle);
  elListItemContainer.appendChild(elListItemText);
  elListItem.appendChild(elListItemContainer);

  return elListItem;
};

const renderPost = async () => {
    try{
        let URL = document.URL;
        let post_id = URL.split('=')[1];
        let postDetails = await getPost(post_id);
        if(postDetails !== "Not Found"){
            elDetailBerita.classList.remove("d-none");
            elLoading.classList.add("d-none");
            elPageTitle.innerHTML = postDetails[0].title;
            elCardImg.src = postDetails[1];
            elCardText.innerHTML = postDetails[0].body;
            elCardAuthorImg.src = postDetails[2];
            elCardAuthorName.innerHTML = postDetails[4].name;
            elCardAuthorName.href = `/author.html?author_id=${postDetails[0].userId}`
            elCardAuthorEmail.innerHTML = postDetails[4].email;
            Array.from(postDetails[3]).forEach(comment => {
                let comment_detail = createListElement(comment);
                elListGroup.appendChild(comment_detail);
            })
        } else {
            elLoading.classList.add("d-none")
            elNotFound.classList.remove("d-none")
        }
      } catch(error){
          console.log(error)
      }
};

renderPost();