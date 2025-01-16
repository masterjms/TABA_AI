const cart: string[] = [
    'c1',
    'c2',
    'c3',
];
interface User {
    username: string;
    price: number;
    cart: string[];
}
// 이런 경우 user의 cart의 타입 string[]이 무엇인지 알기 어렵다.
// 이때 별칭을 사용해주어 유지보수가 쉽게 해준다.
// 별칭은 type을 붙여준다.
type Cart = string[];
const cart: Cart = [
    'c1',
    'c2',
    'c3',
];
interface User {
    username: string;
    price: number;
    cart: Cart;
}
// 아래는 별칭 사용의 다른 예시다
type CartResultCallback = (result: boolean) => void;

// 이것도 별칭이 가능하지만 interface를 쓰는 것이 권장된다.
type product = {
    id: number;
    name: string;
}