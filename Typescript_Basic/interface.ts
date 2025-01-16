enum Size {
    S = 'S',
    M = 'M',
    L = 'L',
    XL = 'XL',
};
// interface로 반복되는 product1,2의 타입선언을 미리 해둔다.
// 이것을 해두면 product만 수정하면 추가적인 파라미터를 적기 쉽고, 타입오류 수정도 편하다.
interface Product {
    id: String;
    name: String;
    price: number;
    membersOnly?: boolean;
    size: Size[];
};
// Product를 상속받는 ClothingProduct. Product프로퍼티에 ClothingProduct의 프로퍼티가 추가된다.
interface ClothingProduct extends Product{
    size: Size[];
};

const product1: ClothingProduct = {
    id: 'c32',
    name: 'codeit',
    price: 1200,
    membersOnly: true,
    size: [Size.M, Size.S]
};

const product2: ClothingProduct = {
    id: 'c11',
    name: 'codeone',
    price: 2000,
    membersOnly: true,
    size: [Size.L, Size.XL]
};

// 상품을 찾는 함수
function findProduct(size?: Size) {
    if(!size){
        console.log('전체사이즈로 검색');
        return;
    }
    else {
        console.log('특정사이즈로 검색');
    }
}
findProduct(Size.M);

// 상품명과 가격을 출력하는 함수
function PrintProduct(product: Product){
    console.log(`${product.name}의 가격은 ${product.price}입니다.`);
}
PrintProduct(product1);

// -------------------------------------
// printproduct함수를 interface로 정의하기
interface PrintProductFunction{
    (product: Product): void;
};0

// interface를 생성한 후 printproduct함수 호출
function PrintProduct: PrintProductFunction = (product) => {
    console.log(`${product.name}의 가격은 ${product.price}입니다.`);
};