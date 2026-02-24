import http from 'k6/http';
import { check } from 'k6';

export const options = {
  // 同時接続する仮想ユーザー数(Virtual Users)
  vus: 100, 
  // 30秒間リクエストを投げ続ける
  duration: '30s',
};

export default function () {
  const res = http.get(`http://localhost:8080`); 
  check(res, {
    'status is 200': (r) => r.status === 200,
  });
}