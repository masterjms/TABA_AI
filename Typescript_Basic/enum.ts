// enum
enum Size {
    S,
    M,
    L,
    XL,
  }
  
  console.log(Size.S); // 0
  console.log(Size.M); // 1
  console.log(Size.L); // 2


// enum을 사용한 전체 코드 예시
enum Size {
    S = 'S',
    M = 'M',
    L = 'L',
    XL = 'XL',
}
const product1: {
    id: String;
    name: String;
    membersOnly?: boolean;
    size: Size[];
} = {
    id: 'c32',
    name: 'codeit',
    membersOnly: true,
    size: [Size.M, Size.S]
};

function findProduct(size?: Size) {
    if(!Size){
        console.log('전체사이즈로 검색');
        return;
    }
    else {
        console.log('특정사이즈로 검색');
    }
}
findProduct(Size.M);