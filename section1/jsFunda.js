//serial number 1 of reactjs tracker

let arr=[
    [1,2,3],
    [4,5,6],
    [3,3,1]
];

let count={}

for(let i of arr){
    for(let j of i){
        if(count[j]>0)
            count[j]++
        else
            count[j]=1
    }
}

//find unique elements in two dimensional array
console.log("Unique elements in 2-d array");
for(let i in count){
    if(count[i]==1){
        console.log(i)
    }
}

//find count of repeated elements

console.log("count of repeated elements in 2-d array");
for(let i in count){
    if(count[i]>1){
        console.log(i+" repeated "+ count[i] +" times")
    }
}

//combine two 2-d arrays

let arr1=[
    [1,2,3],
    [4,5,6]
]
let arr2=[
    [1,2,3],
    [4,5,6],
    [7,8,9],
    [10,11,12]
]

let combined=[...arr1,...arr2]

console.log("combined 2-d array");
console.log(combined);