import http from 'k6/http';
import { check } from 'k6';

export const options = {
  vus: 1000, // 同時接続する仮想ユーザー数(Virtual Users)
  duration: '30s', // 30秒間リクエストを投げ続ける
};

export default function () {
  const res = http.get('http://localhost:8080'); // あなたのGo API
  check(res, {
    'status is 200': (r) => r.status === 200,
  });
}