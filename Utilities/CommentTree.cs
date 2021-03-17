using fortress.core.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace fortress.core.Utilities
{
    public class CommentTree
    {
        private Dictionary<int?, List<Comment>> _commentDict;
        public CommentTree(Dictionary<int?, List<Comment>> commentList)
        {
            _commentDict = commentList;
        }

        public List<Comment> GetEventComments()
        {
            // if no comments, return
            if (!_commentDict.ContainsKey(0))
            {
                return new List<Comment>();
            }

            // for each root comment, recursively build m-ary tree
            foreach (var item in _commentDict[0])
            {
                // if comment has no replies
                if (!_commentDict.ContainsKey(item.CommentId)) continue;
                // else, make the tree
                MakeTree(item, _commentDict[item.CommentId], 0);
            }

            return _commentDict[0];
        }

        private Comment MakeTree(Comment root, List<Comment> children, int height)
        {
            // base case
            root.Height = height;
            if (children == null) return root;

            height++;
            foreach (var item in children)
            {
                // initialize list if null
                if (root.Children == null)
                {
                    root.Children = new List<Comment>();
                }

                item.Height = height;
                root.Children.Add(item);
                // if this comment has no replies, continue
                if (!_commentDict.ContainsKey(item.CommentId)) continue;
                MakeTree(item, _commentDict[item.CommentId], height);
            }

            return root;
        }
    }
}
