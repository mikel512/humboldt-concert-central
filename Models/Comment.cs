using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace fortress.core.Model
{
    public class Comment
    {
        // Keys
        public int CommentId { get; set; }
        public int EventId { get; set; }
        public int? ParentCommentId { get; set; }
        public string Content { get; set; }
        public DateTime DateStamp { get; set; }
        public string UserId { get; set; }
        public string UserName { get; set; }
        public int Upvotes { get; set; }
        public List<Comment> Children { get; set; }
        public int Height { get; set; }

    }
}