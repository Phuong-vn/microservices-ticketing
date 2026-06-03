import nats from 'node-nats-streaming';
import type { Stan } from 'node-nats-streaming';

class NatsWrapper {
  private _client?: Stan;
  connect(clusterId: string, clientId: string, url: string) {
    return new Promise<void>((resolve, reject) => {
      this._client = nats.connect(clusterId, clientId, { url });
      this._client.on('connect', () => {
        console.log('nats is connected')
        resolve();
      });
      this._client.on('error', (err) => reject(err));
    });
  }
}

export const natsWrapper = new NatsWrapper();
