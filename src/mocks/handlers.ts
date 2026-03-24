import {
  createProduct,
  createStore,
  deleteProduct,
  deleteStore,
  getStoreById,
  listStores,
  updateProduct,
  updateStore,
} from './db';

type MockRequest = {
  body?: unknown;
  method?: string;
  path: string;
};

type MockResponse<T = unknown> = {
  data?: T;
  status: number;
};

function notFound(): MockResponse<never> {
  return {
    data: undefined,
    status: 404,
  };
}

export async function handleMockRequest({
  body,
  method = 'GET',
  path,
}: MockRequest): Promise<MockResponse> {
  const url = new URL(`https://inventory.mock.local${path}`);

  if (method === 'GET' && url.pathname === '/stores') {
    const search = url.searchParams.get('q') ?? '';
    return {
      data: await listStores(search),
      status: 200,
    };
  }

  if (method === 'POST' && url.pathname === '/stores') {
    return {
      data: await createStore(body as { address: string; name: string }),
      status: 201,
    };
  }

  if (method === 'POST' && url.pathname === '/products') {
    return {
      data: await createProduct(
        body as {
          category: string;
          name: string;
          price: string;
          storeId: string;
        },
      ),
      status: 201,
    };
  }

  if (url.pathname.startsWith('/stores/')) {
    const storeId = url.pathname.replace('/stores/', '');

    if (method === 'GET') {
      const store = await getStoreById(storeId);

      if (!store) {
        return notFound();
      }

      return {
        data: store,
        status: 200,
      };
    }

    if (method === 'PUT') {
      const store = await updateStore(
        storeId,
        body as { address: string; name: string },
      );

      if (!store) {
        return notFound();
      }

      return {
        data: store,
        status: 200,
      };
    }

    if (method === 'DELETE') {
      await deleteStore(storeId);
      return {
        status: 204,
      };
    }
  }

  if (url.pathname.startsWith('/products/')) {
    const productId = url.pathname.replace('/products/', '');

    if (method === 'PUT') {
      const product = await updateProduct(
        productId,
        body as {
          category: string;
          name: string;
          price: string;
          storeId: string;
        },
      );

      if (!product) {
        return notFound();
      }

      return {
        data: product,
        status: 200,
      };
    }

    if (method === 'DELETE') {
      await deleteProduct(productId);
      return {
        status: 204,
      };
    }
  }

  return {
    data: undefined,
    status: 404,
  };
}
