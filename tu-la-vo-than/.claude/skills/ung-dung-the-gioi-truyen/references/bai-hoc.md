# Bài học từ dự án mẫu

## Lỗi đã gặp và cách tránh

| Vấn đề | Cách tránh |
| --- | --- |
| Máy làm việc khởi động lại, mất file chưa lưu | Commit và đẩy GitHub sau mỗi bước |
| Nhãn bản đồ chồng nhau khi dữ liệu dày lên | Giữ `layoutPlaces` + `markMinor`; chạy `kiem_tra.js` sau mỗi lần thêm dữ liệu |
| Địa danh tìm tự động là tên người / cảnh giới / pháp bảo | Luôn đọc đoạn văn ngữ cảnh trước khi thêm |
| Gán địa danh vào nhầm thế giới vì xếp theo khoảng chương | Ghi khoảng chương từng thế giới; hành trình nhân vật chính giúp xác định; báo người dùng để họ sửa |
| Vùng nước (tên có "hải") phủ màu xanh lên đất liền trên bản đồ biển | Trên bản đồ địa hình thật, vùng nước chỉ vẽ viền |
| `Object.assign(sprite,{position})` báo lỗi read-only trong Three.js | Dùng `obj.position.set(...)` |
| Bấm thế lực trong 3D lại mở cả thế giới | Ưu tiên vật được bấm có chỉ số địa danh |
| Biểu tượng 3D quá to, che mặt đất | Thu nhỏ theo `FS`, địa danh nhỏ còn nhỏ hơn |
| Bộ lọc palette đọc phải giá trị không phải màu (`farm:1`) | Chỉ chuyển các giá trị kiểu chuỗi màu |
| Trang có captcha | Bỏ qua, dùng nguồn khác |
| Bật GitHub Pages bằng API bị chặn | Hướng dẫn người dùng bật tay |
| Cảnh báo commit "Unverified" | Hỏi trước danh tính tác giả commit; không ghi đè lịch sử đã đẩy khi người dùng chưa đồng ý |

## Cách người dùng thường góp ý và cách hiểu

| Họ nói | Thường có nghĩa | Đã làm |
| --- | --- | --- |
| "quá nhiều chữ" | Thay chữ bằng hình | Thanh quy mô, biểu đồ, biểu tượng, mô tả 1–2 câu |
| "chân thật lên" | Bớt kiểu hoạt hình | Địa hình theo độ cao, đổ bóng, rừng, sông, ruộng; 3D nổi khối |
| "to gấp 10 lần" | Muốn thấy chi tiết lớn hơn | Phóng tới 10× với chi tiết vẽ lại; 3D gần hơn, toàn màn hình; nói rõ không phóng đúng nghĩa đen được |
| "thêm điểm xoay / nhiều góc" | Muốn tự chọn góc nhìn | Tâm xoay theo tầng, nhấp đúp, cụm nút xoay, phím mũi tên |
| "có thể rút gọn" | Khung che bản đồ | Nút thu gọn cho mọi khung |
| "đọc thêm truyện, thêm chi tiết" | Muốn nhiều địa danh có thật hơn | Tải thêm chương rải đều, `tim_dia_danh.py`, đọc ngữ cảnh, thêm theo đợt |
| "tự đề xuất, làm tới X giờ" | Làm liên tục, báo kết quả | Đặt lịch nhắc nếu có công cụ; cải tiến từng vòng; báo ngắn ở mốc giờ |
| "tôi đồng ý, kết nối đi" | Cho phép kết nối công cụ | Chỉ kết nối thứ thật sự cần, nói rõ để làm gì |

## Cách báo kết quả
- Câu đầu là kết quả. Liệt kê ngắn những gì đã làm, chỗ xem (link web, artifact), file zip.
- Nói thẳng phần chưa làm được và lý do; không hứa thứ chưa kiểm tra.
- Gửi kèm 1–2 ảnh chụp quan trọng nhất.
