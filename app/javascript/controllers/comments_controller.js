import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
    static values = { id: Number }

    connect() {
        console.log("Comments controller connected")
        console.log(this.idValue)
    }

    editComment(event) {
        console.log("edit comment")
        let commentElement = document.getElementById(`comment-${this.idValue}`)
        commentElement.style.display = "none"
        let commentFormElement = document.getElementById(`comment-${this.idValue}-form`)
        let editCommentButton = document.getElementById(`edit-comment-${this.idValue}-button`)
        let cancelEditcommentbutton = document.getElementById(`cancel-edit-comment-${this.idValue}-button`)
        commentFormElement.style.display = "block"
        editCommentButton.style.display = "none"
        cancelEditcommentbutton.style.display = "block"
        let deleteCommentButton = document.getElementById(`delete-comment-${this.idValue}-button`)
        deleteCommentButton.style.display = "none"
    }

    cancelEditComment(event) {
        console.log("cancel edit comment")
        let commentElement = document.getElementById(`comment-${this.idValue}`)
        commentElement.style.display = "block"
        let commentFormElement = document.getElementById(`comment-${this.idValue}-form`)
        let editCommentButton = document.getElementById(`edit-comment-${this.idValue}-button`)
        let cancelEditcommentbutton = document.getElementById(`cancel-edit-comment-${this.idValue}-button`)
        commentFormElement.style.display = "none"
        editCommentButton.style.display = "block"
        cancelEditcommentbutton.style.display = "none"
        let deleteCommentButton = document.getElementById(`delete-comment-${this.idValue}-button`)
        deleteCommentButton.style.display = "block"
    }

    deleteComment(event) {
        fetch('/comments/' + this.idValue, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json'
            },

        })
        this.element.remove()
    }

}