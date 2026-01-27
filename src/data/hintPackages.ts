
export interface HintPackage {
  id: string;
  name: string;
  description: string;
  hintAmount: number;
  price: number;
  discount?: number;
  popular?: boolean;
}

export const hintPackages: HintPackage[] = [
  {
    id: 'small',
    name: '25 Hints',
    description: 'Get unstuck on the trickier puzzles',
    hintAmount: 25,
    price: 99,
  },
  {
    id: 'medium',
    name: '75 Hints',
    description: 'Popular choice for regular players',
    hintAmount: 75,
    price: 249,
    discount: 15,
    popular: true,
  },
  {
    id: 'large',
    name: '200 Hints',
    description: 'Best value for dedicated learners',
    hintAmount: 200,
    price: 499,
    discount: 33,
  }
];
