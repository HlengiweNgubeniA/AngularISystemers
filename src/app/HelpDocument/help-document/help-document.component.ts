import { Component, OnInit } from '@angular/core';
import { HelpDocumentService } from '../../services/help-document.service';
import { HelpDocument } from '../../models/help-document';
import { Comment } from '../../models/comment';

@Component({
  selector: 'app-help-document',
  templateUrl: './help-document.component.html',
  styleUrl: './help-document.component.css'
})
export class HelpDocumentComponent implements OnInit {
  helpDocument!: HelpDocument;
  comments: Comment[] = [];
  newComment: string = '';

  constructor(private helpDocumentService: HelpDocumentService) {}

  ngOnInit(): void {
    this.loadHelpDocument();
  }

  loadHelpDocument() {
    this.helpDocumentService.getHelpDocument().subscribe(document => {
      this.helpDocument = document;
      this.loadComments();
    });
  }

  loadComments() {
    if (this.helpDocument) {
      this.helpDocumentService.getComments(this.helpDocument.id).subscribe(comments => {
        this.comments = comments;
      });
    }
  }

  submitComment() {
    const comment: Comment = {
      id: 0,
      helpDocumentId: this.helpDocument.id,
      user: 'User', // Replace with actual user data
      text: this.newComment,
      createdAt: new Date()
    };

    this.helpDocumentService.addComment(comment).subscribe(() => {
      this.comments.push(comment);
      this.newComment = '';
    });
  }
}
