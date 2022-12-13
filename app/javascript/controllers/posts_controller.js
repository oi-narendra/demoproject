import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
  connect() {
    console.log("Posts controller connected")
  }

  editPost(event) {
    console.log("edit post")
    let postElement = document.getElementById("post")
    postElement.style.display = "none"
    let postFormElement = document.getElementById("post-form")
    let editPostButton = document.getElementById("edit-post-button")
    let cancelEditPostbutton = document.getElementById("cancel-edit-post-button")
    postFormElement.style.display = "block"
    editPostButton.style.display = "none"
    cancelEditPostbutton.style.display = "block"
  }

  cancelEditPost(event) {
    console.log("cancel edit post")
    let postElement = document.getElementById("post")
    postElement.style.display = "block"
    let postFormElement = document.getElementById("post-form")
    let editPostButton = document.getElementById("edit-post-button")
    let cancelEditPostbutton = document.getElementById("cancel-edit-post-button")
    postFormElement.style.display = "none"
    editPostButton.style.display = "block"
    cancelEditPostbutton.style.display = "none"
  }

}
