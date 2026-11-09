# Bài 2-3 — React Native

Bài tập dựng giao diện 6 ô màu theo ảnh đề bài, sử dụng React Native và Expo.

## Bố cục

- Ô 1: xanh dương, rộng toàn hàng.
- Ô 2: đỏ, rộng toàn hàng.
- Ô 3, 4, 5: vàng, xanh lá, tím; nằm ngang, mỗi ô rộng khoảng 1/4 hàng. Phần còn lại bên phải để trắng như mẫu.
- Ô 6: cam, rộng toàn hàng.
- Số nằm chính giữa; số 3 màu đen, các số khác màu trắng.
- Nền trắng, khoảng cách giữa các ô theo mẫu. Khung giao diện co theo kích thước màn hình và có giới hạn chiều rộng 432 điểm.
- Không hiển thị phần chữ mô tả bài tập trong ảnh.

## Chạy dự án

Cài Node.js đáp ứng yêu cầu của Expo SDK 54, sau đó:

```sh
git clone https://github.com/Cuaaaaa2504/Bai-2-3.git
cd Bai-2-3
npm install
npx expo install --fix
npm start
```

Dùng Android emulator hoặc iOS Simulator với phím a/i trong Expo CLI. Nếu dùng điện thoại, cần Expo Go tương thích SDK 54; bản Expo Go mới hơn có thể không hỗ trợ SDK này. Có thể tìm bản phù hợp tại https://expo.dev/go.

```sh
npm run android
# iOS Simulator cần macOS + Xcode
npm run ios
```

## Mã nguồn

- `App.js`: component Tile, bố cục và StyleSheet.
- `app.json`: cấu hình ứng dụng Expo.
- `package.json`: thư viện và lệnh chạy.

Dùng View, Text, StyleSheet, useWindowDimensions và safe-area context, không dùng ảnh chụp làm giao diện.

## Lưu ý

Đề yêu cầu dùng công nghệ khác với bài buổi 1; người nộp cần kiểm tra bài trước không dùng React Native.

Mã nguồn chưa được chạy thử trên thiết bị hoặc emulator trong môi trường tạo bài; cần kiểm tra thực tế trước khi nộp. Màu sắc và tỷ lệ được dựng gần theo ảnh mẫu, không cam kết khớp từng pixel.
