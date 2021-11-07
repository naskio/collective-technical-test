import http from "./http";
import Crypto from "../types/crypto.type"

class CryptoService {
    getAll() {
        return http.get<Crypto[]>("/cryptos").then(response => response.data);
    }

    getBySearchQuery(query?: string) {
        return http.get<Crypto[]>(`/cryptos`, {
            params: {
                q: query
            }
        }).then(response => response.data);
    }
}

export default new CryptoService();
