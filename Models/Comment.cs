using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace fortress.core.Model
{
    public class Comment
    {
        // Keys
        [Key] public int CommentId { get; set; }
        [Key] public int EventId { get; set; }
        [Key] public int? ParentCommentId { get; set; }
        
        // Required fields
        [Display(Name = "Write your comment:")]
        [Required(ErrorMessage = "Comment required")]
        [MaxLength(2048, ErrorMessage ="Message too long")]
        public string Content { get; set; }
        [Required] 
        public DateTime DateStamp { get; set; }
        [Required] 
        public string UserId { get; set; }
        [Required]
        public string UserName { get; set; }
        
        // Fields only used when reading from DB      
        public int Upvotes { get; set; }
        // ChildNodeId, ChildNodeComment key value pairs
        public List<Comment> Children { get; set; }
        // Node height
        public int Height { get; set; }

    }
}