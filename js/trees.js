 
 function Node()
 {
    this.val = undefined;
    this.left = null;
    this.right = null;
 }
 
 function Tree()
 {
     this.root = null;
 }

 Tree.prototype.CreateNode = function (val)
 {
     var node = new Node();
     return node;
 }

