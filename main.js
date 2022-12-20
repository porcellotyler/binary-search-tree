class Node {
    constructor(data) {
        this.data = data;
        this.leftChild = null;
        this.rightChild = null;
    }
}

class Tree {
    constructor(array) {
        this.array = removeDupes(mergeSort(array));
        this.root = this.buildTree(this.array, 0, this.array.length - 1);
    }
    
    buildTree(array, start, end) {
        if (start > end) return null;

        let mid = parseInt((start + end) / 2);
        let node = new Node(array[mid]);

        node.leftChild = this.buildTree(array, start, mid - 1);
        node.rightChild = this.buildTree(array, mid + 1, end);
        return node;
    }
 
    insert(value, root = this.root) {
        if (root == null) {
            return (root = new Node(value));
        }

        if (value < root.data) {
            root.leftChild = this.insert(value, root.leftChild)
        } else if (value > root.data) {
            root.rightChild = this.insert(value, root.rightChild);
        }        

        return root;
    }

    //Write delete function which accepts a value to delete (you’ll have to deal with several cases such as when a node has children or not)
    delete(value, root = this.root) {
        if (root == null) {
            return root;
        }

        if (root.data > value) {
            root.leftChild = this.delete(value, root.leftChild);
        } else if (root.data < value) {
            root.rightChild = this.delete(value, root.rightChild);
        } else {
            if (root.leftChild == null) {
                return root = root.rightChild;
            } else if (root.rightChild == null) {
                return root = root.leftChild;
            }
            root = root.rightChild;
        }
        return root;
    }

    find(value, root = this.root) {        
        if (root.data == value) {
            return root;
        }

        if (root.data < value) {
            return this.find(value, root.rightChild);
        } else if (root.data > value) {
            return this.find(value, root.leftChild);
        }
    }

    //Write a levelOrder function which accepts another function as a parameter. levelOrder should traverse the tree in breadth-first level order and provide each node as the argument to the provided function. This function can be implemented using either iteration or recursion (try implementing both!). The method should return an array of values if no function is given. Tip: You will want to use an array acting as a queue to keep track of all the child nodes that you have yet to traverse and to add new ones to the list (as you saw in the video).
    //need to watch video to understand levelOrder taking a function as a paramter; currently im having trouble going beyond 1 level depth
    levelOrder(root = this.root, temp = []) {
        //let temp = [];
        console.log(`heres the ${root.data}`);
        if (root == null) return null;
        temp.push(root.data);

        if (root.leftChild != null && root.rightChild != null) {
            temp.push(root.leftChild.data);
            temp.push(root.rightChild.data);
            this.levelOrder(root = root.leftChild);
            this.levelOrder(root = root.rightChild);
            //return temp;
        }

        if (root.leftChild != null) {
            temp.push(root.leftChild.data);
            this.levelOrder(root = root.leftChild);
            //return temp;
        }

        if (root.rightChild != null) {
            temp.push(root.rightChild.data);
            this.levelOrder(root = root.rightChild);
            //return temp;
        }

        if (root.leftChild == null && root.rightChild == null) {
            return temp;
        }
        return temp;
    }

    //Write inorder, preorder, and postorder functions that accept a function parameter. Each of these functions should traverse the tree in their respective depth-first order and yield each node to the provided function given as an argument. The functions should return an array of values if no function is given.

    //Write a height function which accepts a node and returns its height. Height is defined as the number of edges in longest path from a given node to a leaf node.
    height(data, height = 0) {
        if (data == null) return null;

        let location = this.find(data);
        if (location == undefined) return;

        if (location.leftChild != null && location.rightChild != null) {
            height++;
            this.height(location.leftChild);
            this.height(location.rightChild);
        }

        if (location.leftChild != null || location.rightChild != null) {
            height++;
            if (location.leftChild != null) {
                this.height(location.leftChild);
            } else if (location.rightChild != null) {
                this.height(location.rightChild);
            }
        }
        return height;
    }

    prettyPrint(node = this.root, prefix = '', isLeft = true) {
        if (node.rightChild !== null) {
            this.prettyPrint(node.rightChild, `${prefix}${isLeft ? '│   ' : '    '}`, false);
        }
        console.log(`${prefix}${isLeft ? '└── ' : '┌── '}${node.data}`);
        if (node.leftChild !== null) {
            this.prettyPrint(node.leftChild, `${prefix}${isLeft ? '    ' : '│   '}`, true);
        }
    }
}

const mergeSort = array => {
    if (array.length <= 1) return array;

    const middle = Math.floor(array.length / 2);
    const leftSide = mergeSort(array.slice(0, middle));
    const rightSide = mergeSort(array.slice(middle));
    
    return merge(leftSide, rightSide);
};

const merge = (leftArray, rightArray) => {
    let result = [];

    while (leftArray.length > 0 && rightArray.length > 0) {
        if (leftArray[0] <= rightArray[0]) {
            result.push(leftArray.shift());
        } else {
            result.push(rightArray.shift());
        }
    }

    while (leftArray.length) result.push(leftArray.shift());
    while (rightArray.length) result.push(rightArray.shift());

    return result.concat(leftArray, rightArray);
}

function removeDupes(array) {
   return Array.from(new Set(array));
}

let myTree = new Tree([3, 1, 5, 4, 2]);
//console.log("hello world");
//console.log(myTree);
//myTree.insert(6);
//myTree.insert(7);
//console.log(myTree.find(5));
//console.log(myTree.levelOrder());
console.log(myTree.height(3));
//myTree.delete(5);
//console.log(myTree);
//console.log(myTree.prettyPrint());
