// 배열
const cart: string[] = [];
cart.push('c001');
cart.push('c002');

// 배열의 배열
const carts: string[][] = [
  ['c001', 'c002'],
  ['c003'],
];

// 튜플
let mySize: [number, number, string] = [175, 30, 'L'];

// 객체 타입 - 배열 타입을 만들려면 타입을 적고 []를 붙입니다. 
// 만약에 배열의 배열을 만들고 싶다면 배열 타입 뒤에 []를 붙이면 됩니다. 
// 튜플은 개수랑 순서가 정해져 있는 배열입니다. [] 안에 순서대로 타입을 쉼표로 구분해서 씁니다.
let product: {
    id: string;
    name: string;
    price: number;
    membersOnly?: boolean; // 필수가 아닌 프로퍼티
    sizes: string[];
  } = {
    id: 'c001',
    name: '코드잇 블랙 후디',
    price: 129000,
    sizes: ['M', 'L', 'XL'],
  };
  
  if (product.membersOnly) {
    console.log('회원 전용 상품');
  } else {
    console.log('일반 상품');
  }
  // 프로퍼티의 개수를 정하지 않을 수 도 있다.
  let stock: { [id: string]: number } = {
    c001: 3,
    c002: 0,
    c003: 2,
  };
  
// any 타입을 사용하는 경우 as 키워드를 써서 타입을 지정하거나, 콜론으로 타입을 지정
const parsedProduct = JSON.parse('{ "name": "코드잇 토트백", "price": 12000 }') as { name: string; price: number };
const parsedProduct1: { name: string; price: number } = JSON.parse('{ "name": "코드잇 토트백", "price": 12000 }');

// 함수타입
function addToCart(id: string, quanity: number): boolean {
    if (조건) {
        return false;
    }
    return true;
}

// 함수를 값으로 사용하는 경우
(id: string, quanity: number) => boolean
// 리턴값이 없을때
(...ids: string[]) => void;

