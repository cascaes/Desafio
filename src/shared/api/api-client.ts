import { handleMockRequest } from '../../mocks/handlers';

const API_URL = 'https://inventory.mock.local';

type JsonValue = Record<string, unknown> | unknown[] | undefined;

export async function apiClient<TResponse>(
  path: string,
  init?: Omit<RequestInit, 'body'> & { body?: JsonValue },
) {
  const response = await handleMockRequest({
    body: init?.body,
    method: init?.method,
    path: path.startsWith(API_URL) ? path.replace(API_URL, '') : path,
  });

  if (response.status >= 400) {
    throw new Error('Falha ao processar a requisicao.');
  }

  if (response.status === 204) {
    return undefined as TResponse;
  }

  return response.data as TResponse;
}
