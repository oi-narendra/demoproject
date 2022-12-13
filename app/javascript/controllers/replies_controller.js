import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
    static values = { id: Number, commentId: Number, postId: Number }

    connect() {
        console.log("Replies controller connected")
        console.table(this.idValue, this.commentIdValue, this.postIdValue)

    }

    editReply(event) {
        console.log("edit Reply")
        let replyElement = document.getElementById(`reply-${this.idValue}`)
        replyElement.style.display = "none"
        let replyFormElement = document.getElementById(`reply-${this.idValue}-form`)
        let editReplyButton = document.getElementById(`edit-reply-${this.idValue}-button`)
        let cancelEditReplybutton = document.getElementById(`cancel-edit-reply-${this.idValue}-button`)
        replyFormElement.style.display = "block"
        editReplyButton.style.display = "none"
        cancelEditReplybutton.style.display = "block"
        let deleteReplyButton = document.getElementById(`delete-reply-${this.idValue}-button`)
        deleteReplyButton.style.display = "none"
    }

    cancelEditReply(event) {
        console.log("cancel edit Reply")
        let replyElement = document.getElementById(`reply-${this.idValue}`)
        replyElement.style.display = "block"
        let replyFormElement = document.getElementById(`reply-${this.idValue}-form`)
        let editReplyButton = document.getElementById(`edit-reply-${this.idValue}-button`)
        let cancelEditReplybutton = document.getElementById(`cancel-edit-reply-${this.idValue}-button`)
        replyFormElement.style.display = "none"
        editReplyButton.style.display = "block"
        cancelEditReplybutton.style.display = "none"
        let deleteReplyButton = document.getElementById(`delete-reply-${this.idValue}-button`)
        deleteReplyButton.style.display = "block"
    }

    deleteReply(event) {
        fetch(this.postIdValue + '/comments/' + this.commentIdValue + '/reply', {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json'
            },

        })
        this.element.remove()
    }

}