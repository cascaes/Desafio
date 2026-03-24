let listening = false;

export async function startMockServer() {
  if (listening) {
    return;
  }

  listening = true;
}
