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
        this.preOrderData = [];
        this.inOrderData = [];
        this.postOrderData = [];
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

    delete(value, root = this.root) {
        if (root == null) return root;

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
            //root = root.rightChild;
            //root.data = root;
            root.rightChild = this.delete(root.rightChild, root.data);
        }
        return root;
    }

    find(value, root = this.root) {        
        if (root == null) return null;
        
        if (root.data == value) return root;

        if (root.data < value) {
            return this.find(value, root.rightChild);
        } else if (root.data > value) {
            return this.find(value, root.leftChild);
        }
    }

    traverse(root, array) {
        if (array != undefined) array.push(root.data);
        if (root.leftChild != null) {
            this.traverse(root.leftChild, array);
        }

        if (root.rightChild != null) {
            this.traverse(root.rightChild, array);
        }

        return array;
    }

    levelOrder(root) {
        const queue = [];
        const result = [];
        
        if (root == null) return null;

        queue.push(root);

        while (queue.length > 0) {
            let current = queue.shift(root);
            result.push(current.data);

            if (root.leftChild != null) {
                queue.push(root.leftChild);
            }

            if (root.rightChild != null) {
                queue.push(root.rightChild);
            }            
        }
        return result;
        /*
        if (root.leftChild != null && root.rightChild != null) {
            queue.push(root.leftChild.data);
            queue.push(root.rightChild.data);
            this.levelOrder(root = root.leftChild);
            this.levelOrder(root = root.rightChild);
            //return temp;
        }

        if (root.leftChild != null) {
            queue.push(root.leftChild.data);
            this.levelOrder(root = root.leftChild);
            //return temp;
        }

        if (root.rightChild != null) {
            queue.push(root.rightChild.data);
            this.levelOrder(root = root.rightChild);
            //return temp;
        }

        if (root.leftChild == null && root.rightChild == null) {
            return queue;
        }
        return queue;*/
    }

    inOrder(root) {
        if (root == null) {
            return null;
        }

        if (root.leftChild != null) {
            this.inOrder(root.leftChild.data);
        }

        if (root != undefined) {
            this.inOrderData.push(root);
        }

        if (root.rightChild != null) {
            this.inOrder(root.rightChild.data);
        }

        return this.inOrderData;
    }

    preOrder(root) {
        if (root == null) {
            return null;
        }

        if (root != undefined) {
            this.preOrderData.push(root);
        }

        if (root.leftChild != null) {
            this.preOrder(root.leftChild.data);
        }

        if (root.rightChild != null) {
            this.preOrder(root.rightChild.data);
        }

        return this.preOrderData;
    }

    postOrder(root) {
        if (root == null) {
            return null;
        }

        if (root.leftChild != null) {
            this.postOrder(root.leftChild.data);
        }

        if (root.rightChild != null) {
            this.postOrder(root.rightChild.data);
        }

        if (root != undefined) {
            this.postOrderData.push(root);
        }
        return this.postOrderData;
    }

    height(root) {
        if (root == null) {
            return 0;
        } else {
            let left = this.height(root.leftChild);
            let right = this.height(root.rightChild);

            return Math.max(left, right) + 1;
        }
        
        /*if (root == null) return null;

        let location = this.find(root);
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
        return height;*/
    }

    depth(node, root = this.root) {
        let depth = -1;
        console.log('hello');
        if (node == null) return depth;
        
        if (root == node) {
            return depth + 1;
        } else if (
            root.leftChild != null ||
            (depth = this.depth(node, root.leftChild)) >= 0
        ) {
            return depth + 1;
        } else if (
            root.rightChild != null ||
            (depth = this.depth(node, root.rightChild)) >= 0
        ) {
            return depth + 1;
        }

        return depth;
    }

    isBalanced(root = this.root) {
        if (root == null) return null;

        let leftTree = root.leftChild;
        let rightTree = root.rightChild;

        if (Math.abs(this.height(leftTree) - this.height(rightTree)) > 1) {
            return false;
        } else {
            return true;
        }
    }

    reBalance() {
        if (this.isBalanced()) return this.root;

        let reBalancedNewBSTA = [];
        reBalancedNewBSTA = this.traverse(this.root, reBalancedNewBSTA);
        
        let balancedBST = new Tree(reBalancedNewBSTA);

        return balancedBST.root;
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

function randomArray() {
    let array = [];

    for (let i = 0; i < 5; i++) {
        array.push(Math.floor(Math.random() * 10));
    }

    return array;
}

let testTree = new Tree(randomArray());
console.log(testTree.prettyPrint());
