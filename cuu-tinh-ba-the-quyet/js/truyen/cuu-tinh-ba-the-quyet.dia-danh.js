/* ===== Cửu Tinh Bá Thể Quyết — địa danh của từng thế giới =====
   Mỗi mục: [loại, tên, mô tả, [chương], thuộc, quy mô 1–5]. Gán thế giới theo khoảng chương nên có thể nhầm. */
(function(){
const PL={
  thienthinh:[
    ['vung','Cửu Lê Thần Vực','Thần vực có Cửu Lê thành và Cửu Lê tháp; có kẻ đặt cả Cửu Lê Thần Vực vào tuyệt địa chỉ để giết Long Trần.',[7056,7076],null,4],
    ['thanh','Cửu Lê thành','Thành trong Cửu Lê Thần Vực.',[6576,7056],'Cửu Lê Thần Vực',3],
    ['hiem','Cửu Lê tháp','Tháp lóe sáng liên tục giữa trận vây giết Long Trần.',[6536,7056],'Cửu Lê Thần Vực',3],
    ['tong','Tinh Hà cung','Tông có nhiều đệ tử mới từ Cửu Thiên thế giới; cung chủ Lý Thương Hạo; Kim Đan là bậc đan cao nhất.',[6656,6676,6696,6716],null,4],
    ['tong','Tề Thiên Đạo Tông','Đại tông của Phong Hành Liệt, Tề Vân Ngạo; Long Trần tới tận cửa đòi công đạo.',[7173,7196,7203],null,4],
    ['tong','Cầm tông','Một trong ba tông Cầm, Kỳ, Họa; đệ tử du lịch bát phương, lấy nhạc dương đạo.',[5936,6876,7056],null,3],
    ['tong','Kỳ Tông','Tông cờ, cùng Cầm tông và Họa Tông ra mặt ở Cửu Lê Thần Vực.',[7056,7076],null,3],
    ['tong','Họa Tông','Tông vẽ, cùng Cầm tông và Kỳ Tông.',[6936,7056,7076],null,3],
    ['tong','Luyện Hồn Tông','Tông có thần tử Hoàng Nhất Châu.',[6856],null,3],
    ['tong','Hậu Thổ Tông','Tông có thần tử Nghiêm Sinh; cường giả nhiều lần xuất hiện ở chiến trường.',[6836,6876],null,3],
    ['tong','Hỏa Thần tông','Tông chủ đích thân tới giữ thể diện cho Long Trần.',[6836,6841,6876],null,3],
    ['tong','Viêm Hồn môn','Môn phái của Viêm Lập.',[6853,6856],null,2],
    ['tong','Độ Tiên Môn','Môn phái của Lý Minh Đạo; đại chiến với Long Trần lan truyền khắp nơi.',[7116,7176],null,3],
    ['tong','Bái Nguyệt Thần Giáo','Thần giáo xuất hiện ở cuối truyện.',[7102],null,2],
    ['quoc','Huyết Sát Thần quốc','Thần quốc có lão giả kinh nộ quát Long Trần.',[7096],null,3],
    ['hiem','Tụ Tinh Đài','Đài chứa tinh thần bản nguyên; Long Trần mới hấp thu một nửa đã không hút nổi.',[6956],null,2],
    ['hiem','Ngưu Đầu Lĩnh','Từng là thành trì lớn, địa hình giống đầu trâu.',[6736],null,2],
    ['hiem','Tử Uyên','Vùng nước Tử Uyên trong suốt thấy đáy.',[7036],null,2],
    ['hiem','Đế đạo thần võ đài','Võ đài đế đạo.',[7031],null,2]
  ],
  hondon:[
    ['toc','Hỗn Độn giới ma','Ma vật Hỗn Độn giới mà Long Tam gia thách thức.',[6356],null,3],
    ['toc','Yêu Tộc Hỗn Độn thế giới','Hậu nhân Yêu Tộc đại năng Hỗn Độn thế giới tiết lộ tin cho Long Húc.',[6416],null,3]
  ],
  thienvuc:[
    ['toc','Thủy Ma Tộc','Có trấn ma lực, khắc tinh của mọi Ma tộc; Long Trần cứu họ khỏi bị một mẻ hốt gọn.',[6136,6256,6416,6436],null,4],
    ['tong','Tứ Phương Liên Minh','Liên minh thuộc thê đội thứ nhất của chiến trường.',[6116,6496,6596],null,4],
    ['tong','Tinh Hà tông','Thế lực thê đội thứ nhất cùng thư viện.',[4356,6596],null,3],
    ['hiem','Phạm Thiên Thánh Địa','Thánh địa của Phạm Thiên nhất mạch, bị Long Trần tự tay hủy diệt.',[6556,6576],null,4],
    ['tong','Phạm Thiên đan cốc','Đan cốc khống chế Thiên hỏa Ma Vực; nhiều thế lực không muốn đắc tội.',[4936,5056,6136],null,3],
    ['hiem','Ma Vân sơn','Núi có kết giới xua ma, Thủy Ma Tộc giữ trong kết giới.',[6416,6436],null,2],
    ['hiem','Thiên Tích Lĩnh','Long Trần đoán người đồng hành sẽ đột phá trước khi vào đây.',[6316],null,2],
    ['hiem','Linh Hồn lĩnh','Hiểm địa trên chiến trường.',[6156],null,2],
    ['vung','Niết Bàn châu','Châu có những khỏa Niết Bàn; Hỗn Độn Chu Tước xuất hiện.',[6216],null,3],
    ['hiem','Lôi Hải','Biển sấm trong kiếp vân khi Long Trần độ kiếp.',[6596],null,2]
  ],
  longvuc:[
    ['toc','Long Tộc','Tộc rồng nổi danh ngang Côn Bằng; cường giả Long Tộc ở Long Vực có Nhân Hoàng.',[3916,4076,5236,5456],null,5],
    ['toc','Đế tộc','Tộc giữ Vạn Long Sào và tế đàn Đế lân.',[4576,4596,4656,4676],null,4],
    ['hiem','Vạn Long Sào','Tổ rồng của Đế tộc; giúp Long Tộc chống cả song mạch Hoàng giả.',[4436,4596,5236],'Đế tộc',4],
    ['toc','Minh Long nhất tộc','Tộc của Minh Long Thiên Chiếu, mượn Minh giới pháp tắc.',[4436,4496,6196],null,4],
    ['toc','Kim Tình Tà Long nhất tộc','Tộc rồng do Tà Thiên Trọng làm tộc trưởng.',[5456],null,3],
    ['hiem','Long mộ','Mộ rồng trong Long Vực, có tế đàn Đế lân.',[4576],null,3],
    ['hiem','Long Đế tế đàn','Tế đàn của Long Đế.',[5241],null,3],
    ['thanh','Thiên Yêu Thành','Thành không cho ai tự do buông thả, nhất là Nhân tộc.',[5516],null,3],
    ['tong','Thiên Yêu Liên Minh','Liên minh yêu tộc.',[5556],null,2]
  ],
  tamlinh:[
    ['vung','Hư Linh giới','Một trong Tam Giới; sắp mở ra khi kẻ xâm nhập xuất hiện lâu.',[4516,4596],null,4],
    ['vung','Huyễn Linh giới','Một trong Tam Giới nhất thể.',[4596],null,3],
    ['vung','Huyền Linh giới','Giới của Địa Linh tộc, bị phong tỏa vô số năm.',[4416,4596],null,3],
    ['toc','Địa Linh tộc','Tộc bị ác ma nguyền rủa.',[4416],'Huyền Linh giới',2],
    ['tong','Thiên Tà Tông','Tông muốn chiếm phần khi Hư Linh giới mở.',[4516],'Hư Linh giới',3]
  ],
  minhgioi:[
    ['hiem','Minh giới chi môn','Cửa Minh giới; mất cân bằng khi Cửu U điện chủ chết.',[4036],null,3],
    ['hiem','Địa Ngục Chi Môn','Cửa hút hết năng lượng Minh giới chi môn.',[4036],null,3],
    ['toc','Minh hoàng','Tồn tại khiến cửu thiên thập địa sợ hãi, có Minh hoàng chi lực.',[5496,5676,6196],null,5]
  ],
  thienmach:[
    ['hiem','Thiên Mạch Huyền Cảnh','Nơi thiên tài chư thiên vạn giới phân cao thấp.',[5556,5616,5676,5716],null,4]
  ],
  daihoang:[
    ['vung','Đại Hoang giới','Giới mạnh tuyên bố san bằng Niết Doanh Thiên khi đại môn mở.',[4376],null,4],
    ['vung','Vô Nhân Giới','Giới tung át chủ bài ở ch.4376.',[4376],null,3],
    ['toc','Liệp Mệnh nhất tộc','Thấy ở sâu trong Đại Hoang; từ đây Long Trần biết tin Tử Huyết nhất tộc.',[5116,5136],null,3]
  ],
  phongthan:[
    ['tong','Phong Thần Hải Các','Các tuyển chọn ngoại vực cường giả, tình báo rất chuẩn.',[5316,5336,5356,5376],null,4],
    ['dao','Ẩn Long đảo','Đảo ở Phong Thần hải.',[5336],null,2],
    ['thanh','Thiên Vũ thành','Thành nhỏ có Thiên Vũ lôi đài.',[5296],null,2]
  ],
  minhhao:[
    ['tong','Lăng Tiêu Thư Viện','Thư viện Long Trần vào từ tạp dịch; viện trưởng Bạch Nhạc Thiên, có Chiến Thần Điện.',[3716,4056,4096,4336,5176],null,5],
    ['tong','Long huyết quân đoàn','Quân đoàn Long Trần lập; Quách Nhiên, Hạ Thần đứng đầu.',[3456,3796,3876,3916],null,4],
    ['hiem','Cửu Thiên chi môn','Cổng lớn của Cửu Thiên; Long Trần tàn sát Thiên Kiêu trước cửa.',[4496,4696],null,3],
    ['thanh','Lạc Hà thành','Châu thành Lạc Hà châu, gần Lăng Tiêu Thư Viện nhất.',[5176],null,2],
    ['tong','Chiến Thần Điện','Điện của Lăng Tiêu Thư Viện, Điện Chủ đại nhân trấn giữ.',[3716,4276,5176],'Lăng Tiêu Thư Viện',3]
  ],
  colan:[
    ['vung','Cổ Lan vực','Vực rất lớn, đi tới Thụy Hà Châu còn mất mấy ngày.',[3396],null,4],
    ['vung','Thiên Hồng vực','Vực của Thiên Hồng Tiên Tử, nơi Thiên Hồng Thải Diễm xuất thế.',[3316,3336],null,4],
    ['thanh','Thiên Hồng Cổ Thành','Có tượng Thiên Hồng Tiên Tử và đại trận thủ hộ.',[3316,3336],'Thiên Hồng vực',3],
    ['thanh','Chiêu Minh Cổ Thành','Cổ thành nơi Ma Nhãn Thụy Liên hàng lâm gần đó.',[3277,3296],null,2],
    ['vung','Thụy Hà Châu','Châu bị các tộc trưởng yêu thú tràn vào.',[3396,3436],'Cổ Lan vực',3],
    ['tong','Thanh Long Bang','Bang của Tiên Vương Triệu Thanh Long.',[3276],null,2],
    ['tong','Thánh Đan Điện','Điện có tượng thần Đại Phạm Thiên; bị Long Trần gọi là vô sỉ.',[3411,3416,3436],null,3],
    ['gia','Cái gia','Gia tộc bị Long Trần đánh.',[3276,3316,3356],null,2]
  ],
  tuviem:[
    ['vung','Ma La Tinh Vực','Tinh vực thừa trân dược, khoáng thạch; dân gọi Long Trần là Vương.',[3576,3616,3636,3696],null,4],
    ['vung','Phù Thiên tinh vực','Tinh vực có Linh Văn Các, truyền thừa xưa nhất.',[3656],null,3],
    ['vung','Tân Hải Tinh Vực','Đích đến của Long Trần sau Thiên Diễn tinh vực.',[3476],null,3],
    ['vung','Thiên Diễn tinh vực','Tinh vực Long Trần đi qua bằng truyền tống trận.',[3476],null,2],
    ['vung','Hỗn Loạn Tinh Hải','Biển sao hỗn loạn.',[3496,3676],null,3],
    ['dao','Cửu U đảo','Tổng bộ thứ hai của Cửu U điện, giữa mê vụ chi hải; bị hủy.',[3676,3716,3896],null,3],
    ['quoc','Chu Tước đế quốc','Đế quốc lâm vào nước sôi lửa bỏng; bình dân không được lấy công chúa.',[3936,3956,4016,4036],null,4],
    ['quoc','Thiên Tỳ đế quốc','Đế quốc có quan hệ với Ân Phổ Đạt điện chủ.',[3716],null,3],
    ['tong','Tửu Thần cung','Tiên Giới Tửu Thần cung; tìm được Cửu Tinh truyền nhân đầu tiên sau vô số năm.',[3516,3936,6896],null,3],
    ['tong','Linh Văn Các','Truyền thừa xưa nhất Phù Thiên tinh vực; Hạ Thần muốn diệt sạch.',[3656],'Phù Thiên tinh vực',3],
    ['tong','Huyết Sát Điện','Điện sát thủ, tín đồ khắp cửu thiên thập địa.',[3716,3836,3876,3896],null,4],
    ['tong','Cửu U điện','Điện sát thủ; điện chủ Liêu Bản Thương bị Long Trần giết.',[3316,3676,3836,4036],null,4],
    ['tong','Long Đằng thương hội','Thương hội lớn, bị Long Trần cướp.',[3556,3716],null,3],
    ['tong','Thiên Long thần giáp Học Viện','Học viện nơi Quách Nhiên lộ thiên phú đúc khí.',[3576],null,2],
    ['thanh','Thất Tinh thành','Thành có Thần Tôn cảnh cường giả Nhân tộc trấn giữ.',[3756],null,2],
    ['thanh','Hạo Thiên thành','Thành cấm động võ.',[3796],null,2],
    ['thanh','Thanh Vũ thành','Nơi Hỏa Linh Nhi thức tỉnh.',[3576],null,1],
    ['hiem','Thiên hỏa thế giới','Thế giới thiên hỏa giáng xuống khoảng hai mươi mốt ngày.',[3522,3536],null,3]
  ],
  nietdoanh:[
    ['vung','Thánh Vương châu','Châu có bố cục kỳ lạ; hỗn độn chi khí từ cự môn tràn khắp.',[4156,4236,4256,4276],null,4],
    ['gia','Bát đại Bất Hủ thế gia','Tám thế gia Nhân tộc rất điệu thấp, bất động thanh sắc.',[4096,4236],null,4],
    ['toc','Vọng Nguyệt nhất tộc','Tộc từ sinh mệnh cấm khu, mạnh không kém Bất Hủ thế gia.',[4096,4116],null,3],
    ['hiem','Sinh mệnh cấm khu','Có vô số thế giới thất lạc từ Thái Cổ.',[4096],null,3],
    ['hiem','Thiên Hà','Dòng sông trời phải hoành độ giữa các Thiên; có Ác Ma Chi Nhãn.',[4056,4096],null,3],
    ['tong','Thư Tông','Một trong Thái Cổ tứ tông.',[4356],null,3],
    ['toc','Vũ tộc','Tộc có cánh, có cường giả Bất Hủ.',[3316,4396],null,3],
    ['hiem','Cự môn','Cửa lớn phun hỗn độn chi khí ra Thánh Vương châu.',[4256],'Thánh Vương châu',3]
  ],
  thienhoang:[
    ['gia','Long gia','Thiên Hoang Long gia, có tứ đại Thiên Thánh; gia tộc của cha Long Trần.',[4716,4776,4956,4996],null,5],
    ['tong','Hỏa Thần Điện','Điện có Phó điện chủ hỏa diễm chi vòng.',[4876,4916,4936],null,3],
    ['thanh','Phục Ma thành','Thành có Tinh Vân lôi đài và luật thu phí vào Thiên Mạc sơn.',[4856,4876],null,3],
    ['hiem','Thiên Mạc sơn','Chiến trường cổ, nguyền rủa kết giới; Thiên Thánh cũng không dám tới gần.',[4876],null,3],
    ['tong','Thiết Huyết Môn','Môn phái mất Vạn Huyết Kỳ.',[4856],null,2],
    ['tong','Thất Huyền cung','Cung liên quan tới Long cốt Thất Huyền cung.',[5156],null,2],
    ['gia','Diệp gia','Gia tộc ở Thiên Hoang.',[5016,5036],null,2],
    ['gia','Triệu gia','Gia tộc ở Thiên Hoang.',[5016,5036],null,2],
    ['toc','Thiên Nhân tộc','Tộc có Nhân Thánh ra mặt.',[4776,4816,5136],null,3],
    ['toc','Huyết tộc','Kẻ thù của Nhân tộc, nhiều cường giả chết dưới tay Long Trần.',[4276,4856,4896,5136],null,3]
  ],
  tuhuyet:[
    ['gia','Lạc gia','Gia tộc Tử Huyết của ngoại công Lạc Tử Xuyên.',[5736,5756,5776,5796],null,4],
    ['gia','Tất gia','Gia tộc Tử Huyết; Tất Vạn An giở trò, bị Long Trần giết lên.',[5756,5796],null,3],
    ['hiem','Đế Sơn','Núi có Đế Sơn chi môn và cầu thang dài; nơi Long Trần tìm cách ngưng Đế diễm.',[5976,5996,6116,6276],null,4],
    ['thanh','Lan Lăng thành','Thành có Thần Đế quảng trường.',[5926,5936],null,2],
    ['vung','Cửu Phong Long Vực','Vực có nhiều cường giả hoan hô Long Trần.',[6016],null,3],
    ['hiem','Bất Tử Yêu Sâm','Rừng nơi bạn cũ từ Thiên Võ Đại Lục bị đưa tới; bị hủy trong trận chiến.',[5856,5916],null,3],
    ['hiem','Tử Huyết bảo khố','Bảo khố của Tử Huyết nhất tộc.',[5748],null,2]
  ],
  thienvo:[
    ['vung','Thiên Võ Đại Lục','Phàm giới nơi Long Trần khởi đầu, có năm vị Đại Đế; trải qua diệt thế cuộc chiến.',[5856,5936,7116],null,5]
  ]
};
const st=STORIES.find(s=>s.id==='cuu-tinh-ba-the-quyet'),SZ=(window.SIZES&&SIZES['cuu-tinh-ba-the-quyet'])||{};
st.worlds.forEach(w=>{w.places=(PL[w.id]||[]).map(([t,n,d,ch,inn,s])=>({t,n,d,ch,in:inn||null,s:s||SZ[w.id+'|'+n]||2}))});
})();
