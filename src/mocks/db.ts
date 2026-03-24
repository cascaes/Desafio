import AsyncStorage from '@react-native-async-storage/async-storage';

type StoreRecord = {
  address: string;
  createdAt: string;
  id: string;
  name: string;
  updatedAt: string;
};

type ProductRecord = {
  category: string;
  createdAt: string;
  id: string;
  name: string;
  price: number;
  storeId: string;
  updatedAt: string;
};

export type DatabaseState = {
  products: ProductRecord[];
  stores: StoreRecord[];
};

const DATABASE_KEY = '@desafio:inventory-db';
let memoryState: DatabaseState | null = null;

function createId(prefix: string) {
  return `${prefix}-${Math.random().toString(36).slice(2, 10)}`;
}

function buildSeedState(): DatabaseState {
  const now = new Date().toISOString();
  const stores = [
    {
      address: 'Av. Presidente Vargas, 1500 - Belem/PA',
      createdAt: now,
      id: 'store-belem-centro',
      name: 'Filial Belem Centro',
      updatedAt: now,
    },
    {
      address: 'Tv. Dom Pedro I, 203 - Ananindeua/PA',
      createdAt: now,
      id: 'store-ananindeua',
      name: 'Filial Ananindeua',
      updatedAt: now,
    },
  ];

  const products = [
    {
      category: 'Eletroportateis',
      createdAt: now,
      id: 'product-cafeteira',
      name: 'Cafeteira eletrica',
      price: 219.9,
      storeId: stores[0].id,
      updatedAt: now,
    },
    {
      category: 'Climatizacao',
      createdAt: now,
      id: 'product-ventilador',
      name: 'Ventilador turbo',
      price: 349.5,
      storeId: stores[0].id,
      updatedAt: now,
    },
    {
      category: 'Moveis',
      createdAt: now,
      id: 'product-cadeira',
      name: 'Cadeira ergonomica',
      price: 689,
      storeId: stores[1].id,
      updatedAt: now,
    },
  ];

  return { products, stores };
}

async function saveState(state: DatabaseState) {
  memoryState = state;
  await AsyncStorage.setItem(DATABASE_KEY, JSON.stringify(state));
}

export async function ensureDatabaseSeeded() {
  if (memoryState) {
    return memoryState;
  }

  const rawValue = await AsyncStorage.getItem(DATABASE_KEY);

  if (rawValue) {
    memoryState = JSON.parse(rawValue) as DatabaseState;
    return memoryState;
  }

  const seededState = buildSeedState();
  await saveState(seededState);
  return seededState;
}

export async function readDatabase() {
  return ensureDatabaseSeeded();
}

export async function listStores(search = '') {
  const state = await readDatabase();
  const needle = search.trim().toLowerCase();

  return state.stores
    .filter((store) =>
      needle
        ? [store.name, store.address].join(' ').toLowerCase().includes(needle)
        : true,
    )
    .map((store) => {
      const products = state.products.filter((product) => product.storeId === store.id);
      return {
        ...store,
        productsCount: products.length,
        stockValue: products.reduce((total, product) => total + product.price, 0),
      };
    });
}

export async function getStoreById(storeId: string) {
  const state = await readDatabase();
  const store = state.stores.find((item) => item.id === storeId);

  if (!store) {
    return null;
  }

  const products = state.products.filter((product) => product.storeId === store.id);

  return {
    ...store,
    products,
    productsCount: products.length,
    stockValue: products.reduce((total, product) => total + product.price, 0),
  };
}

export async function createStore(input: { address: string; name: string }) {
  const state = await readDatabase();
  const now = new Date().toISOString();

  const store = {
    address: input.address,
    createdAt: now,
    id: createId('store'),
    name: input.name,
    updatedAt: now,
  };

  const nextState = {
    ...state,
    stores: [store, ...state.stores],
  };

  await saveState(nextState);

  return {
    ...store,
    productsCount: 0,
    stockValue: 0,
  };
}

export async function updateStore(storeId: string, input: { address: string; name: string }) {
  const state = await readDatabase();
  const currentStore = state.stores.find((store) => store.id === storeId);

  if (!currentStore) {
    return null;
  }

  const updatedStore = {
    ...currentStore,
    address: input.address,
    name: input.name,
    updatedAt: new Date().toISOString(),
  };

  const nextState = {
    ...state,
    stores: state.stores.map((store) => (store.id === storeId ? updatedStore : store)),
  };

  await saveState(nextState);

  const products = nextState.products.filter((product) => product.storeId === storeId);

  return {
    ...updatedStore,
    productsCount: products.length,
    stockValue: products.reduce((total, product) => total + product.price, 0),
  };
}

export async function deleteStore(storeId: string) {
  const state = await readDatabase();

  const nextState = {
    products: state.products.filter((product) => product.storeId !== storeId),
    stores: state.stores.filter((store) => store.id !== storeId),
  };

  await saveState(nextState);
}

export async function createProduct(input: {
  category: string;
  name: string;
  price: string;
  storeId: string;
}) {
  const state = await readDatabase();
  const now = new Date().toISOString();

  const product = {
    category: input.category,
    createdAt: now,
    id: createId('product'),
    name: input.name,
    price: Number(input.price),
    storeId: input.storeId,
    updatedAt: now,
  };

  const nextState = {
    ...state,
    products: [product, ...state.products],
  };

  await saveState(nextState);
  return product;
}

export async function updateProduct(
  productId: string,
  input: {
    category: string;
    name: string;
    price: string;
    storeId: string;
  },
) {
  const state = await readDatabase();
  const currentProduct = state.products.find((product) => product.id === productId);

  if (!currentProduct) {
    return null;
  }

  const updatedProduct = {
    ...currentProduct,
    category: input.category,
    name: input.name,
    price: Number(input.price),
    storeId: input.storeId,
    updatedAt: new Date().toISOString(),
  };

  const nextState = {
    ...state,
    products: state.products.map((product) =>
      product.id === productId ? updatedProduct : product,
    ),
  };

  await saveState(nextState);
  return updatedProduct;
}

export async function deleteProduct(productId: string) {
  const state = await readDatabase();

  const nextState = {
    ...state,
    products: state.products.filter((product) => product.id !== productId),
  };

  await saveState(nextState);
}
